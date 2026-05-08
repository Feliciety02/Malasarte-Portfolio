import { motion } from "motion/react";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color?: string;
  bullets?: readonly string[];
  variant?: "preview" | "full";
  reducedMotion?: boolean;
  index?: number;
};

export function ServiceCard({
  icon: Icon,
  title,
  desc,
  color = "from-violet-500/28 to-cyan-400/10",
  bullets,
  variant = "preview",
  reducedMotion = false,
  index = 0,
}: ServiceCardProps) {
  if (variant === "full") {
    return (
      <motion.div whileHover={{ y: -6 }} className="group relative h-full overflow-hidden rounded-3xl glass-strong p-7 hover-lift">
        <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${color} blur-3xl opacity-50 transition-opacity group-hover:opacity-80`} />
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
          <Icon size={18} className="text-primary-foreground" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
        {bullets ? (
          <ul className="mt-5 space-y-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2 text-sm">
                <Check size={14} className="text-primary" /> {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div style={reducedMotion ? undefined : { y: index % 3 === 1 ? -12 : 0 }} className="h-full">
      <Link
        to="/services"
        className="group relative block h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(26,20,55,0.74),rgba(10,18,45,0.7))] p-7 shadow-[0_18px_50px_rgba(7,10,28,0.35)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute -right-10 -top-8 h-40 w-40 rounded-full bg-gradient-to-br ${index % 2 === 0 ? "from-violet-500/28 to-cyan-400/10" : "from-pink-400/24 to-violet-500/10"} blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 34%, transparent 66%, rgba(154,92,255,0.12))",
          }}
        />
        <div className="relative z-10">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
            <Icon size={18} className="text-primary-foreground" />
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary/90">
            Explore service <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
