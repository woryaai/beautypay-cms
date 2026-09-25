# BeautyPay CMS — Installation & Deployment Guide

This repository contains the full BeautyPay frontend and CMS stack:

- **Next.js 16.3.6 + React 19.3 + TypeScript** frontend
- **django CMS 5.1.x** headless content management backend
- **djangocms-rest** JSON API integration
- **PostgreSQL 17** database for Docker/production
- Dockerfiles for frontend and backend
- Docker Compose for local development
- GitHub Actions workflow for publishing container images to GHCR

## Architecture

```text
Browser
  ↓
Next.js
  ↓
django CMS REST API
  ↓
django CMS
  ↓
PostgreSQL
```

The frontend retains a static fallback for CMS pages that are unavailable or not yet migrated.

## 1. Requirements

For Docker installation:

- Docker Desktop / Docker Engine
- Docker Compose v2

For manual installation:

- Node.js 22+
- npm 10+
- Python 3.12 recommended
- PostgreSQL 15+ recommended for production

## 2. Quick start with Docker

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd beautypay-cms
```

Start the stack:

```bash
docker compose up --build -d
```

Services:

- Frontend: http://localhost:3000
- CMS backend: http://localhost:8000
- CMS Admin: http://localhost:8000/admin/
- CMS API: http://localhost:8000/api/cms/

Create a CMS superuser:

```bash
docker compose exec cms python manage.py createsuperuser
```

Import the existing BeautyPay pages/content:

```bash
docker compose exec cms python manage.py seed_beautypay --user YOUR_ADMIN_USERNAME
```

Check the installation:

```bash
docker compose exec cms python manage.py check
docker compose exec cms python manage.py cms check
```

Check the REST API:

```bash
curl http://localhost:8000/api/cms/healthcheck/
curl http://localhost:8000/api/cms/fa/pages/
curl http://localhost:8000/api/cms/fa/menu/
curl http://localhost:8000/api/cms/site-settings/
```

## 3. Docker logs and management

View all logs:

```bash
docker compose logs -f
```

CMS logs only:

```bash
docker compose logs -f cms
```

Frontend logs only:

```bash
docker compose logs -f frontend
```

Stop the stack:

```bash
docker compose down
```

Stop and remove database/media volumes:

```bash
docker compose down -v
```

> `down -v` removes local PostgreSQL and CMS media volumes. Do not use it if you need to preserve local data.

## 4. Manual backend installation

```bash
cd backend
python3.12 -m venv .venv
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

For local SQLite development, DATABASE_URL may be omitted.

Set environment variables.

Linux/macOS:

```bash
export DJANGO_SECRET_KEY='local-development-secret'
export DJANGO_DEBUG='1'
export DJANGO_ALLOWED_HOSTS='localhost,127.0.0.1'
export DJANGO_CORS_ALLOWED_ORIGINS='http://localhost:3000'
export DJANGO_CSRF_TRUSTED_ORIGINS='http://localhost:3000,http://localhost:8000'
```

Windows PowerShell:

```powershell
$env:DJANGO_SECRET_KEY='local-development-secret'
$env:DJANGO_DEBUG='1'
$env:DJANGO_ALLOWED_HOSTS='localhost,127.0.0.1'
$env:DJANGO_CORS_ALLOWED_ORIGINS='http://localhost:3000'
$env:DJANGO_CSRF_TRUSTED_ORIGINS='http://localhost:3000,http://localhost:8000'
```

Run migrations:

```bash
python manage.py migrate
```

Create an administrator:

```bash
python manage.py createsuperuser
```

Import BeautyPay content:

```bash
python manage.py seed_beautypay --user YOUR_ADMIN_USERNAME
```

Run checks:

```bash
python manage.py check
python manage.py cms check
```

Start Django:

```bash
python manage.py runserver 0.0.0.0:8000
```

## 5. PostgreSQL configuration

Example:

```env
DATABASE_URL=postgresql://beautypay:CHANGE_ME@localhost:5432/beautypay
```

Production should use a strong password and a managed/secured PostgreSQL server.

## 6. Frontend installation

From the repository root:

```bash
npm install
```

Create `.env.local`:

