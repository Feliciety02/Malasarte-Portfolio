import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type ProjectCategory =
  | "UI/UX Design"
  | "Social Media Graphics"
  | "Creative Assets"
  | "Logo & Branding"
  | "Web Development"
  | "Writing / VA";

type CaseStudyLinkProps = {
  slug: string;
  routeCategory: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function CaseStudyLink({
  slug,
  routeCategory,
  children,
  className,
  "aria-label": ariaLabel,
}: CaseStudyLinkProps) {
  return (
    <Link
      to="/works/$category/$slug"
      params={{ category: routeCategory, slug }}
      resetScroll
      preload="intent"
      aria-label={ariaLabel}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
      className={cn(
        "block h-full cursor-pointer select-none touch-manipulation rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {children}
    </Link>
  );
}
