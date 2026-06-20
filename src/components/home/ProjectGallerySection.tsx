import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Grid3X3, Palette, Code, Sparkles, Layers, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import { getProjectCoverImage } from "@/data/projectImages";
import { getProjectDisplayTitle } from "@/data/projects";
import { getProjectTags, getAllTags } from "@/lib/contentLoader";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { getRouteCategoryForProject } from "@/features/case-study/templates/templateRegistry";
import type { Project } from "@/data/projects";

const tagIcons: Record<string, typeof Search> = {
  "UI/UX": Palette,
  "Full-Stack": Code,
  Animations: Sparkles,
  "Software Development": Globe,
};

const tagColors: Record<string, string> = {
  "UI/UX": "from-violet-500/30 to-purple-500/20",
  "Full-Stack": "from-blue-500/30 to-cyan-500/20",
  Animations: "from-amber-500/30 to-rose-500/20",
  "Software Development": "from-emerald-500/30 to-teal-500/20",
};

export function ProjectGallerySection() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = getAllTags();

  const filtered = useMemo(() => {
    let result: Project[] = projects;

    if (activeTag) {
      result = result.filter((p) => {
        const tags = getProjectTags(p.slug);
        return tags.includes(activeTag);
      });
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const tags = getProjectTags(p.slug);
        return (
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          tags.some((t) => t.toLowerCase().includes(q)) ||
          p.tools.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    return result;
  }, [search, activeTag]);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/10">
            <Grid3X3 size={22} className="text-yellow/80" />
          </div>
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            Explore <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            Browse through case studies by category, technology, or type of work.
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-yellow/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              !activeTag
                ? "bg-white/15 text-white"
                : "bg-white/5 text-muted-foreground hover:text-white"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => {
            const Icon = tagIcons[tag] || Layers;
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(isActive ? null : tag)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-muted-foreground hover:text-white"
                }`}
              >
                <Icon size={12} />
                {tag}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag ?? "all"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">No projects match your search.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                  <ProjectGalleryCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectGalleryCard({ project, index }: { project: Project; index: number }) {
  const coverImage = getProjectCoverImage(project);
  const displayTitle = getProjectDisplayTitle(project);
  const tags = getProjectTags(project.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <CaseStudyLink
        slug={project.slug}
        routeCategory={getRouteCategoryForProject(project)}
        className="metal-card group flex h-full flex-col overflow-hidden rounded-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-white/10 to-white/[0.02]">
          {coverImage ? (
            <img
              src={coverImage}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-yellow-500/10 to-amber-500/5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Preview
              </span>
            </div>
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
              {project.cat}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-lg font-bold leading-tight">{displayTitle}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {project.desc}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-yellow/10 px-2 py-0.5 text-[9px] font-medium text-yellow/80"
              >
                {tag}
              </span>
            ))}
            {project.tools.slice(0, 2).map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </CaseStudyLink>
    </motion.div>
  );
}
