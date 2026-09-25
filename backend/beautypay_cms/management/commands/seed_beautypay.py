import json
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from cms.api import add_plugin, create_page
from cms.models import PageContent
from beautypay_cms.fragmentizer import fragmentize_html
from beautypay_cms.models import SiteSettings

DEFAULT_MOBILE_NAV = [
    {"label": "خانه", "url": "/", "icon": "home", "page_key": "home"},
    {"label": "جستجو", "url": "/search", "icon": "search", "page_key": "search"},
    {"label": "کسب و کار", "url": "/business", "icon": "briefcase", "page_key": "business"},
    {"label": "پشتیبانی", "url": "/help", "icon": "message", "page_key": "help"},
]
DEFAULT_ASSISTANT_FAQ = [
    {"question": "اعتبار تا چقدر است؟", "answer": "مشتریان واجد شرایط می‌توانند بسته به سرویس اعتباری، از اعتبارهای مختلف استفاده کنند. سقف و دوره بازپرداخت در هر سرویس متفاوت است."},
    {"question": "چطور مرکز پیدا کنم؟", "answer": "از بخش جست‌وجو، نوع خدمت، استان و زمان موردنظر را انتخاب کنید تا مراکز و متخصصان مرتبط نمایش داده شوند."},
    {"question": "پرداخت اعتباری چطور است؟", "answer": "بیوتی پی چند سرویس پرداخت اعتباری را یک‌جا نمایش می‌دهد تا در صورت واجد شرایط بودن، هزینه خدمت را با روش اعتباری پرداخت کنید."},
    {"question": "ثبت‌نام پذیرنده", "answer": "برای شروع همکاری، وارد بخش «برای کسب‌وکارها» شوید و ثبت‌نام را انجام دهید. بعد از تکمیل اطلاعات، مراحل فعال‌سازی و آموزش انجام می‌شود."},
    {"question": "پشتیبانی", "answer": "راه‌های ارتباطی پشتیبانی در فوتر سایت نمایش داده می‌شوند."},
]


def add_managed_fragment(placeholder, language, section, position="last-child", target=None):
    data = fragmentize_html(section.get("html", ""))
    parent = add_plugin(
        placeholder,
        "ManagedFragmentPlugin",
        language,
        name=section.get("name", ""),
        template_html=data.template_html,
        position=position,
        target=target,
    )
    for item in data.texts:
        add_plugin(placeholder, "FragmentTextPlugin", language, target=parent, **item)
    for item in data.assets:
        add_plugin(placeholder, "FragmentAssetPlugin", language, target=parent, **item)
    for item in data.links:
        add_plugin(placeholder, "FragmentLinkPlugin", language, target=parent, **item)
    for item in data.attributes:
        add_plugin(placeholder, "FragmentAttributePlugin", language, target=parent, **item)
    return parent, len(data.texts) + len(data.assets) + len(data.links) + len(data.attributes)


class Command(BaseCommand):
    help = "Import BeautyPay pages into django CMS with fully editable managed fragments."

    def add_arguments(self, parser):
        parser.add_argument("--language", default="fa")
        parser.add_argument("--user", default="")
        parser.add_argument("--only", default="", help="Import only one route, e.g. business")
        parser.add_argument("--legacy-html", action="store_true", help="Use HtmlBlockPlugin instead of managed native fragments")
        parser.add_argument("--skip-settings", action="store_true")

    def handle(self, *args, **options):
        language = options["language"]
        seed_path = Path(__file__).resolve().parents[2] / "seed" / "pages.json"
        pages = json.loads(seed_path.read_text(encoding="utf-8"))
        if options["only"]:
            pages = [p for p in pages if p["route"] == options["only"]]
            if not pages:
                raise CommandError(f"Route not found in seed: {options['only']}")

        creator = "beautypay-seed"
        if options["user"]:
            User = get_user_model()
            creator = User.objects.get(username=options["user"])

        if not options["skip_settings"]:
            settings, _ = SiteSettings.objects.get_or_create(pk=1)
            changed = False
            if not settings.mobile_nav:
                settings.mobile_nav = DEFAULT_MOBILE_NAV; changed = True
            if not settings.assistant_welcome_messages:
                settings.assistant_welcome_messages = ["سلام! من دستیار هوشمند بیوتی پی هستم.", "برای شروع، لطفاً شماره موبایل‌تان را وارد کنید."]; changed = True
            if not settings.assistant_faq:
                settings.assistant_faq = DEFAULT_ASSISTANT_FAQ; changed = True
            if not settings.assistant_fallback_answer:
                settings.assistant_fallback_answer = "می‌توانید درباره اعتبار، پرداخت، ثبت‌نام پذیرنده و پشتیبانی سوال کنید."; changed = True
            if not settings.assistant_strings:
                settings.assistant_strings = {
                    "mobile_placeholder": "شماره موبایل را وارد کنید", "otp_placeholder": "کد ۴ رقمی را وارد کنید", "chat_placeholder": "سوالتان را بنویسید…",
                    "invalid_mobile": "شماره موبایل معتبر وارد کنید؛ مثل ۰۹۱۲۱۲۳۴۵۶۷.", "demo_code_prefix": "کد ورود آزمایشی شما:",
                    "invalid_otp": "کد واردشده درست نیست. همان کدی که بالاتر نمایش داده شده را وارد کنید.", "login_success": "ورود با موفقیت انجام شد. چه کمکی از دستم برمی‌آید؟",
                    "close_label": "بستن", "send_label": "ارسال", "dialog_label": "مشاوره آنلاین بیوتی پی", "launcher_aria": "باز کردن مشاوره آنلاین"
                }; changed = True
            if not settings.footer_legal_links:
                settings.footer_legal_links = [{"label":"قوانین استفاده","url":"/terms"},{"label":"قوانین پرداخت","url":"/financial-terms"},{"label":"سلب مسئولیت","url":"/disclaimer"}]; changed = True
            if changed:
                settings.save()

        created = skipped = fragments = editable_fields = 0
        pages.sort(key=lambda item: 0 if item["route"] == "" else 1)
        for item in pages:
            route = item["route"]
            slug = route or "home"
            existing = PageContent.objects.filter(language=language, slug=slug).first()
            if existing:
                self.stdout.write(self.style.WARNING(f"skip existing: /{route}"))
                skipped += 1
                continue

            page = create_page(
                title=item["title"],
                template=item["template"],
                language=language,
                slug=slug,
                meta_description=item.get("description") or "",
                created_by=creator,
                in_navigation=item.get("in_navigation", True),
            )
            if route == "":
                page.set_as_homepage(creator if not isinstance(creator, str) else None)
            content = page.get_admin_content(language)
            placeholder = content.placeholders.get(slot="content")
            for section in item.get("sections", []):
                if options["legacy_html"]:
                    add_plugin(placeholder, "HtmlBlockPlugin", language, name=section.get("name", ""), html=section.get("html", ""))
                else:
                    _, count = add_managed_fragment(placeholder, language, section)
                    fragments += 1
                    editable_fields += count
            created += 1
            self.stdout.write(self.style.SUCCESS(f"created: /{route}"))

        self.stdout.write(self.style.SUCCESS(
            f"Done. created={created}, skipped={skipped}, managed_fragments={fragments}, editable_fields={editable_fields}"
        ))
