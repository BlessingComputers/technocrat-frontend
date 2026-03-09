import type { MetadataRoute } from "next";
import { getAllProducts, getAllPosts, getAllPages } from "@/lib/data";

const BASE_URL = "https://technocratng.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const posts = getAllPosts();
  const pages = getAllPages();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/product`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: new Date(product.date_created),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(page.modifiedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes, ...pageRoutes];
}
