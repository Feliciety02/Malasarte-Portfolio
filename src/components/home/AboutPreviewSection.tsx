import { ArrowRight } from "lucide-react";
import aboutFeImage from "@/assets/about-fe.png";
import { LinkButton } from "@/components/site/LinkButton";
import { Reveal } from "@/components/site/Reveal";

export function AboutPreviewSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-5 md:items-center">
          <Reveal className="md:col-span-2">
            <div className="metal-panel relative aspect-[4/5] overflow-hidden">
              <img
                src={aboutFeImage}
                alt="Fe Anne Malasarte portrait"
                className="satin-photo h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/28 via-transparent to-white/5" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-yellow">
              About
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Designer with a soft spot for quiet details.
            </h2>
            <p className="mt-5 text-muted-foreground">
              I&apos;m a multidisciplinary designer working across UI/UX, branding, publication, and
              content. I love building things that feel intentional, human, and a little bit
              precise.
            </p>
            <LinkButton to="/about" variant="glass" className="mt-8">
              Read full story <ArrowRight size={14} />
            </LinkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
