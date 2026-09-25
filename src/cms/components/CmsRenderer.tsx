import type { CSSProperties, ReactNode } from "react";
import type { CmsPlugin } from "../types";
import { cmsMediaUrl } from "../client";

function text(value: unknown): string { return typeof value === "string" ? value : ""; }
function num(value: unknown, fallback = 0): number { return typeof value === "number" ? value : Number(value) || fallback; }
function bool(value: unknown): boolean { return Boolean(value); }
function list(value: unknown): unknown[] { return Array.isArray(value) ? value : []; }
function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char] || char);
}

function Children({ items }: { items?: CmsPlugin[] }) {
  if (!items?.length) return null;
  return <>{items.map((plugin, index) => <CmsBlock key={`${plugin.plugin_type}-${plugin.id ?? index}`} plugin={plugin} />)}</>;
}

function SectionBlock({ plugin }: { plugin: CmsPlugin }) {
  if (bool(plugin.hidden)) return null;
  const image = cmsMediaUrl(plugin.background_image);
  const style: CSSProperties = {
    ...(text(plugin.background_color) ? { backgroundColor: text(plugin.background_color) } : {}),
    ...(text(plugin.text_color) ? { color: text(plugin.text_color) } : {}),
    ...(image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
  };
  const classes = ["cms-section", `cms-section--${text(plugin.variant) || "default"}`, bool(plugin.full_height) ? "cms-section--full-height" : "", text(plugin.css_class)].filter(Boolean).join(" ");
  const inner = <Children items={plugin.children} />;
  return <section id={text(plugin.anchor) || undefined} className={classes} style={style}>{bool(plugin.full_width) ? inner : <div className="container-xl px-3">{inner}</div>}</section>;
}

function HeroBlock({ plugin }: { plugin: CmsPlugin }) {
  const image = cmsMediaUrl(plugin.image);
  return <section className={`cms-hero cms-hero--${text(plugin.align) || "start"}`}>
    <div className="container-xl px-3"><div className="cms-hero-grid"><div className="cms-hero-copy">
      {text(plugin.badge) && <span className="cms-badge">{text(plugin.badge)}</span>}
      {text(plugin.eyebrow) && <div className="cms-kicker">{text(plugin.eyebrow)}</div>}
      <h1>{text(plugin.title)}</h1>
      {text(plugin.subtitle) && <p className="cms-hero-subtitle">{text(plugin.subtitle)}</p>}
      {text(plugin.body) && <div className="cms-rich-body" dangerouslySetInnerHTML={{ __html: text(plugin.body) }} />}
      {(text(plugin.primary_label) || text(plugin.secondary_label)) && <div className="cms-actions">
        {text(plugin.primary_label) && <a className="btn-f btn-f-dark" href={text(plugin.primary_url) || "#"}>{text(plugin.primary_label)}</a>}
        {text(plugin.secondary_label) && <a className="btn-f btn-f-light" href={text(plugin.secondary_url) || "#"}>{text(plugin.secondary_label)}</a>}
      </div>}
    </div>{image && <div className="cms-hero-media"><img src={image} alt={text(plugin.image_alt)} loading="eager" /></div>}</div></div>
  </section>;
}

function RichTextBlock({ plugin }: { plugin: CmsPlugin }) {
  return <div className={`cms-rich cms-rich--${text(plugin.align) || "start"}`}>
    {text(plugin.kicker) && <div className="cms-kicker">{text(plugin.kicker)}</div>}
    {text(plugin.title) && <h2>{text(plugin.title)}</h2>}
    {text(plugin.body) && <div className="cms-rich-body" dangerouslySetInnerHTML={{ __html: text(plugin.body) }} />}
  </div>;
}

function ImageBlock({ plugin }: { plugin: CmsPlugin }) {
  const image = cmsMediaUrl(plugin.image); if (!image) return null;
  const content = <figure className={`cms-image cms-image--${text(plugin.width) || "auto"}`}><img src={image} alt={text(plugin.alt)} loading="lazy" />{text(plugin.caption) && <figcaption>{text(plugin.caption)}</figcaption>}</figure>;
  return text(plugin.link_url) ? <a href={text(plugin.link_url)}>{content}</a> : content;
}

function ButtonBlock({ plugin }: { plugin: CmsPlugin }) {
  return <a className={`btn-f cms-button cms-button--${text(plugin.style) || "primary"}`} href={text(plugin.url) || "#"} target={bool(plugin.new_tab) ? "_blank" : undefined} rel={bool(plugin.new_tab) ? "noreferrer" : undefined} aria-label={text(plugin.aria_label) || undefined}>{text(plugin.label)}</a>;
}

function CardBlock({ plugin }: { plugin: CmsPlugin }) {
  const image = cmsMediaUrl(plugin.image);
  return <article className="cms-card">{image && <img className="cms-card-image" src={image} alt={text(plugin.image_alt)} loading="lazy" />}
    <div className="cms-card-body">{text(plugin.badge) && <span className="cms-badge">{text(plugin.badge)}</span>}<h3>{text(plugin.title)}</h3>{text(plugin.body) && <div dangerouslySetInnerHTML={{ __html: text(plugin.body) }} />}{text(plugin.link_label) && <a href={text(plugin.link_url) || "#"}>{text(plugin.link_label)}</a>}</div>
  </article>;
}

function MessageBlock({ plugin }: { plugin: CmsPlugin }) {
  return <aside className={`cms-message cms-message--${text(plugin.kind) || "info"}`} role={text(plugin.kind) === "danger" ? "alert" : "status"}>{text(plugin.title) && <strong>{text(plugin.title)}</strong>}<div>{text(plugin.text)}</div>{text(plugin.button_label) && <a href={text(plugin.button_url) || "#"}>{text(plugin.button_label)}</a>}</aside>;
}

function GridBlock({ plugin }: { plugin: CmsPlugin }) {
  const style = { "--cms-cols": num(plugin.columns_desktop, 3), "--cms-cols-tablet": num(plugin.columns_tablet, 2), "--cms-cols-mobile": num(plugin.columns_mobile, 1) } as CSSProperties;
  return <div className={`cms-grid cms-grid--gap-${text(plugin.gap) || "md"} cms-grid--align-${text(plugin.align) || "stretch"} ${text(plugin.css_class)}`} style={style}><Children items={plugin.children} /></div>;
}

function StatBlock({ plugin }: { plugin: CmsPlugin }) {
  return <div className="cms-stat">{text(plugin.icon) && <span className="cms-stat-icon">{text(plugin.icon)}</span>}<div className="cms-stat-value">{text(plugin.value)}{text(plugin.suffix)}</div><div className="cms-stat-label">{text(plugin.label)}</div>{text(plugin.description) && <div className="cms-stat-description">{text(plugin.description)}</div>}</div>;
}

function FaqItemBlock({ plugin }: { plugin: CmsPlugin }) {
  return <details className="cms-faq-item" open={bool(plugin.open_by_default)}><summary>{text(plugin.question)}</summary><div className="cms-faq-answer" dangerouslySetInnerHTML={{ __html: text(plugin.answer) }} /></details>;
}
function AccordionBlock({ plugin }: { plugin: CmsPlugin }) { return <section className="cms-accordion">{text(plugin.title) && <h2>{text(plugin.title)}</h2>}<Children items={plugin.children} /></section>; }

function DataTableBlock({ plugin }: { plugin: CmsPlugin }) {
  const headers = list(plugin.headers).map(String); const rows = list(plugin.rows) as unknown[][];
  return <div className={bool(plugin.responsive) ? "table-responsive" : undefined}>{text(plugin.title) && <h3>{text(plugin.title)}</h3>}<table className={`cms-data-table ${bool(plugin.striped) ? "cms-data-table--striped" : ""}`}>{text(plugin.caption) && <caption>{text(plugin.caption)}</caption>}<thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((row, r) => <tr key={r}>{list(row).map((cell, c) => <td key={c}>{String(cell ?? "")}</td>)}</tr>)}</tbody></table></div>;
}

