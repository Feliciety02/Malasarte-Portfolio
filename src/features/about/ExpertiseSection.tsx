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
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(expertiseAreas).map(([category, skills]) => (
            <div key={category} className="min-w-0">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
                {category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex max-w-full items-center rounded-full border border-white/10 px-4 py-2 text-sm leading-snug text-muted-foreground whitespace-normal break-words"
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
