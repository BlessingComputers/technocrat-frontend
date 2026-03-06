import { baseApi } from "@/store/base-api";

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
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  meta: {
    total_sales: string;
    average_rating: string;
    featured: boolean;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
}

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<Product[], void>({
      query: () => "/products/featured",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetFeaturedProductsQuery, useGetCategoriesQuery } =
  catalogApi;