function LogoItemBlock({ plugin }: { plugin: CmsPlugin }) {
  const source = cmsMediaUrl(plugin.image) || text(plugin.source_url); if (!source) return null;
  const image = <img src={source} alt={text(plugin.alt) || text(plugin.name)} loading="lazy" />;
  return <div className="cms-logo-item">{text(plugin.url) ? <a href={text(plugin.url)} aria-label={text(plugin.name)}>{image}</a> : image}</div>;
}
function LogoCloudBlock({ plugin }: { plugin: CmsPlugin }) {
  const style = { "--cms-logo-cols": num(plugin.columns, 6) } as CSSProperties;
  return <section className={`cms-logo-cloud ${bool(plugin.grayscale) ? "is-grayscale" : ""}`}>{text(plugin.title) && <h2>{text(plugin.title)}</h2>}{text(plugin.description) && <p>{text(plugin.description)}</p>}<div className="cms-logo-grid" style={style}><Children items={plugin.children} /></div></section>;
}

function TabItemBlock({ plugin }: { plugin: CmsPlugin }) { return <section className="cms-tab-panel" data-tab-key={text(plugin.key)}><h3>{text(plugin.label)}</h3><Children items={plugin.children} /></section>; }
function TabsBlock({ plugin }: { plugin: CmsPlugin }) { return <section className={`cms-tabs cms-tabs--${text(plugin.style) || "pills"}`}>{text(plugin.title) && <h2>{text(plugin.title)}</h2>}<div className="cms-tab-panels"><Children items={plugin.children} /></div></section>; }

