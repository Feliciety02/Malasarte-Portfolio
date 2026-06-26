import { useCallback, useRef, type ReactNode } from "react";
import type { ProjectCategory, ProjectFilter } from "@/data/projects";
import { cn } from "@/lib/utils";
import { getCategoryAccent } from "./categoryAccents";

type PortfolioAccentCardFrameProps = {
  category: ProjectCategory | ProjectFilter;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
};

export function PortfolioAccentCardFrame({
  category,
  children,
  isActive,
  className,
}: PortfolioAccentCardFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = getCategoryAccent(category);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "metal-card group relative h-full overflow-hidden rounded-2xl border border-white/10",
        "transition-transform duration-500 ease-out will-change-transform hover:-translate-y-0.5",
        isActive && "-translate-y-0.5",
        className,
      )}
    >
      {children}

      <div
        className={cn("pointer-events-none absolute transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
        style={{
          inset: "4px",
          borderRadius: "calc(1rem - 4px)",
          background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(${accent.accent}, 0.14), transparent 50%)`,
        }}
      />
      <div
        className={cn("pointer-events-none absolute transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
        style={{
          inset: "4px",
          borderRadius: "calc(1rem - 4px)",
          border: `1px solid ${accent.border}`,
          boxShadow: `0 0 0 1px rgba(${accent.accent}, 0.06), 0 0 30px ${accent.glow}`,
        }}
      />
    </div>
  );
}
