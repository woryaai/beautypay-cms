import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/bootstrap.rtl.min.css";
import "@/styles/main.css";
import "@/styles/migration.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: { icon: "/assets/icons/favicon.svg" },
  openGraph: { type: "website", locale: "fa_IR", siteName: siteConfig.name },
  twitter: { card: "summary" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="fa" dir="rtl"><head><link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" /><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AmirAbbasVafaee/persian-fonts-cdn@main/css/kalameh.css" /></head><body>{children}</body></html>;
}
