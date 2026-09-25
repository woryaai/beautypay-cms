export type CmsPlugin = {
  id?: number;
  plugin_type: string;
  parent_plugin_type?: string | null;
  children?: CmsPlugin[];
  [key: string]: unknown;
};

export type CmsPlaceholder = {
  slot: string;
  label: string;
  language: string;
  content?: CmsPlugin[];
};

export type CmsPage = {
  title: string;
  page_title: string;
  menu_title: string;
  meta_description: string;
  redirect?: string;
  path: string;
  template: "consumer" | "business" | "plain" | string;
  language: string;
  is_home: boolean;
  changed_date?: string;
  placeholders: CmsPlaceholder[];
};

export type CmsMenuItem = {
  title?: string;
  menu_title?: string;
  url?: string;
  absolute_url?: string;
  path?: string;
  selected?: boolean;
  ancestor?: boolean;
  children?: CmsMenuItem[];
  [key: string]: unknown;
};

export type CmsSiteSettings = {
  site_name?: string;
  logo?: string;
  logo_alt?: string;
  default_announcement?: string;
  phone?: string;
  email?: string;
  address?: string;
  instagram_url?: string;
  linkedin_url?: string;
  app_store_url?: string;
  google_play_url?: string;
  footer_text?: string;
  header_business_label?: string;
  header_consumer_label?: string;
  login_label?: string;
  primary_cta_label?: string;
  primary_cta_url?: string;
  footer_pages_title?: string;
  footer_contact_title?: string;
  footer_social_title?: string;
  footer_app_title?: string;
  footer_copyright?: string;
  mobile_nav?: Array<{label?: string; url?: string; icon?: string; page_key?: string}>;
  assistant_title?: string;
  assistant_subtitle?: string;
  assistant_welcome_messages?: string[];
  assistant_faq?: Array<{question?: string; answer?: string}>;
  assistant_fallback_answer?: string;
  assistant_launcher_label?: string;
  assistant_demo_note?: string;
  assistant_strings?: Record<string, string>;
  footer_legal_links?: Array<{label?: string; url?: string}>;
};
