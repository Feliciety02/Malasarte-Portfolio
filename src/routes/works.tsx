import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — Fe Anne Malasarte" },
      { name: "description", content: "Selected works across UI/UX, branding, publication, web design and writing." },
      { property: "og:title", content: "Works — Fe Anne Malasarte" },
      { property: "og:description", content: "A curated portfolio of designs, brand systems, and creative work." },
    ],
  }),
  component: Works,
});

const categories = ["All", "UI/UX Design", "Publication", "Logo & Branding", "Web Design", "Writing / VA"] as const;
type Cat = (typeof categories)[number];

type Project = {
  title: string;
  cat: Exclude<Cat, "All">;
  tag: string;
  color: string;
  desc: string;
  details: string;
};

const projects: Project[] = [
  { title: "Lumen Banking", cat: "UI/UX Design", tag: "Mobile App · Figma", color: "from-violet-500/50 to-fuchsia-500/30", desc: "A calm, trustworthy mobile banking experience.", details: "Designed end-to-end onboarding, dashboard, transactions and budgeting flows for a next-gen neobank. Focused on clarity, micro-interactions, and an inclusive color palette." },
  { title: "Wavefront Dashboard", cat: "UI/UX Design", tag: "SaaS · Web", color: "from-blue-500/50 to-cyan-500/30", desc: "Analytics dashboard for a marketing platform.", details: "Wireframes to high-fidelity mockups, including an extensible data-viz system and dark/light theming." },
  { title: "Nimbus Wireframes", cat: "UI/UX Design", tag: "Wireframes", color: "from-indigo-500/50 to-violet-500/30", desc: "Low-fi exploration for a productivity app.", details: "User flows, IA, and 60+ wireframe screens used as the foundation for a 3-month design sprint." },

  { title: "OrgWeek Pubmats", cat: "Publication", tag: "Social Posters", color: "from-pink-500/50 to-rose-500/30", desc: "Series of pubmats for an organization week.", details: "10-piece social campaign with a cohesive type system, gradient palette, and animated story templates." },
  { title: "Echo Magazine", cat: "Publication", tag: "Editorial Layout", color: "from-amber-400/50 to-orange-500/30", desc: "Editorial layout exploration.", details: "32-page editorial layout exploring grid tension, typographic rhythm, and image-led storytelling." },

  { title: "Aurora Brand", cat: "Logo & Branding", tag: "Identity System", color: "from-fuchsia-500/50 to-pink-500/30", desc: "Brand identity for a wellness studio.", details: "Logo, brand board, color palette, and applied mockups across print, web and merchandise." },
  { title: "Verdant Mark", cat: "Logo & Branding", tag: "Logo & Mockups", color: "from-emerald-400/50 to-teal-500/30", desc: "Botanical brand mark.", details: "Custom wordmark + monogram with material studies on packaging and signage." },

  { title: "Studio Folio Site", cat: "Web Design", tag: "Landing Page", color: "from-cyan-400/50 to-blue-500/30", desc: "Premium landing page for a design studio.", details: "Fully responsive landing page with parallax, scroll narrative, and a custom cursor system." },
  { title: "Cafe Lumen Web", cat: "Web Design", tag: "Web UI", color: "from-rose-400/50 to-amber-400/30", desc: "Marketing site for a specialty cafe.", details: "Menu architecture, location finder, and storytelling sections built around the brand voice." },

  { title: "Voice & Captions", cat: "Writing / VA", tag: "Content Writing", color: "from-purple-500/50 to-indigo-500/30", desc: "Captions and blog content for creators.", details: "Long-form blog drafts, social captions, and a tone-of-voice mini guide for an indie founder." },
  { title: "VA Toolkit", cat: "Writing / VA", tag: "Client Support", color: "from-slate-500/40 to-violet-500/30", desc: "File systems & client support workflows.", details: "Notion templates, file naming conventions, and onboarding docs for streamlined VA operations." },
];

function Works() {
  const [active, setActive] = useState<Cat>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <div className="relative px-6 pb-20">
      <section className="relative mx-auto max-w-7xl pt-12">
        <FloatingOrbs />
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Portfolio</span>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">Selected <span className="text-gradient">Works</span></h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A growing collection of design explorations across product, brand, publication, and writing.
          </p>
        </Reveal>

        {/* Filter */}
        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                active === c
                  ? "border-transparent bg-gradient-hero text-primary-foreground shadow-glow"
                  : "border-border/60 text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                layout
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setOpen(p)}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl glass text-left hover-lift"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full glass-strong opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-primary">{p.tag}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-strong shadow-card"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className={`aspect-[16/9] bg-gradient-to-br ${open.color}`} />
              <div className="p-8 md:p-10">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{open.tag}</span>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{open.title}</h2>
                <p className="mt-4 text-muted-foreground">{open.details}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { k: "Role", v: "Designer" },
                    { k: "Tools", v: "Figma · Illustrator" },
                    { k: "Year", v: "2025" },
                  ].map((m) => (
                    <div key={m.k} className="rounded-2xl glass p-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.k}</div>
                      <div className="mt-1 font-medium">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
