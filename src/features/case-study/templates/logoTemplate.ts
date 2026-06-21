import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { IdentitySection } from "../sections/IdentitySection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const logoTemplate: TemplateConfig = {
  key: "logo",
  label: "Logo Design",
  routeBase: "/works/logo-design",
  routeCategory: "logo-design",
  accent: "from-cyan-400/40 via-teal-500/20 to-transparent",
  galleryVariant: "grid",
  workspace: "none",
  sections: [
    { id: "overview", label: "Overview", component: OverviewSection },
    { id: "problem", label: "Problem / Approach", component: ProblemApproachSection },
    { id: "identity", label: "Identity", component: IdentitySection },
    { id: "contributions", label: "Contributions", component: ContributionsSection },
    { id: "process", label: "Process", component: ProcessArcSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "outcomes", label: "Outcomes", component: OutcomesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
