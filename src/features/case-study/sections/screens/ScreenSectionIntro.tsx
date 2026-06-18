import { accentLastWord } from "@/components/site/HeadingAccent";
import { FadeIn, SectionLabel } from "../SectionWrappers";

export function ScreenSectionIntro({
  sectionNumber,
}: {
  sectionNumber: string;
}) {
  return (
    <FadeIn>
      <SectionLabel kicker={sectionNumber} label="Screens" />
      <h2 className="mt-4 font-display text-3xl font-medium md:text-5xl">
        {accentLastWord("Design Preview")}
      </h2>
    </FadeIn>
  );
}
