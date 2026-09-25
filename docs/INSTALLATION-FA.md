# راهنمای کامل نصب و راه‌اندازی BeautyPay CMS

این پروژه ترکیبی از **Next.js 16** برای فرانت‌اند و **django CMS 5.1** برای مدیریت محتوا است. django CMS در حالت Headless اجرا می‌شود و محتوا از طریق `djangocms-rest` به Next.js می‌رسد.

## معماری

```text
Browser
  ↓
Next.js 16 / React 19
  ↓
django CMS REST API
  ↓
django CMS 5.1
  ↓
PostgreSQL
```

Next.js مسئول UI، SSR/ISR، SEO output، routing، performance و interaction است. django CMS مسئول صفحات، سکشن‌ها، متن‌ها، تصاویر، دکمه‌ها، منو، SEO، پیام‌ها، Header/Footer، Mobile Navigation و تنظیمات عمومی سایت است.

## نسخه‌های پیشنهادی

- Node.js 22+
- Next.js 16.3.6
- React 19.3
- Python 3.12
- Django 5.2.x
- django CMS 5.1.3
- djangocms-rest 1.2.0
- PostgreSQL 17 در Docker (نسخه 15+ نیز مناسب است)

> برای production نسخه‌های `backend/requirements.txt` را بدون بررسی compatibility تغییر ندهید.

---

# روش پیشنهادی: نصب با Docker

## 1) پیش‌نیازها

- Docker Desktop یا Docker Engine
- Docker Compose v2
- حداقل 4GB RAM آزاد

بررسی:

```bash
docker --version
docker compose version
```

## 2) دریافت پروژه

```bash
git clone https://github.com/woryaai/beautypay-cms.git
cd beautypay-cms
```

## 3) ساخت فایل Environment

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

برای development مقادیر پیش‌فرض قابل استفاده‌اند. برای production حتماً `POSTGRES_PASSWORD` و `DJANGO_SECRET_KEY` را تغییر دهید.

## 4) Build و Run

```bash
docker compose up --build -d
```

وضعیت سرویس‌ها:

```bash
docker compose ps
```

Logها:

```bash
docker compose logs -f cms
docker compose logs -f frontend
```

## 5) ساخت Superuser

```bash
docker compose exec cms python manage.py createsuperuser
```

## 6) Import کامل BeautyPay به CMS

اگر نام کاربر ادمین `admin` است:

```bash
docker compose exec cms python manage.py seed_beautypay --user admin
```

این command ساختار فعلی BeautyPay را وارد CMS می‌کند و صفحات/سکشن‌های موجود را به Managed Fragment و blockهای قابل ویرایش تبدیل می‌کند.

## 7) آدرس‌ها

Frontend:

```text
http://localhost:3000
```

Admin:

```text
http://localhost:8000/admin/
```

CMS REST API:

```text
http://localhost:8000/api/cms/
```

Health check:

```text
http://localhost:8000/api/cms/healthcheck/
```

## 8) بررسی سلامت

```bash
docker compose exec cms python manage.py check
docker compose exec cms python manage.py cms check
```

Frontend smoke test از سیستم میزبان:

```bash
npm install
npm run cms:smoke
```

---

# نصب دستی بدون Docker

## Backend

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

نصب packageها:

```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

### اجرای سریع با SQLite

اگر `DATABASE_URL` تنظیم نشده باشد، پروژه برای development از SQLite استفاده می‌کند.

Linux/macOS:

```bash
export DJANGO_SECRET_KEY="dev-secret"
export DJANGO_DEBUG="1"
export DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
export DJANGO_CORS_ALLOWED_ORIGINS="http://localhost:3000"
export DJANGO_CSRF_TRUSTED_ORIGINS="http://localhost:3000,http://localhost:8000"
```

Windows PowerShell:

```powershell
$env:DJANGO_SECRET_KEY="dev-secret"
$env:DJANGO_DEBUG="1"
$env:DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
$env:DJANGO_CORS_ALLOWED_ORIGINS="http://localhost:3000"
$env:DJANGO_CSRF_TRUSTED_ORIGINS="http://localhost:3000,http://localhost:8000"
```

سپس:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_beautypay --user admin
python manage.py cms check
python manage.py runserver 0.0.0.0:8000
```

### PostgreSQL دستی

```text
DATABASE_URL=postgresql://beautypay:PASSWORD@localhost:5432/beautypay
```

بعد:

```bash
python manage.py migrate
```

---

# Frontend Next.js

در Root پروژه:

```bash
npm install
```

فایل `.env.local`:

```env
CMS_ENABLED=1
CMS_API_URL=http://localhost:8000/api/cms
CMS_LANGUAGE=fa
CMS_REVALIDATE_SECONDS=30
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Development:

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

همه با یک command:

```bash
npm run check
```

Production:

```bash
npm run build
npm run start
```

---

# APIهای مهم CMS

Home:

```text
GET /api/cms/fa/pages/
```

صفحه مشخص:

```text
GET /api/cms/fa/pages/business/
```

Page tree:

```text
GET /api/cms/fa/pages-tree/
```

Menu:

```text
GET /api/cms/fa/menu/
```

Breadcrumbs:

```text
GET /api/cms/fa/breadcrumbs/
```

Plugin definitions:

```text
GET /api/cms/plugins/
```

BeautyPay site settings:

```text
GET /api/cms/site-settings/
```

---

# مدیریت محتوا

در `http://localhost:8000/admin/` وارد شوید.

## Page Tree

می‌توانید موارد زیر را مدیریت کنید:

