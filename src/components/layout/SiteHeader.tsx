import type { HeaderVariant } from "@/content/types";
import type { CmsMenuItem, CmsSiteSettings } from "@/cms/types";
import { Icon } from "@/components/ui/Icon";

const fallbackBusinessLinks = [["پرداخت اعتباری BNPL", "/payments"],["کارتخوان", "/pos"],["کمپین رشد", "/accelerate"],["دایرکت هوشمند · Connect", "/connect"],["رویدادها", "/events"],["کارمزد", "/commission"],["تأمین‌کنندگان", "/suppliers"]] as const;

function href(item: CmsMenuItem) { return String(item.url || item.absolute_url || (item.path ? `/${item.path}` : "/")); }
function label(item: CmsMenuItem) { return String(item.menu_title || item.title || item.path || "صفحه"); }
function flattenMenu(items: CmsMenuItem[] = []): CmsMenuItem[] { return items.flatMap((item) => [item, ...flattenMenu(item.children || [])]); }

export function SiteHeader({ variant, menu, settings }: { variant: HeaderVariant; menu?: CmsMenuItem[]; settings?: CmsSiteSettings }) {
  const business = variant === "business";
  const cmsLinks = flattenMenu(menu).filter((item) => href(item) !== "/").slice(0, 9);
  const logo = settings?.logo || `/assets/images/${business ? "beautypay-white.svg" : "beautypay-color.svg"}`;
  const mobileLogo = settings?.logo || "/assets/images/beautypay-color.svg";
  return <>
    <header className={`site-header ${business ? "business-header" : ""}`}><div className="container-xl px-3"><div className="inner">
      <a className="brand" href="/" aria-label={settings?.site_name || "بیوتی پی"}><img className="brand-logo" src={logo} alt={settings?.logo_alt || "بیوتی پی"} width="523" height="159" /></a>
      <nav className="desktop-nav d-flex align-items-center gap-1" aria-label="ناوبری اصلی">
        {cmsLinks.length ? cmsLinks.map((item) => <a key={href(item)} className="nav-linkish" href={href(item)}>{label(item)}</a>) : business ? <><a className="nav-linkish" href="/features">امکانات</a>{fallbackBusinessLinks.map(([text, url]) => <a key={url} className="nav-linkish" href={url}>{text}</a>)}</> : <><a className="nav-linkish" href="/shop">فروشگاه</a><a className="nav-linkish" href="/app">اپلیکیشن</a></>}
      </nav>
      <div className="nav-actions"><a className="nav-linkish mobile-context-switch" href={business ? "/" : "/business"}>{business ? (settings?.header_consumer_label || "برای مشتریان") : (settings?.header_business_label || "برای کسب‌وکارها")}</a><button className="btn-f btn-f-light hide-tablet" type="button" data-login>{settings?.login_label || "ورود"}</button>{business && <a className="btn-f btn-f-light nav-primary-cta" href={settings?.primary_cta_url || "/commission"}>{settings?.primary_cta_label || "شروع کنید"}</a>}<button className="icon-btn hamburger" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="منو"><Icon name="menu" /></button></div>
    </div></div></header>
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="mobileMenu" dir="rtl" aria-labelledby="mobileMenuLabel"><div className="offcanvas-header"><a className="brand" href="/" id="mobileMenuLabel"><img className="brand-logo" src={mobileLogo} alt={settings?.logo_alt || "بیوتی پی"} width="523" height="159" /></a><button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="بستن" /></div><div className="offcanvas-body"><div className="d-grid gap-2">{cmsLinks.length ? cmsLinks.map((item) => <a key={href(item)} className="nav-linkish" href={href(item)}>{label(item)}</a>) : fallbackBusinessLinks.map(([text, url]) => <a key={url} className="nav-linkish" href={url}>{text}</a>)}</div></div></div>
  </>;
}
