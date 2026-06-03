import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { experienceStats, experienceTimeline } from "@/data/home";

export function ExperienceSnapshotSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Experience Snapshot"
            title="Quick signals recruiters can scan fast"
            description="A short summary of experience, scope, and the roles that shaped the work shown below."
            action={
              <LinkButton to="/about" variant="text" className="hidden items-center md:inline-flex">
                Full profile <ArrowRight size={14} />
              </LinkButton>
            }
            className="mb-12"
            contentClassName="max-w-2xl"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {experienceStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] glass-strong p-6 text-center">
                  <div className="font-display text-3xl font-bold text-gradient md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[1.75rem] glass p-6 md:p-7">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Recent roles
              </div>
              <div className="mt-5 space-y-4">
                {experienceTimeline.map((entry) => (
                  <div
                    key={`${entry.year}-${entry.role}`}
                    className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/20 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="font-display text-lg font-semibold">{entry.role}</div>
                      <div className="text-sm text-muted-foreground">{entry.place}</div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-primary">
                      {entry.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
