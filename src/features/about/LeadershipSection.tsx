import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { leadership } from "@/data/about";
import { TimelineSection } from "./TimelineSection";

export function LeadershipSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Leadership"
          title="Organizational Experience"
          description="Roles that shaped my leadership, collaboration, and community-building skills."
        />
        <div className="mt-10">
          <TimelineSection items={leadership} />
        </div>
      </section>
    </Reveal>
  );
}
