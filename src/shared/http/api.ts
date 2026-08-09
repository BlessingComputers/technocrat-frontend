/**
 * Native Fetch API client — ported from blessingcomputers' shared/http/api.ts
 * (see docs/koyeb-shared-backend.md; same customer cookie names, same
 * refresh flow). Staff/admin handling was dropped: this app has no admin
 * surface, only the customer session.
 *
 * Exports an `api` object with .get(), .post(), .patch(), .put(), .delete()
 * that return { data: parsedJSON }.
 *
 * Handles:
 * - Automatic JSON serialization
 * - Query parameter serialization
 * - Cookie-based auth (credentials: 'include')
 * - 401 token refresh with request queuing
 * - Cross-tab refresh locking via localStorage
 */

import { unstable_rethrow } from "next/navigation";
import { API_ENDPOINTS, BASE_URL } from "@/config/api-config";

interface RequestConfig {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string | undefined>;
  data?: unknown;
  timeout?: number;
  signal?: AbortSignal;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  ok: boolean;
}

export class ApiError extends Error {
  status: number;
  data: any;
  response: { status: number; data: any };

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    // Compatibility layer: services catch `error.response?.status` and `error.response?.data`
    this.response = { status, data };
  }
}

// ─── Refresh Queue & Locking ─────────────────────────────────────────

let isRefreshing = false;
let currentRefreshPromise: Promise<void> | null = null;

const refreshQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(null);
  });
  refreshQueue.splice(0);
}

const LOCK_KEY = "auth_refresh_lock_customer";
const LOCK_TIMEOUT = 10000;

const TAB_ID =
  typeof window !== "undefined"
    ? sessionStorage.getItem("tab_id") ||
      (() => {
        const id = Math.random().toString(36).slice(2);
        sessionStorage.setItem("tab_id", id);
        return id;
      })()
    : "server";

function getLock(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCK_KEY);
  if (!raw) return null;
  try {
    const { timestamp, tabId } = JSON.parse(raw);
    if (Date.now() - timestamp > LOCK_TIMEOUT) {
      localStorage.removeItem(LOCK_KEY);
      return null;
    }
    return tabId === TAB_ID ? null : tabId; // null means WE own it
  } catch {
    localStorage.removeItem(LOCK_KEY);
    return null;
  }
}

function setLock() {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    LOCK_KEY,
    JSON.stringify({ timestamp: Date.now(), tabId: TAB_ID }),
  );
}

function clearLock() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCK_KEY);
}

// ─── Core Fetch Helper ──────────────────────────────────────────────

function buildUrl(
  url: string,
  params?: Record<string, string | number | boolean | undefined>,
): string {
  // If the URL is already absolute (starts with http), use it as-is.
  // If it's relative and we're on the server, prepend BASE_URL.
  // On the client, relative URLs already go through the /backend rewrite proxy.
  let fullUrl = url;
  if (!url.startsWith("http")) {
    if (typeof window === "undefined") {
      fullUrl = url.startsWith(BASE_URL) ? url : `${BASE_URL}${url}`;
    }
  }

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) {
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + qs;
    }
  }

  return fullUrl;
}

async function baseFetch<T = any>(
  url: string,
  method: string,
  body?: unknown,
  config?: RequestConfig,
  _isRetry?: boolean,
): Promise<ApiResponse<T>> {
  const fullUrl = buildUrl(url, config?.params);

  const headers: Record<string, string> = {
    "X-Requested-With": "XMLHttpRequest",
  };

  if (config?.headers) {
    for (const [key, value] of Object.entries(config.headers)) {
      if (value !== undefined) {
        headers[key] = value;
      }
    }
  }

  let fetchBody: BodyInit | undefined;
  if (body instanceof FormData) {
    fetchBody = body;
    delete headers["Content-Type"];
  } else if (body !== undefined && body !== null) {
    fetchBody = JSON.stringify(body);
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  let controller: AbortController | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = config?.timeout ?? 15_000;

  if (!config?.signal) {
    controller = new AbortController();
    timeoutId = setTimeout(() => controller!.abort(), timeout);
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      headers,
      body: fetchBody,
      credentials: "include",
      signal: config?.signal ?? controller?.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    let data: any;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      if (response.status === 401 && !_isRetry) {
        if (url.includes("/refresh")) {
          throw new ApiError(data?.message || "Unauthorized", 401, data);
        }
        return handle401(url, method, body, config) as Promise<ApiResponse<T>>;
      }

      throw new ApiError(
        data?.message || `Request failed with status ${response.status}`,
        response.status,
        data,
      );
    }

    return { data, status: response.status, ok: true };
  } catch (error: any) {
    if (timeoutId) clearTimeout(timeoutId);

    // Next signals "this render is dynamic, abort the prerender" by rejecting
    // the in-flight fetch. That is framework control flow, not a network
    // failure — wrapping it in an ApiError below would hide it from Next and
    // from any caller that catches ApiError. `cacheComponents` is on, so this
    // fires on every server fetch during build. Must stay at the top.
    unstable_rethrow(error);

    if (error instanceof ApiError) throw error;

    if (error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, null);
    }

    throw new ApiError(error.message || "Network error", 0, null);
  }
}

