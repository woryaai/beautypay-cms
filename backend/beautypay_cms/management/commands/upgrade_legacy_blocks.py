from django.core.management.base import BaseCommand
from cms.api import add_plugin
from beautypay_cms.models import HtmlBlock
from beautypay_cms.management.commands.seed_beautypay import add_managed_fragment


class Command(BaseCommand):
    help = "Convert existing BeautyPay HtmlBlock plugins into managed fragments with editable text/image/link fields."

    def add_arguments(self, parser):
        parser.add_argument("--language", default="fa")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        qs = HtmlBlock.objects.filter(language=options["language"]).order_by("placeholder_id", "position")
        total = qs.count()
        if options["dry_run"]:
            self.stdout.write(f"Would convert {total} HtmlBlock plugins.")
            return
        converted = fields = 0
        for old in list(qs):
            placeholder = old.placeholder
            section = {"name": old.name, "html": old.html}
            _, count = add_managed_fragment(placeholder, old.language, section, position="left", target=old)
            fields += count
            old.delete()
            converted += 1
        self.stdout.write(self.style.SUCCESS(f"Converted {converted}/{total} legacy blocks; editable fields={fields}"))
