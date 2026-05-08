import { createFileRoute } from "@tanstack/react-router";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SkillGroupCard } from "@/components/site/SkillGroupCard";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills - Fe Anne Malasarte" },
      { name: "description", content: "Design, tech, creative and work skills of Fe Anne Malasarte." },
      { property: "og:title", content: "Skills - Fe Anne Malasarte" },
      { property: "og:description", content: "An interactive overview of design, tech and creative skills." },
    ],
  }),
  component: Skills,
});

function Skills() {
  return (
    <div className="relative overflow-hidden px-6 pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-7xl pt-12">
        <Reveal>
          <SectionHeader
            eyebrow="Toolkit"
            title={
              <>
                Skills & <span className="text-gradient">craft</span>
              </>
            }
            description="A blend of design intuition, technical fluency, and creative discipline - refined across years of real client work."
            contentClassName="max-w-2xl"
            titleClassName="text-5xl md:text-7xl"
            titleTag="h1"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <SkillGroupCard {...group} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
