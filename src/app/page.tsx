import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import HomeContent, { page as staticPage } from "@/content/pages/home";
import { getCmsPage } from "@/cms/client";
import { CmsPageContent } from "@/cms/components/CmsRenderer";
import { cmsPageDefinition, cmsPlugins } from "@/cms/page";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("");
  const title = cms?.page_title || cms?.title || staticPage.title;
  const description = cms?.meta_description || staticPage.description;
  return { title: { absolute: title }, description, alternates: { canonical: "/" }, openGraph: { title, description, url: "/" } };
}

export default async function HomePage() {
  const cms = await getCmsPage("");
  if (cms) return <PageShell page={cmsPageDefinition(cms)}><CmsPageContent plugins={cmsPlugins(cms)} /></PageShell>;
  return <PageShell page={staticPage}><HomeContent /></PageShell>;
}
