import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";
import { LinkButton } from "@/components/site/LinkButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { processSteps } from "@/data/home";
import { cn } from "@/lib/utils";

const processMarquee = ["Research", "Concept", "Design", "Deliver"] as const;

const stepCopy: Record<string, { description: string; deliverables: string[] }> = {
  Research: {
    description:
      "Listen to the brief, audit the landscape, and map the audience before a single pixel moves.",
    deliverables: ["Discovery call", "Competitor audit", "Insight brief"],
  },
  Concept: {
    description:
      "Translate insight into direction — moodboards, sketches, and narrative pillars to anchor the work.",
    deliverables: ["Moodboards", "Lo-fi sketches", "Creative direction"],
  },
  Design: {
    description:
      "Craft the visual system, refine the interactions, and pressure-test every screen against the story.",
    deliverables: ["Design system", "Hi-fi screens", "Prototype"],
  },
  Deliver: {
    description:
      "Polish, document, and hand off production-ready assets so the team can ship with confidence.",
    deliverables: ["Dev handoff", "Brand assets", "Launch support"],
  },
};

export function ProcessPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress so horizontal travel feels cinematic.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  // Translate 0 → 1 progress into a horizontal offset that reveals the full track.
  // We move by (cards - 1) / cards of the track width so the last card lands centered-ish.
  const trackX = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  // Background parallax (subtle, foreground stays still).
  const metalY = useTransform(smoothProgress, [0, 1], [-12, 12]);
  const marqueeBaseX = useTransform(smoothProgress, [0, 1], ["0%", "-22%"]);
  const marqueeReverseBaseX = useTransform(smoothProgress, [0, 1], ["-22%", "0%"]);
  const marqueeX = useMotionTemplate`${marqueeBaseX}`;
  const marqueeReverseX = useMotionTemplate`${marqueeReverseBaseX}`;
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;
    const next = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(latest * processSteps.length * 0.999)),
    );
    setActiveIndex(next);
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0c0d0e] md:h-[320vh]"
    >
      {/* MOBILE / reduced-motion fallback: native horizontal swipe */}
      <div className="md:hidden">
        <div className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 z-0 bg-[#141516]" />
          <div className="absolute inset-0 z-0 opacity-60">
            <BrushedMetalBackground interactiveTargetRef={sectionRef} />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <SectionHeader
              eyebrow="Workflow"
              title={
                <>
                  A focused process that keeps work <span className="text-gradient">moving</span>.
                </>
              }
              description="Research, concept, design, deliver — swipe through how each phase lands."
              className="mb-10"
            />
          </div>
          <div className="relative z-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
            {processSteps.map((step, i) => {
              const copy = stepCopy[step.title];
              return (
                <ProcessCard
                  key={step.title}
                  index={i}
                  total={processSteps.length}
                  step={step}
                  copy={copy}
                  isActive
                  className="w-[82vw] shrink-0 snap-center"
                />
              );
            })}
          </div>
          <div className="relative z-10 mx-auto mt-8 max-w-2xl">
            <LinkButton to="/process" variant="text" className="inline-flex items-center">
              Full process <ArrowRight size={14} />
            </LinkButton>
          </div>
        </div>
      </div>

      {/* DESKTOP: vertical-scroll-to-horizontal sticky experience */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="absolute inset-0 z-0 bg-[#141516]" />
        <motion.div
          aria-hidden
          className="absolute -inset-x-8 -inset-y-12 z-0"
          style={prefersReducedMotion ? undefined : { y: metalY }}
        >
          <BrushedMetalBackground interactiveTargetRef={sectionRef} />
        </motion.div>

        {/* ambient glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[6%] top-[14%] h-72 w-72 rounded-full bg-white/[0.06] blur-[110px]" />
          <div className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-primary/[0.10] blur-[130px]" />
        </div>

        {/* marquee parallax (background only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-20 z-0 overflow-hidden text-nowrap font-display text-6xl font-bold uppercase tracking-[0.18em] text-white/[0.035]"
        >
          <motion.div
            className="flex w-max gap-16"
            style={prefersReducedMotion ? undefined : { x: marqueeX }}
          >
            {Array.from({ length: 6 }).map((_, g) => (
              <div key={g} className="flex gap-16">
                {processMarquee.map((item) => (
                  <span key={`${g}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-16 z-0 overflow-hidden text-nowrap font-display text-5xl font-bold uppercase tracking-[0.18em] text-white/[0.028]"
        >
          <motion.div
            className="flex w-max gap-16"
            style={prefersReducedMotion ? undefined : { x: marqueeReverseX }}
          >
            {Array.from({ length: 6 }).map((_, g) => (
              <div key={g} className="flex gap-16">
                {processMarquee.map((item) => (
                  <span key={`${g}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sticky viewport content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="mx-auto w-full max-w-7xl px-8 pt-16">
            <div className="flex items-end justify-between gap-8">
              <SectionHeader
                eyebrow="Workflow"
                title={
                  <>
                    A focused process that keeps work{" "}
                    <span className="text-gradient">moving</span>.
                  </>
                }
                description="Scroll to travel through every phase — research, concept, design, deliver."
                className="mb-0"
                contentClassName="max-w-2xl"
              />
              <LinkButton
                to="/process"
                variant="text"
                className="hidden shrink-0 items-center pb-2 lg:inline-flex"
              >
                Full process <ArrowRight size={14} />
              </LinkButton>
            </div>

            {/* Phase indicator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-primary via-white/70 to-primary"
                  style={
                    prefersReducedMotion
                      ? { scaleX: 1, width: "100%" }
                      : { scaleX: progressScale, width: "100%" }
                  }
                />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                <span className="text-white">0{activeIndex + 1}</span>
                <span className="text-white/40"> / 0{processSteps.length}</span>
              </div>
            </div>
          </div>

          {/* Horizontal track */}
          <div className="relative flex-1">
            <motion.div
              ref={trackRef}
              className="absolute inset-y-0 left-0 flex items-center gap-6 pl-[8vw] pr-[8vw] will-change-transform"
              style={prefersReducedMotion ? undefined : { x: trackX }}
            >
              {processSteps.map((step, i) => (
                <ProcessCard
                  key={step.title}
                  index={i}
                  total={processSteps.length}
                  step={step}
                  copy={stepCopy[step.title]}
                  isActive={activeIndex === i}
                  className="h-[64vh] w-[78vw] shrink-0 md:w-[58vw] lg:w-[44vw]"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ProcessCardProps = {
  index: number;
  total: number;
  step: (typeof processSteps)[number];
  copy: { description: string; deliverables: string[] } | undefined;
  isActive: boolean;
  className?: string;
};

function ProcessCard({ index, step, copy, isActive, className }: ProcessCardProps) {
  const Icon = step.icon;
  return (
    <motion.article
      aria-current={isActive ? "step" : undefined}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-colors duration-500 md:p-10",
        isActive
          ? "glass-strong border-white/20"
          : "glass border-white/10 bg-background/30",
        className,
      )}
      animate={{ opacity: isActive ? 1 : 0.55, scale: isActive ? 1 : 0.97 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* big numeral */}
      <div className="pointer-events-none absolute right-6 top-4 font-display text-[8rem] font-bold leading-none text-white/[0.06] md:text-[10rem]">
        0{index + 1}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
          <Icon size={18} className="text-primary-foreground" />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
          Phase 0{index + 1}
        </span>
      </div>

      <h3 className="relative z-10 mt-6 font-display text-4xl font-semibold md:text-5xl">
        {step.title}
      </h3>

      {copy ? (
        <p className="relative z-10 mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          {copy.description}
        </p>
      ) : null}

      <div className="relative z-10 mt-auto pt-8">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Deliverables
        </div>
        <ul className="flex flex-wrap gap-2">
          {copy?.deliverables.map((d) => (
            <li
              key={d}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-white/80"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* hover sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
    </motion.article>
  );
}
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
