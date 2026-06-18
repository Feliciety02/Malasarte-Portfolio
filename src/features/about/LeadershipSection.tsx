import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { leadership } from "@/data/about";
import type { TimelineItem } from "@/data/about";

const HIGHLIGHT_ITEMS: (TimelineItem & { highlight: string })[] = [
  {
    ...leadership[0],
    highlight:
      "Leading the University's largest student developer community — driving technical initiatives, events, and partnerships.",
  },
  {
    ...leadership[1],
    highlight:
      "Directed marketing strategy, brand presence, and promotional campaigns for the college student government.",
  },
  {
    ...leadership[2],
    highlight:
      "Managed documentation, coordination, and communication for DOST scholars across the university.",
  },
  {
    ...leadership[3],
    highlight:
      "Represented Computer Science students in the developer community, bridging feedback and initiatives.",
  },
  {
    ...leadership[4],
    highlight: "Organized data and maintained records for the Data Owls organization.",
  },
  {
    ...leadership[5],
    highlight:
      "Contributed creative direction and visual assets for community events and campaigns.",
  },
  {
    ...leadership[6],
    highlight: "Designed visual materials for UM Enigma's events and initiatives.",
  },
  {
    ...leadership[7],
    highlight: "Created graphics and branding for JBECP's blockchain education events.",
  },
  {
    ...leadership[8],
    highlight:
      "Managed business operations and financial planning for the Student Advisory Council.",
  },
];

const gradientPairs = [
  "from-violet-600/40 via-purple-600/20 to-transparent",
  "from-fuchsia-600/40 via-pink-600/20 to-transparent",
  "from-blue-600/40 via-indigo-600/20 to-transparent",
  "from-amber-600/40 via-orange-600/20 to-transparent",
  "from-emerald-600/40 via-teal-600/20 to-transparent",
  "from-rose-600/40 via-red-600/20 to-transparent",
  "from-cyan-600/40 via-sky-600/20 to-transparent",
  "from-violet-600/40 via-purple-600/20 to-transparent",
  "from-fuchsia-600/40 via-pink-600/20 to-transparent",
];

export function LeadershipSection() {
  const [active, setActive] = useState(0);
  const item = HIGHLIGHT_ITEMS[active];
  const gradient = gradientPairs[active % gradientPairs.length];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.02), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.04), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="metal-kicker">Leadership</span>
          <h2 className="mt-4 font-display text-5xl font-medium italic tracking-tight md:text-7xl">
            Organizational <em>Experience</em>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/60">
            Roles that shaped my leadership, collaboration, and community-building skills.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="mb-6 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              Now Highlighting
            </span>
            <nav className="space-y-0" role="tablist" aria-label="Leadership roles">
              {HIGHLIGHT_ITEMS.slice(0, 6).map((item, i) => (
                <motion.button
                  key={`${item.period}-${item.title}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  whileHover={{ paddingLeft: 24 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group flex w-full items-center justify-between border-b border-white/10 py-5 text-left transition-colors ${
                    active === i ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="w-8 shrink-0 font-mono text-sm text-white/50">0{i + 1}</span>
                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/60">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="ml-4 shrink-0 text-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    &rarr;
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`aspect-square w-full rounded-3xl bg-gradient-to-b ${gradient} border border-white/10 p-8 flex flex-col justify-end`}
                >
                  {item.logo && (
                    <div className="mb-6">
                      <img
                        src={item.logo}
                        alt={`${item.subtitle} logo`}
                        className="h-16 w-16 object-contain md:h-20 md:w-20"
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                      {item.period}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{item.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{item.highlight}</p>
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
