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
    <section className="relative overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,27,0.12) 0%, rgba(8,10,24,0.3) 100%), radial-gradient(circle at 18% 16%, rgba(162, 92, 255, 0.24), transparent 28%), radial-gradient(circle at 82% 18%, rgba(74, 168, 255, 0.18), transparent 24%), radial-gradient(circle at 50% 100%, rgba(255, 78, 187, 0.12), transparent 32%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(7,10,28,0.24)_28%,rgba(6,8,22,0.62)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="What I do"
            title="Services preview"
            description="Scroll through a clean galactic grid to explore the services I design, build, and shape."
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
