from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from beautypay_cms.views import SiteSettingsView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/cms/site-settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("api/cms/", include("djangocms_rest.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
