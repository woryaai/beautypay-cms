import type { MetadataRoute } from "next";
import { pageIndex } from "@/content/page-index";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pageIndex.filter((page) => !page.redirectTo).map(({ route }) => ({ url: `${siteConfig.url}${route ? `/${route}` : ""}`, lastModified: now, changeFrequency: "weekly" as const, priority: route ? 0.7 : 1 }));
}
