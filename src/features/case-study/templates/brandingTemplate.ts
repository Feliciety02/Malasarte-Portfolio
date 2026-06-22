import type { TemplateConfig } from "../types/templates";
import { OverviewSection } from "../sections/OverviewSection";
import { ProblemApproachSection } from "../sections/ProblemApproachSection";
import { ShowcaseSection } from "../sections/ShowcaseSection";
import { IdentitySection } from "../sections/IdentitySection";
import { ContributionsSection } from "../sections/ContributionsSection";
import { ProcessArcSection } from "../sections/ProcessArcSection";
import { DeliverablesSection } from "../sections/DeliverablesSection";
import { OutcomesSection } from "../sections/OutcomesSection";
import { RelatedProjectsSection } from "../sections/RelatedProjectsSection";

export const brandingTemplate: TemplateConfig = {
  key: "branding",
  label: "Branding",
  routeBase: "/works/branding",
  routeCategory: "branding",
  accent: "from-amber-400/40 via-rose-500/20 to-transparent",
  galleryVariant: "bento",
  workspace: "none",
  sections: [
    { id: "overview", label: "Overview", component: OverviewSection },
    { id: "problem", label: "Problem / Approach", component: ProblemApproachSection },
    { id: "showcase", label: "Showcase", component: ShowcaseSection },
    { id: "identity", label: "Identity", component: IdentitySection },
    { id: "contributions", label: "Contributions", component: ContributionsSection },
    { id: "process", label: "Process", component: ProcessArcSection },
    { id: "deliverables", label: "Deliverables", component: DeliverablesSection },
    { id: "outcomes", label: "Outcomes", component: OutcomesSection },
    { id: "next", label: "Next", component: RelatedProjectsSection },
  ],
};
