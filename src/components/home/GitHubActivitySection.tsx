import { GitHubContributions } from "@/components/site/GitHubContributions";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";

export function GitHubActivitySection() {
  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader eyebrow="GitHub" title="Code Activity" className="mb-8" />
        </Reveal>
        <Reveal delay={0.1}>
          <GitHubContributions username="Feliciety02" />
        </Reveal>
      </div>
    </section>
  );
}
