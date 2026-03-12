import fs from "fs/promises";
import path from "path";
import { Product, Category } from "@/features/catalog/types/catalog";
import type { BlogPost, Page } from "@/features/catalog/types/content";

const PRODUCTS_PATH = path.join(
  process.cwd(),
  "src/data/content/products.json",
);
const CATEGORIES_PATH = path.join(
  process.cwd(),
  "src/data/content/categories.json",
);
const POSTS_PATH = path.join(process.cwd(), "src/data/content/posts.json");
const PAGES_PATH = path.join(process.cwd(), "src/data/content/pages.json");

// Cache data in memory (since these are static JSON files)
let productsCache: Product[] | null = null;
let categoriesCache: Category[] | null = null;
let postsCache: BlogPost[] | null = null;
let pagesCache: Page[] | null = null;

// In-flight promises to prevent duplicate reads
let productsLoading: Promise<Product[]> | null = null;
let categoriesLoading: Promise<Category[]> | null = null;
let postsLoading: Promise<BlogPost[]> | null = null;
let pagesLoading: Promise<Page[]> | null = null;

export async function getAllProducts(): Promise<Product[]> {
  if (productsCache) return productsCache;
  if (productsLoading) return productsLoading;

  productsLoading = fs
    .readFile(PRODUCTS_PATH, "utf8")
    .then((fileContent) => {
      productsCache = JSON.parse(fileContent);
      return productsCache!;
    })
    .catch(() => {
      return [];
    })
    .finally(() => {
      productsLoading = null;
    });

  return productsLoading;
}

export async function getPaginatedProducts(
  page: number,
  limit: number,
  categorySlug?: string,
  sort: "featured" | "name-asc" | "name-desc" | "newest" = "featured",
): Promise<{ products: Product[]; total: number; totalPages: number }> {
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

  categoriesLoading = fs
    .readFile(CATEGORIES_PATH, "utf8")
    .then((fileContent) => {
      categoriesCache = JSON.parse(fileContent);
      return categoriesCache!;
    })
    .catch(() => {
      return [];
    })
    .finally(() => {
      categoriesLoading = null;
    });

  return categoriesLoading;
}

export async function getProductById(
  slug: string,
): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

const PLACEHOLDER_IMAGE =
  "https://demo.madrasthemes.com/demo-2/wp-content/uploads/sites/50/2018/10/electro-placeholder.png";

function hasRealImage(p: Product): boolean {
  return p.images.length > 0 && p.images[0] !== PLACEHOLDER_IMAGE;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
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
  return (await getAllProducts())
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

  postsLoading = fs
    .readFile(POSTS_PATH, "utf8")
    .then((fileContent) => {
      postsCache = JSON.parse(fileContent);
      return postsCache!;
    })
    .catch(() => {
      return [];
    })
    .finally(() => {
      postsLoading = null;
    });

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
  return (await getAllPosts()).find((p) => p.slug === slug);
}

export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
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

  pagesLoading = fs
    .readFile(PAGES_PATH, "utf8")
    .then((fileContent) => {
      pagesCache = JSON.parse(fileContent);
      return pagesCache!;
    })
    .catch(() => {
      return [];
    })
    .finally(() => {
      pagesLoading = null;
    });

  return pagesLoading;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  return (await getAllPages()).find((p) => p.slug === slug);
}