```env
CMS_ENABLED=1
CMS_API_URL=http://localhost:8000/api/cms
CMS_LANGUAGE=fa
CMS_REVALIDATE_SECONDS=60
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run development mode:

```bash
npm run dev
```

Quality checks:

```bash
npm run validate:static
npm run typecheck
npm run lint
npm run build
```

Or run all checks:

```bash
npm run check
```

## 7. CMS content import and migration

The project contains a structured CMS importer for the approved BeautyPay pages.

Fresh installation:

```bash
python manage.py seed_beautypay --user YOUR_ADMIN_USERNAME
```

Import only one page:

```bash
python manage.py seed_beautypay --user YOUR_ADMIN_USERNAME --only business
```

If upgrading from the earlier HtmlBlock-based CMS migration:

```bash
python manage.py migrate
python manage.py upgrade_legacy_blocks --dry-run
python manage.py upgrade_legacy_blocks
```

The current CMS layer supports native structured blocks and managed fragments for legacy sections.

## 8. Content editable from django CMS

The CMS manages:

- Pages and page tree
- Slugs and URLs
- Page titles and menu titles
- SEO metadata
- Sections and ordering
- Hero sections
- Rich text
- Images and alt text
- Buttons and links
- Cards and grids
- Stats
- FAQ/Accordion items
- Data tables
- Logo clouds
- Tabs
- Forms and form fields
- Messages and banners
- Header labels and CTAs
- Footer content and legal links
- Mobile navigation
- Global site settings
- AI assistant text and FAQ content

## 9. Main CMS API endpoints

```text
GET /api/cms/healthcheck/
GET /api/cms/fa/pages/
GET /api/cms/fa/pages/<path>/
GET /api/cms/fa/pages-tree/
GET /api/cms/fa/pages-list/
GET /api/cms/fa/menu/
GET /api/cms/fa/breadcrumbs/
GET /api/cms/plugins/
GET /api/cms/site-settings/
```

## 10. Static fallback behavior

If a CMS page is unavailable or does not yet exist, the frontend can render the migrated static Next.js page instead.

To disable CMS temporarily:

```env
CMS_ENABLED=0
```

## 11. Production backend variables

Example:

```env
DJANGO_DEBUG=0
DJANGO_SECRET_KEY=USE_A_LONG_RANDOM_SECRET
DJANGO_ALLOWED_HOSTS=cms.example.com
DJANGO_CORS_ALLOWED_ORIGINS=https://www.example.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://cms.example.com,https://www.example.com
DJANGO_SECURE_COOKIES=1
DATABASE_URL=postgresql://USER:PASSWORD@DBHOST:5432/beautypay
```

Do not commit real `.env` files, credentials, database passwords, tokens, or API keys.

## 12. Production frontend variables

```env
CMS_ENABLED=1
CMS_API_URL=https://cms.example.com/api/cms
CMS_LANGUAGE=fa
CMS_REVALIDATE_SECONDS=60
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

## 13. Media in production

Django should not be responsible for serving uploaded media in production. Use one of:

- Nginx
- Amazon S3
- Cloudflare R2
- MinIO
- another object-storage/CDN service

Make sure media URLs returned by the CMS are publicly reachable by browsers.

## 14. GitHub Container Registry (GHCR)

This repository includes `.github/workflows/docker-publish.yml`.

The workflow builds and publishes:

```text
ghcr.io/woryaai/beautypay-cms-frontend
ghcr.io/woryaai/beautypay-cms-backend
```

Images are built automatically on pushes to `main` and version tags such as `v1.0.0`.

To pull images after the first successful GitHub Actions run:

```bash
docker pull ghcr.io/woryaai/beautypay-cms-frontend:latest
docker pull ghcr.io/woryaai/beautypay-cms-backend:latest
```

A GHCR compose file is included:

```bash
docker compose -f docker-compose.ghcr.yml up -d
```

Before using it, replace `woryaai` in `docker-compose.ghcr.yml` if it has not already been replaced by the repository owner.

For private repositories/packages, authenticate first:

```bash
echo "$GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

The token needs `read:packages` for pulling private images.

## 15. GitHub Actions package permissions

The Docker workflow uses the repository `GITHUB_TOKEN` with:

```yaml
permissions:
  contents: read
  packages: write
```

No extra Docker registry password is needed for publishing to the same GitHub account/org.

If your organization restricts package publishing, enable Actions package write permission in repository/organization settings.

## 16. Production deployment checklist

Backend:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py cms check
python manage.py check --deploy
```

Frontend:

```bash
npm ci
npm run check
```

Verify:

- frontend pages
- CMS admin
- CMS API healthcheck
- Persian RTL UI
- desktop/tablet/mobile layouts
- CMS images and media host
- navigation
- header/footer
- SEO metadata
- redirects
- forms
- AI assistant content

## 17. Backup

Back up both:

- PostgreSQL database
- CMS uploaded media

Example database backup:

```bash
pg_dump -Fc -h DBHOST -U USER beautypay > beautypay.dump
```

Restore:

```bash
pg_restore -h DBHOST -U USER -d beautypay beautypay.dump
```

## 18. Security checklist

Before production:

- `DEBUG=False`
- strong `DJANGO_SECRET_KEY`
- HTTPS enabled
- secure database password
- secure cookies enabled
- correct `ALLOWED_HOSTS`
- minimal CORS origins
- minimal CSRF trusted origins
- real secrets excluded from Git
- least-privilege CMS users
- database and media backups
- regular dependency updates
- protect the CMS admin using VPN, SSO, Cloudflare Access, IP rules and/or MFA where appropriate

## 19. Useful documentation in this repository

- `docs/ARCHITECTURE.md`
- `docs/CMS-INTEGRATION.md`
- `docs/CMS-NATIVE-MIGRATION.md`
- `docs/VALIDATION.md`

Official upstream projects:

- https://github.com/django-cms/django-cms
- https://github.com/django-cms/djangocms-rest
- https://github.com/django-cms/django-cms-quickstart
