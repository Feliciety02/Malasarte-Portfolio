import { GlassDome } from "@/components/site/GlassDome";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { tools } from "@/data/home";

type ToolsStackSectionProps = {
  reducedMotion: boolean;
};

export function ToolsStackSection({ reducedMotion }: ToolsStackSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--glow-purple) 18%, transparent), transparent 60%), linear-gradient(180deg, transparent, color-mix(in oklab, var(--glow-blue) 8%, transparent), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Tools I use"
            title={
              <>
                My everyday <span className="text-gradient">stack</span>
              </>
            }
            description="Drag the tools inside the glass globe and they respond with real weight, soft collisions, and a natural settle at rest."
            centered
            className="mb-10"
            contentClassName="max-w-xl"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <GlassDome tools={tools} reducedMotion={reducedMotion} />
        </Reveal>
        <ul aria-label="Design tools I use every day" className="sr-only">
          {tools.map((tool) => (
            <li key={tool.slug}>{tool.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
