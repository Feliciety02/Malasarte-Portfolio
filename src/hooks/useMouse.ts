import { useEffect, useRef } from "react";

/** Tracks the raw mouse position, normalized to [0, 1] (Y is flipped: 0 = bottom). */
export function useMouse() {
  const position = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      position.current.x = e.clientX / window.innerWidth;
      position.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return position;
}
