# BeautyPay × django CMS architecture

## Architecture

`Browser -> Next.js 16 -> django CMS REST -> PostgreSQL/media`

Next.js owns rendering, performance, CSS, responsive behavior and React components. django CMS owns pages, paths, SEO fields, navigation and editable content blocks.

## Editable content

| Content | CMS location |
|---|---|
| Page title, menu title, slug/path | django CMS Page |
| SEO title/description | django CMS Page content |
| Page order / navigation | django CMS page tree |
| Header type | Page placeholder configuration: `consumer` / `business` / `plain` |
| Sections | `SectionPlugin` |
| Hero titles, descriptions, images and CTAs | `HeroPlugin` |
| Paragraphs / formatted copy | `RichTextPlugin` |
| Images / alt / captions / links | `ImageBlockPlugin` |
| Buttons / links / target | `ButtonPlugin` |
| Cards | `CardPlugin` |
| Alerts / campaign messages | `MessagePlugin` |
| Vertical spacing | `SpacerPlugin` |
| Existing special HTML | `HtmlBlockPlugin` |
| Logo, announcement, support, socials, app links, footer copy | `SiteSettings` |

## Migration strategy

The integration is intentionally zero-downtime. Existing 42 Next.js routes remain as fallback content. Creating and publishing the same path in django CMS immediately promotes that path to CMS-managed rendering. This lets the content team migrate page-by-page instead of performing an all-or-nothing cutover.

For every migrated page, prefer structured BeautyPay plugins. `HtmlBlockPlugin` is included only as an escape hatch for highly custom legacy sections.

## Preview

The frontend accepts `?preview=1` and forwards preview mode to djangocms-rest. In production, protect preview URLs and enable the desired django CMS editorial/versioning workflow before exposing draft previews publicly.

## Cache / performance

Next fetches CMS content server-side and uses ISR via `CMS_REVALIDATE_SECONDS`. The CMS REST package can additionally use Django cache/Redis. Media is served by Django in development; production should move media to object storage/CDN.

## Environment

Frontend:

```env
CMS_ENABLED=1
CMS_API_URL=https://cms.example.com/api/cms
CMS_LANGUAGE=fa
CMS_REVALIDATE_SECONDS=60
```

Backend: see `backend/.env.example`.

## Import the existing 42 pages

After migrations and superuser creation run:

```bash
cd backend
python manage.py seed_beautypay --user <admin-username>
```

The seed contains 42 pages split into 166 editable legacy sections. The command is idempotent and skips routes already present in CMS.
