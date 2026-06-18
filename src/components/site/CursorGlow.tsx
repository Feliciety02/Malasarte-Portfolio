import { useMouse } from "@/hooks/useMouse";

export function CursorGlow() {
  const pos = useMouse();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{
        background: `radial-gradient(600px circle at ${pos.current.x * 100}% ${(1 - pos.current.y) * 100}%, rgba(124, 58, 237, 0.06), transparent 50%)`,
      }}
    />
  );
}
