import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brand } from "@/components/site/Brand";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);
  const isActive = (to: (typeof navLinks)[number]["to"]) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const maxScroll =
        Math.max(root.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const isAtEnd = maxScroll > 80 && window.scrollY >= maxScroll - 12;
      const current = window.scrollY;

      setScrolled(current > 20);
      setAtPageEnd(isAtEnd);

      const delta = current - lastScrollY.current;
      const scrollingUp = delta < -4;

      if (current <= 20) {
        setRevealing(false);
      } else if (scrollingUp) {
        setRevealing(true);
      } else if (delta > 8) {
        setRevealing(false);
      }

      if (current > 60 && delta > 8) {
        setHidden(true);
      } else if (scrollingUp || current < 60) {
        setHidden(false);
      }

      lastScrollY.current = current;

      if (isAtEnd) {
        setOpen(false);
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-5",
        hidden ? "-translate-y-full" : "translate-y-0",
        atPageEnd && "pointer-events-none -translate-y-4 opacity-0",
      )}
      aria-hidden={atPageEnd}
    >
      <div
        className={cn(
          "nav-glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 sm:py-3",
          scrolled ? "nav-glass--solid mx-4 shadow-card md:mx-auto" : "nav-glass--soft",
          revealing && "nav-glass--reveal",
        )}
      >
        <Brand imageClassName="h-8 w-8" textClassName="text-lg" />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const linkIsActive = isActive(link.to);

            return (
              <motion.div
                key={link.to}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                className="relative"
              >
                <Link
                  to={link.to}
                  className={cn(
                    "group relative block overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    linkIsActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={linkIsActive ? "page" : undefined}
                >
                  {linkIsActive ? (
                    <motion.span
                      layoutId="desktop-nav-active"
                      className="absolute inset-0 rounded-full border border-primary/20 bg-primary/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_22px_-10px_hsl(var(--primary))]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="absolute inset-x-4 bottom-1.5 h-px origin-center scale-x-0 bg-primary/70 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.03 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="hidden md:block"
        >
          <Link
            to="/contact"
            className={cn(
              "metal-cta group relative inline-flex items-center overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground",
              isActive("/contact") && "ring-2 ring-primary/35 ring-offset-2 ring-offset-background",
            )}
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-white/20 blur-sm transition-all duration-500 group-hover:left-[120%]" />
            <span className="relative">Let's talk</span>
          </Link>
        </motion.div>

        <motion.button
          onClick={() => setOpen((value) => !value)}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
          className="metal-ghost rounded-full p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <motion.span
            className="flex"
            animate={prefersReducedMotion ? undefined : { rotate: open ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="nav-glass nav-glass--solid mx-4 mt-2 overflow-hidden rounded-lg p-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => {
                const linkIsActive = isActive(link.to);

                return (
                  <motion.div
                    key={link.to}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : index * 0.035,
                      duration: prefersReducedMotion ? 0 : 0.18,
                    }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative block overflow-hidden rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-300",
                        linkIsActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      )}
                      aria-current={linkIsActive ? "page" : undefined}
                    >
                      {linkIsActive ? (
                        <motion.span
                          layoutId="mobile-nav-active"
                          className="absolute inset-0 rounded-lg border border-primary/15 bg-primary/12"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10 flex items-center justify-between">
                        {link.label}
                        <motion.span
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          initial={false}
                          animate={{ scale: linkIsActive ? 1 : 0, opacity: linkIsActive ? 1 : 0 }}
                        />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
