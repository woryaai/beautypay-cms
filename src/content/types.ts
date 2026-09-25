export type HeaderVariant = "consumer" | "business";

export interface PageDefinition {
  route: string;
  title: string;
  description: string;
  header: HeaderVariant;
  pageKey: string;
  bodyClasses: readonly string[];
  data: Readonly<Record<string, string>>;
  scripts: readonly string[];
  redirectTo: string | null;
}
