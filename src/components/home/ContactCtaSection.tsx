import { ArrowRight } from "lucide-react";
import { AccentText } from "@/components/site/HeadingAccent";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";

export function ContactCtaSection() {
  return (
    <section className="relative px-6 py-24">
      <Reveal className="metal-panel mx-auto max-w-5xl p-12 text-center md:p-20">
        <h2 className="font-display text-4xl font-bold md:text-6xl">
          Looking for a designer who can <AccentText>deliver across disciplines</AccentText>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Whether you need a polished interface, a performant web application, or a cohesive brand
          presence — I&apos;d welcome the opportunity to discuss how I can contribute to your next
          project.
        </p>
        <LinkButton to="/contact" className="mt-10">
          Start a conversation <ArrowRight size={16} />
        </LinkButton>
      </Reveal>
    </section>
  );
}
