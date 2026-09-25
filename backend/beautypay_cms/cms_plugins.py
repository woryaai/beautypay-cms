from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from .models import (
    Section, Hero, RichText, ImageBlock, Button, Card, Message, Spacer, HtmlBlock,
    Grid, Stat, FaqItem, DataTable, LogoItem, LogoCloud, Accordion, Tabs, TabItem,
    FormBlock, FormField, ManagedFragment, FragmentText, FragmentAsset, FragmentLink, FragmentAttribute,
)


class BaseBeautyPlugin(CMSPluginBase):
    module = "BeautyPay"
    render_template = "beautypay_cms/plugin.html"
    cache = True


@plugin_pool.register_plugin
class SectionPlugin(BaseBeautyPlugin):
    model = Section
    name = "Section / سکشن"
    allow_children = True
    child_classes = [
        "HeroPlugin", "RichTextPlugin", "ImageBlockPlugin", "ButtonPlugin", "CardPlugin",
        "MessagePlugin", "SpacerPlugin", "HtmlBlockPlugin", "SectionPlugin", "GridPlugin",
        "StatPlugin", "AccordionPlugin", "FaqItemPlugin", "DataTablePlugin", "LogoCloudPlugin",
        "LogoItemPlugin", "TabsPlugin", "TabItemPlugin", "FormBlockPlugin", "ManagedFragmentPlugin",
    ]


@plugin_pool.register_plugin
class HeroPlugin(BaseBeautyPlugin):
    model = Hero
    name = "Hero / هیرو"


@plugin_pool.register_plugin
class RichTextPlugin(BaseBeautyPlugin):
    model = RichText
    name = "Rich text / متن"


@plugin_pool.register_plugin
class ImageBlockPlugin(BaseBeautyPlugin):
    model = ImageBlock
    name = "Image / تصویر"


@plugin_pool.register_plugin
class ButtonPlugin(BaseBeautyPlugin):
    model = Button
    name = "Button / دکمه"


@plugin_pool.register_plugin
class CardPlugin(BaseBeautyPlugin):
    model = Card
    name = "Card / کارت"


@plugin_pool.register_plugin
class MessagePlugin(BaseBeautyPlugin):
    model = Message
    name = "Message / پیام"


@plugin_pool.register_plugin
class SpacerPlugin(BaseBeautyPlugin):
    model = Spacer
    name = "Spacer / فاصله"


@plugin_pool.register_plugin
class HtmlBlockPlugin(BaseBeautyPlugin):
    model = HtmlBlock
    name = "Legacy HTML / HTML"


@plugin_pool.register_plugin
class GridPlugin(BaseBeautyPlugin):
    model = Grid
    name = "Grid / گرید"
    allow_children = True
    child_classes = ["CardPlugin", "StatPlugin", "ImageBlockPlugin", "LogoItemPlugin", "RichTextPlugin", "ButtonPlugin", "ManagedFragmentPlugin"]


@plugin_pool.register_plugin
class StatPlugin(BaseBeautyPlugin):
    model = Stat
    name = "Stat / آمار"


@plugin_pool.register_plugin
class AccordionPlugin(BaseBeautyPlugin):
    model = Accordion
    name = "Accordion / آکاردئون"
    allow_children = True
    child_classes = ["FaqItemPlugin"]


@plugin_pool.register_plugin
class FaqItemPlugin(BaseBeautyPlugin):
    model = FaqItem
    name = "FAQ item / سوال متداول"
    require_parent = True
    parent_classes = ["AccordionPlugin"]


@plugin_pool.register_plugin
class DataTablePlugin(BaseBeautyPlugin):
    model = DataTable
    name = "Data table / جدول"


@plugin_pool.register_plugin
class LogoCloudPlugin(BaseBeautyPlugin):
    model = LogoCloud
    name = "Logo cloud / لوگوها"
    allow_children = True
    child_classes = ["LogoItemPlugin"]


@plugin_pool.register_plugin
class LogoItemPlugin(BaseBeautyPlugin):
    model = LogoItem
    name = "Logo / لوگو"
    require_parent = True
    parent_classes = ["LogoCloudPlugin", "GridPlugin"]


@plugin_pool.register_plugin
class TabsPlugin(BaseBeautyPlugin):
    model = Tabs
    name = "Tabs / تب‌ها"
    allow_children = True
    child_classes = ["TabItemPlugin"]


@plugin_pool.register_plugin
class TabItemPlugin(BaseBeautyPlugin):
    model = TabItem
    name = "Tab / تب"
    require_parent = True
    parent_classes = ["TabsPlugin"]
    allow_children = True
    child_classes = ["RichTextPlugin", "CardPlugin", "GridPlugin", "ImageBlockPlugin", "ButtonPlugin", "ManagedFragmentPlugin"]


@plugin_pool.register_plugin
class FormBlockPlugin(BaseBeautyPlugin):
    model = FormBlock
    name = "Form / فرم"
    allow_children = True
    child_classes = ["FormFieldPlugin"]


@plugin_pool.register_plugin
class FormFieldPlugin(BaseBeautyPlugin):
    model = FormField
    name = "Form field / فیلد فرم"
    require_parent = True
    parent_classes = ["FormBlockPlugin"]


@plugin_pool.register_plugin
class ManagedFragmentPlugin(BaseBeautyPlugin):
    model = ManagedFragment
    name = "Managed fragment / سکشن مدیریت‌شده"
    allow_children = True
    child_classes = ["FragmentTextPlugin", "FragmentAssetPlugin", "FragmentLinkPlugin", "FragmentAttributePlugin"]


class BaseFragmentChildPlugin(BaseBeautyPlugin):
    require_parent = True
    parent_classes = ["ManagedFragmentPlugin"]


@plugin_pool.register_plugin
class FragmentTextPlugin(BaseFragmentChildPlugin):
    model = FragmentText
    name = "Fragment text / متن سکشن"


@plugin_pool.register_plugin
class FragmentAssetPlugin(BaseFragmentChildPlugin):
    model = FragmentAsset
    name = "Fragment image / تصویر سکشن"


@plugin_pool.register_plugin
class FragmentLinkPlugin(BaseFragmentChildPlugin):
    model = FragmentLink
    name = "Fragment link / لینک سکشن"


@plugin_pool.register_plugin
class FragmentAttributePlugin(BaseFragmentChildPlugin):
    model = FragmentAttribute
    name = "Fragment field / ویژگی سکشن"
