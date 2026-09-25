# BeautyPay django CMS backend

This directory is a headless django CMS 5.1 backend for the Next.js frontend.

## Local setup

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_beautypay --user YOUR_ADMIN_USERNAME
python manage.py runserver 0.0.0.0:8000
```

Open `http://localhost:8000/admin/` and create pages. Choose `consumer`, `business`, or `plain` as the page placeholder configuration. Add content in the `content` placeholder with the BeautyPay plugins.

The frontend reads:

- `GET /api/cms/fa/pages/` — home
- `GET /api/cms/fa/pages/<path>/` — page by path
- `GET /api/cms/fa/menu/` — navigation
- `GET /api/cms/site-settings/` — global logo/contact/footer/app settings
- `GET /api/cms/plugins/` — plugin schema catalogue

Published CMS content has priority. If a route does not exist in CMS yet, Next.js keeps using the migrated static page as a safe fallback.
