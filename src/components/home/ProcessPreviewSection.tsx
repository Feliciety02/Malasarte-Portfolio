import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { processSteps } from "@/data/home";
import { cn } from "@/lib/utils";

const processMarquee = ["Research", "Concept", "Design", "Deliver"] as const;

export function ProcessPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 60, damping: 32, mass: 0.4 });
  const progressScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);
  const metalY = useTransform(scrollYProgress, [0, 1], [-10, 12]);
  const bandX = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const bandY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const glowX = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const grainY = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const marqueeBaseX = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const marqueeReverseBaseX = useTransform(scrollYProgress, [0, 1], ["-16%", "0%"]);
  const marqueeBoost = useTransform(smoothVelocity, [-1600, 1600], [18, -18]);
  const marqueeX = useMotionTemplate`calc(${marqueeBaseX} + ${marqueeBoost}px)`;
  const marqueeReverseX = useMotionTemplate`calc(${marqueeReverseBaseX} - ${marqueeBoost}px)`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;

    const nextIndex = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(latest * processSteps.length)),
    );

    setActiveIndex(nextIndex);
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 py-24 md:h-[260vh] md:py-0">
      <div className="absolute inset-0 z-0 bg-[#141516]" />
      <motion.div
        aria-hidden
        className="absolute -inset-x-8 -inset-y-12 z-0"
        style={prefersReducedMotion ? undefined : { y: metalY }}
      >
        <BrushedMetalBackground interactiveTargetRef={sectionRef} />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={prefersReducedMotion ? undefined : { x: glowX, y: glowY }}
      >
        <div className="absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-white/[0.075] blur-[90px]" />
        <div className="absolute bottom-[12%] right-[9%] h-80 w-80 rounded-full bg-white/[0.055] blur-[110px]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[12%] z-0 hidden w-40 rotate-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] blur-2xl md:block"
        style={prefersReducedMotion ? undefined : { x: bandX, y: bandY }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-35 mix-blend-screen md:block"
        style={prefersReducedMotion ? undefined : { y: grainY }}
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(90deg,transparent,rgba(255,255,255,0.045),transparent)]" />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 z-0 hidden overflow-hidden text-nowrap font-display text-5xl font-bold uppercase tracking-[0.18em] text-white/[0.035] md:block"
      >
        <motion.div
          className="flex w-max gap-12"
          style={prefersReducedMotion ? undefined : { x: marqueeX }}
        >
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-12">
              {processMarquee.map((item) => (
                <span key={`${groupIndex}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-16 z-0 hidden overflow-hidden text-nowrap font-display text-4xl font-bold uppercase tracking-[0.18em] text-white/[0.028] md:block"
      >
        <motion.div
          className="flex w-max gap-12"
          style={prefersReducedMotion ? undefined : { x: marqueeReverseX }}
        >
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-12">
              {processMarquee.map((item) => (
                <span key={`${groupIndex}-${item}`}>{item}</span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl md:sticky md:top-0 md:flex md:min-h-screen md:items-center">
        <div className="grid w-full gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <Reveal>
              <SectionHeader
                eyebrow="Workflow"
                title={
                  <>
                    A focused process that keeps work <span className="text-gradient">moving</span>.
                  </>
                }
                description="Research, concepts, design, and delivery stay structured from the first brief to the final handoff."
                action={
                  <LinkButton
                    to="/process"
                    variant="text"
                    className="hidden items-center md:inline-flex"
                  >
                    Full process <ArrowRight size={14} />
                  </LinkButton>
                }
                className="mb-12"
                contentClassName="max-w-xl"
              />
            </Reveal>

            <div className="relative hidden h-28 max-w-md items-start gap-4 md:flex">
              <div className="relative mt-1 h-full w-px overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-primary via-white/70 to-primary"
                  style={prefersReducedMotion ? { scaleY: 1 } : { scaleY: progressScale }}
                />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Clear thinking up front, controlled exploration in the middle, and clean execution
                at the end.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            {processSteps.map((step, index) => {
              const isActive = prefersReducedMotion || activeIndex === index;

              return (
                <Reveal key={step.title} delay={index * 0.07}>
                  <motion.div
                    aria-current={isActive ? "step" : undefined}
                    animate={prefersReducedMotion ? undefined : { opacity: isActive ? 1 : 0.54 }}
                    transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                    className={cn(
                      "group relative overflow-hidden rounded-3xl p-6 transition-colors duration-300 md:min-h-40 md:p-8",
                      isActive
                        ? "glass-strong border-white/20"
                        : "glass border-white/10 bg-background/20",
                    )}
                  >
                    <div className="absolute right-6 top-5 font-display text-6xl font-bold text-white/10">
                      0{index + 1}
                    </div>
                    <div className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
                      <step.icon size={17} className="text-primary-foreground" />
                    </div>
                    <h3 className="relative z-10 mt-5 font-display text-2xl font-semibold">
                      {step.title}
                    </h3>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
