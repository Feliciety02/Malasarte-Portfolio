import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { serviceCategories } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Fe Anne Malasarte" },
      {
        name: "description",
        content: "Design services: UI/UX, branding, publication, web design, content & VA support.",
      },
      { property: "og:title", content: "Services - Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "How I can help - from product design to brand systems and content.",
      },
    ],
  }),
  component: Services,
});

function Services() {
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
            eyebrow="Services"
            title={
              <>
                How I can <span className="text-gradient">help</span>
              </>
            }
            description="A focused set of services for founders, studios, and creators - combining design craft, brand thinking, and reliable execution."
            contentClassName="max-w-2xl"
            titleClassName="text-4xl sm:text-5xl md:text-7xl"
            titleTag="h1"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <ServiceCard {...service} variant="full" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-8 text-center md:p-16">
            <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-20" />
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-5xl">
              Have a brief in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell me about the project and I'll come back with scope, timeline, and a friendly
              hello.
            </p>
            <LinkButton to="/contact" className="mt-8">
              Start a project <ArrowRight size={14} />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
