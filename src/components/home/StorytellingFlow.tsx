import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { BrushedMetalBackground } from "@/components/site/BrushedMetalBackground";
import { LinkButton } from "@/components/site/LinkButton";
import { SectionHeader } from "@/components/site/SectionHeader";
import { processSteps, servicePreviews } from "@/data/home";
import { serviceCategories } from "@/data/services";
import { cn } from "@/lib/utils";

/* ── constants ── */
const PROCESS_STEPS = processSteps;
const LAST_PROCESS = PROCESS_STEPS.length - 1;
const SERVICES = servicePreviews;
const LAST_SERVICE = SERVICES.length - 1;
const MARQUEE = ["Research", "Concept", "Design", "Deliver"] as const;

/* scroll budget ratios — total outer height = 100vh + BUDGET vh */
const BUDGET = 500;
const P: Record<string, [number, number]> = {
  process: [0, 0.4],
  handoff: [0.4, 0.47],
  services: [0.47, 0.82],
  exit: [0.82, 0.9],
  release: [0.9, 1],
};

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function remap(v: number, from: [number, number], to: [number, number]) {
  const t = clamp((v - from[0]) / (from[1] - from[0]), 0, 1);
  return lerp(to[0], to[1], t);
}

/* ── process copy ── */
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

/* ── enriched service data ── */
const serviceCardData = SERVICES.map((p) => {
  const cat = serviceCategories.find(
    (c) => c.title.startsWith(p.title.split(" ")[0]) || p.title.startsWith(c.title.split(" ")[0]),
  );
  return {
    ...p,
    color: cat?.color ?? "from-white/10 to-white/5",
    bullets: cat?.bullets?.slice(0, 3) ?? [],
  };
});

/* ── ProcessCard ── */
type ProcessCardProps = {
  index: number;
  total: number;
  step: (typeof PROCESS_STEPS)[number];
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
        <div className="metal-icon h-12 w-12 text-primary">
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

/* ── ServiceCard (horizontal variant) ── */
type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bullets: readonly string[];
  isActive: boolean;
  index: number;
};

