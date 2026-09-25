from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteSettings


class SiteSettingsView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        obj = SiteSettings.objects.first()
        if not obj:
            return Response({})

        def file_url(field):
            return request.build_absolute_uri(field.url) if field else ""

        return Response({
            "site_name": obj.site_name,
            "logo": file_url(obj.logo),
            "logo_alt": obj.logo_alt,
            "default_announcement": obj.default_announcement,
            "phone": obj.phone,
            "email": obj.email,
            "address": obj.address,
            "instagram_url": obj.instagram_url,
            "linkedin_url": obj.linkedin_url,
            "app_store_url": obj.app_store_url,
            "google_play_url": obj.google_play_url,
            "footer_text": obj.footer_text,
            "header_business_label": obj.header_business_label,
            "header_consumer_label": obj.header_consumer_label,
            "login_label": obj.login_label,
            "primary_cta_label": obj.primary_cta_label,
            "primary_cta_url": obj.primary_cta_url,
            "footer_pages_title": obj.footer_pages_title,
            "footer_contact_title": obj.footer_contact_title,
            "footer_social_title": obj.footer_social_title,
            "footer_app_title": obj.footer_app_title,
            "footer_copyright": obj.footer_copyright,
            "mobile_nav": obj.mobile_nav,
            "assistant_title": obj.assistant_title,
            "assistant_subtitle": obj.assistant_subtitle,
            "assistant_welcome_messages": obj.assistant_welcome_messages,
            "assistant_faq": obj.assistant_faq,
            "assistant_fallback_answer": obj.assistant_fallback_answer,
            "assistant_launcher_label": obj.assistant_launcher_label,
            "assistant_demo_note": obj.assistant_demo_note,
            "assistant_strings": obj.assistant_strings,
            "footer_legal_links": obj.footer_legal_links,
            "updated_at": obj.updated_at,
        })
