import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = {
  color: string;
  label: string;
  note?: string;
};

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, next, prev, onClose]);

  const current = open ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background/85 p-4 backdrop-blur-xl md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${items.length}: ${current.label}`}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full glass-strong transition-colors hover:bg-white/10"
            aria-label="Close (Esc)"
          >
            <X size={18} />
          </button>

          <div className="absolute left-4 top-4 z-10 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground">
            {index + 1} / {items.length}
          </div>

          <button
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong transition-all hover:-translate-x-0.5 hover:bg-white/10 md:left-8"
            aria-label="Previous"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong transition-all hover:translate-x-0.5 hover:bg-white/10 md:right-8"
            aria-label="Next"
          >
            <ArrowRight size={18} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl glass-strong shadow-card"
            >
              <div className="aspect-[16/10]">
                <div className={`absolute inset-0 bg-gradient-to-br ${current.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl font-semibold">{current.label}</span>
                    <span className="hidden text-xs uppercase tracking-wider text-muted-foreground md:block">
                      Use arrow keys · esc to close
                    </span>
                  </div>
                  {current.note ? (
                    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{current.note}</p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
