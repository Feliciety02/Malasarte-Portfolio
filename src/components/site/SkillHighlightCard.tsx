import { motion } from "motion/react";

export function SkillHighlightCard({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  return (
    <div className="metal-card p-5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="metal-progress-track mt-2 h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
          className="metal-progress-fill h-full rounded-full"
        />
      </div>
    </div>
  );
}
