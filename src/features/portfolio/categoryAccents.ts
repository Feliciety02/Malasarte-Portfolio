import type { ProjectCategory, ProjectFilter } from "@/data/projects";
import type { FilterCategory } from "@/features/portfolio/CategoryFilterBar";

type AccentConfig = {
  accent: string;
  glow: string;
  border: string;
  text: string;
  ring: string;
};

const defaultAccent: AccentConfig = {
  accent: "255,255,255",
  glow: "rgba(255,255,255,0.16)",
  border: "rgba(255,255,255,0.22)",
  text: "rgba(255,255,255,0.75)",
  ring: "rgba(255,255,255,0.95)",
};

const accentMap: Record<FilterCategory, AccentConfig> = {
  All: defaultAccent,
  "UI/UX Design": {
    accent: "147,51,234",
    glow: "rgba(147,51,234,0.24)",
    border: "rgba(167,139,250,0.58)",
    text: "rgba(221,214,254,0.95)",
    ring: "rgba(167,139,250,1)",
  },
  "Software Development": {
    accent: "59,130,246",
    glow: "rgba(59,130,246,0.22)",
    border: "rgba(96,165,250,0.56)",
    text: "rgba(191,219,254,0.95)",
    ring: "rgba(96,165,250,1)",
  },
  "Logo & Branding": {
    accent: "250,204,21",
    glow: "rgba(250,204,21,0.22)",
    border: "rgba(250,204,21,0.6)",
    text: "rgba(254,240,138,0.98)",
    ring: "rgba(250,204,21,1)",
  },
  "Social Media Graphics": {
    accent: "236,72,153",
    glow: "rgba(236,72,153,0.22)",
    border: "rgba(244,114,182,0.56)",
    text: "rgba(251,207,232,0.98)",
    ring: "rgba(244,114,182,1)",
  },
  "Creative Assets": {
    accent: "45,212,191",
    glow: "rgba(45,212,191,0.2)",
    border: "rgba(94,234,212,0.56)",
    text: "rgba(204,251,241,0.95)",
    ring: "rgba(94,234,212,1)",
  },
  "Writing / VA": {
    accent: "52,211,153",
    glow: "rgba(52,211,153,0.2)",
    border: "rgba(110,231,183,0.56)",
    text: "rgba(209,250,229,0.96)",
    ring: "rgba(110,231,183,1)",
  },
};

export function getCategoryAccent(category: ProjectCategory | ProjectFilter | FilterCategory) {
  return accentMap[(category as FilterCategory) ?? "All"] ?? defaultAccent;
}
