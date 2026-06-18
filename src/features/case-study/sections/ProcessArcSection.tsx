import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import { cn } from "@/lib/utils";
import type { SectionProps } from "../types/templates";

export function ProcessArcSection({ project, sectionNumber }: SectionProps) {
  const steps = project.process;
  if (steps.length === 0) return null;

  return (
    <SectionAnchor id="process">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Process" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
            {accentLastWord("How the work evolved")}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {steps.length} phases
          </p>
        </div>
      </FadeIn>

      <StickyTimeline steps={steps} />
    </SectionAnchor>
  );
}

function StickyTimeline({ steps }: { steps: { title: string; text: string }[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  return (
    <div className="relative mt-14 md:grid md:grid-cols-[10rem_1fr] md:gap-16 lg:grid-cols-[12rem_1fr]">
      {/* Sticky timeline — left */}
      <div className="sticky top-28 hidden self-start md:block">
        {/* Vertical line */}
        <div className="absolute left-[3.5px] top-3 h-[calc(100%-1.5rem)] w-[1px] bg-white/[0.04]" />
        {/* Animated progress fill */}
        <motion.div
          className="absolute left-[3.5px] top-3 w-[1px] bg-gradient-to-b from-primary/60 to-primary/20"
          initial={{ height: 0 }}
          animate={{
            height: `${((activeIndex + 0.5) / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <nav className="relative space-y-8">
          {steps.map((step, index) => (
            <button
              key={step.title}
              onClick={() =>
                stepRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
              className="group flex items-center gap-3 text-left"
            >
              <span
                className={cn(
                  "relative z-10 flex h-2 w-2 shrink-0 rounded-full transition-all duration-500",
                  index === activeIndex
                    ? "bg-primary shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                    : "bg-white/15 group-hover:bg-white/30",
                )}
              />
              <span
                className={cn(
                  "font-mono text-[11px] tracking-widest transition-all duration-500",
                  index === activeIndex ? "text-white" : "text-white/25",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm font-medium transition-all duration-500",
                  index === activeIndex ? "text-white" : "text-white/25 group-hover:text-white/50",
                )}
              >
                {step.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content panels — right */}
      <div className="min-w-0 space-y-32 md:space-y-40">
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(el) => { stepRefs.current[index] = el; }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Mobile step indicator */}
              <div className="mb-4 flex items-center gap-3 md:hidden">
                <span className="font-mono text-[11px] tracking-widest text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-sm font-medium text-white/60">
                  {step.title}
                </span>
              </div>

              {/* Phase number background */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-6 select-none font-display text-[8rem] font-bold leading-none text-white/[0.015] md:text-[10rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="font-display text-3xl font-medium md:text-4xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
                {step.text}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
