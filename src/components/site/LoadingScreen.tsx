import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, type Easing, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import logoFe from "@/assets/logo-fe.png";

const ROUTE_SHOW_DELAY_MS = 220;
const MIN_VISIBLE_MS = 450;
const BOOT_FALLBACK_MS = 1800;

export function LoadingScreen() {
  const routeLoading = useRouterState({
    select: (state) => state.isLoading || state.status === "pending",
  });
  const prefersReducedMotion = useReducedMotion();
  const [bootLoading, setBootLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleSinceRef = useRef(0);

  useEffect(() => {
    if (document.readyState === "complete") return;

    setBootLoading(true);

    const finishBoot = () => setBootLoading(false);
    const fallbackId = window.setTimeout(finishBoot, BOOT_FALLBACK_MS);

    window.addEventListener("load", finishBoot, { once: true });

    return () => {
      window.clearTimeout(fallbackId);
      window.removeEventListener("load", finishBoot);
    };
  }, []);

  useEffect(() => {
    const loading = bootLoading || routeLoading;
    let timeoutId: number;

    if (loading) {
      timeoutId = window.setTimeout(
        () => {
          visibleSinceRef.current = Date.now();
          setVisible(true);
        },
        bootLoading ? 0 : ROUTE_SHOW_DELAY_MS,
      );
    } else {
      const elapsed = Date.now() - visibleSinceRef.current;
      const hideDelay = visibleSinceRef.current ? Math.max(MIN_VISIBLE_MS - elapsed, 0) : 0;

      timeoutId = window.setTimeout(() => {
        setVisible(false);
        visibleSinceRef.current = 0;
      }, hideDelay);
    }

    return () => window.clearTimeout(timeoutId);
  }, [bootLoading, routeLoading]);

  const markAnimation = prefersReducedMotion ? {} : { opacity: [0.76, 1, 0.76] };
  const ringAnimation = prefersReducedMotion
    ? {}
    : {
        opacity: [0.16, 0.42, 0.16],
        scale: [0.72, 1, 1.28, 1, 0.72],
      };
  const ringTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.8, ease: "easeInOut" as Easing, repeat: Infinity };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-label="Loading page content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-background/96 px-6 backdrop-blur-[2px]"
        >
          <span className="sr-only">Loading</span>
          <div className="relative grid h-28 w-28 place-items-center sm:h-32 sm:w-32">
            <motion.div
              aria-hidden
              className="absolute h-20 w-20 rounded-full border border-white/35 sm:h-24 sm:w-24"
              animate={ringAnimation}
              transition={ringTransition}
            />
            <motion.div
              aria-hidden
              className="absolute h-14 w-14 rounded-full border border-white/15 sm:h-16 sm:w-16"
              animate={ringAnimation}
              transition={{ ...ringTransition, delay: prefersReducedMotion ? 0 : 0.18 }}
            />
            <motion.img
              src={logoFe}
              alt="Fe Anne logo"
              draggable={false}
              animate={markAnimation}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              className="relative h-16 w-16 select-none object-contain opacity-95 sm:h-20 sm:w-20"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
