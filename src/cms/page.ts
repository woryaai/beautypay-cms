import type { PageDefinition } from "@/content/types";
import type { CmsPage } from "./types";

export function cmsPageDefinition(page: CmsPage): PageDefinition {
  const header = page.template === "business" ? "business" : "consumer";
  return {
    route: page.is_home ? "" : page.path,
    title: page.page_title || page.title,
    description: page.meta_description || "",
    header,
    pageKey: page.path || "home",
    bodyClasses: ["cms-managed-page"],
    data: { cms: "true", language: page.language },
    scripts: [],
    redirectTo: page.redirect || null,
  };
}

export function cmsPlugins(page: CmsPage) {
  return page.placeholders.find((placeholder) => placeholder.slot === "content")?.content || [];
}
