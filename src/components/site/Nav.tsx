import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/site/Brand";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [atPageEnd, setAtPageEnd] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const maxScroll =
        Math.max(root.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const isAtEnd = maxScroll > 80 && window.scrollY >= maxScroll - 12;

      setScrolled(window.scrollY > 20);
      setAtPageEnd(isAtEnd);

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
        scrolled ? "py-3" : "py-5",
        atPageEnd && "pointer-events-none -translate-y-4 opacity-0",
      )}
      aria-hidden={atPageEnd}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
          scrolled ? "mx-4 glass-strong shadow-card md:mx-auto" : "bg-transparent",
        )}
      >
        <Brand imageClassName="h-8 w-8" textClassName="text-lg" />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground bg-white/5" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 md:inline-flex"
        >
          Let's talk
        </Link>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-full glass p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mx-4 mt-2 rounded-2xl glass-strong p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "text-foreground bg-white/5" }}
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
