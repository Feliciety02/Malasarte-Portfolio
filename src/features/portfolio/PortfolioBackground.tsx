export function PortfolioBackground() {
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
          background: `
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(255, 215, 0, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 80% 15%, rgba(180, 130, 255, 0.03) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 85%, rgba(255, 215, 0, 0.025) 0%, transparent 50%)
          `,
        }}
        aria-hidden
      />
    </>
  );
}
