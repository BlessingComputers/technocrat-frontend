export interface Category {
  id: number;
  term_id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
}

/**
 * Category shape actually returned by the live backend's
 * GET /v1/products/categories (see docs/koyeb-shared-backend.md) — already a
 * full tree (each node's `children` is populated), unlike the flat
 * WordPress-sourced `Category` above.
 */
export interface CatalogCategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  isActive: boolean;
  parentId: string | null;
  productCount: number;
  children: CatalogCategory[];
}

export interface ProductMeta {
  total_sales: string;
  average_rating: string;
  rating_count?: string;
  featured: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  date_created: string;
  status: string;
  price: string;
  regular_price: string;
  sale_price: string;
  sku: string;
  stock_status: string;
  stock_quantity: number | null;
  images: string[];
  categories: ProductCategory[];
  tags: ProductCategory[];
  attributes: any[];
  meta: ProductMeta;
}
