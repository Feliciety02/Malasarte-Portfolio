import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SkillHighlightCard } from "@/components/site/SkillHighlightCard";
import { skillHighlights } from "@/data/home";

export function SkillHighlightsSection() {
  return (
    <section className="relative px-6 pb-24 pt-8 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Toolkit"
            title="Skill highlights"
            action={
              <LinkButton
                to="/skills"
                variant="text"
                className="hidden items-center md:inline-flex"
              >
                All skills <ArrowRight size={14} />
              </LinkButton>
            }
            className="mb-12"
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {skillHighlights.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.06}>
              <SkillHighlightCard
                name={skill.name}
                level={skill.level}
                delay={0.2 + index * 0.06}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
