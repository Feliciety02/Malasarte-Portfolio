import type { Project } from "@/data/projects";
import { FadeIn } from "../SectionWrappers";
import { cn } from "@/lib/utils";

export function FocusGrid({
  areas,
  columns = 3,
}: {
  areas: Project["focusAreas"];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "mt-10 grid gap-5",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {areas.map((area, i) => (
        <FadeIn key={area.title} delay={i * 0.05}>
          <div className="metal-card h-full p-6">
            <span className="font-mono text-xs text-primary">
              .{String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.text}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
