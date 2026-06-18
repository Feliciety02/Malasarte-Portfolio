import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const brandingTemplate: TemplateConfig = {
  key: "branding",
  label: "Branding",
  routeBase: "/works/branding",
  routeCategory: "branding",
  accent: "from-amber-400/40 via-rose-500/20 to-transparent",
  galleryVariant: "grid",
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
