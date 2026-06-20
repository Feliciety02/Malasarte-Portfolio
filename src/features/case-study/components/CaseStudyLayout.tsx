import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionDef } from "../types/sections";

export function CaseStudyLayout({
  isGalleryOnly,
  children,
}: {
  sections: SectionDef[];
  isGalleryOnly?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "case-study-shell relative mx-auto w-full max-w-7xl px-4 sm:px-6",
      )}
    >
      <div className="min-w-0 w-full max-w-none">{children}</div>
    </div>
  );
}