function HServiceCard({
  icon: Icon,
  title,
  desc,
  color,
  bullets,
  isActive,
  index,
}: ServiceCardProps) {
  return (
    <motion.article
      aria-current={isActive ? "step" : undefined}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border p-8 transition-colors duration-500 md:p-10",
        isActive ? "metal-card border-white/20" : "metal-panel border-white/10 bg-background/30",
      )}
      animate={{ opacity: isActive ? 1 : 0.65 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="pointer-events-none absolute right-5 top-3 font-display text-[7rem] font-bold leading-none text-white/[0.04] md:text-[9rem]">
        0{index + 1}
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <div className="metal-icon h-12 w-12 text-primary">
          <Icon size={18} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Capability 0{index + 1}
        </span>
      </div>

      <h3 className="relative z-10 mt-5 font-display text-3xl font-semibold md:text-4xl lg:text-5xl">
        {title}
      </h3>

      <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {desc}
      </p>

      <div className="relative z-10 mt-auto pt-8">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Key offers
        </div>
        <ul className="flex flex-wrap gap-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-white/80"
            >
              {b}
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

/* ── StorytellingFlow ── */
type Props = { reducedMotion: boolean };

export function StorytellingFlow({ reducedMotion }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const processTrackRef = useRef<HTMLDivElement>(null);
  const processViewportRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const servicesViewportRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const prefersReduced = useReducedMotion();
  const reduce = reducedMotion || !!prefersReduced || isMobile;

  /* ── scroll tracking ── */
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 35, damping: 20, mass: 0.8 });

  const [procActiveIdx, setProcActiveIdx] = useState(0);
  const [svcActiveIdx, setSvcActiveIdx] = useState(0);

  /* ── measured widths ── */
  const procWidth = useRef(1);
  const svcWidth = useRef(1);

  /* ── set height + track scroll ── */
  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;

    const updateHeight = () => {
      el.style.height = `${100 + BUDGET}vh`;
    };

    let frame = 0;
    const tick = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = clamp((window.scrollY - top) / dist);
      rawProgress.set(p);

      /* measure track widths */
      if (processTrackRef.current && processViewportRef.current) {
        procWidth.current = Math.max(
          1,
          processTrackRef.current.scrollWidth - processViewportRef.current.clientWidth,
        );
      }
      if (servicesTrackRef.current && servicesViewportRef.current) {
        svcWidth.current = Math.max(
          1,
          servicesTrackRef.current.scrollWidth - servicesViewportRef.current.clientWidth,
        );
      }

      /* indices */
      const pp = remap(p, P.process, [0, 1]);
      const sp = remap(p, P.services, [0, 1]);
      setProcActiveIdx((c) => {
        const n = clamp(Math.floor(pp * PROCESS_STEPS.length * 0.999), 0, LAST_PROCESS);
        return c === n ? c : n;
      });
      setSvcActiveIdx((c) => {
        const n = clamp(Math.floor(sp * SERVICES.length * 0.999), 0, LAST_SERVICE);
        return c === n ? c : n;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    updateHeight();
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        updateHeight();
        schedule();
      },
      { passive: true },
    );

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [reduce, rawProgress]);

  /* ── phase-specific local progresses (derived from smoothProgress) ── */
  const pProcess = useTransform(smoothProgress, P.process, [0, 1]);
  const pHandoff = useTransform(smoothProgress, P.handoff, [0, 1]);
  const pServices = useTransform(smoothProgress, P.services, [0, 1]);
  const pExit = useTransform(smoothProgress, P.exit, [0, 1]);

  /* ── handoff transforms ── */
  const processOpacity = useTransform(pHandoff, [0, 1], [1, 0]);
  const processScale = useTransform(pHandoff, [0, 1], [1, 0.9]);
  const processY_ = useTransform(pHandoff, [0, 1], [0, -50]);

  const servicesOpacityIn = useTransform(pHandoff, [0, 1], [0, 1]);
  const servicesScaleIn = useTransform(pHandoff, [0, 1], [0.9, 1]);
  const servicesYIn = useTransform(pHandoff, [0, 1], [50, 0]);

  /* ── exit transforms ── */
  const exitCoverOpacity = useTransform(pExit, [0, 1], [0, 1]);

  /* ── track positions (closure over measured widths) ── */
  const processTrackX = useTransform(pProcess, (pp) => -pp * procWidth.current);
  const servicesTrackX = useTransform(pServices, (sp) => -sp * svcWidth.current);

  /* ── progress bars ── */
  const procBarScale = useTransform(pProcess, [0, 1], [0, 1]);
  const svcBarScale = useTransform(pServices, [0, 1], [0, 1]);

  /* ── marquee ── */
  const marqueeX = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);
  const marqueeRX = useTransform(smoothProgress, [0, 1], ["-8%", "0%"]);

  /* ═══════════════════════════════ MOBILE / REDUCED ═══════════════════════════════ */
  if (reduce) {
    return (
      <>
        {/* process mobile */}
        <section className="relative overflow-hidden bg-[#0c0d0e] px-6 py-20 md:hidden">
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
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard
                key={step.title}
                index={i}
                total={PROCESS_STEPS.length}
                step={step}
                copy={stepCopy[step.title]}
                isActive
                className="w-[82vw] shrink-0 snap-center"
              />
            ))}
          </div>
          <div className="relative z-10 mx-auto mt-8 max-w-2xl">
            <LinkButton to="/process" variant="text" className="inline-flex items-center">
              Full process <ArrowRight size={14} />
            </LinkButton>
          </div>
        </section>

        {/* services mobile */}
        <section className="relative overflow-hidden px-6 py-24">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0.22)), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
              backgroundSize: "auto, 5rem 5rem, 5rem 5rem",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24)_28%,rgba(0,0,0,0.62)_100%)]" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="What I do"
              title="Services preview"
              description="A compact technical grid of the services I design, build, and shape."
              action={
                <LinkButton
                  to="/services"
                  variant="text"
                  className="hidden items-center md:inline-flex"
                >
                  All services <ArrowRight size={14} />
                </LinkButton>
              }
              className="mb-12"
              contentClassName="max-w-xl"
            />
          </div>
        </section>
      </>
    );
  }

  /* ═══════════════════════════════ DESKTOP ═══════════════════════════════ */
  return (
    <section ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── background layer ── */}
        <div className="absolute inset-0 z-0 bg-[#0c0d0e]" />

        {/* ── PROCESS LAYER ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col"
          style={{ opacity: processOpacity, scale: processScale, y: processY_ }}
        >
          <div className="absolute inset-0 z-0 bg-[#141516]" />
          <div aria-hidden className="absolute inset-0 z-0">
            <BrushedMetalBackground interactiveTargetRef={containerRef} />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/45 to-transparent" />
          </div>

          {/* marquees */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-20 z-0 overflow-hidden text-nowrap font-display text-6xl font-bold uppercase tracking-[0.18em] text-white/[0.035]"
          >
            <motion.div className="flex w-max gap-16" style={{ x: marqueeX }}>
              {Array.from({ length: 6 }).map((_, g) => (
                <div key={g} className="flex gap-16">
                  {MARQUEE.map((m) => (
                    <span key={`${g}-${m}`}>{m}</span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-16 z-0 overflow-hidden text-nowrap font-display text-5xl font-bold uppercase tracking-[0.18em] text-white/[0.028]"
          >
            <motion.div className="flex w-max gap-16" style={{ x: marqueeRX }}>
              {Array.from({ length: 6 }).map((_, g) => (
                <div key={g} className="flex gap-16">
                  {MARQUEE.map((m) => (
                    <span key={`${g}-${m}`}>{m}</span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* process content */}
          <div className="relative z-10 flex h-full flex-col">
            <div className="mx-auto w-full max-w-7xl px-8 pt-[clamp(3rem,7vh,5rem)]">
              <div className="flex items-end justify-between gap-8">
                <SectionHeader
                  eyebrow="Workflow"
                  title="A focused process that keeps work moving."
                  description="Scroll to travel through every phase — research, concept, design, deliver."
                  className="mb-0"
                  contentClassName="max-w-2xl"
                  titleClassName="md:text-4xl lg:text-5xl"
                />
                <LinkButton
                  to="/process"
                  variant="text"
                  className="hidden shrink-0 items-center pb-2 lg:inline-flex"
                >
                  Full process <ArrowRight size={14} />
                </LinkButton>
              </div>

              <div className="mt-[clamp(1.75rem,4vh,2.75rem)] flex items-center gap-4">
                <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-primary via-white/70 to-primary"
                    style={{ scaleX: procBarScale, width: "100%" }}
                  />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                  <span className="text-white">0{procActiveIdx + 1}</span>
                  <span className="text-white/40"> / 0{PROCESS_STEPS.length}</span>
                </div>
              </div>
            </div>

            <div
              ref={processViewportRef}
              className="relative mt-[clamp(2rem,5vh,4.25rem)] flex-1 overflow-hidden"
            >
              <motion.div
                ref={processTrackRef}
                className="flex h-full w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[clamp(2rem,7vw,8rem)] will-change-transform"
                style={{ x: processTrackX }}
              >
                {PROCESS_STEPS.map((step, i) => (
                  <ProcessCard
                    key={step.title}
                    index={i}
                    total={PROCESS_STEPS.length}
                    step={step}
                    copy={stepCopy[step.title]}
                    isActive={procActiveIdx === i}
                    className="h-[clamp(22rem,54vh,34rem)] w-[min(62vw,32rem)] shrink-0 lg:w-[min(48vw,36rem)] xl:w-[min(42vw,38rem)]"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── SERVICES LAYER ── */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col"
          style={{ opacity: servicesOpacityIn, scale: servicesScaleIn, y: servicesYIn }}
        >
          {/* background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0.22)), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
              backgroundSize: "auto, 5rem 5rem, 5rem 5rem",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24)_28%,rgba(0,0,0,0.62)_100%)]" />
          <div aria-hidden className="absolute inset-0 opacity-[0.07]">
            <BrushedMetalBackground interactiveTargetRef={containerRef} />
          </div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mx-auto w-full max-w-7xl px-8 pt-[clamp(3rem,7vh,5rem)]">
              <div className="flex items-end justify-between gap-8">
                <SectionHeader
                  eyebrow="What I Do"
                  title="Services designed to elevate your brand."
                  description="Scroll through each capability — UI/UX, branding, social media graphics, creative assets, development, and content."
                  className="mb-0"
                  contentClassName="max-w-2xl"
                  titleClassName="md:text-4xl lg:text-5xl"
                />
                <LinkButton
                  to="/services"
                  variant="text"
                  className="hidden shrink-0 items-center pb-2 lg:inline-flex"
                >
                  All services <ArrowRight size={14} />
                </LinkButton>
              </div>

              <div className="mt-[clamp(1.75rem,4vh,2.75rem)] flex items-center gap-4">
                <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-primary via-white/70 to-primary"
                    style={{ scaleX: svcBarScale, width: "100%" }}
                  />
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                  <span className="text-white">0{svcActiveIdx + 1}</span>
                  <span className="text-white/40"> / 0{SERVICES.length}</span>
                </div>
              </div>
            </div>

            <div
              ref={servicesViewportRef}
              className="relative mt-[clamp(2rem,5vh,4.25rem)] flex-1 overflow-hidden"
            >
              <motion.div
                ref={servicesTrackRef}
                className="flex h-full w-max items-center gap-[clamp(1.25rem,2vw,2rem)] px-[clamp(2rem,7vw,8rem)] will-change-transform"
                style={{ x: servicesTrackX }}
              >
                {serviceCardData.map((svc, i) => (
                  <div
                    key={svc.title}
                    className="h-[clamp(22rem,54vh,34rem)] w-[min(62vw,32rem)] shrink-0 lg:w-[min(48vw,36rem)] xl:w-[min(42vw,38rem)]"
                  >
                    <HServiceCard
                      index={i}
                      icon={svc.icon}
                      title={svc.title}
                      desc={svc.desc}
                      color={svc.color}
                      bullets={svc.bullets}
                      isActive={svcActiveIdx === i}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* exit overlay for the services layer */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none bg-[#0c0d0e]"
            style={{ opacity: exitCoverOpacity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
