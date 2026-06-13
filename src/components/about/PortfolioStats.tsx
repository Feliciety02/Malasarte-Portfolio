import { Clock, Eye, Grid3X3 } from "lucide-react";

const stats = [
  { icon: Eye, value: "15+", label: "Projects" },
  { icon: Grid3X3, value: "6", label: "Categories" },
  { icon: Clock, value: "2023-Present", label: "Timeline" },
];

export function PortfolioStats() {
  return (
    <div className="mt-10 flex flex-wrap gap-8 border-y border-white/10 py-6 sm:gap-12 md:gap-16">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
            <stat.icon size={14} className="text-yellow" />
          </div>
          <div>
            <span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">
              {stat.value}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
