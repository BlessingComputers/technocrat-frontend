export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  author: { id: number; name: string } | null;
  createdAt: string;
  modifiedAt: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  featuredImage: string | null;
  author: { id: number; name: string } | null;
  createdAt: string;
  modifiedAt: string;
  parent: number;
  menuOrder: number;
}
