import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type CaseStudyLinkProps = {
  slug: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function CaseStudyLink({
  slug,
  children,
  className,
  "aria-label": ariaLabel,
}: CaseStudyLinkProps) {
  return (
    <Link
      to="/works/$slug"
      params={{ slug }}
      resetScroll
      preload="intent"
      aria-label={ariaLabel}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
      className={cn(
        "block h-full cursor-pointer select-none touch-manipulation rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {children}
    </Link>
  );
}
