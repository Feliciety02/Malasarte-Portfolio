import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";
import type { Project } from "@/data/projects";

export function DeliverablesSection({ project, sectionNumber }: SectionProps) {
  const deliverables = getProjectDeliverables(project);
  if (deliverables.length === 0) return null;

  return (
    <SectionAnchor id="deliverables">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Deliverables" />
        <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
          {accentLastWord("What was handed off")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Final outputs prepared for practical use, presentation, and consistent application beyond
          the case study.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {deliverables.map((deliverable, index) => (
          <FadeIn key={deliverable.title} delay={index * 0.05}>
            <article className="metal-card flex h-full gap-5 p-5 sm:p-6">
              <span className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white/90">
                  {deliverable.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {deliverable.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionAnchor>
  );
}

type DeliverableDetail = {
  title: string;
  description: string;
};

function getProjectDeliverables(project: Project): DeliverableDetail[] {
  const explicitDeliverables = project.branding?.deliverables ?? [];
  const galleryDeliverables = project.gallery.map((item) => item.label);
  const titles = [...new Set([...explicitDeliverables, ...galleryDeliverables])].slice(0, 4);

  if (titles.length >= 3) {
    return titles.map((title) => ({
      title,
      description: describeDeliverable(title, project),
    }));
  }

  const fallbacks = getFallbackDeliverables(project);
  const merged = [...titles, ...fallbacks.map((item) => item.title)];
  const uniqueTitles = [...new Set(merged)].slice(0, 4);

  return uniqueTitles.map((title) => {
    const fallback = fallbacks.find((item) => item.title === title);
    return fallback ?? { title, description: describeDeliverable(title, project) };
  });
}

function describeDeliverable(title: string, project: Project) {
  const normalized = title.toLowerCase();

  if (/(logo|mark|identity|lockup)/.test(normalized)) {
    return `A polished ${title.toLowerCase()} prepared to keep ${project.title} recognizable and consistent across different sizes and applications.`;
  }
  if (/(brand board|color|palette|typography|guideline)/.test(normalized)) {
    return `A concise visual reference documenting the key brand choices, hierarchy, and usage direction for ${project.title}.`;
  }
  if (/(dashboard|screen|module|flow|navigation|landing|profile|interface)/.test(normalized)) {
    return `A refined ${title.toLowerCase()} covering the core interface structure, important states, and responsive behavior.`;
  }
  if (/(packaging|stationery|uniform|vehicle|equipment|application|mockup)/.test(normalized)) {
    return `A practical ${title.toLowerCase()} showing how the final design system carries into a real-world touchpoint.`;
  }
  if (/(cover|chapter|content|writing|interior|document)/.test(normalized)) {
    return `A publication-ready ${title.toLowerCase()} organized for clear reading, consistent pacing, and straightforward handoff.`;
  }
  if (/(campaign|promo|announcement|social|graphic|asset)/.test(normalized)) {
    return `A reusable ${title.toLowerCase()} prepared for consistent publishing across the intended campaign and digital channels.`;
  }

  return `${title} refined as a presentation-ready output that supports the goals and visual direction of ${project.title}.`;
}

function getFallbackDeliverables(project: Project): DeliverableDetail[] {
  const byKind: Record<Project["kind"], DeliverableDetail[]> = {
    uiux: [
      {
        title: "High-fidelity screen set",
        description:
          "Polished interface screens covering the main user journey, content hierarchy, and key interaction states.",
      },
      {
        title: "Reusable UI system",
        description:
          "Consistent components, spacing, typography, and visual states prepared for future screens and iteration.",
      },
      {
        title: "Design handoff",
        description:
          "Organized design assets and implementation guidance prepared for a smoother development handoff.",
      },
    ],
    frontend: [
      {
        title: "Responsive web build",
        description:
          "A working implementation structured to adapt cleanly across desktop, tablet, and mobile layouts.",
      },
      {
        title: "Reusable components",
        description:
          "Shared interface components and states organized for consistency, maintenance, and future expansion.",
      },
      {
        title: "Deployment-ready package",
        description:
          "Production-ready source, assets, and configuration prepared for deployment and continued development.",
      },
    ],
    branding: [
      {
        title: "Primary identity suite",
        description:
          "Primary and supporting identity variations prepared for consistent use across core brand touchpoints.",
      },
      {
        title: "Brand foundations",
        description:
          "Color, typography, and visual direction documented to support consistent future brand decisions.",
      },
      {
        title: "Application mockups",
        description:
          "Selected real-world applications demonstrating how the identity performs beyond the logo itself.",
      },
    ],
    logo: [
      {
        title: "Primary logo",
        description:
          "The finalized primary logo prepared for clear, recognizable use across print and digital formats.",
      },
      {
        title: "Logo variations",
        description:
          "Alternate lockups and simplified marks prepared for different dimensions, backgrounds, and sizes.",
      },
      {
        title: "Export package",
        description:
          "Practical logo files prepared for everyday use in presentations, social media, documents, and print.",
      },
    ],
    publication: [
      {
        title: "Final creative set",
        description:
          "Completed campaign or publication assets prepared with a consistent visual direction and hierarchy.",
      },
      {
        title: "Reusable layout system",
        description:
          "Flexible composition rules that support future content while keeping the visual language consistent.",
      },
      {
        title: "Platform-ready exports",
        description:
          "Final files sized and organized for the intended publishing channels and campaign touchpoints.",
      },
    ],
    gallery: [
      {
        title: "Curated visual set",
        description:
          "A selected collection of finished visuals organized to present the strongest work clearly.",
      },
      {
        title: "Reusable source assets",
        description:
          "Core design assets structured for updates, adaptation, and continued use after delivery.",
      },
      {
        title: "Publishing exports",
        description:
          "Final assets prepared in practical formats for sharing across the intended digital channels.",
      },
    ],
    writing: [
      {
        title: "Final manuscript",
        description:
          "A complete written deliverable refined for clarity, tone, flow, and the intended audience.",
      },
      {
        title: "Content structure",
        description:
          "A clear hierarchy of sections and supporting content designed to make the material easy to follow.",
      },
      {
        title: "Publication-ready file",
        description:
          "The final content organized and prepared for presentation, publishing, or client handoff.",
      },
    ],
  };

  return byKind[project.kind];
}
