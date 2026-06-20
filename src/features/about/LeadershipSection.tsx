import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { leadership } from "@/data/about";
import type { TimelineItem } from "@/data/about";

type LeadershipHighlightItem = TimelineItem & {
  brand: string;
  description: string;
  metadata: string[];
};

const HIGHLIGHT_ITEMS: LeadershipHighlightItem[] = [
  {
    ...leadership[0],
    brand: "UM Student Developers Community",
    description:
      "Guiding one of the university's strongest student tech communities through programs, collaborations, and activities that help members grow as builders and contributors.",
    metadata: ["Leadership", "Community Building", "Events"],
  },
  {
    ...leadership[1],
    brand: "CCE-CSG",
    description:
      "Oversaw how the organization communicated with students by aligning campaign visuals, event promotion, and messaging into a more cohesive public presence.",
    metadata: ["Marketing", "Creative Direction", "Student Engagement"],
  },
  {
    ...leadership[2],
    brand: "DOST Agilas Association",
    description:
      "Handled organizational communication and structured documentation to keep scholar-related activities, information, and coordination clear and reliable.",
    metadata: ["Documentation", "Coordination", "Operations"],
  },
  {
    ...leadership[3],
    brand: "UM Student Developers Community",
    description:
      "Acted as a bridge between students and the organization by helping surface feedback, support representation, and align activities with student interests.",
    metadata: ["Representation", "Facilitation", "Community Support"],
  },
  {
    ...leadership[4],
    brand: "Data Owls",
    description:
      "Focused on keeping organizational information orderly and dependable, helping the team stay aligned through better record management and tracking.",
    metadata: ["Records", "Systems", "Operations"],
  },
  {
    ...leadership[6],
    brand: "UM Enigma",
    description:
      "Produced creative assets that helped shape how the organization presented its events, activities, and initiatives to its audience.",
    metadata: ["Visual Identity", "Design Support", "Campaign Assets"],
  },
  {
    ...leadership[7],
    brand: "JBECP",
    description:
      "Helped communicate technical and community-focused events through visual assets that made programs feel more polished and accessible.",
    metadata: ["Branding", "Education", "Event Promotion"],
  },
];

const gradientPairs = [
  "from-violet-700/50 via-fuchsia-700/20 to-transparent",
  "from-amber-600/35 via-orange-600/18 to-transparent",
  "from-sky-700/40 via-cyan-600/18 to-transparent",
  "from-indigo-700/42 via-violet-600/18 to-transparent",
  "from-emerald-700/40 via-teal-600/16 to-transparent",
  "from-rose-700/36 via-red-600/18 to-transparent",
  "from-yellow-600/28 via-amber-500/14 to-transparent",
];

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const formatPeriod = (value: string) => value.replace(/\s*[–—-]\s*/g, "–");

export function LeadershipSection() {
  const [active, setActive] = useState(0);
  const item = HIGHLIGHT_ITEMS[active];
  const gradient = gradientPairs[active % gradientPairs.length];
  const isUmsdcHighlight = item.brand === "UM Student Developers Community";

  return (
    <section className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.02), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.04), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Leadership"
          title="Organizational Experience"
          description="A leadership journey shaped by building communities, supporting organizations, and creating impact beyond the title itself."
          titleClassName="italic"
          descriptionClassName="max-w-2xl text-white/60 md:text-lg"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-12 lg:gap-12">
          <div className="md:col-span-7 border-t border-white/10">
            <nav className="space-y-0" role="tablist" aria-label="Leadership roles">
              {HIGHLIGHT_ITEMS.map((entry, i) => (
                <motion.button
                  key={`${entry.period}-${entry.title}-${entry.subtitle}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  whileHover={{ paddingLeft: 24 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group w-full border-b border-white/10 py-6 text-left transition-all md:py-8 ${
                    active === i ? "text-white" : "text-white/55 hover:text-white/82"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[1.95rem] font-bold leading-[0.95] tracking-tight md:text-[2.7rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/60 md:text-[0.96rem]">
                        {entry.subtitle}
                      </p>
                    </div>
                    <span className="shrink-0 text-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      &rarr;
                    </span>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-32 self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${item.title}-${item.subtitle}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={transition}
                  className={`w-full rounded-[2rem] border border-white/10 bg-gradient-to-br ${gradient} p-6 md:p-7`}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    {item.logo ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={transition}
                        className="shrink-0"
                      >
                        <img
                          src={item.logo}
                          alt={`${item.brand} logo`}
                          className={
                            isUmsdcHighlight
                              ? "h-20 w-20 object-contain md:h-24 md:w-24"
                              : "h-[4.5rem] w-[4.5rem] object-contain md:h-20 md:w-20"
                          }
                        />
                      </motion.div>
                    ) : null}

                    <div className="min-w-0">
                      <p className="font-display text-[clamp(1.6rem,2vw,2.3rem)] font-bold leading-[0.98] tracking-tight text-white">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[0.98rem] leading-6 text-white/70">{item.brand}</p>
                      <p className="mt-1 text-sm leading-6 text-white/46">
                        {formatPeriod(item.period)}
                      </p>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ ...transition, delay: 0.04 }}
                      className="max-w-[28rem] text-[0.94rem] leading-7 text-white/72"
                    >
                      {item.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ ...transition, delay: 0.08 }}
                      className="flex flex-wrap justify-center gap-2 pt-1"
                    >
                      {item.metadata.map((meta) => (
                        <span
                          key={meta}
                          className="rounded-full border border-violet-300/18 bg-violet-400/8 px-3 py-1 text-[0.72rem] text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md"
                        >
                          {meta}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
