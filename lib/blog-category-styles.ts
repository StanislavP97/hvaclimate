export interface BlogCategoryStyle {
  bg: string;
  color: string;
}

const CATEGORY_STYLES: Record<string, BlogCategoryStyle> = {
  articles: { bg: "#eaf1ff", color: "#2563EB" },
  tips: { bg: "#fff1e8", color: "#F97316" },
  resource: { bg: "#eef7f1", color: "#16a34a" },
};

const DEFAULT_CATEGORY_STYLE: BlogCategoryStyle = { bg: "#eef2f7", color: "#0D1B2A" };

export function getBlogCategoryStyle(categorySlug: string): BlogCategoryStyle {
  return CATEGORY_STYLES[categorySlug] ?? DEFAULT_CATEGORY_STYLE;
}
