# BeautyPay Next.js architecture

## Layers

- `src/app` — Next.js App Router composition, metadata, canonical URLs, sitemap and robots.
- `src/components/layout` — reusable application shell only: header, footer, mobile navigation and page shell.
- `src/components/ui` — reusable presentational primitives.
- `src/features` — feature-owned interactive React code. The AI assistant lives here.
- `src/content` — route metadata and the 42 migrated React page modules.
- `src/infrastructure/legacy` — the single compatibility adapter that loads behavior retained from the static source.
- `src/lib` — framework-independent site configuration.
- `src/styles` — global RTL Bootstrap foundation, BeautyPay design system, and migration bridge.
- `public/assets` — static media.
- `public/legacy` — isolated DOM behavior that is still required for exact behavioral parity.

## Dependency direction

`app -> layout/features/content -> ui/lib`

The compatibility layer is infrastructure-only. New product behavior must be implemented under `src/features`, not added to `public/legacy`.

## Rendering model

All route/page content is rendered as React Server Components by default. Only interactive components that own React state use `use client`. Page modules are dynamically imported by route, so one route does not eagerly import the markup of all other pages.

## Routing

Original `index.html`, `/pages/*.html`, and root `*.html` URLs are redirected to canonical clean routes. Known content routes are statically generated and unknown slugs are rejected with `dynamicParams = false`.

## Migration boundary

The HTML bodies themselves are no longer injected with `dangerouslySetInnerHTML`; every page is real TSX. A compatibility JavaScript layer remains only for complex DOM interactions inherited from the original site (shop, suppliers, feature controls, and generic UI effects). Full-page internal anchors are intentional while that compatibility layer exists, because they guarantee a fresh behavior initialization on route changes.

Recommended final React-only migration order:
1. Shop/cart.
2. Suppliers/product calculator.
3. Search pickers and result filters.
4. Features/payment interactive controls.
5. Generic spotlight/carousel/login/toast behavior.
6. Replace full-page anchors with `next/link` once no legacy behavior depends on reload initialization.
