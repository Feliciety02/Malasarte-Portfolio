import { Grid, Palette, Globe, Stamp, Share2, Package, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categories = [
  "All",
  "UI/UX Design",
  "Web Development",
  "Logo & Branding",
  "Social Media Graphics",
  "Creative Assets",
  "Writing / VA",
] as const;

type FilterCategory = (typeof categories)[number];

const categoryIcons: Record<FilterCategory, LucideIcon> = {
  All: Grid,
  "UI/UX Design": Palette,
  "Web Development": Globe,
  "Logo & Branding": Stamp,
  "Social Media Graphics": Share2,
  "Creative Assets": Package,
  "Writing / VA": FileText,
};

const categoryAccentColors: Record<FilterCategory, string> = {
  All: "rgba(255,255,255,0.15)",
  "UI/UX Design": "rgba(147, 51, 234, 0.25)",
  "Web Development": "rgba(59, 130, 246, 0.25)",
  "Logo & Branding": "rgba(250, 204, 21, 0.25)",
  "Social Media Graphics": "rgba(236, 72, 153, 0.25)",
  "Creative Assets": "rgba(45, 212, 191, 0.25)",
  "Writing / VA": "rgba(52, 211, 153, 0.25)",
};

type CategoryFilterBarProps = {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
  onHover: (category: string | null) => void;
};

export function CategoryFilterBar({ active, onChange, onHover }: CategoryFilterBarProps) {
  return (
    <section className="relative z-10 mx-auto mt-12 max-w-7xl px-4 sm:mt-14 sm:px-6">
      <div className="mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          const isActive = active === category;
          const accent = categoryAccentColors[category];

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              onMouseEnter={() => onHover(category === "All" ? null : category)}
              onMouseLeave={() => onHover(null)}
              className="group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-300 sm:px-4"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))"
                  : "rgba(255,255,255,0.04)",
                border: isActive ? `1px solid ${accent}` : "1px solid rgba(255,255,255,0.08)",
                color: isActive ? "white" : "rgba(255,255,255,0.55)",
                boxShadow: isActive
                  ? `0 0 20px ${accent}, 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.10)`
                  : "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <Icon
                size={15}
                className="shrink-0 transition-all duration-300"
                style={{
                  color: isActive ? accent.replace("0.25", "1") : "rgba(255,255,255,0.4)",
                }}
              />
              <span>{category === "All" ? "All Work" : category}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export type { FilterCategory };
