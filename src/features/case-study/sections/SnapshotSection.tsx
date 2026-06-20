import { Calendar, Star, User, Users, Wrench } from "lucide-react";
import { supportsProjectCollaborators } from "@/data/projects";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";

export function SnapshotSection({ project, sectionNumber }: SectionProps) {
  const rows = [
    { Icon: User, label: "Role", value: project.role },
    { Icon: Star, label: "Client", value: project.client },
    { Icon: Calendar, label: "Year", value: project.year },
    ...(supportsProjectCollaborators(project) && project.collaborators?.length
      ? [
          {
            Icon: Users,
            label: "Collaborators",
            value: project.collaborators.join(" · "),
          },
        ]
      : []),
    { Icon: Wrench, label: "Tools", value: project.tools.join(" · ") },
  ];

  return (
    <SectionAnchor id="snapshot">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Project Snapshot" />
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(({ Icon, label, value }) => (
            <div key={label}>
              <dt className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Icon size={13} className="text-white/30" /> {label}
              </dt>
              <dd className="mt-2 text-base font-medium text-white/88">{value}</dd>
            </div>
          ))}
        </dl>
      </FadeIn>
    </SectionAnchor>
  );
}
