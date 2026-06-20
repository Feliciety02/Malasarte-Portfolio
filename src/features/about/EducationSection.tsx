import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { education } from "@/data/about";

function AnimatedTimelineItem({
  item,
  index,
  total,
}: {
  item: (typeof education)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="relative grid grid-cols-[1.9rem_minmax(0,1fr)] gap-4 pb-5 last:pb-0">
      {!isFirst ? (
        <motion.div
          className="absolute left-[0.95rem] top-0 h-5 w-px -translate-x-1/2 bg-primary/55"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          style={{ transformOrigin: "bottom" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      ) : null}
      {!isLast ? (
        <motion.div
          className="absolute bottom-0 left-[0.95rem] top-[1.9rem] w-px -translate-x-1/2 bg-primary/55"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ) : null}
      <motion.div
        className="relative z-10 mt-5 flex h-4 w-4 justify-self-center rounded-full border border-primary/55 bg-background"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "backOut" }}
      >
        <span className="m-auto h-2 w-2 rounded-full bg-primary/90" />
      </motion.div>
      <motion.div
        className="flex gap-4 rounded-[1.35rem] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-colors hover:bg-white/[0.04]"
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
        <div className="relative mt-10">
          {education.map((item, i) => (
            <AnimatedTimelineItem key={i} item={item} index={i} total={education.length} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
