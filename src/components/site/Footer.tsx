import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoFe from "@/assets/logo-fe.png";
import { footerExploreLinks, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative isolate mb-0 overflow-visible bg-background pb-0 pt-28 sm:pb-0 lg:pt-32">
      <div className="relative left-1/2 mb-0 w-screen -translate-x-1/2 overflow-visible rounded-b-none rounded-t-[4rem] border border-b-0 border-white/10 bg-[oklch(0.125_0_0/0.98)] shadow-[0_32px_90px_rgba(0,0,0,0.42)] sm:rounded-t-[6rem] lg:rounded-t-[7.5rem]">
        <Link
          to="/"
          aria-label="Fe Anne Malasarte home"
          className="absolute left-1/2 top-0 z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-background/90 p-3 shadow-glow backdrop-blur-xl transition-transform hover:-translate-y-[54%]"
        >
          <img
            src={logoFe}
            alt="Fe Anne logo"
            className="h-20 w-20 object-contain drop-shadow-[0_16px_34px_rgba(168,85,247,0.42)] sm:h-24 sm:w-24"
          />
        </Link>

        <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-7 pt-24 sm:px-10 sm:pb-9 md:px-12 lg:px-14 xl:px-16">
          <div className="lg:hidden">
            <div className="mx-auto max-w-sm text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Portfolio
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">
                Fe Anne Malasarte
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                UI/UX, branding, publication design, and creative direction.
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] hover:bg-primary/90"
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
              className="mt-5 flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/8"
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

            <div className="mt-7 grid gap-6 rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Explore</h4>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {footerExploreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground">Social</h4>
                <div className="mt-3 flex flex-wrap gap-2.5">
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

          <div className="relative hidden gap-10 lg:grid lg:grid-cols-[1fr_1.25fr_1fr] lg:items-end">
            <div>
              <h4 className="font-display text-2xl font-bold text-foreground">Contact</h4>
              <a
                href="mailto:feannemlsrte@gmail.com"
                className="mt-3 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                feannemlsrte@gmail.com
              </a>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                Creative designer and UI/UX storyteller crafting meaningful digital experiences.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
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
              <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                Fe Anne Malasarte
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                UI/UX, brand identity, publication design, and creative direction built with care
                from concept to polished execution.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-center">
                <Link
                  to="/works"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] hover:bg-primary/90"
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
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/6 text-muted-foreground transition-all hover:scale-110 hover:bg-primary/20 hover:text-foreground hover:shadow-glow"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-3 border-t border-white/8 pt-5 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left lg:mt-12">
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
