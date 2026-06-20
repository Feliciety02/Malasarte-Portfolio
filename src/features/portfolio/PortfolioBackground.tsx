import { useMemo } from "react";

const glowColors: Record<string, { strong: string; weak: string }> = {
  "UI/UX Design": {
    strong: "rgba(147, 51, 234, 0.12)",
    weak: "rgba(147, 51, 234, 0.06)",
  },
  "Software Development": {
    strong: "rgba(59, 130, 246, 0.10)",
    weak: "rgba(59, 130, 246, 0.05)",
  },
  "Logo & Branding": {
    strong: "rgba(250, 204, 21, 0.12)",
    weak: "rgba(250, 204, 21, 0.06)",
  },
  "Social Media Graphics": {
    strong: "rgba(236, 72, 153, 0.10)",
    weak: "rgba(236, 72, 153, 0.05)",
  },
  "Writing / VA": {
    strong: "rgba(52, 211, 153, 0.10)",
    weak: "rgba(52, 211, 153, 0.05)",
  },
  "Creative Assets": {
    strong: "rgba(45, 212, 191, 0.10)",
    weak: "rgba(45, 212, 191, 0.05)",
  },
};

const floatWords = [
  "UI/UX",
  "Branding",
  "Web",
  "Design",
  "Social",
  "Creative",
  "Writing",
  "Product",
  "Interface",
  "Identity",
];

export function PortfolioBackground({
  hoveredCategory,
}: {
  hoveredCategory?: string | null;
}) {
  const scheme = useMemo(() => {
    if (hoveredCategory && glowColors[hoveredCategory]) {
      return glowColors[hoveredCategory];
    }
    return null;
  }, [hoveredCategory]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255, 215, 0, 0.015) 0px, transparent 1px, transparent 64px),
            repeating-linear-gradient(90deg, rgba(255, 215, 0, 0.015) 0px, transparent 1px, transparent 64px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: scheme
            ? `
              radial-gradient(ellipse 80% 50% at 25% 20%, ${scheme.strong} 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 20% 20%, rgba(255, 215, 0, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 50% 35% at 80% 15%, rgba(180, 130, 255, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 50% 85%, rgba(255, 215, 0, 0.025) 0%, transparent 50%)
            `
            : `
              radial-gradient(ellipse 80% 50% at 25% 20%, rgba(255, 215, 0, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 20% 20%, rgba(255, 215, 0, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse 50% 35% at 80% 15%, rgba(180, 130, 255, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 50% 85%, rgba(255, 215, 0, 0.025) 0%, transparent 50%)
            `,
          transition: "background 600ms ease",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {floatWords.map((word, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <span
              key={word}
              className="absolute select-none font-display text-2xl font-bold tracking-wider sm:text-3xl"
              style={{
                left: `${12 + col * 35 + (row % 2 === 0 ? 0 : 15)}%`,
                top: `${8 + row * 22}%`,
                opacity: 0.035,
                color: scheme?.weak ?? "rgba(255,255,255,0.04)",
                transform: `rotate(${(i % 3 === 0 ? -6 : i % 3 === 1 ? 3 : -2)}deg)`,
                transition: "color 600ms ease",
                pointerEvents: "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </>
  );
}
