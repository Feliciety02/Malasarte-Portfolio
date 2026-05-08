import { Link } from "@tanstack/react-router";
import logoFe from "@/assets/logo-fe.png";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showName?: boolean;
};

export function Brand({
  className,
  imageClassName,
  textClassName,
  showName = true,
}: BrandProps) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <img
        src={logoFe}
        alt="Fe Anne logo"
        className={cn(
          "h-9 w-9 object-contain drop-shadow-[0_10px_24px_rgba(140,92,255,0.35)] transition-transform group-hover:rotate-6",
          imageClassName,
        )}
      />
      {showName ? (
        <span className={cn("font-display text-lg font-bold tracking-tight", textClassName)}>
          Fe Anne Malasarte
        </span>
      ) : null}
    </Link>
  );
}
