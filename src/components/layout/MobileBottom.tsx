import { Icon, type IconName } from "@/components/ui/Icon";
import type { HeaderVariant } from "@/content/types";
import type { CmsSiteSettings } from "@/cms/types";

const fallback = [
  { label: "خانه", url: "/", icon: "home", page_key: "home" },
  { label: "جستجو", url: "/search", icon: "search", page_key: "search" },
  { label: "کسب و کار", url: "/business", icon: "briefcase", page_key: "business" },
  { label: "پشتیبانی", url: "/help", icon: "message", page_key: "help" },
];
export function MobileBottom({ pageKey, header, settings }: { pageKey: string; header: HeaderVariant; settings?: CmsSiteSettings }) {
  const business = header === "business";
  const items = settings?.mobile_nav?.length ? settings.mobile_nav : fallback;
  return <nav className="mobile-bottom" aria-label="منوی اصلی موبایل">{items.map((item, i) => {
    const active = item.page_key === pageKey || (item.page_key === "business" && business);
    return <a key={`${item.url}-${i}`} className={active ? "active" : ""} href={item.url || "#"}><Icon name={(item.icon || "home") as IconName} size={19} /><span>{item.label}</span></a>;
  })}</nav>;
}
