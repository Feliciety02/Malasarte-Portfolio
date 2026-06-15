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
  const featuredServices = servicePreviews;

  return (
    <section className="relative -mx-6 isolate overflow-hidden px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.018), transparent 24%, transparent 76%, rgba(255,255,255,0.012)), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 8px)",
          backgroundColor: "#070808",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.025),transparent_65%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden mix-blend-screen"
      >
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-3"}`}
          style={{
            width: 500,
            height: 500,
            top: "-22%",
            left: "-10%",
            background: "rgb(150, 86, 255)",
            opacity: 0.24,
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float-2"}`}
          style={{
            width: 440,
            height: 440,
            right: "-10%",
            bottom: "-24%",
            background: "rgb(238, 178, 54)",
            opacity: 0.2,
          }}
        />
        <div
          className={`glow-orb ${reducedMotion ? "" : "animate-float"}`}
          style={{
            width: 340,
            height: 340,
            top: "28%",
            left: "43%",
            background: "rgb(196, 92, 255)",
            opacity: 0.16,
            animationDelay: "-5s",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core expertise"
            title="Services"
            description="Specialized capabilities across the full product lifecycle — from conceptual design and user research to development and deployment."
            action={
              <LinkButton
                to="/services"
                variant="text"
                className="hidden items-center md:inline-flex"
              >
                View all capabilities <ArrowRight size={14} />
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
