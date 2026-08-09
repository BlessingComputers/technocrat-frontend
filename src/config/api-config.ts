/**
 * Config for the shared backend (temporary). See docs/koyeb-shared-backend.md
 * before adding endpoints or changing the base URL logic — this borrows
 * blessingcomputers' Koyeb dev backend until Technocrat's own clone ships.
 */

function getServerBaseUrl(): string {
  const url = process.env.API_BASE_URL;
  if (!url && typeof window === "undefined") {
    throw new Error(
      "API_BASE_URL environment variable is not set. " +
        "This must point to the shared backend (see docs/koyeb-shared-backend.md).",
    );
  }
  return url!;
}

export const BASE_URL =
  typeof window === "undefined"
    ? getServerBaseUrl()
    : process.env.NEXT_PUBLIC_API_BASE_URL || "/backend";

function endpoint(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Endpoints ported from blessingcomputers' src/config/api-config.ts. Only
 * the auth surface is scaffolded here (Chunk 1) — add more as later chunks
 * need them, keeping the same paths so Technocrat's eventual backend clone
 * needs no client-side changes.
 */
export const API_ENDPOINTS = {
  user: {
    me: endpoint("/auth/customer/me"),
    logout: endpoint("/auth/customer/logout"),
    logoutAll: endpoint("/auth/customer/logout-all"),
    refresh: endpoint("/auth/customer/refresh"),
  },
  products: {
    featured: endpoint("/v1/products/featured"),
    list: endpoint("/v1/products/all"),
    categories: endpoint("/v1/products/categories"),
  },
  cart: {
    base: endpoint("/v1/cart"),
    items: endpoint("/v1/cart/items"),
    removeItem: (variantId: string) => endpoint(`/v1/cart/items/${variantId}`),
    updateQuantity: (variantId: string) =>
      endpoint(`/v1/cart/items/${variantId}`),
  },
} as const;
