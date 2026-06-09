import { Layers } from "lucide-react";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./sections";
import { GalleryGrid, FlipbookEmbed } from "./gallery";
import {
  EditorialBlock,
  GoalsList,
  ProcessTimeline,
  FocusGrid,
  ChallengesBlock,
  BrandResearchBlock,
  BrandSymbolBlock,
  BrandColorPalette,
  BrandTypographyBlock,
  BrandPersonalityList,
  BrandListBlock,
} from "./blocks";
import type { BodyProps, StructuredBodyProps } from "./config";

export function GalleryOnlyBody({ project, openLightbox }: BodyProps) {
  return (
    <SectionAnchor id="showcase" className="pt-16 md:pt-24">
      <FadeIn>
        <SectionLabel kicker="01" label="Gallery" />
        <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
          {accentLastWord("Visual showcase")}
        </h2>
      </FadeIn>
      <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
    </SectionAnchor>
  );
}

export function ProductBody({ project, openLightbox }: BodyProps) {
  return (
    <>
      <SectionAnchor id="problem">
        <EditorialBlock
          kicker="03"
          label="Problem"
          title="The problem we set out to solve"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="goals">
        <FadeIn>
          <SectionLabel kicker="04" label="Goals" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What success looked like")}
          </h2>
        </FadeIn>
        <GoalsList goals={project.goals} />
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker="05" label="Process" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From research to refinement")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} />
      </SectionAnchor>
      <SectionAnchor id="decisions">
        <FadeIn>
          <SectionLabel kicker="06" label="Decisions" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Choices that shaped the product")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} />
      </SectionAnchor>
      <SectionAnchor id="showcase">
        <FadeIn>
          <SectionLabel kicker="07" label="Showcase" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Screens in motion")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Swipe through high-fidelity surfaces. Tap any frame to open the lightbox.
          </p>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="stack" />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker="08" label="Challenges" />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What we had to solve")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

export function DevelopmentBody({
  project,
  openLightbox,
  sectionMeta,
}: StructuredBodyProps) {
  const hasLiveBuild = Boolean(project.vercelLiveUrl?.trim()) && !project.hideLiveWorkspace;

  return (
    <>
      <SectionAnchor id="problem">
        <EditorialBlock
          kicker={sectionMeta("problem").number}
          label={sectionMeta("problem").label}
          title="The technical brief"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="stack">
        <FadeIn>
          <SectionLabel
            kicker={sectionMeta("stack").number}
            label={sectionMeta("stack").label}
          />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Tools behind the build")}
          </h2>
        </FadeIn>
        <div className="mt-10 flex flex-wrap gap-3">
          {project.tools.map((t, i) => (
            <FadeIn key={t} delay={i * 0.04}>
              <span className="metal-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
                <Layers size={13} className="text-primary" /> {t}
              </span>
            </FadeIn>
          ))}
        </div>
      </SectionAnchor>
      <SectionAnchor id="architecture">
        <FadeIn>
          <SectionLabel
            kicker={sectionMeta("architecture").number}
            label={sectionMeta("architecture").label}
          />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("How the system fits together")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} columns={2} />
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel
            kicker={sectionMeta("process").number}
            label={sectionMeta("process").label}
          />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Phases that shipped the product")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel
            kicker={sectionMeta("challenges").number}
            label={sectionMeta("challenges").label}
          />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Problems worth solving")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
      {hasLiveBuild ? null : (
        <SectionAnchor id="features">
          <FadeIn>
            <SectionLabel
              kicker={sectionMeta("features").number}
              label={sectionMeta("features").label}
            />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("Interface and implementation")}
            </h2>
          </FadeIn>
          <GalleryGrid project={project} openLightbox={openLightbox} variant="grid" />
        </SectionAnchor>
      )}
    </>
  );
}

