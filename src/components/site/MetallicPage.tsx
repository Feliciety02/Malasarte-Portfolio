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
    <div className={cn("metal-page", `metal-page--${variant}`, className)}>
      {children}
    </div>
  );
}
