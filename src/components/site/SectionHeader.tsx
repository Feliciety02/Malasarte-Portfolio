import { type ReactNode } from "react";
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
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
        <TitleTag
          className={cn(
            "mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </TitleTag>
        {description ? (
          <p
            className={cn("mt-4 text-sm text-muted-foreground md:text-base", descriptionClassName)}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
