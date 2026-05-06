import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export type LightboxItem = {
  color: string;
  label: string;
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  const current = open ? items[index!] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-xl p-4 md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index! + 1} of ${items.length}: ${current.label}`}
        >
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full glass-strong hover:bg-white/10 transition-colors z-10"
            aria-label="Close (Esc)"
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <div className="absolute left-4 top-4 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground z-10">
            {index! + 1} / {items.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-strong hover:bg-white/10 transition-all hover:-translate-x-0.5 z-10"
            aria-label="Previous (←)"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full glass-strong hover:bg-white/10 transition-all hover:translate-x-0.5 z-10"
            aria-label="Next (→)"
          >
            <ArrowRight size={18} />
          </button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl glass-strong shadow-card"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${current.color}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <span className="font-display text-xl font-semibold">{current.label}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground hidden md:block">
                  ← → navigate · esc close
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
