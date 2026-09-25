from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "phone", "email", "updated_at")
    readonly_fields = ("updated_at",)
    fieldsets = (
        ("برند", {"fields": ("site_name", "logo", "logo_alt", "default_announcement")}),
        ("هدر و CTA", {"fields": ("header_business_label", "header_consumer_label", "login_label", "primary_cta_label", "primary_cta_url")}),
        ("فوتر و ارتباط", {"fields": ("phone", "email", "address", "instagram_url", "linkedin_url", "app_store_url", "google_play_url", "footer_text", "footer_pages_title", "footer_contact_title", "footer_social_title", "footer_app_title", "footer_copyright", "footer_legal_links")}),
        ("ناوبری موبایل", {"fields": ("mobile_nav",)}),
        ("دستیار هوشمند", {"fields": ("assistant_title", "assistant_subtitle", "assistant_launcher_label", "assistant_welcome_messages", "assistant_faq", "assistant_fallback_answer", "assistant_demo_note", "assistant_strings")}),
        ("سیستم", {"fields": ("updated_at",)}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()
