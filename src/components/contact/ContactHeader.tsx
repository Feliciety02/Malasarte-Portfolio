import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export function ContactHeader() {
  return (
    <Reveal>
      <SectionHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s create something <span className="text-gradient">meaningful</span> together.
          </>
        }
        description="Have a project, idea, or collaboration in mind? Drop a note. I read every message."
        centered
        titleTag="h1"
        className="text-center"
        contentClassName="mx-auto max-w-3xl"
        titleClassName="text-5xl leading-[1.05] md:text-7xl"
        descriptionClassName="mx-auto max-w-xl"
      />
    </Reveal>
  );
}