function FormFieldBlock({ plugin }: { plugin: CmsPlugin }) {
  const type = text(plugin.field_type) || "text"; const name = text(plugin.name); const id = `cms-field-${plugin.id || name}`;
  if (type === "textarea") return <label className="cms-form-field" htmlFor={id}><span>{text(plugin.label)}</span><textarea id={id} name={name} placeholder={text(plugin.input_placeholder)} required={bool(plugin.required)} />{text(plugin.help_text) && <small>{text(plugin.help_text)}</small>}</label>;
  if (type === "select") return <label className="cms-form-field" htmlFor={id}><span>{text(plugin.label)}</span><select id={id} name={name} required={bool(plugin.required)}>{list(plugin.options).map((option, i) => <option key={i} value={String(option)}>{String(option)}</option>)}</select>{text(plugin.help_text) && <small>{text(plugin.help_text)}</small>}</label>;
  if (type === "checkbox") return <label className="cms-form-field cms-form-field--checkbox"><input id={id} name={name} type="checkbox" required={bool(plugin.required)} /><span>{text(plugin.label)}</span></label>;
  return <label className="cms-form-field" htmlFor={id}><span>{text(plugin.label)}</span><input id={id} name={name} type={type} placeholder={text(plugin.input_placeholder)} required={bool(plugin.required)} />{text(plugin.help_text) && <small>{text(plugin.help_text)}</small>}</label>;
}
function FormBlock({ plugin }: { plugin: CmsPlugin }) { return <form className="cms-form" action={text(plugin.action_url) || undefined} method={(text(plugin.method) || "post") as "get" | "post"}>{text(plugin.title) && <h2>{text(plugin.title)}</h2>}{text(plugin.description) && <p>{text(plugin.description)}</p>}<div className="cms-form-fields"><Children items={plugin.children} /></div><button type="submit" className="btn-f btn-f-dark">{text(plugin.submit_label) || "ارسال"}</button></form>; }