export function BrandingBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const story = sectionMeta("story");
  const strategy = sectionMeta("strategy");
  const research = sectionMeta("research");
  const identity = sectionMeta("identity");
  const deliverables = sectionMeta("deliverables");
  const process = sectionMeta("process");
  const challenges = sectionMeta("challenges");
  const branding = project.branding;
  const hasRichBranding =
    Boolean(branding?.symbol) ||
    Boolean(branding?.colors?.length) ||
    Boolean(branding?.typography) ||
    Boolean(branding?.personality?.length);

  return (
    <>
      <SectionAnchor id="story">
        <EditorialBlock
          kicker={story.number}
          label={story.label}
          title="The brand story"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="strategy">
        <FadeIn>
          <SectionLabel kicker={strategy.number} label={strategy.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What the identity had to do")}
          </h2>
        </FadeIn>
        <GoalsList goals={project.goals} />
      </SectionAnchor>
      {branding?.research ? (
        <SectionAnchor id="research">
          <FadeIn>
            <SectionLabel kicker={research.number} label={research.label} />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("Research & discovery")}
            </h2>
          </FadeIn>
          <BrandResearchBlock research={branding.research} />
        </SectionAnchor>
      ) : null}
      <SectionAnchor id="identity">
        {hasRichBranding ? (
          <div className="mt-2 space-y-14">
            {branding?.symbol?.image ? (
              <div className="metal-card flex min-h-[28rem] items-center justify-center overflow-hidden p-6 md:min-h-[40rem] md:p-10">
                <img
                  src={branding.symbol.image}
                  alt={branding.symbol.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : null}
            {branding?.symbol && !branding.symbol.image ? (
              <BrandSymbolBlock symbol={branding.symbol} />
            ) : null}
            {branding?.colors?.length ? <BrandColorPalette colors={branding.colors} /> : null}
            {branding?.typography ? <BrandTypographyBlock typography={branding.typography} /> : null}
            {branding?.personality?.length ? (
              <BrandPersonalityList personality={branding.personality} />
            ) : null}
          </div>
        ) : (
          <FadeIn>
            <SectionLabel kicker={identity.number} label={identity.label} />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("Building the visual language")}
            </h2>
            <div className="mt-10">
              <FocusGrid areas={project.focusAreas} />
            </div>
          </FadeIn>
        )}
      </SectionAnchor>
      {branding?.deliverables?.length ? (
        <SectionAnchor id="deliverables">
          <FadeIn>
            <SectionLabel kicker={deliverables.number} label={deliverables.label} />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("What was handed off")}
            </h2>
          </FadeIn>
          <BrandListBlock items={branding.deliverables} columns={2} />
        </SectionAnchor>
      ) : null}
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker={process.number} label={process.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From concept to deliverable")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Where the system was tested")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

export function CreativeBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const overview = sectionMeta("overview");
  const direction = sectionMeta("direction");
  const assets = sectionMeta("assets");
  const rollout = sectionMeta("rollout");
  const challenges = sectionMeta("challenges");

  return (
    <>
      <SectionAnchor id="overview">
        <EditorialBlock
          kicker={overview.number}
          label={overview.label}
          title="Campaign overview"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="direction">
        <FadeIn>
          <SectionLabel kicker={direction.number} label={direction.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Shaping the visual idea")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} />
      </SectionAnchor>
      <SectionAnchor id="assets">
        <FadeIn>
          <SectionLabel kicker={assets.number} label={assets.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Magazine-style assembly")}
          </h2>
        </FadeIn>
        <GalleryGrid project={project} openLightbox={openLightbox} variant="masonry" />
      </SectionAnchor>
      <SectionAnchor id="rollout">
        <FadeIn>
          <SectionLabel kicker={rollout.number} label={rollout.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Bringing it to audience")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Creative tradeoffs")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

export function WritingBody({ project, openLightbox, sectionMeta }: StructuredBodyProps) {
  const overview = sectionMeta("overview");
  const goals = sectionMeta("goals");
  const process = sectionMeta("process");
  const deliverables = sectionMeta("deliverables");
  const focus = sectionMeta("focus");
  const challenges = sectionMeta("challenges");

  return (
    <>
      <SectionAnchor id="overview">
        <EditorialBlock
          kicker={overview.number}
          label={overview.label}
          title="Project overview"
          body={project.overview}
        />
      </SectionAnchor>
      <SectionAnchor id="goals">
        <FadeIn>
          <SectionLabel kicker={goals.number} label={goals.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What the client needed")}
          </h2>
        </FadeIn>
        <ol className="mt-10 space-y-3">
          {project.goals.map((g, i) => (
            <FadeIn key={g} delay={i * 0.06}>
              <li className="flex items-start gap-5 border-b border-white/8 pb-5">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-8 text-white/85 md:text-lg">{g}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </SectionAnchor>
      <SectionAnchor id="process">
        <FadeIn>
          <SectionLabel kicker={process.number} label={process.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("From brief to draft")}
          </h2>
        </FadeIn>
        <ProcessTimeline steps={project.process} dense />
      </SectionAnchor>
      <SectionAnchor id="deliverables">
        <FadeIn>
          <SectionLabel kicker={deliverables.number} label={deliverables.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("What was handed off")}
          </h2>
        </FadeIn>
        {project.flipbookEmbed ? (
          <FlipbookEmbed embed={project.flipbookEmbed} />
        ) : (
          <GalleryGrid project={project} openLightbox={openLightbox} variant="documents" />
        )}
      </SectionAnchor>
      <SectionAnchor id="focus">
        <FadeIn>
          <SectionLabel kicker={focus.number} label={focus.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Where the work went deepest")}
          </h2>
        </FadeIn>
        <FocusGrid areas={project.focusAreas} columns={2} />
      </SectionAnchor>
      <SectionAnchor id="challenges">
        <FadeIn>
          <SectionLabel kicker={challenges.number} label={challenges.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Editorial tradeoffs")}
          </h2>
        </FadeIn>
        <ChallengesBlock project={project} />
      </SectionAnchor>
    </>
  );
}

export function LogoBody({ project, sectionMeta }: StructuredBodyProps) {
  const challenge = sectionMeta("challenge");
  const strategy = sectionMeta("strategy");
  const identity = sectionMeta("identity");
  const impact = sectionMeta("impact");
  const branding = project.branding;

  return (
    <>
      {branding?.challenge ? (
        <SectionAnchor id="challenge">
          <FadeIn>
            <SectionLabel kicker={challenge.number} label={challenge.label} />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("The challenge")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {branding.challenge}
            </p>
          </FadeIn>
        </SectionAnchor>
      ) : null}
      {project.goals.length ? (
        <SectionAnchor id="strategy">
          <FadeIn>
            <SectionLabel kicker={strategy.number} label={strategy.label} />
            <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
              {accentLastWord("Strategy")}
            </h2>
          </FadeIn>
          <GoalsList goals={project.goals} />
        </SectionAnchor>
      ) : null}
      <SectionAnchor id="identity">
        {branding?.symbol?.image ? (
          <div className="metal-card flex min-h-[28rem] items-center justify-center overflow-hidden p-6 md:min-h-[40rem] md:p-10">
            <img
              src={branding.symbol.image}
              alt={branding.symbol.title}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ) : null}
      </SectionAnchor>
      <SectionAnchor id="impact">
        <FadeIn>
          <SectionLabel kicker={impact.number} label={impact.label} />
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
            {accentLastWord("Impact")}
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
            {branding?.outcome ?? project.outcome}
          </p>
        </FadeIn>
      </SectionAnchor>
    </>
  );
}
