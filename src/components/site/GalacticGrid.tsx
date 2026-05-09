import { motion } from "motion/react";

export function GalacticGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#090814_0%,#0b1027_38%,#091320_68%,#071018_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(131,95,255,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(84,197,255,0.12),transparent_20%)]" />
      <div className="absolute inset-x-[-8%] top-[56%] h-px bg-[linear-gradient(90deg,transparent,rgba(121,210,255,0.65),rgba(199,132,255,0.88),rgba(121,210,255,0.65),transparent)] shadow-[0_0_28px_rgba(138,155,255,0.42)]" />
      <div className="absolute inset-x-[5%] top-[53%] h-28 bg-[radial-gradient(ellipse_at_center,rgba(102,171,255,0.14),transparent_68%)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,transparent,rgba(7,12,24,0.12)_24%,rgba(6,10,20,0.68)_100%)]" />

      <motion.div
        animate={reducedMotion ? undefined : { x: [0, -10, 0], y: [0, -2, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
        className="absolute inset-0 opacity-55"
      >
        <svg className="h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
          <g stroke="rgba(128,212,255,0.1)" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, index) => (
              <line key={index} x1={60 + index * 120} y1="0" x2={60 + index * 120} y2="700" />
            ))}
            {Array.from({ length: 8 }).map((_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                y1={120 + index * 70}
                x2="1200"
                y2={120 + index * 70}
              />
            ))}
          </g>
          <g stroke="rgba(195,140,255,0.12)" strokeWidth="1">
            <path d="M0 520 L180 486 L360 500 L540 470 L720 492 L900 462 L1200 492" fill="none" />
            <path d="M0 566 L200 536 L410 552 L620 524 L830 546 L1040 516 L1200 534" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
