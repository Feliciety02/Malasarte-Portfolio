import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const writingTemplate: TemplateConfig = {
  key: "writing",
  label: "Writing",
  routeBase: "/works/writing",
  routeCategory: "writing",
  accent: "from-emerald-400/35 via-teal-500/15 to-transparent",
  galleryVariant: "documents",
  workspace: "none",
  sections: [
    { id: "overview", label: "Overview", component: OverviewSection },
    { id: "problem", label: "Problem / Approach", component: ProblemApproachSection },
    { id: "screens", label: "Screens", component: WorkspaceSection },
    { id: "contributions", label: "Contributions", component: ContributionsSection },
    { id: "process", label: "Process", component: ProcessArcSection },
    { id: "outcomes", label: "Outcomes", component: OutcomesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
