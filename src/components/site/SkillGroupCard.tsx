import { motion, useInView } from "motion/react";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

export function SkillGroupCard({
  icon: Icon,
  title,
  color,
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
    <div ref={ref} className="group relative overflow-hidden rounded-3xl glass-strong p-8 hover-lift">
      <div className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${color} blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
          <Icon size={20} className="text-primary-foreground" />
        </div>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
      </div>

      <ul className="mt-8 space-y-5">
        {items.map((item, index) => (
          <li key={item.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.level}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.level}%` } : {}}
                transition={{ duration: 1.1, delay: 0.2 + index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full rounded-full bg-gradient-hero shadow-glow"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
