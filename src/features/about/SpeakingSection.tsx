import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import umsdcTraining from "@/assets/Events/UMSDC Internal Training – Basics of Figma.webp";

export function SpeakingSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Speaking"
          title="Speaking Engagements"
          description="Sharing knowledge through talks and workshops."
        />
        <div className="metal-panel mt-10 flex items-start gap-6 rounded-xl p-6 sm:p-8">
          <img
            src={umsdcTraining}
            alt=""
            className="metal-panel h-48 w-48 shrink-0 rounded-lg object-cover"
          />
          <div>
            <span className="font-mono text-sm uppercase tracking-widest text-primary">
              January 24, 2025
            </span>
            <h3 className="mt-2 font-display text-lg font-bold">
              UMSDC Internal Training â€“ Basics of Figma
            </h3>
            <p className="mt-1 text-base font-medium text-primary">Speaker</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Delivered a training session covering UI/UX fundamentals, design thinking,
              wireframing, prototyping, and Figma workflows.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
