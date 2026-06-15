import { createFileRoute } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { AboutHubSection } from "@/components/home/AboutHubSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ProcessPreviewSection } from "@/components/home/ProcessPreviewSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { MetallicPage } from "@/components/site/MetallicPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content: "Portfolio home of Fe Anne Malasarte - UI/UX, branding, and creative design.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "Crafting meaningful, beautifully animated digital experiences.",
      },
    ],
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
      <ServicesPreviewSection reducedMotion={reducedMotion} />
      <ContactCtaSection />
    </MetallicPage>
  );
}
