import { useEffect, useRef, useState, type RefObject } from "react";

type ContainerSize = {
  width: number;
  height: number;
};

export function useContainerSize<T extends HTMLElement>(): [RefObject<T | null>, ContainerSize] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize((current) => {
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        return current.width === width && current.height === height ? current : { width, height };
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
