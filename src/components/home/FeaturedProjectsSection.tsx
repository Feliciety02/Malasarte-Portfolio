import { ArrowRight } from "lucide-react";
import { CaseStudyLink } from "@/components/site/CaseStudyLink";
import { LinkButton } from "@/components/site/LinkButton";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { featuredSlugs } from "@/data/home";
import { projects, type Project } from "@/data/projects";

const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export function FeaturedProjectsSection() {
  return (
    <section className="relative overflow-hidden bg-[#08090a] px-6 py-32">
      <div className="mx-auto max-w-7xl">
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
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <div key={project.slug} className="group">
              <CaseStudyLink slug={project.slug}>
                <ProjectCard project={project} />
              </CaseStudyLink>
            </div>
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
