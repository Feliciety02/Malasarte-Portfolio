import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { testimonials } from "@/data/home";

export function TestimonialsSection() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Kind words"
            title="Collaboration highlights"
            centered
            className="mb-12"
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full rounded-3xl glass-strong p-7 hover-lift"
              >
                <Quote size={20} className="text-primary" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-6 border-t border-border/60 pt-4">
                  <div className="font-display text-base font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
