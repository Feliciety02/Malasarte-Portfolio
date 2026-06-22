import {
  Outlet,
  Link,
  createRootRoute,
  Scripts,
  HeadContent,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { MetallicPage } from "@/components/site/MetallicPage";
import logoFe from "@/assets/logo-fe.png";
import {
  buildPersonSchema,
  buildWebsiteSchema,
  defaultSocialImageUrl,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";
// WebGL background removed in favour of a clean monochrome canvas.

function NotFoundComponent() {
  return (
    <MetallicPage variant="contact" className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like this page wandered off the canvas.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="metal-cta inline-flex rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Back home
          </Link>
        </div>
      </div>
    </MetallicPage>
  );
}

const rootMeta = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { title: SITE_NAME },
  { name: "description", content: DEFAULT_DESCRIPTION },
  { name: "author", content: SITE_NAME },
  { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
  { name: "theme-color", content: "#090a0c" },
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:title", content: SITE_NAME },
  { property: "og:description", content: DEFAULT_DESCRIPTION },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_PH" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: SITE_NAME },
  { name: "twitter:description", content: DEFAULT_DESCRIPTION },
  { property: "og:image", content: defaultSocialImageUrl },
  { name: "twitter:image", content: defaultSocialImageUrl },
  { property: "og:image:alt", content: "Preview card for Fe Anne Malasarte's portfolio." },
  { name: "twitter:image:alt", content: "Preview card for Fe Anne Malasarte's portfolio." },
  { "script:ld+json": buildWebsiteSchema() },
  { "script:ld+json": buildPersonSchema() },
];

const rootLinks = [
  { rel: "icon", type: "image/png", href: logoFe },
  { rel: "apple-touch-icon", href: logoFe },
  { rel: "stylesheet", href: appCss },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@300;400;500;600;700&display=swap" },
];

export const Route = createRootRoute({
  head: () => ({
    meta: rootMeta,
    links: rootLinks,
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className="relative" suppressHydrationWarning>
      <head suppressHydrationWarning />
      <body suppressHydrationWarning>
        <HeadContent />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <LoadingScreen />
      <Nav />
      <main className="min-h-[calc(100svh-6rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
