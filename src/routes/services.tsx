import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { MetallicPage } from "@/components/site/MetallicPage";
import { Reveal } from "@/components/site/Reveal";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { serviceCategories } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content:
          "Design services: UI/UX, branding, social media graphics, creative assets, front end development, content, and VA support.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "Core expertise in services from product design to brand systems and content.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <MetallicPage variant="services" className="px-6 pb-28">
      <section className="mx-auto max-w-7xl pt-12 md:pt-20">
        <Reveal>
          <SectionHeader
            eyebrow="What I do"
            title="Services offered"
            description="A focused set of services for founders, studios, and creators combining design craft, brand thinking, and reliable execution."
            contentClassName="max-w-2xl"
            titleClassName="text-4xl sm:text-5xl md:text-7xl"
            descriptionClassName="leading-7"
            titleTag="h1"
          />
        </Reveal>

        <div className="metal-rail mt-10" />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <ServiceCard {...service} variant="full" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="blueprint-surface metal-panel p-8 text-center md:p-16">
            <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-5xl">
              {accentLastWord("Have a brief in mind?")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
              Tell me about the project and I'll come back with scope, timeline, and a friendly
              hello.
            </p>
            <LinkButton to="/contact" className="mt-8">
              Start a project <ArrowRight size={14} />
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </MetallicPage>
  );
}
