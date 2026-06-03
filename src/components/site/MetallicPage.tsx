import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MetallicPageVariant =
  | "home"
  | "works"
  | "project"
  | "services"
  | "skills"
  | "process"
  | "about"
  | "contact";

type MetallicPageProps = {
  children: ReactNode;
  variant: MetallicPageVariant;
  className?: string;
};

export function MetallicPage({ children, variant, className }: MetallicPageProps) {
  return (
    <div
      className={cn(
        "metal-page",
        variant !== "home" && "min-h-[calc(100svh-6rem)] pt-24",
        `metal-page--${variant}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
