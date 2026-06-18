import { accentLastWord } from "@/components/site/HeadingAccent";
import { getProjectCoverImage } from "@/data/projectImages";
import type { Project } from "@/data/projects";
import { SectionAnchor, SectionLabel, FadeIn } from "./-sections";
import { GalleryGrid, FlipbookEmbed } from "./-gallery";
import {
  FocusGrid,
  BrandSymbolBlock,
  BrandColorPalette,
  BrandTypographyBlock,
  BrandPersonalityList,
} from "./-blocks";
import { getProjectSection, type BodyProps } from "./-config";

export function GalleryOnlyBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="showcase" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="01" label="Gallery" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Visual showcase")}
        </h2>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
    </SectionAnchor>
  );
}

export function ProductBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="showcase">
      <FadeIn>
        <SectionLabel kicker="03" label="Showcase" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Screens in motion")}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          Swipe through high-fidelity surfaces. Tap any frame to open the lightbox.
        </p>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="stack" />
    </SectionAnchor>
  );
}

export function DevelopmentBody({ project, openLightbox }: BodyProps) {
  const hasLiveBuild = Boolean(project.vercelLiveUrl?.trim()) && !project.hideLiveWorkspace;

  if (hasLiveBuild) return null;

  return (
    <SectionAnchor id="features">
      <FadeIn>
        <SectionLabel kicker="03" label="Features" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Interface and implementation")}
        </h2>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="grid" />
    </SectionAnchor>
  );
}

export function BrandingBody({ project }: { project: Project }) {
  const branding = project.branding;
  const identityImage = branding?.symbol?.image ?? getProjectCoverImage(project);
  const identityImages = branding?.identityImages?.length
    ? branding.identityImages
    : identityImage
      ? [
          {
            src: identityImage,
            alt: branding?.symbol?.title ?? `${project.title} visual identity`,
          },
        ]
      : [];
  const hasRichBranding =
    identityImages.length > 0 ||
    Boolean(branding?.symbol) ||
    Boolean(branding?.colors?.length) ||
    Boolean(branding?.typography) ||
    Boolean(branding?.personality?.length);

  return (
    <>
      <SectionAnchor id="identity">
        <FadeIn>
          <SectionLabel kicker="02" label="Identity" />
          <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
            {accentLastWord("Visual identity")}
          </h2>
        </FadeIn>
        {hasRichBranding ? (
          <div className="mt-8 space-y-14">
            {identityImages.map((image, index) => (
              <FadeIn key={image.src} delay={index * 0.06}>
                <figure>
                  {image.title || image.description ? (
                    <figcaption className="mb-5 max-w-3xl">
                      {image.title ? (
                        <h3 className="font-display text-xl font-semibold text-white/90 md:text-2xl">
                          {image.title}
                        </h3>
                      ) : null}
                      {image.description ? (
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {image.description}
                        </p>
                      ) : null}
                    </figcaption>
                  ) : null}
                  <div className="flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:p-5 md:min-h-[40rem] md:p-8">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </FadeIn>
            ))}
            {branding?.symbol && !identityImages.length ? (
              <BrandSymbolBlock symbol={branding.symbol} />
            ) : null}
            {branding?.colors?.length ? <BrandColorPalette colors={branding.colors} /> : null}
            {branding?.typography ? (
              <BrandTypographyBlock typography={branding.typography} />
            ) : null}
            {branding?.personality?.length ? (
              <BrandPersonalityList personality={branding.personality} />
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <FocusGrid areas={project.focusAreas} />
          </div>
        )}
      </SectionAnchor>
    </>
  );
}

export function CreativeBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="assets">
      <FadeIn>
        <SectionLabel kicker="02" label="Assets" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Magazine-style assembly")}
        </h2>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
    </SectionAnchor>
  );
}

export function WritingBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="showcase">
      <FadeIn>
        <SectionLabel kicker="02" label="Preview" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
          {accentLastWord("Document preview")}
        </h2>
      </FadeIn>
      {project.flipbookEmbed ? (
        <FlipbookEmbed embed={project.flipbookEmbed} />
      ) : (
        <GalleryGrid project={project} openLightbox={openLightbox} variant="documents" />
      )}
    </SectionAnchor>
  );
}

export function LogoBody({ project }: { project: Project }) {
  const branding = project.branding;
  const identityImage = branding?.symbol?.image ?? getProjectCoverImage(project);

  return (
    <SectionAnchor id="identity">
      {identityImage ? (
        <div className="flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:min-h-[40rem] md:p-10">
          <img
            src={identityImage}
            alt={branding?.symbol?.title ?? `${project.title} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : null}
    </SectionAnchor>
  );
}

type DeliverableDetail = {
  title: string;
  description: string;
};

export function ProjectDeliverables({ project }: { project: Project }) {
  const section = getProjectSection(project, "deliverables");
  const deliverables = getProjectDeliverables(project);

  return (
    <SectionAnchor id="deliverables">
      <FadeIn>
        <SectionLabel kicker={section.number} label="Deliverables" />
        <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
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
