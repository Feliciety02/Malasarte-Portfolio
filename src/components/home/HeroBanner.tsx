import { motion, useScroll, useTransform } from "motion/react";
import heroDesktop from "@/assets/hero-desktop.svg";
import heroMobile from "@/assets/hero-mobile.svg";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";

const MARQUEE = ["Fe Anne Malasarte", "Design", "Develop", "Create"];

export function HeroBanner() {
  const { scrollYProgress } = useScroll();
  const marqueeX = useTransform(scrollYProgress, [0, 0.3], ["0%", "-12%"]);
  const marqueeRX = useTransform(scrollYProgress, [0, 0.3], ["-8%", "4%"]);

  return (
    <section className="hero-reference relative overflow-hidden bg-[#141516]">
      <BrushedMetalBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 overflow-hidden text-nowrap font-display text-[clamp(3.5rem,10vw,8rem)] font-bold uppercase tracking-[0.12em] text-white/[0.035]"
      >
        <motion.div className="flex w-max gap-16" style={{ x: marqueeX }}>
          {Array.from({ length: 6 }).map((_, g) => (
            <div key={g} className="flex gap-16">
              {MARQUEE.map((w) => (
                <span key={`${g}-${w}`}>{w}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[18%] z-0 overflow-hidden text-nowrap font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase tracking-[0.12em] text-white/[0.024]"
      >
        <motion.div className="flex w-max gap-16" style={{ x: marqueeRX }}>
          {Array.from({ length: 6 }).map((_, g) => (
            <div key={g} className="flex gap-16">
              {MARQUEE.map((w) => (
                <span key={`${g}-${w}`}>{w}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hero-reference__content relative z-10 mx-auto w-full max-w-[1440px] px-4 text-center sm:px-6">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          <img
            src={heroMobile}
            alt="Fe Anne Malasarte"
            className="hero-reference__portrait pointer-events-none z-10 select-none"
            draggable={false}
          />
        </picture>
      </div>
    </section>
  );
}
