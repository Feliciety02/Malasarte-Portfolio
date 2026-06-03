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
            "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.08), transparent 60%), repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 12px)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Tools I use"
            title="My everyday stack"
            description="Drag the tools inside the metal dome and they respond with real weight, soft collisions, and a natural settle at rest."
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
