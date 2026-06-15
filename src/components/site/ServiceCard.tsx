import { motion } from "motion/react";
import { ArrowRight, Check, Star, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  stars?: number;
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
  stars,
  bullets,
  variant = "preview",
  reducedMotion = false,
  index = 0,
}: ServiceCardProps) {
  if (variant === "full") {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        className="service-card-clean metal-card group relative h-full p-6 md:p-7"
      >
        <ServiceHeader Icon={Icon} title={title} showEyebrow={false} />
        <p className="relative z-10 mt-4 text-sm leading-6 text-muted-foreground">{desc}</p>
        {stars ? (
          <div className="relative z-10 mt-4 flex items-center gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={12} className="fill-yellow/80 text-yellow" strokeWidth={1.5} />
            ))}
          </div>
        ) : null}
        {bullets ? (
          <ul className="relative z-10 mt-6 space-y-3.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm text-white/76">
                <Check size={14} className="shrink-0 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div
      style={reducedMotion ? undefined : { y: index % 3 === 1 ? -10 : 0 }}
      className="h-full"
    >
      <Link
        to="/services"
        className="blueprint-surface metal-card group block h-full p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7"
      >
        <ServiceHeader Icon={Icon} title={title} />
        <p className="relative z-10 mt-4 text-sm leading-6 text-muted-foreground">{desc}</p>
        {stars ? (
          <div className="relative z-10 mt-4 flex items-center gap-1">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={12} className="fill-yellow/80 text-yellow" strokeWidth={1.5} />
            ))}
          </div>
        ) : null}
        <div className="relative z-10 mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary transition-colors group-hover:text-foreground">
          Explore service <ArrowRight size={12} />
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceHeader({
  Icon,
  title,
  showEyebrow = true,
}: {
  Icon: LucideIcon;
  title: string;
  showEyebrow?: boolean;
}) {
  return (
    <div className="relative z-10 flex items-start gap-4">
      <div className="metal-icon h-12 w-12 shrink-0">
        <Icon size={18} />
      </div>
      <div>
        {showEyebrow ? <span className="metal-microcopy">Capability</span> : null}
        <h3
          className={`font-display text-xl font-semibold leading-tight md:text-2xl ${
            showEyebrow ? "mt-2" : "mt-1"
          }`}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
