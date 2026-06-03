import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";

export function ContactCtaSection() {
  return (
    <section className="relative px-6 py-24">
      <Reveal className="metal-panel mx-auto max-w-5xl p-12 text-center md:p-20">
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Hiring for a role that needs <span className="text-gradient">design range</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Reach out for portfolio context, role fit, or a closer look at work across product,
          branding, publication, and front-end execution.
        </p>
        <LinkButton to="/contact" className="mt-10">
          Get in touch <ArrowRight size={16} />
        </LinkButton>
      </Reveal>
    </section>
  );
}
