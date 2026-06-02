import { type ReactNode } from "react";

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="pointer-events-none absolute left-5 top-5 inline-flex items-center overflow-hidden rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(10,14,30,0.32)]"
      style={{
        background: "linear-gradient(180deg, rgba(36,27,57,0.96), rgba(30,23,47,0.94))",
        border: "1px solid rgba(182,132,255,0.24)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(120,84,196,0.2), 0 12px 28px rgba(8,10,24,0.32)",
        textShadow: "0 1px 10px rgba(10,14,30,0.32)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), transparent 52%, rgba(0,0,0,0.12))",
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
