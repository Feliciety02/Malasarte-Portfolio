import { type ReactNode } from "react";
import { accentLastWord } from "@/components/site/HeadingAccent";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleTag?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  centered = false,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  titleTag = "h2",
}: SectionHeaderProps) {
  const TitleTag = titleTag;
  const renderedTitle = typeof title === "string" ? accentLastWord(title) : title;

  return (
    <div
      className={cn(
        "flex gap-4 md:gap-6",
        centered
          ? "flex-col items-center text-center"
          : "flex-col items-start justify-between md:flex-row md:items-end",
        className,
      )}
    >
      <div className={cn(centered ? "max-w-2xl" : undefined, contentClassName)}>
        <span className="metal-kicker">{eyebrow}</span>
        <TitleTag
          className={cn(
            "editorial-display mt-4 text-[clamp(2.9rem,7vw,5.25rem)] font-medium leading-[0.94] tracking-tight text-balance",
            titleClassName,
          )}
        >
          {renderedTitle}
        </TitleTag>
        {description ? (
          <p
            className={cn(
              "editorial-subtitle mt-5 max-w-2xl text-base leading-relaxed text-pretty md:text-xl",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
