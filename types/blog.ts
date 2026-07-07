export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  featuredImage: string;
  altText: string;
  categoryId: string;
  categorySlug: string;
  publishedDate: string;
  featured: boolean;
}
