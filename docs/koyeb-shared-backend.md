# Shared Koyeb Backend (temporary)

**Status:** Chunk 1 (foundation) done and verified live against the real Koyeb backend (2026-08-05). Read this before touching auth, `store/`, `config/api-config.ts`, or anything under `features/*/api/`.

## Why this exists

Technocrat doesn't have its own backend yet. Blessing Computers' backend is being cloned to become Technocrat's backend, so until that clone exists and is deployed, Technocrat borrows **blessingcomputers' Koyeb dev backend** for anything structurally shared between the two stores (auth, cart shape, categories shape, etc.). Product *data* will obviously differ once Technocrat's clone is seeded, but the API surface is the same today.

**When Technocrat's own backend is ready:** change `API_BASE_URL` / `NEXT_PUBLIC_BACKEND_URL` in the env files below to the new backend's URL, and add Technocrat-specific endpoints to `src/config/api-config.ts` as they diverge from blessingcomputers'. Everything downstream (RTK Query endpoints, the `/backend` proxy rewrite, the `features/auth` slice) keeps working unchanged because it all reads from that one config file.

## The shared backend

- Koyeb URL: `https://hard-berty-elijay-27db4d69.koyeb.app` (same one blessingcomputers' `.env.development` references — see that file's comments).
- **This deployment mounts every route under `/api`** (verified live, 2026-08-05): `/api/auth/customer/me` and `/api/v1/products/featured` respond correctly; the same paths without `/api` 404 with `Route not found`. This differs from blessingcomputers' production domain (`api.blessingcomputers.com`), which serves those same paths at root with no `/api` prefix — presumably stripped by whatever sits in front of that custom domain. Because of this, `API_BASE_URL` here is set to the Koyeb URL **with `/api` already appended** (see `.env.local`), so `src/config/api-config.ts`'s endpoint paths can stay identical to blessingcomputers' (no path needs its own `/api` prefix).
- `categories: /categories` from blessingcomputers' endpoint map does **not** work on this Koyeb deployment (`Route not found` with or without `/api`) — not ported into `api-config.ts` here. Don't assume every path in blessingcomputers' map resolves on this specific backend; verify with `curl` before relying on one (see the verification commands used for auth, in this file's git history / session notes).
- Known gap on that backend as of 2026-07-10 (per blessingcomputers' own notes): `/auth/customer/google` (i.e. `/api/auth/customer/google` here) 500s intermittently — as of 2026-08-05 it does redirect to Google's OAuth consent screen correctly, so this may already be fixed upstream, but re-verify before building on it.

## Why `/backend/*`, not `/api/*`

Blessingcomputers proxies `/api/:path*` straight to its backend (see its `next.config.ts` rewrite). Technocrat can't reuse that prefix: `/api/products`, `/api/categories`, `/api/posts`, `/api/pages` already exist here as real Next.js Route Handlers serving the static WordPress-extracted JSON in `src/data/content/` (see `src/lib/data.ts`). Rewriting `/api/*` over those would be ambiguous — sometimes hitting the local JSON, sometimes hitting Koyeb, depending on which local route happens to exist.

Instead, Technocrat proxies the shared backend at **`/backend/*`** (`next.config.ts` → `API_BASE_URL`). Client code talks to `/backend/...` (same-origin, cookies work, no CORS); server code talks to `API_BASE_URL` directly. This prefix name should carry over even after the real backend ships — only the destination URL changes.

## Data layer choice: RTK Query, not blessingcomputers' fetch client

Blessingcomputers uses TanStack Query + a hand-rolled `fetch` client (`shared/http/api.ts`) with 401-refresh queueing and cross-tab locking. Technocrat already has **Redux Toolkit + RTK Query** as a dependency, with a `baseApi` (`src/store/base-api.ts`) that was scaffolded early but never wired up: `StoreProvider` was never mounted in `layout.tsx`, and no real endpoints existed. It also read a `blessing_session_token` cookie via `js-cookie` and attached it as a manual `Authorization: Bearer` header — **that was wrong and has been removed**. Blessingcomputers' real auth is httpOnly cookies (`customerAccessToken`, `customerRefreshToken`, `hasCustomerSession` — see its `features/auth/model/auth-queries.ts`) sent automatically via `credentials: "include"`, which `fetchBaseQuery` already does. There is no client-readable token to attach.

Rather than bolt on a second data-fetching library, Technocrat's port keeps RTK Query for the data layer. **Not yet built** (deferred past Chunk 1): blessingcomputers' 401-refresh-queue/cross-tab-locking behavior. `features/auth/api/auth-api.ts` currently has no reauth wrapper — a 401 just fails. Add a `baseQueryWithReauth` (RTK Query's documented pattern, wrapping `fetchBaseQuery` and retrying once against `API_ENDPOINTS.user.refresh` on 401) in a later chunk once there's a real login flow to test it against; don't build it blind. Treat blessingcomputers' `auth.service.ts` / `api-config.ts` as the source of truth for **endpoint paths and response shapes**, not for implementation technique.

## Env file

Values live in **`.env.local`** (not `.env.development`) — Next.js loads `.env.local` in every environment (`next dev`, `next build`, `next start`), whereas `.env.development` is dev-only and would break `next build`. Once Technocrat has real per-environment backends, split into `.env.development` / `.env.production` as blessingcomputers does and stop using `.env.local` for this.

## Chunk plan

- [x] **Chunk 1 — Foundation**: `.env.local`, `/backend` rewrite, `src/config/api-config.ts`, wired up `StoreProvider` (was dead code), fixed `base-api.ts` (removed the bogus bearer-token logic, points at `BASE_URL`), scaffolded `features/auth` (types + RTK Query endpoints for `getCustomerProfile`/`logout`/`logoutAll` — no UI, no reauth wrapper yet). Verified live: `curl localhost:3000/backend/auth/customer/me` → real `NO_TOKEN` response from the Koyeb backend (not a 404), confirming the proxy and `/api`-prefixed `API_BASE_URL` are correct.
- [ ] **Chunk 2 — Auth pages**: build the actual login/signup UI under a new `(auth)` route group. No Figma frame for this (confirmed with the user) — match the site's existing tokens/components (see `src/features/home/components/hero.tsx` for the current visual language), not blessingcomputers' `auth/ui/*` designs.
- [ ] **Chunk 3 — Catalog live migration**: decide, per-feature, whether `features/catalog` moves from the static JSON (`lib/data.ts`) to live `/backend/v1/products/*` calls, or keeps static data until Technocrat's own product catalog exists on the clone backend. Likely: keep static catalog data for now (it's Technocrat's real product data; the shared Koyeb backend has blessingcomputers' products, not Technocrat's) and only use the shared backend for auth/cart/checkout-shaped features. Revisit this assumption at the start of Chunk 3.
- [ ] **Chunk 4 — Swap-over**: when Technocrat's backend clone ships, update `API_BASE_URL`/`NEXT_PUBLIC_BACKEND_URL`, audit `api-config.ts` for Technocrat-specific endpoints that diverge from blessingcomputers, remove the "shared backend" framing from this doc.

## Reference: blessingcomputers' endpoint map

Paths below are relative to `BASE_URL` (which already includes `/api` here — see above). Copied from `blessingcomputers/src/config/api-config.ts` (2026-08-05); **only the `user.*` ones are verified working on this Koyeb deployment and ported into `src/config/api-config.ts`**. The rest are blessingcomputers' paths for reference only — verify with `curl` before porting, per the `categories` example above.

```
auth.google        → /auth/customer/google   (verified: redirects to Google OAuth)
user.me            → /auth/customer/me       (verified, ported)
user.logout        → /auth/customer/logout   (ported, not yet curl-verified — needs a real session)
user.logoutAll     → /auth/customer/logout-all (ported, not yet curl-verified)
user.refresh       → /auth/customer/refresh  (verified: real NO_REFRESH_TOKEN response)
customer.profile   → /v1/customer/me         (not ported — unverified, not needed yet)
categories         → /categories             (NOT ported — 404s on this backend, see above)
```
