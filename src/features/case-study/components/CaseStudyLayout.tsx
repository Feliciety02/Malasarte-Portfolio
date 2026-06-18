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
        "case-study-shell relative mx-auto max-w-4xl px-6",
      )}
    >
      <div className="min-w-0">{children}</div>
    </div>
  );
}
