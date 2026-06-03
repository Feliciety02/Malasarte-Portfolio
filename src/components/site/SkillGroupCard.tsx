import { motion, useInView } from "motion/react";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

export function SkillGroupCard({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  color: string;
  items: readonly { name: string; level: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mesh-surface metal-card group p-6 md:p-8">
      <div className="relative z-10 flex items-center gap-4">
        <div className="metal-icon h-12 w-12">
          <Icon size={20} />
        </div>
        <div>
          <span className="metal-microcopy">Signal group</span>
          <h3 className="mt-2 font-display text-xl font-semibold md:text-2xl">{title}</h3>
        </div>
      </div>

      <ul className="relative z-10 mt-7 space-y-5 md:mt-8">
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-white/88">{item.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{item.level}%</span>
            </div>
            <div className="metal-progress-track mt-2 h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.level}%` } : {}}
                transition={{ duration: 1.1, delay: 0.18 + index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="metal-progress-fill h-full rounded-full"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
