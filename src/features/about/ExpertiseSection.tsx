import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { expertiseAreas } from "@/data/about";

export function ExpertiseSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Expertise"
          title="Areas of Expertise"
          description="The disciplines and tools I work with daily."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {Object.entries(expertiseAreas).map(([category, skills]) => (
            <div key={category}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
                {category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
