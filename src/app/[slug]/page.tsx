import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { loadPage, pageRoutes } from "@/content/page-loaders";
import { getCmsPage } from "@/cms/client";
import { CmsPageContent } from "@/cms/components/CmsRenderer";
import { cmsPageDefinition, cmsPlugins } from "@/cms/page";

type Props = { params: Promise<{ slug: string }>; searchParams?: Promise<Record<string, string | string[] | undefined>> };

export const dynamicParams = true;
export const revalidate = 60;
export function generateStaticParams() { return pageRoutes.filter(Boolean).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getCmsPage(slug);
  if (cms) return { title: { absolute: cms.page_title || cms.title }, description: cms.meta_description, alternates: { canonical: `/${cms.path || slug}` }, openGraph: { title: cms.page_title || cms.title, description: cms.meta_description, url: `/${cms.path || slug}` } };
  const module = await loadPage(slug); if (!module) return {}; const { page } = module;
  return { title: { absolute: page.title }, description: page.description, alternates: { canonical: `/${slug}` }, openGraph: { title: page.title, description: page.description, url: `/${slug}` } };
}

export default async function ContentPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const preview = query?.preview === "1" || query?.preview === "true";
  const cms = await getCmsPage(slug, preview);
  if (cms) {
    const page = cmsPageDefinition(cms);
    if (page.redirectTo) redirect(page.redirectTo);
    return <PageShell page={page}><CmsPageContent plugins={cmsPlugins(cms)} /></PageShell>;
  }
  const module = await loadPage(slug);
  if (!module) notFound();
  if (module.page.redirectTo) redirect(module.page.redirectTo);
  const Content = module.default;
  return <PageShell page={module.page}><Content /></PageShell>;
}
