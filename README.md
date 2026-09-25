# BeautyPay CMS

**BeautyPay CMS** یک وب‌سایت فارسی/RTL بر پایه **Next.js 16 + React 19 + TypeScript** با backend مستقل **django CMS 5.1 Headless + PostgreSQL** است.

محتوای صفحات، تصاویر، دکمه‌ها، SEO، Navigation، Header/Footer، پیام‌ها، Mobile Navigation و محتوای دستیار از django CMS قابل مدیریت است؛ Next.js لایه UI، rendering و performance را برعهده دارد.

## Stack

- Next.js 16.3.6
- React 19.3
- TypeScript
- django CMS 5.1.3
- Django 5.2
- djangocms-rest 1.2.0
- PostgreSQL 17
- Docker Compose

## Quick Start with Docker

```bash
cp .env.example .env
docker compose up --build -d
docker compose exec cms python manage.py createsuperuser
docker compose exec cms python manage.py seed_beautypay --user admin
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
docker compose up --build -d
docker compose exec cms python manage.py createsuperuser
docker compose exec cms python manage.py seed_beautypay --user admin
```

Open:

- Frontend: http://localhost:3000
- CMS Admin: http://localhost:8000/admin/
- CMS API: http://localhost:8000/api/cms/
- Health: http://localhost:8000/api/cms/healthcheck/

## Full Installation Guide

راهنمای کامل فارسی شامل Docker، نصب دستی، PostgreSQL، Environment variables، production deployment، backup و troubleshooting:

**[docs/INSTALLATION-FA.md](docs/INSTALLATION-FA.md)**

## Architecture

```text
Browser
   ↓
Next.js 16
   ↓
djangocms-rest
   ↓
django CMS 5.1
   ↓
PostgreSQL
```

## CMS content

Native CMS blocks include Hero, Section, Rich Text, Image, Button, Card, Grid, Stat, FAQ, Table, Logo Cloud, Tabs, Form, Message and Spacer.

Legacy approved BeautyPay sections are imported as **Managed Fragments**, preserving their existing DOM/CSS while exposing visible text, images, links and common content attributes as editable CMS child plugins.

## Frontend commands

```bash
npm install
npm run dev
npm run validate:static
npm run typecheck
npm run lint
npm run build
npm run check
npm run cms:smoke
```

## Backend commands

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_beautypay --user admin
python manage.py check
python manage.py cms check
python manage.py runserver
```

## Important CMS endpoints

```text
/api/cms/healthcheck/
/api/cms/fa/pages/
/api/cms/fa/pages/<path>/
/api/cms/fa/pages-tree/
/api/cms/fa/menu/
/api/cms/fa/breadcrumbs/
/api/cms/plugins/
/api/cms/site-settings/
```

## Repository structure

```text
src/                       Next.js frontend
src/cms/                   CMS client, types and renderers
backend/                   django CMS backend
backend/beautypay_cms/     BeautyPay CMS plugins/models/commands
public/                    Assets and legacy compatibility files
docs/                      Architecture and installation docs
.github/workflows/         CI
Dockerfile                 Next.js production image
backend/Dockerfile         django CMS production image
docker-compose.yml         Local full-stack environment
```

## Fallback behavior

If CMS is disabled/unavailable or a route is not yet managed by CMS, the frontend can fall back to the migrated static Next.js content.

```env
CMS_ENABLED=0
```

turns CMS consumption off entirely.

## License / ownership

Business project for BeautyPay / Finow. No open-source license is granted unless explicitly added by the repository owner.
