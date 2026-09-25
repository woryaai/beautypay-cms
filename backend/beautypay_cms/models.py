from django.db import models
from cms.models.pluginmodel import CMSPlugin


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=120, default="BeautyPay")
    logo = models.ImageField(upload_to="site/", blank=True, null=True)
    logo_alt = models.CharField(max_length=160, default="BeautyPay")
    default_announcement = models.CharField(max_length=300, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    instagram_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    app_store_url = models.URLField(blank=True)
    google_play_url = models.URLField(blank=True)
    footer_text = models.TextField(blank=True)
    header_business_label = models.CharField(max_length=100, default="برای کسب‌وکارها")
    header_consumer_label = models.CharField(max_length=100, default="برای مشتریان")
    login_label = models.CharField(max_length=80, default="ورود")
    primary_cta_label = models.CharField(max_length=100, default="شروع کنید")
    primary_cta_url = models.CharField(max_length=500, default="/commission")
    footer_pages_title = models.CharField(max_length=100, default="صفحات")
    footer_contact_title = models.CharField(max_length=100, default="ارتباط")
    footer_social_title = models.CharField(max_length=100, default="شبکه‌های اجتماعی")
    footer_app_title = models.CharField(max_length=100, default="دانلود اپلیکیشن")
    footer_copyright = models.CharField(max_length=240, blank=True)
    mobile_nav = models.JSONField(default=list, blank=True, help_text="[{label,url,icon,page_key}]")
    assistant_title = models.CharField(max_length=160, default="دستیار هوشمند بیوتی پی")
    assistant_subtitle = models.CharField(max_length=220, default="آنلاین · پاسخ‌گوی سوالات متداول")
    assistant_welcome_messages = models.JSONField(default=list, blank=True)
    assistant_faq = models.JSONField(default=list, blank=True, help_text="[{question,answer}]")
    assistant_fallback_answer = models.TextField(blank=True)
    assistant_launcher_label = models.CharField(max_length=100, default="مشاوره آنلاین")
    assistant_demo_note = models.CharField(max_length=240, default="نسخه نمایشی · ورود و پاسخ‌ها در همین پنجره انجام می‌شود")
    assistant_strings = models.JSONField(default=dict, blank=True)
    footer_legal_links = models.JSONField(default=list, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "تنظیمات سایت"
        verbose_name_plural = "تنظیمات سایت"

    def __str__(self):
        return self.site_name


class Section(CMSPlugin):
    VARIANTS = [("default", "Default"), ("light", "Light"), ("dark", "Dark"), ("gradient", "Gradient"), ("glass", "Glass")]
    anchor = models.SlugField(max_length=100, blank=True)
    variant = models.CharField(max_length=24, choices=VARIANTS, default="default")
    css_class = models.CharField(max_length=240, blank=True)
    background_image = models.ImageField(upload_to="sections/", blank=True, null=True)
    background_color = models.CharField(max_length=32, blank=True)
    text_color = models.CharField(max_length=32, blank=True)
    full_width = models.BooleanField(default=False)
    full_height = models.BooleanField(default=False)
    hidden = models.BooleanField(default=False)


class Hero(CMSPlugin):
    eyebrow = models.CharField(max_length=160, blank=True)
    title = models.CharField(max_length=300)
    subtitle = models.CharField(max_length=400, blank=True)
    body = models.TextField(blank=True)
    image = models.ImageField(upload_to="hero/", blank=True, null=True)
    image_alt = models.CharField(max_length=200, blank=True)
    primary_label = models.CharField(max_length=80, blank=True)
    primary_url = models.CharField(max_length=500, blank=True)
    secondary_label = models.CharField(max_length=80, blank=True)
    secondary_url = models.CharField(max_length=500, blank=True)
    badge = models.CharField(max_length=120, blank=True)
    align = models.CharField(max_length=12, choices=[("start", "Start"), ("center", "Center")], default="start")


class RichText(CMSPlugin):
    kicker = models.CharField(max_length=160, blank=True)
    title = models.CharField(max_length=300, blank=True)
    body = models.TextField(blank=True, help_text="HTML is allowed. Keep markup semantic and minimal.")
    align = models.CharField(max_length=12, choices=[("start", "Start"), ("center", "Center")], default="start")


class ImageBlock(CMSPlugin):
    image = models.ImageField(upload_to="content/")
    alt = models.CharField(max_length=240)
    caption = models.CharField(max_length=300, blank=True)
    link_url = models.CharField(max_length=500, blank=True)
    width = models.CharField(max_length=20, choices=[("auto", "Auto"), ("full", "Full"), ("half", "Half")], default="auto")


class Button(CMSPlugin):
    label = models.CharField(max_length=120)
    url = models.CharField(max_length=500)
    style = models.CharField(max_length=20, choices=[("primary", "Primary"), ("secondary", "Secondary"), ("outline", "Outline"), ("link", "Link")], default="primary")
    new_tab = models.BooleanField(default=False)
    aria_label = models.CharField(max_length=200, blank=True)


class Card(CMSPlugin):
    image = models.ImageField(upload_to="cards/", blank=True, null=True)
    image_alt = models.CharField(max_length=200, blank=True)
    badge = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=220)
    body = models.TextField(blank=True)
    link_label = models.CharField(max_length=100, blank=True)
    link_url = models.CharField(max_length=500, blank=True)
    icon = models.CharField(max_length=80, blank=True)


class Message(CMSPlugin):
    KIND = [("info", "Info"), ("success", "Success"), ("warning", "Warning"), ("danger", "Danger")]
    kind = models.CharField(max_length=12, choices=KIND, default="info")
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField()
    button_label = models.CharField(max_length=100, blank=True)
    button_url = models.CharField(max_length=500, blank=True)
    dismissible = models.BooleanField(default=False)


class Spacer(CMSPlugin):
    size = models.CharField(max_length=12, choices=[("xs", "XS"), ("sm", "SM"), ("md", "MD"), ("lg", "LG"), ("xl", "XL")], default="md")


class HtmlBlock(CMSPlugin):
    name = models.CharField(max_length=140, blank=True)
    html = models.TextField(help_text="Escape hatch for legacy sections. Prefer structured blocks for new content.")


class Grid(CMSPlugin):
    columns_desktop = models.PositiveSmallIntegerField(default=3)
    columns_tablet = models.PositiveSmallIntegerField(default=2)
    columns_mobile = models.PositiveSmallIntegerField(default=1)
    gap = models.CharField(max_length=16, choices=[("sm", "Small"), ("md", "Medium"), ("lg", "Large")], default="md")
    align = models.CharField(max_length=16, choices=[("stretch", "Stretch"), ("start", "Start"), ("center", "Center")], default="stretch")
    css_class = models.CharField(max_length=240, blank=True)


class Stat(CMSPlugin):
    value = models.CharField(max_length=80)
    label = models.CharField(max_length=180)
    suffix = models.CharField(max_length=40, blank=True)
    description = models.CharField(max_length=300, blank=True)
    icon = models.CharField(max_length=80, blank=True)


class FaqItem(CMSPlugin):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    open_by_default = models.BooleanField(default=False)


class DataTable(CMSPlugin):
    title = models.CharField(max_length=240, blank=True)
    caption = models.CharField(max_length=300, blank=True)
    headers = models.JSONField(default=list, blank=True)
    rows = models.JSONField(default=list, blank=True)
    responsive = models.BooleanField(default=True)
    striped = models.BooleanField(default=False)


class LogoItem(CMSPlugin):
    name = models.CharField(max_length=160)
    image = models.ImageField(upload_to="logos/", blank=True, null=True)
    source_url = models.CharField(max_length=500, blank=True)
    alt = models.CharField(max_length=200, blank=True)
    url = models.CharField(max_length=500, blank=True)


class LogoCloud(CMSPlugin):
    title = models.CharField(max_length=240, blank=True)
    description = models.CharField(max_length=400, blank=True)
    columns = models.PositiveSmallIntegerField(default=6)
    grayscale = models.BooleanField(default=False)


class Accordion(CMSPlugin):
    title = models.CharField(max_length=240, blank=True)
    allow_multiple = models.BooleanField(default=False)


class Tabs(CMSPlugin):
    title = models.CharField(max_length=240, blank=True)
    style = models.CharField(max_length=20, choices=[("pills", "Pills"), ("underline", "Underline")], default="pills")


class TabItem(CMSPlugin):
    label = models.CharField(max_length=160)
    key = models.SlugField(max_length=120, blank=True)


class FormBlock(CMSPlugin):
    title = models.CharField(max_length=240, blank=True)
    description = models.CharField(max_length=400, blank=True)
    action_url = models.CharField(max_length=500, blank=True)
    method = models.CharField(max_length=8, choices=[("get", "GET"), ("post", "POST")], default="post")
    submit_label = models.CharField(max_length=120, default="ارسال")
    success_message = models.CharField(max_length=300, blank=True)


class FormField(CMSPlugin):
    FIELD_TYPES = [("text", "Text"), ("tel", "Phone"), ("email", "Email"), ("number", "Number"), ("date", "Date"), ("select", "Select"), ("textarea", "Textarea"), ("checkbox", "Checkbox")]
    name = models.SlugField(max_length=120)
    label = models.CharField(max_length=200)
    field_type = models.CharField(max_length=20, choices=FIELD_TYPES, default="text")
    placeholder = models.CharField(max_length=240, blank=True)
    required = models.BooleanField(default=False)
    options = models.JSONField(default=list, blank=True)
    help_text = models.CharField(max_length=300, blank=True)


class ManagedFragment(CMSPlugin):
    name = models.CharField(max_length=160, blank=True)
    template_html = models.TextField(help_text="DOM/layout shell. Visible content is stored in child fields.")
    css_class = models.CharField(max_length=240, blank=True)


class FragmentText(CMSPlugin):
    slot_index = models.PositiveIntegerField(default=0)
    value = models.TextField(blank=True)


class FragmentAsset(CMSPlugin):
    slot_index = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="fragments/", blank=True, null=True)
    source_url = models.TextField(blank=True)
    alt = models.CharField(max_length=300, blank=True)


class FragmentLink(CMSPlugin):
    slot_index = models.PositiveIntegerField(default=0)
    url = models.TextField(blank=True)
    title = models.CharField(max_length=300, blank=True)
    target = models.CharField(max_length=40, blank=True)


class FragmentAttribute(CMSPlugin):
    slot_index = models.PositiveIntegerField(default=0)
    attribute_name = models.CharField(max_length=80)
    value = models.TextField(blank=True)
