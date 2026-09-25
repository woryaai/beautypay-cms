import Script from "next/script";
export function LegacyScripts({ scripts }: { scripts: readonly string[] }) {
  return <><Script src="/legacy/bootstrap.bundle.min.js" strategy="afterInteractive" /><Script src="/legacy/app.js" strategy="afterInteractive" />{scripts.map((src) => <Script key={src} src={src} strategy="afterInteractive" />)}</>;
}
