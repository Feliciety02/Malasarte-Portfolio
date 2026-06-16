import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { education } from "@/data/about";

function AnimatedTimelineItem({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative pb-8 last:pb-0">
      <motion.div
        className="absolute left-0 top-0 w-px bg-gradient-to-b from-primary to-transparent"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-0 top-[5px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(255,255,255,0.15)]"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "backOut" }}
      />
      <motion.div
        className="ml-8 flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
      >
        {item.logo && (
          <div className="mt-1 flex shrink-0 items-start">
            <img src={item.logo} alt="" className="h-16 w-16 object-contain lg:h-20 lg:w-20" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            {item.period}
          </span>
          <h3 className="mt-1 font-display text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
          {item.desc && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">{item.desc}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function EducationSection() {
  return (
    <Reveal className="mt-20">
      <section className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Education"
          title="Academic Background"
          description="A journey from special science education to a degree in computer science."
        />
        <div className="relative mt-10 pl-6">
          {education.map((item, i) => (
            <AnimatedTimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
