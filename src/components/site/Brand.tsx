import { Link } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import logoFe from "@/assets/logo.webp";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  showName?: boolean;
};

export function Brand({ className, imageClassName, textClassName, showName = true }: BrandProps) {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      e.preventDefault();
      window.location.href = "/admin";
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
  }, []);

  return (
    <Link to="/" onClick={handleClick} className={cn("group flex items-center gap-3", className)}>
      <img
        src={logoFe}
        alt="Fe Anne logo"
        className={cn(
          "h-9 w-9 object-contain drop-shadow-[0_10px_24px_rgba(140,92,255,0.35)] transition-transform group-hover:rotate-6",
          imageClassName,
        )}
      />
      {showName ? (
        <span className={cn("font-display text-lg font-bold tracking-normal", textClassName)}>
          Fe Anne Malasarte
        </span>
      ) : null}
    </Link>
  );
}
