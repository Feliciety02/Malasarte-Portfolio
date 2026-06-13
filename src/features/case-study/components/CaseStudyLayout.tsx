import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StickyTOC } from "../sections/SectionWrappers";
import type { SectionDef } from "../types/sections";

export function CaseStudyLayout({
  sections,
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
        "relative mx-auto max-w-7xl px-6",
        !isGalleryOnly && "grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]",
      )}
    >
      {isGalleryOnly ? (
        children
      ) : (
        <>
          <div className="min-w-0">{children}</div>
          <StickyTOC sections={sections} />
        </>
      )}
    </div>
  );
}
