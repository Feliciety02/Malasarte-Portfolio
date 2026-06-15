import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { education } from "@/data/about";
import { TimelineSection } from "./TimelineSection";

export function EducationSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Education"
          title="Academic Background"
          description="A journey from special science education to a degree in computer science."
        />
        <div className="mt-10">
          <TimelineSection items={education} />
        </div>
      </section>
    </Reveal>
  );
}
