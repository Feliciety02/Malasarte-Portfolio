import { Grid, Palette, Globe, Stamp, Share2, Package, FileText, Search } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { getCategoryAccent } from "./categoryAccents";

const categories = [
  "All",
  "UI/UX Design",
  "Software Development",
  "Logo & Branding",
  "Social Media Graphics",
  "Creative Assets",
  "Writing / VA",
] as const;

type FilterCategory = (typeof categories)[number];

const categoryIcons: Record<FilterCategory, LucideIcon> = {
  All: Grid,
  "UI/UX Design": Palette,
  "Software Development": Globe,
  "Logo & Branding": Stamp,
  "Social Media Graphics": Share2,
  "Creative Assets": Package,
  "Writing / VA": FileText,
};

type CategoryFilterBarProps = {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
  onHover: (category: string | null) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export function CategoryFilterBar({
  active,
  onChange,
  onHover,
  search,
  onSearchChange,
}: CategoryFilterBarProps) {
  const [hovered, setHovered] = useState<FilterCategory | null>(null);

  return (
    <section className="relative z-10 mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative mb-5">
          <label htmlFor="works-search" className="sr-only">
            Search works
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="works-search"
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search works..."
            className="h-14 w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-5 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
          />
        </div>

        <div className="mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = active === category;
          const isHovered = hovered === category;
          const accent = getCategoryAccent(category);
          const isEmphasized = isActive || isHovered;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              onMouseEnter={() => {
                setHovered(category);
                onHover(category === "All" ? null : category);
              }}
              onMouseLeave={() => {
                setHovered(null);
                onHover(null);
              }}
              className="group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-300 sm:px-4"
              style={{
                background: isEmphasized
                  ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))"
                  : "rgba(255,255,255,0.04)",
                border: isEmphasized
                  ? `1px solid ${accent.border}`
                  : "1px solid rgba(255,255,255,0.08)",
                color: isEmphasized ? "white" : "rgba(255,255,255,0.55)",
                boxShadow: isEmphasized
                  ? `0 0 24px ${accent.glow}, 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.10)`
                  : "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <Icon
                size={15}
                className="shrink-0 transition-all duration-300"
                style={{
                  color: isEmphasized ? accent.ring : "rgba(255,255,255,0.4)",
                }}
              />
              <span>{category === "All" ? "All Work" : category}</span>
            </button>
          );
        })}
        </div>
      </div>
    </section>
  );
}

export type { FilterCategory };
