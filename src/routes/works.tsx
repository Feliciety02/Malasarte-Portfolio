import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { projects } from "@/data/projects";

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

function Works() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <div className="relative overflow-hidden px-6 pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-7xl pt-12">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Portfolio</span>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">Selected <span className="text-gradient">Works</span></h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A growing collection of design explorations across product, brand, publication, and writing. Click any project to read the case study.
          </p>
        </Reveal>

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

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                layout
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link
                  to="/works/$slug"
                  params={{ slug: p.slug }}
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
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
