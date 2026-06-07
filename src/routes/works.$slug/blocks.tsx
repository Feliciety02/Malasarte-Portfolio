import { Lightbulb } from "lucide-react";
import type { Project } from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { cn } from "@/lib/utils";
import { SectionAnchor, SectionLabel, FadeIn } from "./sections";
import { getProjectSection } from "./config";

export function EditorialBlock({
  kicker,
  label,
  title,
  body,
}: {
  kicker: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn>
      <SectionLabel kicker={kicker} label={label} />
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
        {accentLastWord(title)}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{body}</p>
    </FadeIn>
  );
}

export function GoalsList({ goals }: { goals: string[] }) {
  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-3">
      {goals.map((g, i) => (
        <FadeIn key={g} delay={i * 0.08}>
          <div className="metal-card h-full p-6">
            <span className="font-mono text-xs text-primary">
              G{String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 text-sm leading-7 text-white/85">{g}</p>
          </div>
        </FadeIn>
      ))}
    </ul>
  );
}

export function ProcessTimeline({ steps, dense = false }: { steps: Project["process"]; dense?: boolean }) {
  return (
    <ol className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/10">
      {steps.map((s, i) => (
        <FadeIn key={s.title} delay={i * 0.06}>
          <li
            className={cn(
              "group grid items-start gap-6 bg-background/40 px-6 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,2fr)]",
              dense && "py-5",
            )}
          >
            <span className="font-mono text-xs text-primary">
              PH.{String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-xl font-semibold">{s.title}</p>
            <p className="text-sm leading-7 text-muted-foreground">{s.text}</p>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}

export function FocusGrid({ areas, columns = 3 }: { areas: Project["focusAreas"]; columns?: 2 | 3 }) {
  return (
    <div
      className={cn(
        "mt-10 grid gap-5",
        columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {areas.map((area, i) => (
        <FadeIn key={area.title} delay={i * 0.05}>
          <div className="metal-card h-full p-6">
            <span className="font-mono text-xs text-primary">
              .{String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.text}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function ChallengesBlock({ project }: { project: Project }) {
  if (!project.challenges.length) return null;
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {project.challenges.map((c, i) => (
        <FadeIn key={c.title} delay={i * 0.08}>
          <div className="metal-card h-full p-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-primary">
              <Lightbulb size={12} /> Challenge {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.challenge}</p>
            <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-primary">Solution</p>
              <p className="mt-2 text-sm leading-7 text-white/85">{c.solution}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function ResultsSection({ project }: { project: Project }) {
  if (!project.impact.length) return null;
  const section = getProjectSection(project, "results");
  const headingByLabel: Record<string, string> = {
    Impact: "Impact in numbers",
    Outcome: "Outcome in numbers",
    Performance: "Performance in numbers",
    Results: "Results in numbers",
  };

  return (
    <SectionAnchor id="results">
      <FadeIn>
        <SectionLabel kicker={section.number} label={section.label} />
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          {accentLastWord(headingByLabel[section.label] ?? "Results in numbers")}
        </h2>
      </FadeIn>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
        {project.impact.map((m, i) => (
          <FadeIn key={m.label} delay={i * 0.08}>
            <div className="bg-background/40 p-8">
              <div className="font-display text-5xl font-bold text-gradient md:text-6xl">
                {m.value}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {m.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionAnchor>
  );
}

export function ReflectionSection({ project }: { project: Project }) {
  const section = getProjectSection(project, "reflection");

  return (
    <SectionAnchor id="reflection">
      <FadeIn>
        <SectionLabel kicker={section.number} label={section.label} />
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          {accentLastWord("Closing thoughts")}
        </h2>
        <p className="mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
          {project.outcome}
        </p>
      </FadeIn>
    </SectionAnchor>
  );
}

export function BrandResearchBlock({ research }: { research: NonNullable<Project["branding"]>["research"] }) {
  if (!research) return null;
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <FadeIn>
        <p className="text-base leading-8 text-muted-foreground md:text-lg">{research.body}</p>
      </FadeIn>
      <FadeIn delay={0.06}>
        <div className="metal-card h-full p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            {research.title ?? "Key insights"}
          </p>
          <ul className="mt-5 space-y-4">
            {research.insights.map((insight) => (
              <li key={insight} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <p className="text-sm leading-7 text-white/85">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}

export function BrandSymbolBlock({ symbol }: { symbol: NonNullable<Project["branding"]>["symbol"] }) {
  if (!symbol) return null;
  return (
    <div className="mt-10 space-y-6">
      <FadeIn>
        <div className="metal-card flex min-h-[28rem] items-center justify-center overflow-hidden p-6 md:min-h-[40rem] md:p-10">
          {symbol.image ? (
            <img
              src={symbol.image}
              alt={symbol.title}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-center text-sm text-muted-foreground">
              {symbol.title}
            </div>
          )}
        </div>
      </FadeIn>
      <FadeIn delay={0.06}>
        <ul className="grid gap-5 sm:grid-cols-3">
          {symbol.items.map((item) => (
            <li key={item.name} className="metal-card h-full p-5">
              <p className="font-display text-lg font-semibold">{item.name}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.meaning}</p>
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}

export function BrandColorPalette({
  colors,
}: {
  colors: NonNullable<Project["branding"]>["colors"];
}) {
  if (!colors?.length) return null;
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {colors.map((color, i) => (
        <FadeIn key={color.hex} delay={i * 0.05}>
          <div className="metal-card overflow-hidden">
            <div className="aspect-[4/3] w-full" style={{ background: color.hex }} />
            <div className="space-y-3 p-5">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-lg font-semibold">{color.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{color.hex}</p>
              </div>
              <ul className="space-y-1.5">
                {color.meaning.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export function BrandTypographyBlock({
  typography,
}: {
  typography: NonNullable<Project["branding"]>["typography"];
}) {
  if (!typography) return null;
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <FadeIn>
        <div className="metal-card flex aspect-[4/3] flex-col justify-between overflow-hidden p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Typeface
          </p>
          <p
            className="font-display text-5xl font-bold leading-none md:text-6xl"
            style={{ fontFamily: typography.family }}
          >
            {typography.name}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {typography.family}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.06}>
        <div className="metal-card h-full p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Why it fits
          </p>
          <ul className="mt-5 space-y-4">
            {typography.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <p className="text-sm leading-7 text-white/85">{reason}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}

export function BrandPersonalityList({
  personality,
}: {
  personality: NonNullable<Project["branding"]>["personality"];
}) {
  if (!personality?.length) return null;
  return (
    <ul className="mt-10 flex flex-wrap gap-3">
      {personality.map((trait, i) => (
        <FadeIn key={trait} delay={i * 0.04}>
          <span className="metal-ghost inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium">
            {trait}
          </span>
        </FadeIn>
      ))}
    </ul>
  );
}

export function BrandListBlock({
  items,
  columns = 2,
}: {
  items: string[] | undefined;
  columns?: 1 | 2 | 3;
}) {
  if (!items?.length) return null;
  const gridClass =
    columns === 3
      ? "sm:grid-cols-2 md:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "";
  return (
    <ul className={cn("mt-10 grid gap-4", gridClass)}>
      {items.map((item, i) => (
        <FadeIn key={item} delay={i * 0.05}>
          <li className="metal-card flex h-full items-start gap-4 p-5">
            <span className="font-mono text-xs text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-7 text-white/85">{item}</p>
          </li>
        </FadeIn>
      ))}
    </ul>
  );
}
