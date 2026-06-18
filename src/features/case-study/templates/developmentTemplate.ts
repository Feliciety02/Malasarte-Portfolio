import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const developmentTemplate: TemplateConfig = {
  key: "development",
  label: "Web Development",
  routeBase: "/works/web-development",
  routeCategory: "web-development",
  accent: "from-sky-400/40 via-cyan-500/20 to-transparent",
  galleryVariant: "grid",
  workspace: "live-preview",
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
