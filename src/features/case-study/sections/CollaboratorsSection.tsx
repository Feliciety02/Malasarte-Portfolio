import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  getProjectCollaboratorShowcase,
  type ProjectCollaborator,
} from "@/data/projects";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { cn } from "@/lib/utils";
import { SectionAnchor, SectionLabel, FadeIn } from "./SectionWrappers";
import type { SectionProps } from "../types/templates";

const AUTOPLAY_MS = 5000;

export function CollaboratorsSection({ project, sectionNumber }: SectionProps) {
  const collaborators = useMemo(() => getProjectCollaboratorShowcase(project), [project]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsCompact(window.innerWidth < 900);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [project.slug]);

  useEffect(() => {
    if (isPaused || collaborators.length <= 1) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % collaborators.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [collaborators.length, isPaused]);

  if (collaborators.length === 0) return null;

  return (
    <SectionAnchor id="collaborators" className="case-study-section--no-divider pt-28">
      <FadeIn>
        <SectionLabel kicker={sectionNumber} label="Collaborators" />
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-medium leading-tight md:text-5xl">
              {accentLastWord("Meet the people behind the build")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Grateful appreciation to the collaborators whose work, insight, and effort helped shape this project.
            </p>
          </div>
        </div>

        <div
          className="relative mt-12 overflow-hidden px-2 py-6 sm:px-4 sm:py-8 lg:px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.02),rgba(250,204,21,0.14),rgba(255,255,255,0.02),rgba(56,189,248,0.14),rgba(255,255,255,0.02))] blur-3xl"
          />

          <div className="relative mx-auto h-[24rem] max-w-6xl sm:h-[28rem]">
            {collaborators.map((item, index) => {
              const normalizedOffset = getNormalizedOffset(index, active, collaborators.length);
              const depth = Math.abs(normalizedOffset);
              const center = normalizedOffset === 0;
              const visibleRange = getVisibleOffsets(collaborators.length, isCompact);
              const isVisible = visibleRange.includes(normalizedOffset);

              return (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "absolute left-1/2 top-1/2 w-[10.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:w-[13rem] lg:w-[16rem]",
                    center ? "cursor-default" : "cursor-pointer",
                  )}
                  animate={{
                    x: getCardX(normalizedOffset, isVisible, isCompact),
                    y: getCardY(normalizedOffset, isVisible),
                    scale: isVisible ? getCardScale(depth, center) : 0.5,
                    opacity: isVisible ? getCardOpacity(depth) : 0,
                    rotateZ: isVisible ? getCardRotate(normalizedOffset, depth) : 0,
                    filter: isVisible ? getCardBlur(depth) : "blur(6px)",
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 20, mass: 1.1 }}
                  whileHover={
                    center && isVisible
                      ? { y: -10, rotateX: -5, rotateY: 4, scale: 1.04 }
                      : isVisible
                        ? { y: -8, scale: 1.03 }
                        : {}
                  }
                  whileTap={isVisible ? { scale: 0.985 } : {}}
                  style={{
                    zIndex: isVisible ? 30 - depth : 0,
                    transformStyle: "preserve-3d",
                  }}
                  aria-label={center ? `${item.name} is centered` : `Focus ${item.name}`}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[1.65rem] p-2 transition-shadow duration-300",
                      center ? "bg-white/[0.05]" : "bg-white/[0.02]",
                    )}
                  >
                    <CollaboratorPortrait collaborator={item} highlighted={center && isVisible} />
                    <motion.div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md",
                        center && isVisible ? "opacity-100" : "opacity-88",
                      )}
                      animate={center && isVisible ? { y: [0, -3, 0] } : { y: 0 }}
                      transition={{
                        duration: 2.6,
                        repeat: center && isVisible ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    >
                      <p className="line-clamp-1 text-sm font-semibold text-white sm:text-base">
                        {item.name}
                      </p>
                      <p className="line-clamp-1 text-[11px] uppercase tracking-[0.14em] text-white/60 sm:text-xs">
                        {item.role?.trim() || "Project Collaborator"}
                      </p>
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {collaborators.length > 1 ? (
            <div className="relative mt-6 flex items-center justify-center gap-2">
              {collaborators.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      isActive ? "w-10 bg-primary" : "w-2.5 bg-white/20 hover:bg-white/40",
                    )}
                    aria-label={`Go to ${item.name}`}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </FadeIn>
    </SectionAnchor>
  );
}

function CollaboratorPortrait({
  collaborator,
  highlighted,
}: {
  collaborator: ProjectCollaborator;
  highlighted: boolean;
}) {
  const initials = getInitials(collaborator.name);

  if (collaborator.imageUrl?.trim()) {
    const isJeovan = /jeovan|joevan/i.test(collaborator.name);
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-neutral-900 pt-1.5">
        <img
          src={collaborator.imageUrl}
          alt={collaborator.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700",
            highlighted ? "scale-[1.04]" : "grayscale-[0.15]",
            isJeovan && "scale-105",
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.1)_55%,rgba(0,0,0,0.42)_100%)]" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,#e8e8eb,#d5d5db_60%,#c8c8cf)]">
      <motion.div
        aria-hidden
        animate={highlighted ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{
          duration: 4.8,
          repeat: highlighted ? Number.POSITIVE_INFINITY : 0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(15,23,42,0.16),transparent_34%)]"
      />
      <div className="absolute inset-x-[18%] bottom-0 top-[18%] rounded-t-[999px] bg-[linear-gradient(180deg,rgba(17,24,39,0.92),rgba(31,41,55,0.84))]" />
      <div className="absolute left-1/2 top-[16%] h-[24%] w-[38%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(31,41,55,1),rgba(17,24,39,0.94))]" />
      <div className="absolute bottom-[23%] left-1/2 h-[6%] w-[16%] -translate-x-1/2 rounded-full bg-[rgba(17,24,39,0.88)]" />
      <div className="absolute inset-x-[22%] bottom-0 h-[35%] rounded-t-[2rem] bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(17,24,39,1))]" />
      <div className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
        {initials}
      </div>
    </div>
  );
}

function modulo(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getNormalizedOffset(index: number, active: number, length: number) {
  const raw = index - active;
  if (raw > length / 2) return raw - length;
  if (raw < -length / 2) return raw + length;
  return raw;
}

function getCardX(offset: number, isVisible: boolean, isCompact: boolean) {
  const xUnit = isCompact ? 116 : 188;
  const farUnit = isCompact ? 0 : 172;
  if (!isVisible) return (offset > 0 ? 1 : -1) * (xUnit * 2 + farUnit);
  const depth = Math.abs(offset);
  return offset === 0 ? 0 : offset * xUnit + (depth > 1 ? Math.sign(offset) * farUnit : 0);
}

function getCardY(offset: number, isVisible: boolean) {
  if (!isVisible) return 60;
  const depth = Math.abs(offset);
  return depth === 0 ? -8 : depth === 1 ? 18 : 38;
}

function getCardScale(depth: number, center: boolean) {
  if (center) return 1;
  return depth === 1 ? 0.88 : 0.74;
}

function getCardOpacity(depth: number) {
  return depth === 0 ? 1 : depth === 1 ? 0.78 : 0.42;
}

function getCardRotate(offset: number, depth: number) {
  if (depth === 0) return 0;
  return offset * (depth === 1 ? 3.5 : 5);
}

function getCardBlur(depth: number) {
  return depth === 0 ? "blur(0px)" : depth === 1 ? "blur(0.4px)" : "blur(1.2px)";
}

function getVisibleOffsets(length: number, isCompact: boolean) {
  if (length <= 1) return [0];
  if (length === 2) return [-1, 0, 1];
  if (length === 3) return isCompact ? [-1, 0, 1] : [-1, 0, 1];
  if (length === 4) return isCompact ? [-1, 0, 1] : [-2, -1, 0, 1];
  return isCompact ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
}
