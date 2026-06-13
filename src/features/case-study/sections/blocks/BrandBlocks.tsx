import { Award, Eye, Heart, Shield, Target, Zap, Clock } from "lucide-react";
import { motion } from "motion/react";
import type { Project, ProjectMissionValues } from "@/data/projects";
import { cn } from "@/lib/utils";
import { FadeIn } from "../SectionWrappers";

export function BrandSymbolBlock({
  symbol,
}: {
  symbol: NonNullable<Project["branding"]>["symbol"];
}) {
  if (!symbol) return null;
  return (
    <div className="mt-10 space-y-6">
      <FadeIn>
        <div className="flex min-h-[28rem] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:min-h-[40rem] md:p-10">
          {symbol.image ? (
            <img
              src={symbol.image}
              alt={symbol.title}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-center text-sm text-black/60">
              {symbol.title}
            </div>
          )}
        </div>
      </FadeIn>
      {symbol.items.length ? (
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
      ) : null}
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
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/40" />
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
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Typeface</p>
          <p
            className="font-display text-5xl font-bold leading-none md:text-6xl"
            style={{ fontFamily: typography.family }}
          >
            {typography.name}
          </p>
          <p className="font-mono text-xs text-muted-foreground">{typography.family}</p>
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
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
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
