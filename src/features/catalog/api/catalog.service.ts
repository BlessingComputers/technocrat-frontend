import { api } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/config/api-config";
import type { CatalogCategory } from "../types/catalog";

/**
 * Minimal shape read off the live backend's featured-products payload for the
 * homepage hero — verified live against api.blessingcomputers.com/api/v1/products/featured
 * (2026-08-05): each product has a flat `primaryImage` string, no `images` array.
 */
export interface HeroFeaturedProduct {
  name: string;
  primaryImage: string | null;
  category?: { name: string; slug: string };
}

/**
 * The full featured-product shape, verified live against
 * api.blessingcomputers.com/api/v1/products/featured (2026-08-06). The hero
 * only needs three of these fields, so it keeps its narrower type above; the
 * "Featured Products" grid needs brand, stock, specs and price too.
 *
 * `lowestPrice`/`highestPrice` bracket the variants. Products here are almost
 * always single-variant (both equal), so the card shows `lowestPrice` and adds
 * a "from" qualifier when the two differ.
 */
export interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  primaryImage: string | null;
  brand?: { name: string; slug: string } | null;
  category?: { name: string; slug: string };
  specifications?: Array<{ name: string; value: string }>;
  lowestPrice: number | null;
  highestPrice: number | null;
  availabilityStatus: string | null;
}

/**
 * Card shape shared by the homepage hero carousel (derived from featured
 * products, since those pair a category with a specific product name) and
 * the "Shop By Categories" grid (built straight off `/v1/products/categories`,
 * whose top-level nodes carry a real `imageUrl` — verified live against
 * api.blessingcomputers.com, 2026-08-05).
 */
export interface FeaturedCategoryCard {
  slug: string;
  label: string;
  name: string;
  image: string;
  href: string;
}

function deriveFeaturedCategoryCards(
  products: HeroFeaturedProduct[],
  limit: number,
): FeaturedCategoryCard[] {
  const seen = new Set<string>();
  const items: FeaturedCategoryCard[] = [];
  for (const p of products) {
    const slug = p.category?.slug;
    const image = p.primaryImage;
    if (!slug || !image || seen.has(slug)) continue;
    seen.add(slug);
    items.push({
      slug,
      label: p.category!.name,
      name: p.name,
      image,
      href: `/product?category=${slug}`,
    });
    if (items.length >= limit) break;
  }
  return items;
}

// Response envelope is `{ success: boolean, data: T[] }` (verified against
// blessingcomputers' OpenAPI schema for these same paths), so unwrap `.data`.
export const catalogService = {
  getHeroFeaturedProducts: async (): Promise<HeroFeaturedProduct[]> => {
    const res = await api.get<{ data: HeroFeaturedProduct[] }>(
      API_ENDPOINTS.products.featured,
    );
    return res.data.data;
  },
  /** Featured products for the homepage grid, capped at `limit`. */
  getFeaturedProducts: async (limit = 8): Promise<FeaturedProduct[]> => {
    const res = await api.get<{ data: FeaturedProduct[] }>(
      API_ENDPOINTS.products.featured,
    );
    return res.data.data.slice(0, limit);
  },
  /**
   * Newest products, for the homepage "New Arrivals" shelf.
   *
   * Reads the Prisma-backed `/v1/products/all`, whose `sortBy=newest` is the
   * authoritative created-at ordering. Envelope is `{ status, data, meta }`
   * with `data` a FLAT array — note this differs from the OpenAPI schema in
   * blessingcomputers' api.d.ts, which types `data` as an object; the live
   * payload (Koyeb dev, verified 2026-08-06) is the array.
   *
   * Caveat for whoever picks this up: `/all` currently answers HTTP 500 on the
   * DigitalOcean backend at api.blessingcomputers.com, which is what this app's
   * API_BASE_URL points at. Until that route is fixed there, this resolves
   * empty and the section renders nothing.
   */
  getNewArrivals: async (limit = 4): Promise<FeaturedProduct[]> => {
    const res = await api.get<{ data: FeaturedProduct[] }>(
      API_ENDPOINTS.products.list,
      { params: { sortBy: "newest", limit } },
    );
    return res.data.data;
  },
  getCategories: async (): Promise<CatalogCategory[]> => {
    const res = await api.get<{ data: CatalogCategory[] }>(
      API_ENDPOINTS.products.categories,
    );
    return res.data.data;
  },
  getFeaturedCategoryCards: async (
    limit = 6,
  ): Promise<FeaturedCategoryCard[]> => {
    const products = await catalogService.getHeroFeaturedProducts();
    return deriveFeaturedCategoryCards(products, limit);
  },
  /** Top-level categories with a real image, ranked by product count, for the "Shop By Categories" grid. */
  getShopCategories: async (limit = 6): Promise<FeaturedCategoryCard[]> => {
    const categories = await catalogService.getCategories();
    return categories
      .filter((c) => c.isActive && c.imageUrl)
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, limit)
      .map((c) => ({
        slug: c.slug,
        label: c.name,
        name: c.name,
        image: c.imageUrl!,
        href: `/product?category=${c.slug}`,
      }));
  },
};
