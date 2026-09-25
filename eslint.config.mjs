import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Generated migration pages intentionally preserve the source DOM and full-page
    // navigation while the isolated legacy behavior layer is being retired.
    files: ["src/content/pages/**/*.{ts,tsx}", "src/components/layout/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off"
    }
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/legacy/**"])
]);
