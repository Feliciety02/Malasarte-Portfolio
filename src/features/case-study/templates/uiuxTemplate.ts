import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { WorkspaceSection } from "../sections/WorkspaceSection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";
import { CollaboratorsSection } from "../sections/CollaboratorsSection";
import { supportsProjectCollaborators } from "@/data/projects";

export const uiuxTemplate: TemplateConfig = {
  key: "uiux",
  label: "UI/UX Design",
  routeBase: "/works/ui-ux-design",
  routeCategory: "ui-ux-design",
  accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  galleryVariant: "stack",
  workspace: "figma",
  sections: [
    { id: "overview", label: "Overview", component: OverviewSection },
    { id: "problem", label: "Problem / Approach", component: ProblemApproachSection },
    { id: "screens", label: "Screens", component: WorkspaceSection },
    { id: "contributions", label: "Contributions", component: ContributionsSection },
    { id: "process", label: "Process", component: ProcessArcSection },
    { id: "outcomes", label: "Outcomes", component: OutcomesSection },
    {
      id: "collaborators",
      label: "Collaborators",
      component: CollaboratorsSection,
      condition: (project) => supportsProjectCollaborators(project),
    },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
