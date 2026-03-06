export interface Category {
  id: number;
  term_id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
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
