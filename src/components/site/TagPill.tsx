import { type ReactNode } from "react";

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="metal-ghost pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/72">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
      {children}
    </span>
  );
}