function ManagedFragmentBlock({ plugin }: { plugin: CmsPlugin }) {
  let html = text(plugin.template_html);
  for (const child of plugin.children || []) {
    const index = String(num(child.slot_index)).padStart(4, "0");
    if (child.plugin_type === "FragmentTextPlugin") {
      html = html.replaceAll(`__BP_TEXT_${index}__`, escapeHtml(child.value));
    } else if (child.plugin_type === "FragmentAssetPlugin") {
      const source = cmsMediaUrl(child.image) || text(child.source_url);
      html = html.replaceAll(`__BP_ASSET_${index}_SRC__`, escapeHtml(source));
      html = html.replaceAll(`__BP_ASSET_${index}_ALT__`, escapeHtml(child.alt));
    } else if (child.plugin_type === "FragmentLinkPlugin") {
      html = html.replaceAll(`__BP_LINK_${index}_URL__`, escapeHtml(child.url));
      html = html.replaceAll(`__BP_LINK_${index}_TITLE__`, escapeHtml(child.title));
      html = html.replaceAll(`__BP_LINK_${index}_TARGET__`, escapeHtml(child.target));
    } else if (child.plugin_type === "FragmentAttributePlugin") {
      html = html.replaceAll(`__BP_ATTR_${index}__`, escapeHtml(child.value));
    }
  }
  // A missing child should never expose migration tokens to visitors.
  html = html.replace(/__BP_(?:TEXT|ASSET|LINK|ATTR)_[A-Z0-9_]+__/g, "");
  return <div className={`cms-managed-fragment ${text(plugin.css_class)}`} data-cms-fragment={text(plugin.name) || undefined} dangerouslySetInnerHTML={{ __html: html }} />;
}

function SpacerBlock({ plugin }: { plugin: CmsPlugin }) { return <div className={`cms-spacer cms-spacer--${text(plugin.size) || "md"}`} aria-hidden="true" />; }
function HtmlBlock({ plugin }: { plugin: CmsPlugin }) { return <div className="cms-legacy-html" dangerouslySetInnerHTML={{ __html: text(plugin.html) }} />; }

export function CmsBlock({ plugin }: { plugin: CmsPlugin }): ReactNode {
  switch (plugin.plugin_type) {
    case "SectionPlugin": return <SectionBlock plugin={plugin} />;
    case "HeroPlugin": return <HeroBlock plugin={plugin} />;
    case "RichTextPlugin": return <RichTextBlock plugin={plugin} />;
    case "ImageBlockPlugin": return <ImageBlock plugin={plugin} />;
    case "ButtonPlugin": return <ButtonBlock plugin={plugin} />;
    case "CardPlugin": return <CardBlock plugin={plugin} />;
    case "MessagePlugin": return <MessageBlock plugin={plugin} />;
    case "GridPlugin": return <GridBlock plugin={plugin} />;
    case "StatPlugin": return <StatBlock plugin={plugin} />;
    case "AccordionPlugin": return <AccordionBlock plugin={plugin} />;
    case "FaqItemPlugin": return <FaqItemBlock plugin={plugin} />;
    case "DataTablePlugin": return <DataTableBlock plugin={plugin} />;
    case "LogoCloudPlugin": return <LogoCloudBlock plugin={plugin} />;
    case "LogoItemPlugin": return <LogoItemBlock plugin={plugin} />;
    case "TabsPlugin": return <TabsBlock plugin={plugin} />;
    case "TabItemPlugin": return <TabItemBlock plugin={plugin} />;
    case "FormBlockPlugin": return <FormBlock plugin={plugin} />;
    case "FormFieldPlugin": return <FormFieldBlock plugin={plugin} />;
    case "ManagedFragmentPlugin": return <ManagedFragmentBlock plugin={plugin} />;
    case "FragmentTextPlugin": case "FragmentAssetPlugin": case "FragmentLinkPlugin": case "FragmentAttributePlugin": return null;
    case "SpacerPlugin": return <SpacerBlock plugin={plugin} />;
    case "HtmlBlockPlugin": return <HtmlBlock plugin={plugin} />;
    default: return <Children items={plugin.children} />;
  }
}

export function CmsPageContent({ plugins }: { plugins: CmsPlugin[] }) {
  return <main id="main" className="cms-page"><Children items={plugins} /></main>;
}
