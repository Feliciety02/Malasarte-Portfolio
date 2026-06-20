import { useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoFe from "@/assets/logo-fe.png";
import { footerExploreLinks, socialLinks } from "@/data/site";

export function Footer() {
  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${px}%`);
    el.style.setProperty("--my", `${py}%`);
  }, []);

  return (
    <footer className="relative z-10 -mt-10 -mb-10 px-3 pb-0 pt-0 sm:-mt-12 sm:-mb-12 sm:px-4">
      <style>{`
        @keyframes footerOrbA {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, 30px) scale(1.1); }
          66% { transform: translate(-20px, -40px) scale(0.9); }
          100% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes footerOrbB {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, -20px) scale(1.15); }
          50% { transform: translate(20px, 30px) scale(0.85); }
          75% { transform: translate(-40px, 10px) scale(1.1); }
          100% { transform: translate(10px, -30px) scale(0.95); }
        }
      `}</style>
      <div
        onMouseMove={handleMouse}
        className="relative -mx-3 overflow-hidden rounded-t-[3.5rem] border border-white/8 bg-[#060708] shadow-[0_-10px_40px_rgba(0,0,0,0.28),0_30px_80px_rgba(0,0,0,0.38)] sm:-mx-4 sm:rounded-t-[4.25rem]"
        style={{
          backgroundImage:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 215, 0, 0.04), transparent 50%)",
        }}
      >
        {/* Thin horizontal divider */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Gradient fade from previous section */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-28 bg-gradient-to-b from-[#060708] via-[#060708]/70 to-transparent" />

        {/* Vertical grid matching page background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 9px)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 65%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 65%)",
          }}
        />

        {/* Subtle glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -left-16 -top-16 h-60 w-60 rounded-full opacity-[0.05] blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.6), transparent 70%)",
              animation: "footerOrbA 14s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute -bottom-20 -right-12 h-60 w-60 rounded-full opacity-[0.04] blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%)",
              animation: "footerOrbB 18s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Logo badge - smaller, sits inside */}
        <Link
          to="/"
          aria-label="Fe Anne Malasarte home"
          className="relative z-10 mx-auto flex w-fit pt-12 sm:pt-14"
        >
          <img
            src={logoFe}
            alt="Fe Anne logo"
            className="h-16 w-16 object-contain opacity-80 transition-opacity hover:opacity-100 sm:h-20 sm:w-20"
          />
        </Link>

        <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 md:px-12 lg:px-14 lg:pb-8 xl:px-16">
          <div className="lg:hidden">
            <div className="mx-auto max-w-sm text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Portfolio
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">
                Fe Anne Malasarte
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                UI/UX, branding, social media graphics, and creative direction.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new projects
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                to="/works"
                className="metal-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                View works <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
              >
                Let&apos;s talk <ArrowRight size={15} />
              </Link>
            </div>

            <a
              href="mailto:feannemlsrte@gmail.com"
              className="mt-5 flex min-w-0 items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/8"
            >
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </span>
                <span className="mt-1 block truncate text-sm font-medium text-foreground">
                  feannemlsrte@gmail.com
                </span>
              </span>
              <ArrowRight size={16} className="shrink-0 text-accent" />
            </a>

            <div className="mt-7 grid grid-cols-2 gap-4 rounded-lg border border-white/8 bg-white/[0.03] p-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Explore</h4>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {footerExploreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowRight size={12} className="shrink-0 text-accent" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground">Social</h4>
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition-all hover:scale-105 hover:bg-primary/20 hover:text-foreground"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden gap-8 lg:grid lg:grid-cols-[1fr_1.25fr_1fr] lg:items-end">
            <div>
              <h4 className="font-display text-2xl font-bold text-foreground">Contact</h4>
              <a
                href="mailto:feannemlsrte@gmail.com"
                className="mt-3 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                feannemlsrte@gmail.com
              </a>
              <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                Creative designer and UI/UX storyteller crafting meaningful digital experiences.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new projects
              </div>
            </div>

            <div className="text-left lg:text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Portfolio
              </p>
              <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground">
                Fe Anne Malasarte
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                UI/UX, brand identity, social media graphics, and creative direction built with care
                from concept to polished execution.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:justify-center">
                <Link
                  to="/works"
                  className="metal-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  View works <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
                >
                  Let&apos;s talk <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:justify-self-end">
              <div>
                <h4 className="font-display text-2xl font-bold text-foreground">Explore</h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {footerExploreLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowRight size={13} className="text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display text-2xl font-bold text-foreground">Social</h4>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition-all hover:scale-105 hover:bg-primary/16 hover:text-foreground"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-col items-center gap-3 border-t border-white/8 pt-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
            <p>&copy; {new Date().getFullYear()} Fe Anne Malasarte. Designed with care.</p>
            <p className="rounded-full bg-accent px-3 py-1.5 font-medium text-accent-foreground">
              Crafted with creativity and code.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
