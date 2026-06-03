import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { featuredSlugs } from "@/data/home";
import { projects, type Project } from "@/data/projects";

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project));

export function FeaturedProjectsSection() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Selected Work"
            title="Featured projects"
            action={
              <LinkButton to="/works" variant="text" className="hidden items-center md:inline-flex">
                View all works <ArrowRight size={14} />
              </LinkButton>
            }
            className="mb-16"
            contentClassName="max-w-xl"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <LinkButton to="/works" variant="glass">
            View all works <ArrowRight size={14} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
