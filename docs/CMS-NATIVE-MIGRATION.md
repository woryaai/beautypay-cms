# BeautyPay Native django CMS migration

## What changed

The CMS integration now has two editing layers:

1. **Structured native blocks** for new content: Section, Hero, RichText, Image, Button, Card, Grid, Stat, Accordion/FAQ, DataTable, LogoCloud, Tabs and Form.
2. **Managed Fragment** for the approved legacy design. It preserves the exact DOM/classes while moving every visible text node, image, link and common editable attribute into its own child CMS plugin.

This removes the need to edit legacy HTML for normal content changes while preserving visual fidelity.

## Fresh installation

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_beautypay --user <admin-username>
python manage.py runserver
```

The importer creates all 42 pages and converts 166 legacy sections into managed fragments. On the current approved source this yields 4,879 individually editable CMS fields.

## Upgrade an existing CMS database

If the previous integration was already seeded with `HtmlBlockPlugin`:

```bash
cd backend
python manage.py migrate
python manage.py upgrade_legacy_blocks --dry-run
python manage.py upgrade_legacy_blocks
```

The command inserts a Managed Fragment in the original block position, creates editable child records, then removes the old HtmlBlock.

## Editing model

- Change page title, slug, SEO description and navigation in django CMS Page settings.
- Use the Structure board to reorder page blocks.
- Expand a Managed Fragment to edit its Text, Image, Link and Attribute children.
- New sections should use structured native blocks rather than Managed Fragment.
- Global header/footer/mobile-nav/assistant content is in **BeautyPay CMS > Site Settings**.

## Frontend rendering

Next.js renders the JSON from `djangocms-rest`. Managed Fragment templates are hydrated server-side by the React renderer using escaped CMS values. CMS child plugins themselves never render twice.

## Safety / compatibility

The original Next.js static page modules remain as a fallback when the CMS is unavailable or a route has not yet been published. This makes migration reversible and avoids downtime.
