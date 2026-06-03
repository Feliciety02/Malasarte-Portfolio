import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

  const logoAnimation = prefersReducedMotion ? {} : { opacity: [0.72, 1, 0.72] };
  const progressAnimation = prefersReducedMotion ? {} : { rotate: 360 };

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
          className="fixed inset-0 z-[9999] grid place-items-center bg-background/94 px-6 backdrop-blur-sm"
        >
          <span className="sr-only">Loading</span>
          <div className="relative grid h-32 w-32 place-items-center sm:h-36 sm:w-36">
            <div aria-hidden className="absolute inset-0 rounded-full border border-white/10" />
            <motion.div
              aria-hidden
              animate={progressAnimation}
              transition={{ duration: 1.15, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 rounded-full p-px [background:conic-gradient(from_0deg,transparent_0_68%,rgba(255,221,87,0.85)_84%,rgba(183,112,255,0.9)_100%)]"
            >
              <span className="block h-full w-full rounded-full bg-background/94" />
            </motion.div>
            <div className="absolute inset-3 rounded-full border border-white/[0.06]" />
            <motion.img
              src={logoFe}
              alt="Fe Anne logo"
              draggable={false}
              animate={logoAnimation}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
              className="relative h-20 w-20 select-none object-contain sm:h-24 sm:w-24"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