// ─── Cross-Tab Lock Release (Event-Driven) ──────────────────────────

function waitForLockRelease(): Promise<void> {
  return new Promise<void>((resolve) => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCK_KEY && e.newValue === null) {
        cleanup();
        resolve();
      }
    };

    const safetyTimeout = setTimeout(() => {
      cleanup();
      clearLock();
      resolve();
    }, LOCK_TIMEOUT);

    function cleanup() {
      window.removeEventListener("storage", onStorage);
      clearTimeout(safetyTimeout);
    }

    window.addEventListener("storage", onStorage);

    if (!getLock()) {
      cleanup();
      resolve();
    }
  });
}

// ─── 401 Handler ────────────────────────────────────────────────────

async function handle401(
  url: string,
  method: string,
  body: unknown,
  config?: RequestConfig,
): Promise<ApiResponse> {
  // Never attempt a token refresh on the server — a server render can't
  // persist rotated cookies, so surface the 401 and let the client recover.
  if (typeof window === "undefined") {
    throw new ApiError("Unauthorized", 401, null);
  }

  const crossTabLock = getLock();

  if (isRefreshing) {
    return new Promise<unknown>((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    }).then(() => baseFetch(url, method, body, config, true));
  }

  if (crossTabLock) {
    await waitForLockRelease();
    return baseFetch(url, method, body, config, true);
  }

  await runRefresh();
  return baseFetch(url, method, body, config, true);
}

async function runRefresh(): Promise<void> {
  if (currentRefreshPromise) return currentRefreshPromise;

  currentRefreshPromise = (async () => {
    isRefreshing = true;
    setLock();

    // Brief window so concurrent tabs that ALSO setLock can race; last writer
    // wins and the others back off via the lockOwner check below.
    await new Promise((resolve) => setTimeout(resolve, 50));

    const lockOwner = getLock();
    if (lockOwner !== null) {
      isRefreshing = false;
      await waitForLockRelease();
      // Requests queued locally while we thought we were the leader (see
      // handle401's `isRefreshing` branch) would otherwise hang forever —
      // nothing else ever resolves them once we bail out here instead of
      // reaching the processQueue() calls below.
      processQueue(null);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.user.refresh, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError("Refresh failed", response.status, errorData);
      }

      processQueue(null);
    } catch (refreshError: any) {
      processQueue(refreshError);

      if (typeof window !== "undefined") {
        const isReuse = refreshError?.data?.error === "TOKEN_REUSE_DETECTED";
        if (isReuse) {
          window.dispatchEvent(new CustomEvent("auth:session-revoked"));
        }
        // Dispatch logout event but do NOT force a hard redirect — components
        // handle their own UI flow (e.g. header hides account-only actions).
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    } finally {
      isRefreshing = false;
      clearLock();
    }
  })();

  currentRefreshPromise.finally(() => {
    currentRefreshPromise = null;
  });

  return currentRefreshPromise;
}

// ─── Public API ─────────────────────────────────────────────────────

export const api = {
  get: <T = any>(
    url: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> => baseFetch<T>(url, "GET", undefined, config),

  post: <T = any>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> => baseFetch<T>(url, "POST", data, config),

  patch: <T = any>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> => baseFetch<T>(url, "PATCH", data, config),

  put: <T = any>(
    url: string,
    data?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> => baseFetch<T>(url, "PUT", data, config),

  delete: <T = any>(
    url: string,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> =>
    baseFetch<T>(url, "DELETE", config?.data, config),
};
