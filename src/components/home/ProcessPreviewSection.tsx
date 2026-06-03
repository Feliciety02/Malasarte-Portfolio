import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
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
const lastProcessIndex = processSteps.length - 1;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

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
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const procWidth = useRef(1);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 35, damping: 20, mass: 0.8 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const reduce = prefersReducedMotion || isMobile;

  /* ── scroll tracking ── */
  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;

    el.style.height = "300vh";

    let frame = 0;
    const tick = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp((window.scrollY - top) / dist, 0, 1);
      rawProgress.set(p);

      if (trackRef.current && viewportRef.current) {
        procWidth.current = Math.max(1, trackRef.current.scrollWidth - viewportRef.current.clientWidth);
      }

      const sp = clamp((p - 0.33) / (0.85 - 0.33), 0, 1);
      setActiveIndex((c) => {
        const n = clamp(Math.floor(sp * processSteps.length * 0.999), 0, lastProcessIndex);
        return c === n ? c : n;
      });
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(tick); };

    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [reduce, rawProgress]);

  /* ── derived transforms ── */
  const overlayY = useTransform(smoothProgress, (v) => {
    if (v < 0.06) return "100%";
    if (v < 0.42) {
      const t = (v - 0.06) / (0.42 - 0.06);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      return `${(1 - eased) * 100}%`;
    }
    if (v < 0.85) return "0%";
    const t = (v - 0.85) / (1 - 0.85);
    const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    return `${(-eased) * 100}%`;
  });
  const barScale = useTransform(smoothProgress, (v) => {
    const sp = Math.max(0, Math.min(1, (v - 0.42) / (0.85 - 0.42)));
    return sp;
  });
  const trackX = useTransform(smoothProgress, (v) => {
    const sp = Math.max(0, Math.min(1, (v - 0.42) / (0.85 - 0.42)));
    return -sp * procWidth.current;
  });

  const marqueeX = useTransform(smoothProgress, (v) => `${(v * -8).toFixed(1)}%`);
  const marqueeRX = useTransform(smoothProgress, (v) => `${(-8 + v * 8).toFixed(1)}%`);

  return (
    <section ref={containerRef} className="relative bg-[#0c0d0e]">
      {/* Mobile / reduced-motion fallback */}
      <div className={reduce ? "block" : "md:hidden"}>
        <div className="relative overflow-hidden px-6 py-20">
          <div className="absolute inset-0 z-0 bg-[#141516]" />
          <div className="absolute inset-0 z-0 opacity-60">
            <BrushedMetalBackground interactiveTargetRef={containerRef} />
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <SectionHeader
              eyebrow="Workflow"
              title="A focused process that keeps work moving."
              description="Research, concept, design, deliver — swipe through how each phase lands."
              className="mb-10"
            />
          </div>
          <div className="mobile-thin-x-scrollbar relative z-10 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
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

      {/* Desktop: scroll-driven overlay (always rendered, Y animated by progress) */}
      <div className={reduce ? "hidden" : "hidden md:block"}>
        <motion.div
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0c0d0e] will-change-transform"
          style={{ y: overlayY }}
        >
          <div className="absolute inset-0 z-0 bg-[#141516]" />
          <div aria-hidden className="absolute inset-0 z-0">
            <BrushedMetalBackground interactiveTargetRef={containerRef} />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 z-0 overflow-hidden text-nowrap font-display text-6xl font-bold uppercase tracking-[0.18em] text-white/[0.035]">
            <motion.div className="flex w-max gap-16" style={{ x: marqueeX }}>
              {Array.from({ length: 6 }).map((_, g) => (
                <div key={g} className="flex gap-16">
                  {processMarquee.map((item) => (
                    <span key={`${g}-${item}`}>{item}</span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-16 z-0 overflow-hidden text-nowrap font-display text-5xl font-bold uppercase tracking-[0.18em] text-white/[0.028]">
            <motion.div className="flex w-max gap-16" style={{ x: marqueeRX }}>
              {Array.from({ length: 6 }).map((_, g) => (
                <div key={g} className="flex gap-16">
                  {processMarquee.map((item) => (
                    <span key={`${g}-${item}`}>{item}</span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mx-auto w-full max-w-7xl px-8 pt-[clamp(2.5rem,5vh,3.5rem)]">
              <div className="flex items-end justify-between gap-8">
                <SectionHeader
                  eyebrow="Workflow"
                  title="A focused process that keeps work moving."
                  description="Scroll to travel through every phase — research, concept, design, deliver."
                  className="mb-0"
                  contentClassName="max-w-xl"
                  titleClassName="md:text-3xl lg:text-4xl"
                />
                <LinkButton
                  to="/process"
                  variant="text"
                  className="hidden shrink-0 items-center pb-2 lg:inline-flex"
                >
                  Full process <ArrowRight size={14} />
                </LinkButton>
              </div>

              <div className="mt-[clamp(1.25rem,2.5vh,2rem)] flex items-center gap-4">
                <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-yellow via-white/70 to-yellow"
                    style={{ scaleX: barScale, width: "100%" }}
                  />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                  <span className="text-white">0{activeIndex + 1}</span>
                  <span className="text-white/40"> / 0{processSteps.length}</span>
                </div>
              </div>
            </div>

            <div
              ref={viewportRef}
              data-process-viewport
              className="relative mt-[clamp(1.5rem,3vh,2.5rem)] flex-1 overflow-hidden"
            >
              <motion.div
                ref={trackRef}
                data-process-track
                className="flex h-full w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[clamp(2rem,7vw,8rem)] will-change-transform"
                style={{ x: trackX }}
              >
                {processSteps.map((step, i) => (
                  <ProcessCard
                    key={step.title}
                    index={i}
                    total={processSteps.length}
                    step={step}
                    copy={stepCopy[step.title]}
                    isActive={activeIndex === i}
                    className="h-[clamp(24rem,62vh,38rem)] w-[min(62vw,32rem)] shrink-0 lg:w-[min(48vw,36rem)] xl:w-[min(42vw,38rem)]"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
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
        "group relative flex h-full flex-col overflow-hidden border p-8 transition-colors duration-500 md:p-10",
        isActive ? "metal-card border-white/20" : "metal-panel border-white/10 bg-background/30",
        className,
      )}
      animate={{ opacity: isActive ? 1 : 0.68 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="pointer-events-none absolute right-6 top-4 font-display text-[8rem] font-bold leading-none text-white/[0.06] md:text-[10rem]">
        0{index + 1}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <div className="metal-icon h-12 w-12">
          <Icon size={18} />
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
            <li key={d} className="metal-ghost rounded-full px-3 py-1 text-xs text-white/80">
              {d}
            </li>
          ))}
        </ul>
      </div>

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
