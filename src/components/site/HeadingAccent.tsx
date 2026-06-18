import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AccentTextProps = {
  children: ReactNode;
  className?: string;
};

export function AccentText({ children, className }: AccentTextProps) {
  return <span className={cn("text-gradient inline-block pe-[0.12em] pb-[0.08em] pt-[0.04em]", className)}>{children}</span>;
}

export function accentLastWord(text: string): ReactNode {
  const match = text.match(/^([\s\S]*?)([^\s.!?,:;]+)([.!?,:;]*)$/);

  if (!match) return text;

  const [, before, word, punctuation] = match;

  return (
    <>
      {before}
      <AccentText>{word}</AccentText>
      {punctuation}
    </>
  );
}
