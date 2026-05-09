import { type ReactNode } from "react";

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="pointer-events-none absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(5,8,20,0.35)]"
      style={{
        background: "linear-gradient(180deg, rgba(10,14,30,0.82), rgba(8,12,24,0.72))",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(106,208,255,0.08), 0 10px 30px rgba(6,10,24,0.32)",
        textShadow: "0 1px 8px rgba(10,14,30,0.28)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(97,228,255,0.08), transparent 30%, transparent 70%, rgba(236,126,255,0.08))",
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
