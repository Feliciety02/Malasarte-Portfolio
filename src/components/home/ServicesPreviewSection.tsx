import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { servicePreviews } from "@/data/home";

type ServicesPreviewSectionProps = {
  reducedMotion: boolean;
};

export function ServicesPreviewSection({ reducedMotion }: ServicesPreviewSectionProps) {
  const featuredServices = servicePreviews.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#0c0d0e] px-6 py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0.22)), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
          backgroundSize: "auto, 5rem 5rem, 5rem 5rem",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.24)_28%,rgba(0,0,0,0.62)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="What I do"
            title="Services preview"
            description="A compact technical grid of the services I design, build, and shape."
            action={
              <LinkButton
                to="/services"
                variant="text"
                className="hidden items-center md:inline-flex"
              >
                All services <ArrowRight size={14} />
              </LinkButton>
            }
            className="mb-12"
            contentClassName="max-w-xl"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.07}>
              <ServiceCard {...service} reducedMotion={reducedMotion} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
