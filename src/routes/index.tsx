import { createFileRoute } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";
import { ExperienceSnapshotSection } from "@/components/home/ExperienceSnapshotSection";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { GitHubActivitySection } from "@/components/home/GitHubActivitySection";
import { HeroBanner } from "@/components/home/HeroBanner";
import { MarqueeSection } from "@/components/home/MarqueeSection";
import { ProcessPreviewSection } from "@/components/home/ProcessPreviewSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { SkillHighlightsSection } from "@/components/home/SkillHighlightsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ToolsStackSection } from "@/components/home/ToolsStackSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte - Creative Designer & UI/UX Storyteller" },
      {
        name: "description",
        content: "Portfolio home of Fe Anne Malasarte - UI/UX, branding, and creative design.",
      },
      { property: "og:title", content: "Fe Anne Malasarte - Creative Designer" },
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
    <div className="overflow-x-hidden">
      <HeroBanner />
      <MarqueeSection reducedMotion={reducedMotion} />
      <SkillHighlightsSection />
      <FeaturedProjectsSection />
      <ExperienceSnapshotSection />
      <ToolsStackSection reducedMotion={reducedMotion} />
      <ProcessPreviewSection />
      <ServicesPreviewSection reducedMotion={reducedMotion} />
      <TestimonialsSection />
      <AboutPreviewSection />
      <GitHubActivitySection />
      <ContactCtaSection />
    </div>
  );
}
