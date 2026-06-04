import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/site/Brand";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

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
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-primary/12 text-foreground" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="metal-cta hidden items-center rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:inline-flex"
        >
          Let's talk
        </Link>

        <button
          onClick={() => setOpen((value) => !value)}
          className="metal-ghost rounded-full p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="nav-glass nav-glass--solid mx-4 mt-2 rounded-lg p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-primary/12" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
