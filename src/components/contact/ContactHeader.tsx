import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export function ContactHeader() {
  return (
    <Reveal>
      <SectionHeader
        eyebrow="Contact"
        title={
          <>
            A clean channel for focused project conversations.
          </>
        }
        description="Have a project, idea, or collaboration in mind? Send the essentials and I will reply with scope, timing, and next steps."
        centered
        titleTag="h1"
        className="text-center"
        contentClassName="mx-auto max-w-3xl"
        titleClassName="text-4xl leading-tight sm:text-5xl md:text-7xl"
        descriptionClassName="mx-auto max-w-xl"
      />
    </Reveal>
  );
}
