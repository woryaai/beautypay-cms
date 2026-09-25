from dataclasses import dataclass, field
from bs4 import BeautifulSoup, NavigableString

SKIP_TEXT_PARENTS = {"script", "style", "svg", "path", "noscript"}
EDITABLE_ATTRS = {"placeholder", "title", "aria-label", "data-label", "value"}


@dataclass
class FragmentData:
    template_html: str
    texts: list[dict] = field(default_factory=list)
    assets: list[dict] = field(default_factory=list)
    links: list[dict] = field(default_factory=list)
    attributes: list[dict] = field(default_factory=list)


def fragmentize_html(html: str) -> FragmentData:
    """Turn a legacy HTML fragment into a stable template + editable CMS slots.

    Layout/classes/interactive data attributes stay untouched. Visible copy, links,
    image sources/alts, and common form/accessibility attributes become explicit
    child records that editors can change without touching markup.
    """
    soup = BeautifulSoup(html or "", "html.parser")
    result = FragmentData(template_html="")

    # Links: keep inner DOM intact; make destination metadata editable.
    for index, tag in enumerate(soup.find_all("a")):
        url = tag.get("href", "")
        title = tag.get("title", "")
        target = tag.get("target", "")
        result.links.append({"slot_index": index, "url": url, "title": title, "target": target})
        if tag.has_attr("href"):
            tag["href"] = f"__BP_LINK_{index:04d}_URL__"
        if tag.has_attr("title"):
            tag["title"] = f"__BP_LINK_{index:04d}_TITLE__"
        if tag.has_attr("target"):
            tag["target"] = f"__BP_LINK_{index:04d}_TARGET__"

    # Images: src + alt share a single editable record.
    for index, tag in enumerate(soup.find_all("img")):
        source = tag.get("src", "")
        alt = tag.get("alt", "")
        result.assets.append({"slot_index": index, "source_url": source, "alt": alt})
        if tag.has_attr("src"):
            tag["src"] = f"__BP_ASSET_{index:04d}_SRC__"
        tag["alt"] = f"__BP_ASSET_{index:04d}_ALT__"

    # Picture/video source sets and other visible/configurable attributes.
    attr_index = 0
    for tag in soup.find_all(True):
        if tag.name == "img":
            pass
        if tag.name == "source" and tag.has_attr("srcset"):
            value = tag.get("srcset", "")
            result.attributes.append({"slot_index": attr_index, "attribute_name": "srcset", "value": value})
            tag["srcset"] = f"__BP_ATTR_{attr_index:04d}__"
            attr_index += 1
        if tag.name == "video" and tag.has_attr("poster"):
            value = tag.get("poster", "")
            result.attributes.append({"slot_index": attr_index, "attribute_name": "poster", "value": value})
            tag["poster"] = f"__BP_ATTR_{attr_index:04d}__"
            attr_index += 1
        for name in list(tag.attrs):
            if name not in EDITABLE_ATTRS:
                continue
            # Anchor title already belongs to FragmentLink; img alt belongs to FragmentAsset.
            if (tag.name == "a" and name == "title") or (tag.name == "img" and name == "alt"):
                continue
            value = tag.get(name)
            if isinstance(value, list):
                value = " ".join(str(x) for x in value)
            value = str(value or "")
            # Hidden technical values are intentionally kept as layout/behaviour, not copy.
            if tag.name == "input" and name == "value" and tag.get("type") in {"hidden", "radio", "checkbox"}:
                continue
            result.attributes.append({"slot_index": attr_index, "attribute_name": name, "value": value})
            tag[name] = f"__BP_ATTR_{attr_index:04d}__"
            attr_index += 1

    # Every visible text node is independently editable. Keeping original whitespace
    # around the token protects inline spacing and Persian punctuation.
    text_index = 0
    for node in list(soup.find_all(string=True)):
        if not isinstance(node, NavigableString) or not node.parent:
            continue
        if node.parent.name in SKIP_TEXT_PARENTS:
            continue
        raw = str(node)
        if not raw.strip():
            continue
        lead = raw[: len(raw) - len(raw.lstrip())]
        trail = raw[len(raw.rstrip()) :]
        value = raw.strip()
        token = f"__BP_TEXT_{text_index:04d}__"
        node.replace_with(NavigableString(f"{lead}{token}{trail}"))
        result.texts.append({"slot_index": text_index, "value": value})
        text_index += 1

    result.template_html = str(soup)
    return result
