import { createFileRoute } from "@tanstack/react-router";
import { MetallicPage } from "@/components/site/MetallicPage";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SkillGroupCard } from "@/components/site/SkillGroupCard";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills - Fe Anne Malasarte" },
      {
        name: "description",
        content: "Design, tech, creative and work skills of Fe Anne Malasarte.",
      },
      { property: "og:title", content: "Skills - Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "An interactive overview of design, tech and creative skills.",
      },
    ],
  }),
  component: Skills,
});

function Skills() {
  return (
    <MetallicPage variant="skills" className="px-6 pb-28">
      <section className="mx-auto max-w-7xl pt-12 md:pt-20">
        <Reveal>
          <SectionHeader
            eyebrow="Core strengths"
            title="Skills & craft"
            description="A blend of design intuition, technical fluency, and creative discipline - refined across years of real client work."
            contentClassName="max-w-2xl"
            titleClassName="text-4xl sm:text-5xl md:text-7xl"
            descriptionClassName="leading-7"
            titleTag="h1"
          />
        </Reveal>

        <div className="metal-rail mt-10" />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <SkillGroupCard {...group} />
            </Reveal>
          ))}
        </div>
      </section>
    </MetallicPage>
  );
}
