import fs from "fs/promises";
import path from "path";
import { Product, Category } from "@/features/catalog/types/catalog";
import type { BlogPost, Page } from "@/features/catalog/types/content";

// Base data directory configuration
const DATA_ROOT = process.env.DATA_ROOT || process.cwd();
const DATA_DIR = path.join(DATA_ROOT, "src/data/content");

const PRODUCTS_PATH = path.join(DATA_DIR, "products.json");
const CATEGORIES_PATH = path.join(DATA_DIR, "categories.json");
const POSTS_PATH = path.join(DATA_DIR, "posts.json");
const PAGES_PATH = path.join(DATA_DIR, "pages.json");

/**
 * Helper to log path issues for debugging on shared hosting
 */
async function logPathDiscovery(filePath: string, context: string) {
  try {
    const stats = await fs.stat(filePath);
    console.log(
      `[Data Discovery] Found ${context} at: ${filePath} (${stats.size} bytes)`,
    );
    return true;
  } catch (error) {
    console.error(
      `[Data Error] Missing ${context} at expected path: ${filePath}`,
    );
    console.error(`[Data Debug] Current working directory: ${process.cwd()}`);
    console.error(`[Data Debug] DATA_ROOT used: ${DATA_ROOT}`);
    return false;
  }
}

// In-memory cache for local JSON files (Singleton pattern)
let productsCache: Product[] | null = null;
let categoriesCache: Category[] | null = null;
let postsCache: BlogPost[] | null = null;
let pagesCache: Page[] | null = null;

let productsLoading: Promise<Product[]> | null = null;
let categoriesLoading: Promise<Category[]> | null = null;
let postsLoading: Promise<BlogPost[]> | null = null;
let pagesLoading: Promise<Page[]> | null = null;

export async function getAllProducts(): Promise<Product[]> {
  if (productsCache) return productsCache;
  if (productsLoading) return productsLoading;

  productsLoading = (async () => {
    try {
      const fileContent = await fs.readFile(PRODUCTS_PATH, "utf8");
      productsCache = JSON.parse(fileContent);
      return productsCache!;
    } catch (err) {
      await logPathDiscovery(PRODUCTS_PATH, "products.json");
      return [];
    }
  })();

  return productsLoading;
}

export async function getPaginatedProducts(
  page: number,
  limit: number,
  categorySlug?: string,
  sort: "featured" | "name-asc" | "name-desc" | "newest" = "featured",
): Promise<{ products: Product[]; total: number; totalPages: number }> {
  "use cache";
  let allProducts = (await getAllProducts()).filter(hasRealImage);

  if (categorySlug) {
    allProducts = allProducts.filter((p) =>
      p.categories.some((c) => c.slug === categorySlug),
    );
  }

  switch (sort) {
    case "name-asc":
      allProducts = [...allProducts].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      break;
    case "name-desc":
      allProducts = [...allProducts].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
      break;
    case "newest":
      allProducts = [...allProducts].sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime(),
      );
      break;
    case "featured":
    default:
      break;
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    products: allProducts.slice(start, end),
    total: allProducts.length,
    totalPages: Math.ceil(allProducts.length / limit),
  };
}

export async function getAllCategories(): Promise<Category[]> {
  if (categoriesCache) return categoriesCache;
  if (categoriesLoading) return categoriesLoading;

  categoriesLoading = (async () => {
    try {
      const fileContent = await fs.readFile(CATEGORIES_PATH, "utf8");
      categoriesCache = JSON.parse(fileContent);
      return categoriesCache!;
    } catch (err) {
      await logPathDiscovery(CATEGORIES_PATH, "categories.json");
      return [];
    }
  })();

  return categoriesLoading;
}

export async function getProductById(
  slug: string,
): Promise<Product | undefined> {
  "use cache";
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

const PLACEHOLDER_IMAGE =
  "https://demo.madrasthemes.com/demo-2/wp-content/uploads/sites/50/2018/10/electro-placeholder.png";

function hasRealImage(p: Product): boolean {
  return p.images.length > 0 && p.images[0] !== PLACEHOLDER_IMAGE;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  "use cache";
  return (await getAllProducts())
    .filter(
      (p) => (p.meta.featured || p.status === "publish") && hasRealImage(p),
    )
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const categoryIds = product.categories.map((c) => c.id);
  const all = await getAllProducts();
  return all
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => categoryIds.includes(c.id)),
    )
    .slice(0, limit);
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  return (await getAllProducts()).filter((p) =>
    p.categories.some((c) => c.slug === categorySlug),
  );
}

export async function getRootCategories(): Promise<Category[]> {
  return (await getAllCategories()).filter((c) => c.parent === 0);
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function getAccessoriesProducts(): Promise<Product[]> {
  const all = await getAllProducts();

  const mobile = shuffle(
    all.filter((p) =>
      p.categories.some((c) => c.slug === "mobile-accessories"),
    ),
  ).slice(0, 4);

  const computer = shuffle(
    all.filter((p) =>
      p.categories.some((c) => c.slug === "computer-accessories"),
    ),
  ).slice(0, 4);

  return shuffle([...mobile, ...computer]);
}

// ---- Blog Posts ----

export async function getAllPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;
  if (postsLoading) return postsLoading;

  postsLoading = (async () => {
    try {
      const fileContent = await fs.readFile(POSTS_PATH, "utf8");
      postsCache = JSON.parse(fileContent);
      return postsCache!;
    } catch (err) {
      await logPathDiscovery(POSTS_PATH, "posts.json");
      return [];
    }
  })();

  return postsLoading;
}

export async function getPaginatedPosts(
  page: number,
  limit: number,
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const allPosts = await getAllPosts();
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    posts: allPosts.slice(start, end),
    total: allPosts.length,
    totalPages: Math.ceil(allPosts.length / limit),
  };
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  "use cache";
  return (await getAllPosts()).find((p) => p.slug === slug);
}

export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
  "use cache";
  return (await getAllPosts())
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

// ---- Pages ----

export async function getAllPages(): Promise<Page[]> {
  if (pagesCache) return pagesCache;
  if (pagesLoading) return pagesLoading;

  pagesLoading = (async () => {
    try {
      const fileContent = await fs.readFile(PAGES_PATH, "utf8");
      pagesCache = JSON.parse(fileContent);
      return pagesCache!;
    } catch (err) {
      await logPathDiscovery(PAGES_PATH, "pages.json");
      return [];
    }
  })();

  return pagesLoading;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  "use cache";
  return (await getAllPages()).find((p) => p.slug === slug);
}
