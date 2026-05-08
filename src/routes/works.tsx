import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works - Fe Anne Malasarte" },
      { name: "description", content: "Selected works across UI/UX, branding, publication, web design and writing." },
      { property: "og:title", content: "Works - Fe Anne Malasarte" },
      { property: "og:description", content: "A curated portfolio of designs, brand systems, and creative work." },
    ],
  }),
  component: Works,
});

const categories = ["All", "UI/UX Design", "Publication", "Logo & Branding", "Web Design", "Writing / VA"] as const;
type Cat = (typeof categories)[number];

function Works() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? projects : projects.filter((project) => project.cat === active);

  return (
    <div className="relative overflow-hidden px-6 pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-7xl pt-12">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title={
              <>
                Selected <span className="text-gradient">Works</span>
              </>
            }
            description="A growing collection of design explorations across product, brand, publication, and writing. Click any project to read the case study."
            contentClassName="max-w-2xl"
            titleClassName="text-5xl md:text-7xl"
            titleTag="h1"
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                active === category
                  ? "border-transparent bg-gradient-hero text-primary-foreground shadow-glow"
                  : "border-border/60 text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <ProjectCard project={project} variant="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
