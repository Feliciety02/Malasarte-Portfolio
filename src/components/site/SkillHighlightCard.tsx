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
      <div className="metal-progress-track mt-3 h-2.5 p-[2px]">
        <div className="h-full overflow-hidden rounded-full bg-black/35">
          <motion.div
            style={{ width: `${level}%`, transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay, ease: [0.2, 0.8, 0.2, 1] }}
            className="metal-progress-fill relative h-full rounded-full"
          >
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.24),transparent_48%)]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
