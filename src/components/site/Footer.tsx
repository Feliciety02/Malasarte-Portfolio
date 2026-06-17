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
    <footer className="relative z-10 -mt-24 isolate overflow-visible bg-transparent px-2 pt-24 sm:px-3 lg:-mt-28 lg:px-4 lg:pt-28">
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
        @keyframes footerOrbC {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -25px) scale(1.2); }
          100% { transform: translate(-25px, 15px) scale(0.9); }
        }
      `}</style>
      <div
        onMouseMove={handleMouse}
        className="relative left-1/2 w-[calc(100vw+2rem)] -translate-x-1/2 overflow-visible rounded-t-[4rem] border-x border-t border-white/8 bg-[oklch(0.075_0_0/0.985)] shadow-[0_32px_90px_rgba(0,0,0,0.52)] sm:w-[calc(100vw+3rem)] sm:rounded-t-[6rem] lg:w-[calc(100vw+4rem)] lg:rounded-t-[7rem]"
        style={{
          backgroundImage:
            "radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 215, 0, 0.06), transparent 50%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-t-[4rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28)_0.7px,transparent_1.8px)] opacity-[0.08] blur-[0.7px] [background-size:14px_14px] sm:rounded-t-[6rem] lg:rounded-t-[7rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-t-[4rem] sm:rounded-t-[6rem] lg:rounded-t-[7rem]"
        >
          <div
            className="absolute -left-10 -top-10 h-80 w-80 rounded-full opacity-25 blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.6), transparent 70%)",
              animation: "footerOrbA 14s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute -bottom-16 -right-8 h-72 w-72 rounded-full opacity-20 blur-[90px]"
            style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%)",
              animation: "footerOrbB 18s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute bottom-1/3 left-1/3 h-56 w-56 rounded-full opacity-15 blur-[80px]"
            style={{
              background: "radial-gradient(circle, rgba(255,200,50,0.5), transparent 70%)",
              animation: "footerOrbC 12s ease-in-out infinite alternate",
            }}
          />
        </div>

        <Link
          to="/"
          aria-label="Fe Anne Malasarte home"
          className="metal-ghost absolute left-1/2 top-0 z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full p-3 backdrop-blur-xl transition-transform hover:-translate-y-[54%]"
        >
          <img
            src={logoFe}
            alt="Fe Anne logo"
            className="h-20 w-20 object-contain drop-shadow-[0_16px_34px_rgba(255,255,255,0.16)] sm:h-24 sm:w-24"
          />
        </Link>

        <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 pb-6 pt-20 sm:px-10 sm:pb-8 md:px-12 lg:px-14 lg:pb-8 lg:pt-20 xl:px-16">
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
                Let's talk <ArrowRight size={15} />
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
                  Let's talk <ArrowRight size={15} />
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

          <div className="relative mt-8 flex flex-col items-center gap-3 border-t border-white/8 pt-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left lg:mt-8">
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
