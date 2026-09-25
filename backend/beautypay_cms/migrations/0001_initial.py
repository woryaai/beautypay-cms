from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = [("cms", "0043_alter_globalpagepermission_can_view_and_more")]
    operations = [
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("site_name", models.CharField(default="BeautyPay", max_length=120)),
                ("logo", models.ImageField(blank=True, null=True, upload_to="site/")),
                ("logo_alt", models.CharField(default="BeautyPay", max_length=160)),
                ("default_announcement", models.CharField(blank=True, max_length=300)),
                ("phone", models.CharField(blank=True, max_length=40)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("address", models.TextField(blank=True)),
                ("instagram_url", models.URLField(blank=True)),
                ("linkedin_url", models.URLField(blank=True)),
                ("app_store_url", models.URLField(blank=True)),
                ("google_play_url", models.URLField(blank=True)),
                ("footer_text", models.TextField(blank=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "تنظیمات سایت", "verbose_name_plural": "تنظیمات سایت"},
        ),
        migrations.CreateModel(
            name="Section",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("anchor", models.SlugField(blank=True, max_length=100)),
                ("variant", models.CharField(choices=[("default", "Default"), ("light", "Light"), ("dark", "Dark"), ("gradient", "Gradient"), ("glass", "Glass")], default="default", max_length=24)),
                ("css_class", models.CharField(blank=True, max_length=240)),
                ("background_image", models.ImageField(blank=True, null=True, upload_to="sections/")),
                ("background_color", models.CharField(blank=True, max_length=32)),
                ("text_color", models.CharField(blank=True, max_length=32)),
                ("full_width", models.BooleanField(default=False)),
                ("full_height", models.BooleanField(default=False)),
                ("hidden", models.BooleanField(default=False)),
            ],
            bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="Hero",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("eyebrow", models.CharField(blank=True, max_length=160)),
                ("title", models.CharField(max_length=300)),
                ("subtitle", models.CharField(blank=True, max_length=400)),
                ("body", models.TextField(blank=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="hero/")),
                ("image_alt", models.CharField(blank=True, max_length=200)),
                ("primary_label", models.CharField(blank=True, max_length=80)),
                ("primary_url", models.CharField(blank=True, max_length=500)),
                ("secondary_label", models.CharField(blank=True, max_length=80)),
                ("secondary_url", models.CharField(blank=True, max_length=500)),
                ("badge", models.CharField(blank=True, max_length=120)),
                ("align", models.CharField(choices=[("start", "Start"), ("center", "Center")], default="start", max_length=12)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="RichText",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("kicker", models.CharField(blank=True, max_length=160)),
                ("title", models.CharField(blank=True, max_length=300)),
                ("body", models.TextField(blank=True, help_text="HTML is allowed. Keep markup semantic and minimal.")),
                ("align", models.CharField(choices=[("start", "Start"), ("center", "Center")], default="start", max_length=12)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="ImageBlock",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("image", models.ImageField(upload_to="content/")), ("alt", models.CharField(max_length=240)),
                ("caption", models.CharField(blank=True, max_length=300)), ("link_url", models.CharField(blank=True, max_length=500)),
                ("width", models.CharField(choices=[("auto", "Auto"), ("full", "Full"), ("half", "Half")], default="auto", max_length=20)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="Button",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("label", models.CharField(max_length=120)), ("url", models.CharField(max_length=500)),
                ("style", models.CharField(choices=[("primary", "Primary"), ("secondary", "Secondary"), ("outline", "Outline"), ("link", "Link")], default="primary", max_length=20)),
                ("new_tab", models.BooleanField(default=False)), ("aria_label", models.CharField(blank=True, max_length=200)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="Card",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("image", models.ImageField(blank=True, null=True, upload_to="cards/")), ("image_alt", models.CharField(blank=True, max_length=200)),
                ("badge", models.CharField(blank=True, max_length=100)), ("title", models.CharField(max_length=220)), ("body", models.TextField(blank=True)),
                ("link_label", models.CharField(blank=True, max_length=100)), ("link_url", models.CharField(blank=True, max_length=500)), ("icon", models.CharField(blank=True, max_length=80)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("kind", models.CharField(choices=[("info", "Info"), ("success", "Success"), ("warning", "Warning"), ("danger", "Danger")], default="info", max_length=12)),
                ("title", models.CharField(blank=True, max_length=200)), ("text", models.TextField()), ("button_label", models.CharField(blank=True, max_length=100)),
                ("button_url", models.CharField(blank=True, max_length=500)), ("dismissible", models.BooleanField(default=False)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="Spacer",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("size", models.CharField(choices=[("xs", "XS"), ("sm", "SM"), ("md", "MD"), ("lg", "LG"), ("xl", "XL")], default="md", max_length=12)),
            ], bases=("cms.cmsplugin",),
        ),
        migrations.CreateModel(
            name="HtmlBlock",
            fields=[
                ("cmsplugin_ptr", models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to="cms.cmsplugin")),
                ("name", models.CharField(blank=True, max_length=140)), ("html", models.TextField(help_text="Escape hatch for legacy sections. Prefer structured blocks for new content.")),
            ], bases=("cms.cmsplugin",),
        ),
    ]
