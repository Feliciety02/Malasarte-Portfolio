import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MetallicPage } from "@/components/site/MetallicPage";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { categoryDescriptions, getProjectsByCategory } from "@/data/projects";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works - Fe Anne Malasarte" },
      {
        name: "description",
        content: "Selected works across UI/UX, branding, publication, front end development, and writing.",
      },
      { property: "og:title", content: "Works - Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "A curated portfolio of designs, brand systems, and creative work.",
      },
    ],
  }),
  component: Works,
});

const categories = [
  "All",
  "UI/UX Design",
  "Publication",
  "Logo & Branding",
  "Front End Development",
  "Writing / VA",
] as const;
type Cat = (typeof categories)[number];

function Works() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [active, setActive] = useState<Cat>("All");
  const filtered = getProjectsByCategory(active);

  if (pathname !== "/works") {
    return <Outlet />;
  }

  return (
    <MetallicPage variant="works" className="px-6 pb-28">
      <section className="mx-auto max-w-7xl pt-12 md:pt-20">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title={
              <>
                Selected <span className="text-gradient">Works</span>
              </>
            }
            description="A growing collection of work across product design, branding, publication, front-end development, and writing. Click any project to read the case study."
            contentClassName="max-w-2xl"
            titleClassName="text-4xl sm:text-5xl md:text-7xl"
            descriptionClassName="leading-7"
            titleTag="h1"
          />
        </Reveal>

        <div className="metal-rail mt-10" />

        <div className="thin-x-scrollbar mt-8 -mx-1 overflow-x-auto pb-2 pt-1">
          <div className="mb-2 flex w-max min-w-full gap-2 px-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all sm:px-5 sm:text-sm ${
                  active === category
                    ? "metal-cta text-primary-foreground"
                    : "metal-ghost text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.p
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground"
        >
          {categoryDescriptions[active]}
        </motion.p>

        <motion.div
          layout
          className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 24, clipPath: "inset(18% 0 18% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.98, clipPath: "inset(12% 0 12% 0)" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <ProjectCard project={project} variant="grid" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </MetallicPage>
  );
}
