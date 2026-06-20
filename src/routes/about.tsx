import { createFileRoute } from "@tanstack/react-router";
import { MetallicPage } from "@/components/site/MetallicPage";
import { AboutHeroSection } from "@/features/about/AboutHeroSection";
import { ExperienceSection } from "@/features/about/ExperienceSection";
import { LeadershipSection } from "@/features/about/LeadershipSection";
import { EducationSection } from "@/features/about/EducationSection";
import { ExpertiseSection } from "@/features/about/ExpertiseSection";
import { RecognitionSection } from "@/features/about/RecognitionSection";
import { CredentialsSection } from "@/features/about/CredentialsSection";
import { SpeakingSection } from "@/features/about/SpeakingSection";
import { VolunteerSection } from "@/features/about/VolunteerSection";
import { ConferencesSection } from "@/features/about/ConferencesSection";
import { GitHubActivitySection } from "@/features/about/GitHubActivitySection";
import {
  buildBreadcrumbSchema,
  buildCanonicalLinks,
  buildPageSchema,
  buildPersonSchema,
  buildSeoMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildSeoMeta({
      title: "About",
      description:
        "Learn more about Fe Anne Malasarte, a designer and developer with experience in UI/UX, branding, student leadership, community work, and creative storytelling.",
      path: "/about",
      type: "profile",
      keywords: [
        "about Fe Anne Malasarte",
        "designer developer profile",
        "UI UX designer Davao",
        "creative portfolio about page",
      ],
      schemas: [
        buildPageSchema({
          type: "AboutPage",
          name: "About Fe Anne Malasarte",
          description:
            "Learn more about Fe Anne Malasarte, a designer and developer with experience in UI/UX, branding, student leadership, community work, and creative storytelling.",
          path: "/about",
        }),
        buildPersonSchema(),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
    links: buildCanonicalLinks("/about"),
  }),
  component: About,
});

function About() {
  return (
    <MetallicPage variant="about" className="px-6 pb-20">
      <AboutHeroSection />
      <ExperienceSection />
      <LeadershipSection />
      <EducationSection />
      <ExpertiseSection />
      <RecognitionSection />
      <CredentialsSection />
      <SpeakingSection />
      <VolunteerSection />
      <ConferencesSection />
      <GitHubActivitySection />
    </MetallicPage>
  );
}