- ساخت و حذف صفحه
- Title
- Menu Title
- Slug / URL
- SEO Title
- Meta Description
- Navigation visibility
- ترتیب صفحات
- زبان

## Native CMS Blocks

پروژه شامل blockهای زیر است:

- Section
- Hero
- Rich Text
- Image
- Button
- Card
- Grid
- Stat
- Accordion
- FAQ Item
- Data Table
- Logo Cloud
- Logo Item
- Tabs
- Tab Item
- Form
- Form Field
- Message
- Spacer

## Managed Fragment

سکشن‌های قدیمی و پیچیده BeautyPay به Managed Fragment تبدیل می‌شوند. DOM و کلاس‌های UI حفظ می‌شود اما متن‌ها، تصاویر، لینک‌ها و attributeهای قابل نمایش به child pluginهای مستقل تبدیل می‌شوند.

برای تغییر محتوای Managed Fragment ترجیحاً `template_html` را تغییر ندهید و child pluginها را ویرایش کنید.

---

# Site Settings

در بخش BeautyPay CMS → Site Settings می‌توانید این موارد را مدیریت کنید:

- Logo و ALT
- نام سایت
- Global announcement
- شماره تلفن، ایمیل و آدرس
- Instagram / LinkedIn
- App Store / Google Play
- Header labels و CTA
- Footer titles/copyright/legal links
- Mobile Navigation
- AI Assistant title/messages/FAQ/fallback content

---

# Cache و ISR

```env
CMS_REVALIDATE_SECONDS=30
```

برای development می‌توانید مقدار را `1` کنید. در production معمولاً 30 تا 300 ثانیه مناسب است.

اگر CMS در دسترس نباشد یا صفحه‌ای هنوز در CMS ساخته نشده باشد، Next.js به محتوای static موجود fallback می‌کند.

برای خاموش کردن CMS:

```env
CMS_ENABLED=0
```

---

# Production

## Backend env

```env
DJANGO_DEBUG=0
DJANGO_SECRET_KEY=<strong-random-secret>
DJANGO_ALLOWED_HOSTS=cms.example.com
DJANGO_CORS_ALLOWED_ORIGINS=https://www.example.com
DJANGO_CSRF_TRUSTED_ORIGINS=https://cms.example.com,https://www.example.com
DJANGO_SECURE_COOKIES=1
DATABASE_URL=postgresql://USER:PASSWORD@DBHOST:5432/beautypay
```

قبل از deploy:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py check --deploy
python manage.py cms check
```

## Frontend env

```env
CMS_ENABLED=1
CMS_API_URL=https://cms.example.com/api/cms
CMS_LANGUAGE=fa
CMS_REVALIDATE_SECONDS=60
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

Build:

```bash
npm install
npm run check
npm run build
```

## Media

برای production فایل‌های `/media/` را با Nginx/CDN/Object Storage سرو کنید. Django در حالت `DEBUG=0` نباید Media را مستقیماً سرو کند.

## Reverse proxy پیشنهادی

```text
www.example.com      → Next.js :3000
cms.example.com      → Django CMS :8000
cms.example.com/media/ → Object storage / media volume
```

---

# Backup

حداقل این دو مورد باید Backup شوند:

1. PostgreSQL
2. CMS Media

نمونه:

```bash
pg_dump -Fc -h DBHOST -U USER beautypay > beautypay.dump
```

Restore:

```bash
pg_restore -h DBHOST -U USER -d beautypay beautypay.dump
```

---

# Upgrade از نسخه قبلی CMS

اگر نسخه قبلی BeautyPay دارای `HtmlBlockPlugin` بوده است:

```bash
python manage.py migrate
python manage.py upgrade_legacy_blocks --dry-run
python manage.py upgrade_legacy_blocks
```

---

# Troubleshooting

## DisallowedHost

`DJANGO_ALLOWED_HOSTS` را اصلاح کنید.

## CSRF Failed

Origin کامل با `https://` یا `http://` را در `DJANGO_CSRF_TRUSTED_ORIGINS` قرار دهید.

## Frontend محتوای CMS را نشان نمی‌دهد

```bash
npm run cms:smoke
```

و بررسی کنید:

```env
CMS_ENABLED=1
CMS_API_URL=http://localhost:8000/api/cms
CMS_LANGUAGE=fa
```

## تغییرات CMS فوراً دیده نمی‌شوند

`CMS_REVALIDATE_SECONDS` را کاهش دهید.

## تصاویر CMS نمایش داده نمی‌شوند

URL تصویر باید برای Browser قابل دسترس باشد. hostname داخلی Docker مثل `cms` برای Browser عمومی resolve نمی‌شود؛ در production از hostname عمومی CMS/CDN استفاده کنید.

---

# GitHub CI

Workflow موجود در `.github/workflows/ci.yml` دو Job اجرا می‌کند:

- Frontend: static validation + typecheck + lint + build
- Backend: install + migrate + Django check + django CMS check

---

# Security checklist

- `DEBUG=False` در production
- SECRET_KEY قوی
- Password قوی PostgreSQL
- HTTPS
- Secure cookies
- CORS محدود به Frontend واقعی
- CSRF trusted origins دقیق
- Backup دوره‌ای DB و Media
- حداقل permission برای CMS users
- عدم commit فایل `.env`
- محدودسازی Admin با VPN/SSO/IP restriction در صورت امکان

---

# منابع رسمی

- django CMS: https://github.com/django-cms/django-cms
- django CMS docs: https://docs.django-cms.org/
- djangocms-rest: https://github.com/django-cms/djangocms-rest
- django-cms organization: https://github.com/django-cms/
