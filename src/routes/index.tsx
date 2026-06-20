import { createFileRoute } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { AboutHubSection } from "@/components/home/AboutHubSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ProcessPreviewSection } from "@/components/home/ProcessPreviewSection";
import { MetallicPage } from "@/components/site/MetallicPage";
import {
  buildBreadcrumbSchema,
  buildCanonicalLinks,
  buildPageSchema,
  buildPersonSchema,
  buildSeoMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Portfolio",
      description:
        "Portfolio of Fe Anne Malasarte, showcasing UI/UX design, branding, web development, social media graphics, and selected creative work.",
      path: "/",
      keywords: [
        "Fe Anne Malasarte portfolio",
        "UI UX designer Philippines",
        "branding designer portfolio",
        "web developer portfolio",
      ],
      schemas: [
        buildPageSchema({
          type: "WebPage",
          name: "Fe Anne Malasarte Portfolio",
          description:
            "Portfolio of Fe Anne Malasarte, showcasing UI/UX design, branding, web development, social media graphics, and selected creative work.",
          path: "/",
        }),
        buildPersonSchema(),
        buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
      ],
    }),
    links: buildCanonicalLinks("/"),
  }),
  component: Home,
});

function Home() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;

  return (
    <MetallicPage variant="home" className="px-6 pb-0">
      <div className="-mx-6">
        <HeroBanner />
      </div>
      <div className="-mx-6">
        <MarqueeSection reducedMotion={reducedMotion} />
      </div>
      <AboutHubSection reducedMotion={reducedMotion} />
      <ProcessPreviewSection />
      <ContactCtaSection />
    </MetallicPage>
  );
}
