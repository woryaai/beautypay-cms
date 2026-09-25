import type { CmsMenuItem, CmsPage, CmsSiteSettings } from "./types";

const API_BASE = (process.env.CMS_API_URL || "http://localhost:8000/api/cms").replace(/\/$/, "");
const LANGUAGE = process.env.CMS_LANGUAGE || "fa";
const ENABLED = process.env.CMS_ENABLED !== "0";
const REVALIDATE = Number(process.env.CMS_REVALIDATE_SECONDS || "60");

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!ENABLED) return null;
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...(init?.headers || {}) },
      next: { revalidate: REVALIDATE },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    // Keep the pre-CMS static site usable during local development or CMS outages.
    return null;
  }
}

export async function getCmsPage(path = "", preview = false): Promise<CmsPage | null> {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  const suffix = normalized ? `/${normalized}` : "";
  return cmsFetch<CmsPage>(`/${LANGUAGE}/pages${suffix}/${preview ? "?preview=1" : ""}`);
}

export async function getCmsMenu(): Promise<CmsMenuItem[] | null> {
  return cmsFetch<CmsMenuItem[]>(`/${LANGUAGE}/menu/`);
}

export async function getCmsSiteSettings(): Promise<CmsSiteSettings | null> {
  return cmsFetch<CmsSiteSettings>(`/site-settings/`);
}

export function cmsMediaUrl(value: unknown): string {
  if (!value || typeof value !== "string") return "";
  if (/^https?:\/\//i.test(value)) return value;
  const origin = API_BASE.replace(/\/api\/cms$/, "");
  return `${origin}${value.startsWith("/") ? value : `/${value}`}`;
}
