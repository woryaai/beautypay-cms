import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const pageDir = join(projectRoot, "src", "content", "pages");
const publicDir = join(projectRoot, "public");
const pageFiles = readdirSync(pageDir).filter((name) => name.endsWith(".tsx"));
const routes = new Set([""]);
const routePattern = /"route":"([^"]*)"/;

for (const file of pageFiles) {
  const source = readFileSync(join(pageDir, file), "utf8");
  const match = source.match(routePattern);
  if (!match) throw new Error(`Missing route metadata in ${file}`);
  routes.add(match[1]);
}

const missingAssets = [];
const unknownRoutes = [];
const legacyInternalLinks = [];
let assetCount = 0;
let internalLinkCount = 0;

for (const file of pageFiles) {
  const source = readFileSync(join(pageDir, file), "utf8");
  for (const match of source.matchAll(/(?:src|srcSet|poster)=\{"(\/assets\/[^"} ,]+)/g)) {
    assetCount += 1;
    if (!existsSync(join(publicDir, match[1].slice(1)))) missingAssets.push(`${file}: ${match[1]}`);
  }
  for (const match of source.matchAll(/href=\{"(\/[^"}#?]*)/g)) {
    internalLinkCount += 1;
    const slug = match[1].replace(/^\/+|\/+$/g, "");
    if (slug && !routes.has(slug)) unknownRoutes.push(`${file}: ${match[1]}`);
  }
  for (const match of source.matchAll(/href=\{"([^"}]*)\.html(?:[?#][^"}]*)?"/g)) {
    if (!/^https?:\/\//.test(match[1])) legacyInternalLinks.push(`${file}: ${match[0]}`);
  }
}

const failures = [
  ["Missing assets", missingAssets],
  ["Unknown internal routes", unknownRoutes],
  ["Legacy internal .html links", legacyInternalLinks],
].filter(([, items]) => items.length > 0);

console.log(`Pages: ${pageFiles.length}`);
console.log(`Asset references: ${assetCount}`);
console.log(`Internal route references: ${internalLinkCount}`);

if (failures.length) {
  for (const [label, items] of failures) {
    console.error(`\n${label}:`);
    for (const item of items) console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log("Static integrity: OK");
