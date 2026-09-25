from django.db import migrations, models
import django.db.models.deletion


def plugin_ptr():
    return models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")


class Migration(migrations.Migration):
    dependencies = [("beautypay_cms", "0001_initial")]
    operations = [
        migrations.AddField("sitesettings", "header_business_label", models.CharField(default="برای کسب‌وکارها", max_length=100)),
        migrations.AddField("sitesettings", "header_consumer_label", models.CharField(default="برای مشتریان", max_length=100)),
        migrations.AddField("sitesettings", "login_label", models.CharField(default="ورود", max_length=80)),
        migrations.AddField("sitesettings", "primary_cta_label", models.CharField(default="شروع کنید", max_length=100)),
        migrations.AddField("sitesettings", "primary_cta_url", models.CharField(default="/commission", max_length=500)),
        migrations.AddField("sitesettings", "footer_pages_title", models.CharField(default="صفحات", max_length=100)),
        migrations.AddField("sitesettings", "footer_contact_title", models.CharField(default="ارتباط", max_length=100)),
        migrations.AddField("sitesettings", "footer_social_title", models.CharField(default="شبکه‌های اجتماعی", max_length=100)),
        migrations.AddField("sitesettings", "footer_app_title", models.CharField(default="دانلود اپلیکیشن", max_length=100)),
        migrations.AddField("sitesettings", "footer_copyright", models.CharField(blank=True, max_length=240)),
        migrations.AddField("sitesettings", "mobile_nav", models.JSONField(blank=True, default=list, help_text="[{label,url,icon,page_key}]")),
        migrations.AddField("sitesettings", "assistant_title", models.CharField(default="دستیار هوشمند بیوتی پی", max_length=160)),
        migrations.AddField("sitesettings", "assistant_subtitle", models.CharField(default="آنلاین · پاسخ‌گوی سوالات متداول", max_length=220)),
        migrations.AddField("sitesettings", "assistant_welcome_messages", models.JSONField(blank=True, default=list)),
        migrations.AddField("sitesettings", "assistant_faq", models.JSONField(blank=True, default=list, help_text="[{question,answer}]")),
        migrations.AddField("sitesettings", "assistant_fallback_answer", models.TextField(blank=True)),
        migrations.AddField("sitesettings", "assistant_launcher_label", models.CharField(default="مشاوره آنلاین", max_length=100)),
        migrations.AddField("sitesettings", "assistant_demo_note", models.CharField(default="نسخه نمایشی · ورود و پاسخ‌ها در همین پنجره انجام می‌شود", max_length=240)),
        migrations.AddField("sitesettings", "assistant_strings", models.JSONField(blank=True, default=dict)),
        migrations.AddField("sitesettings", "footer_legal_links", models.JSONField(blank=True, default=list)),
        migrations.CreateModel(name="Grid", fields=[("cmsplugin_ptr", plugin_ptr()), ("columns_desktop", models.PositiveSmallIntegerField(default=3)), ("columns_tablet", models.PositiveSmallIntegerField(default=2)), ("columns_mobile", models.PositiveSmallIntegerField(default=1)), ("gap", models.CharField(choices=[("sm","Small"),("md","Medium"),("lg","Large")], default="md", max_length=16)), ("align", models.CharField(choices=[("stretch","Stretch"),("start","Start"),("center","Center")], default="stretch", max_length=16)), ("css_class", models.CharField(blank=True, max_length=240))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="Stat", fields=[("cmsplugin_ptr", plugin_ptr()), ("value", models.CharField(max_length=80)), ("label", models.CharField(max_length=180)), ("suffix", models.CharField(blank=True, max_length=40)), ("description", models.CharField(blank=True, max_length=300)), ("icon", models.CharField(blank=True, max_length=80))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FaqItem", fields=[("cmsplugin_ptr", plugin_ptr()), ("question", models.CharField(max_length=300)), ("answer", models.TextField()), ("open_by_default", models.BooleanField(default=False))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="DataTable", fields=[("cmsplugin_ptr", plugin_ptr()), ("title", models.CharField(blank=True, max_length=240)), ("caption", models.CharField(blank=True, max_length=300)), ("headers", models.JSONField(blank=True, default=list)), ("rows", models.JSONField(blank=True, default=list)), ("responsive", models.BooleanField(default=True)), ("striped", models.BooleanField(default=False))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="LogoItem", fields=[("cmsplugin_ptr", plugin_ptr()), ("name", models.CharField(max_length=160)), ("image", models.ImageField(blank=True, null=True, upload_to="logos/")), ("source_url", models.CharField(blank=True, max_length=500)), ("alt", models.CharField(blank=True, max_length=200)), ("url", models.CharField(blank=True, max_length=500))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="LogoCloud", fields=[("cmsplugin_ptr", plugin_ptr()), ("title", models.CharField(blank=True, max_length=240)), ("description", models.CharField(blank=True, max_length=400)), ("columns", models.PositiveSmallIntegerField(default=6)), ("grayscale", models.BooleanField(default=False))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="Accordion", fields=[("cmsplugin_ptr", plugin_ptr()), ("title", models.CharField(blank=True, max_length=240)), ("allow_multiple", models.BooleanField(default=False))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="Tabs", fields=[("cmsplugin_ptr", plugin_ptr()), ("title", models.CharField(blank=True, max_length=240)), ("style", models.CharField(choices=[("pills","Pills"),("underline","Underline")], default="pills", max_length=20))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="TabItem", fields=[("cmsplugin_ptr", plugin_ptr()), ("label", models.CharField(max_length=160)), ("key", models.SlugField(blank=True, max_length=120))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FormBlock", fields=[("cmsplugin_ptr", plugin_ptr()), ("title", models.CharField(blank=True, max_length=240)), ("description", models.CharField(blank=True, max_length=400)), ("action_url", models.CharField(blank=True, max_length=500)), ("method", models.CharField(choices=[("get","GET"),("post","POST")], default="post", max_length=8)), ("submit_label", models.CharField(default="ارسال", max_length=120)), ("success_message", models.CharField(blank=True, max_length=300))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FormField", fields=[("cmsplugin_ptr", plugin_ptr()), ("name", models.SlugField(max_length=120)), ("label", models.CharField(max_length=200)), ("field_type", models.CharField(choices=[("text","Text"),("tel","Phone"),("email","Email"),("number","Number"),("date","Date"),("select","Select"),("textarea","Textarea"),("checkbox","Checkbox")], default="text", max_length=20)), ("input_placeholder", models.CharField(blank=True, max_length=240)), ("required", models.BooleanField(default=False)), ("options", models.JSONField(blank=True, default=list)), ("help_text", models.CharField(blank=True, max_length=300))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="ManagedFragment", fields=[("cmsplugin_ptr", plugin_ptr()), ("name", models.CharField(blank=True, max_length=160)), ("template_html", models.TextField(help_text="DOM/layout shell. Visible content is stored in child fields.")), ("css_class", models.CharField(blank=True, max_length=240))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FragmentText", fields=[("cmsplugin_ptr", plugin_ptr()), ("slot_index", models.PositiveIntegerField(default=0)), ("value", models.TextField(blank=True))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FragmentAsset", fields=[("cmsplugin_ptr", plugin_ptr()), ("slot_index", models.PositiveIntegerField(default=0)), ("image", models.ImageField(blank=True, null=True, upload_to="fragments/")), ("source_url", models.TextField(blank=True)), ("alt", models.CharField(blank=True, max_length=300))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FragmentLink", fields=[("cmsplugin_ptr", plugin_ptr()), ("slot_index", models.PositiveIntegerField(default=0)), ("url", models.TextField(blank=True)), ("title", models.CharField(blank=True, max_length=300)), ("target", models.CharField(blank=True, max_length=40))], bases=("cms.cmsplugin",)),
        migrations.CreateModel(name="FragmentAttribute", fields=[("cmsplugin_ptr", plugin_ptr()), ("slot_index", models.PositiveIntegerField(default=0)), ("attribute_name", models.CharField(max_length=80)), ("value", models.TextField(blank=True))], bases=("cms.cmsplugin",)),
    ]
