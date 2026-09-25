import type { ReactNode } from "react";
import type { PageDefinition } from "@/content/types";
import { AiAssistant } from "@/features/assistant/AiAssistant";
import { LegacyScripts } from "@/infrastructure/legacy/LegacyScripts";
import { MobileBottom } from "@/components/layout/MobileBottom";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getCmsMenu, getCmsSiteSettings } from "@/cms/client";

export async function PageShell({ page, children }: { page: PageDefinition; children: ReactNode }) {
  const [menu, settings] = await Promise.all([getCmsMenu(), getCmsSiteSettings()]);
  const dataAttributes = Object.fromEntries(Object.entries(page.data).map(([key, value]) => [key, String(value)]));
  return <div id="beautypay-page" className={page.bodyClasses.join(" ")} data-header={page.header} data-page={page.pageKey} {...dataAttributes}>
    <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
    <SiteHeader variant={page.header} menu={menu || undefined} settings={settings || undefined} />
    {settings?.default_announcement && <div className="cms-global-announcement" role="status">{settings.default_announcement}</div>}
    {children}
    <SiteFooter menu={menu || undefined} settings={settings || undefined} />
    <MobileBottom pageKey={page.pageKey} header={page.header} settings={settings || undefined} />
    <AiAssistant settings={settings || undefined} />
    <LegacyScripts scripts={page.scripts} />
  </div>;
}
