import type { CmsMenuItem, CmsSiteSettings } from "@/cms/types";

function href(item: CmsMenuItem) { return String(item.url || item.absolute_url || (item.path ? `/${item.path}` : "/")); }
function label(item: CmsMenuItem) { return String(item.menu_title || item.title || item.path || "صفحه"); }
function flatten(items: CmsMenuItem[] = []): CmsMenuItem[] { return items.flatMap((item) => [item, ...flatten(item.children || [])]); }

export function SiteFooter({ menu, settings }: { menu?: CmsMenuItem[]; settings?: CmsSiteSettings }) {
  const links = flatten(menu).filter((item) => href(item) !== "/").slice(0, 16);
  return <footer className="footer"><div className="container-xl px-3">
    <div className="footer-grid">
      <div><a className="brand mb-3 footer-brand" href="/" aria-label={settings?.site_name || "بیوتی پی"}><img className="brand-logo" src={settings?.logo || "/assets/images/beautypay-white.svg"} alt={settings?.logo_alt || "بیوتی پی"} width="523" height="159" loading="lazy" /></a><div className="footer-about-copy text-white-50"><p>{settings?.footer_text || "پلتفرم یکپارچه کشف، مقایسه، رزرو، پرداخت اعتباری و مدیریت خدمات سلامت، زیبایی، تندرستی و دندانپزشکی."}</p></div><div className="footer-store-download"><div className="footer-app-label">{settings?.footer_app_title || "دانلود اپلیکیشن"}</div><div className="footer-store-badges">{settings?.app_store_url && <a className="footer-store-badge" href={settings.app_store_url}><img src="/assets/images/stores/app-store.svg" alt="App Store" width="130" height="40" /></a>}{settings?.google_play_url && <a className="footer-store-badge" href={settings.google_play_url}><img src="/assets/images/stores/google-play.svg" alt="Google Play" width="130" height="40" /></a>}</div></div></div>
      <div className="footer-cms-links"><h6>{settings?.footer_pages_title || "صفحات"}</h6>{links.length ? links.map((item) => <a key={href(item)} href={href(item)}>{label(item)}</a>) : <><a href="/about">درباره ما</a><a href="/help">راهنما</a><a href="/terms">قوانین</a></>}</div>
      <div><h6>{settings?.footer_contact_title || "ارتباط"}</h6>{settings?.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}{settings?.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}{settings?.address && <p className="text-white-50">{settings.address}</p>}</div>
      <div><h6>{settings?.footer_social_title || "شبکه‌های اجتماعی"}</h6>{settings?.instagram_url && <a href={settings.instagram_url} rel="noreferrer">Instagram</a>}{settings?.linkedin_url && <a href={settings.linkedin_url} rel="noreferrer">LinkedIn</a>}</div>
    </div>
    <div className="footer-bottom"><span>{settings?.footer_copyright || `© ۲۰۲۶ ${settings?.site_name || "بیوتی پی"}`}</span><nav className="footer-legal-links" aria-label="قوانین">{(settings?.footer_legal_links?.length ? settings.footer_legal_links : [{label:"قوانین استفاده",url:"/terms"},{label:"قوانین پرداخت",url:"/financial-terms"},{label:"سلب مسئولیت",url:"/disclaimer"}]).map((item, index) => <a key={`${item.url}-${index}`} href={item.url || "#"}>{item.label}</a>)}</nav></div>
  </div></footer>;
}
