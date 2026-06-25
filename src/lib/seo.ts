import socialPreviewImage from "@/assets/seo-preview.webp";
import type { Project } from "@/data/projects";
import { socialLinks } from "@/data/site";
import { getProjectPath } from "@/features/case-study/routes/getProjectPath";

const DEFAULT_SITE_URL = "https://malasarte-portfolio.vercel.app";
const SITE_NAME = "Fe Anne Malasarte";
const DEFAULT_DESCRIPTION =
  "Portfolio of Fe Anne Malasarte, featuring UI/UX design, branding, web development, social media graphics, and creative case studies.";

export const siteUrl = (import.meta.env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/$/, "");
export const defaultSocialImageUrl = buildAbsoluteUrl(socialPreviewImage);

type SchemaEntry = {
  "script:ld+json": Record<string, unknown>;
};

type SeoMetaEntry =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | SchemaEntry;

type BuildSeoMetaInput = {
  title: string;
  description?: string;
  path?: string;
  type?: "website" | "article" | "profile";
  image?: string;
  keywords?: string[];
  schemas?: Record<string, unknown>[];
};

export function buildAbsoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildTitle(pageTitle: string): string {
  return pageTitle === SITE_NAME ? SITE_NAME : `${pageTitle} | ${SITE_NAME}`;
}

export function normalizeDescription(description?: string, maxLength = 160): string {
  const clean = (description || DEFAULT_DESCRIPTION).replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 3).trimEnd()}...`;
}

export function buildCanonicalLinks(path = "/") {
  return [{ rel: "canonical", href: buildAbsoluteUrl(path) }];
}

export function buildSeoMeta({
  title,
  description,
  path = "/",
  type = "website",
  image = defaultSocialImageUrl,
  keywords,
  schemas = [],
}: BuildSeoMetaInput): SeoMetaEntry[] {
  const fullTitle = buildTitle(title);
  const normalizedDescription = normalizeDescription(description);
  const url = buildAbsoluteUrl(path);

  const meta: SeoMetaEntry[] = [
    { title: fullTitle },
    { name: "description", content: normalizedDescription },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: normalizedDescription },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: normalizedDescription },
    { name: "twitter:image", content: image },
  ];

  if (keywords?.length) {
    meta.push({ name: "keywords", content: keywords.join(", ") });
  }

  for (const schema of schemas) {
    meta.push({ "script:ld+json": schema });
  }

  return meta;
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-PH",
  };
}

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: siteUrl,
    jobTitle: "UI/UX Designer, Branding Designer, and Web Developer",
    description: DEFAULT_DESCRIPTION,
    email: "mailto:feannemlsrte@gmail.com",
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function buildPageSchema({
  type,
  name,
  description,
  path,
}: {
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description: normalizeDescription(description, 220),
    url: buildAbsoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: siteUrl,
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

export function buildCollectionSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: normalizeDescription(description, 220),
    url: buildAbsoluteUrl(path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildAbsoluteUrl(item.path),
        name: item.name,
      })),
    },
  };
}

export function buildProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: normalizeDescription(project.overview || project.desc, 220),
    url: buildAbsoluteUrl(getProjectPath(project)),
    creator: {
      "@type": "Person",
      name: SITE_NAME,
      url: siteUrl,
    },
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: siteUrl,
    },
    about: project.cat,
    keywords: [project.cat, ...(project.categories ?? []), ...project.tools],
    datePublished: project.year,
    dateCreated: project.year,
    genre: project.tag,
  };
}

export { DEFAULT_DESCRIPTION, SITE_NAME };
