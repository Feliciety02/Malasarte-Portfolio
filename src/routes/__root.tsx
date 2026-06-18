import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { MetallicPage } from "@/components/site/MetallicPage";
import logoFe from "@/assets/logo-fe.png";
import socialPreviewImage from "@/assets/social-preview.png";
// WebGL background removed in favour of a clean monochrome canvas.

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
const socialPreviewUrl = siteUrl ? `${siteUrl}${socialPreviewImage}` : socialPreviewImage;

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

export const Route = createRootRoute({
  head: () => {
    const meta = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "A modern, animated portfolio website showcasing designer Fe Anne Malasarte's creative work and skills.",
      },
      { name: "author", content: "Fe Anne Malasarte" },
      { property: "og:site_name", content: "Fe Anne Malasarte" },
      {
        property: "og:title",
        content: "Fe Anne Malasarte",
      },
      {
        property: "og:description",
        content:
          "A modern, animated portfolio website showcasing designer Fe Anne Malasarte's creative work and skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Fe Anne Malasarte",
      },
      {
        name: "twitter:description",
        content:
          "A modern, animated portfolio website showcasing designer Fe Anne Malasarte's creative work and skills.",
      },
      {
        property: "og:image",
        content: socialPreviewUrl,
      },
      {
        name: "twitter:image",
        content: socialPreviewUrl,
      },
      {
        property: "og:image:alt",
        content: "Preview card for Fe Anne Malasarte's portfolio.",
      },
      {
        name: "twitter:image:alt",
        content: "Preview card for Fe Anne Malasarte's portfolio.",
      },
    ];

    if (siteUrl) {
      meta.push({ property: "og:url", content: siteUrl });
    }

    return {
      meta,
      links: [
        { rel: "icon", type: "image/png", href: logoFe },
        { rel: "apple-touch-icon", href: logoFe },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Inter+Tight:wght@300;400;500;600;700&display=swap",
        },
        ...(siteUrl ? [{ rel: "canonical", href: siteUrl }] : []),
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
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
