import type { Project } from "@/data/projects";
import { FadeIn } from "../SectionWrappers";
import { cn } from "@/lib/utils";

export function ProcessTimeline({
  steps,
  dense = false,
}: {
  steps: Project["process"];
  dense?: boolean;
}) {
  return (
    <ol className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/10">
      {steps.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.06}>
          <li
            className={cn(
              "group grid items-start gap-6 bg-background/40 px-6 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,2fr)]",
              dense && "py-5",
            )}
          >
            <span className="font-mono text-xs text-primary">
              PH.{String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-xl font-semibold">{s.title}</p>
            <p className="text-sm leading-7 text-muted-foreground">{s.text}</p>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}
