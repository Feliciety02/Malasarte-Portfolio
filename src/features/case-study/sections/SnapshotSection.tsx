import { Calendar, Star, User, Wrench } from "lucide-react";
import { SectionAnchor, SectionLabel } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";

export function SnapshotSection({ project, sectionNumber }: SectionProps) {
  const rows = [
    { Icon: User, label: "Role", value: project.role },
    { Icon: Star, label: "Client", value: project.client },
    { Icon: Calendar, label: "Year", value: project.year },
    { Icon: Wrench, label: "Tools", value: project.tools.join(" · ") },
  ];
  return (
    <SectionAnchor id="snapshot">
      <SectionLabel kicker={sectionNumber} label="Project Snapshot" />
      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ Icon, label, value }) => (
          <div key={label} className="bg-background/40 p-5">
            <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Icon size={12} /> {label}
            </dt>
            <dd className="mt-3 break-words text-sm font-medium text-white/88">{value}</dd>
          </div>
        ))}
      </dl>
    </SectionAnchor>
  );
}
