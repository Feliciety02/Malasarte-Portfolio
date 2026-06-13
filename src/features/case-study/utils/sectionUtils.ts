import type { SectionDef } from "../types/sections";

export function getVisibleSections(
  sectionDefs: SectionDef[],
  conditionMap: Record<string, boolean>,
): SectionDef[] {
  return sectionDefs.filter((s) => conditionMap[s.id] !== false);
}
