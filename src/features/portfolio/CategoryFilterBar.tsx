import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

type CategoryFilterBarProps = {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
};

export function CategoryFilterBar({ active, onChange }: CategoryFilterBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLButtonElement>(`[data-cat="${active}"]`);
    if (!activeEl) return;
    setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
  }, [active]);

  return (
    <section className="relative z-10 mx-auto mt-10 max-w-7xl px-4 sm:mt-14 sm:px-6">
      <div className="relative mx-auto overflow-hidden rounded-[20px] border border-white/[0.07] bg-black/50 p-2 shadow-[0_0_60px_-16px_rgba(255,215,0,0.1)] backdrop-blur-xl sm:p-2.5">
        <div ref={containerRef} className="relative flex flex-wrap justify-center gap-1 sm:gap-1.5">
          <div
            className="absolute inset-y-2 rounded-[14px] bg-gradient-to-r from-yellow/20 to-yellow/10 shadow-[inset_0_1px_0_rgba(255,215,0,0.2),0_0_24px_-8px_rgba(255,215,0,0.2)] transition-all duration-400 ease-out sm:inset-y-2.5"
            style={{ left: indicator.left, width: indicator.width }}
          />

          {categories.map((category) => (
            <button
              key={category}
              data-cat={category}
              onClick={() => onChange(category)}
              className={cn(
                "relative z-10 rounded-[14px] px-4 py-2.5 text-[12px] font-medium tracking-tight transition-colors duration-300 sm:px-6 sm:py-3 sm:text-[14px]",
                active === category
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { FilterCategory };
