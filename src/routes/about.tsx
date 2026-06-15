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

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Meet Fe Anne - a creative designer with roots in tech orgs, branding, and storytelling.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "A short, honest introduction to a designer who loves quiet details.",
      },
    ],
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
