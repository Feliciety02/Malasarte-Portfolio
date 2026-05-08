import { Link } from "@tanstack/react-router";
import { footerExploreLinks, socialLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-visible px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-12 bottom-0 -z-10 bg-[radial-gradient(circle_at_50%_24%,rgba(154,92,255,0.22),transparent_42%),radial-gradient(circle_at_50%_6%,rgba(236,72,153,0.1),transparent_24%),radial-gradient(circle_at_70%_28%,rgba(59,130,246,0.1),transparent_26%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero shadow-glow" />
            <span className="font-display text-lg font-bold">Fe Anne Malasarte</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Creative designer and UI/UX storyteller crafting meaningful digital experiences.
          </p>
        </div>

        <div className="md:justify-self-center">
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {footerExploreLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end">
          <h4 className="text-sm font-semibold text-foreground">Let's connect</h4>
          <div className="mt-4 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:scale-110 hover:bg-primary/20 hover:shadow-glow"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">hello@feanne.design</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/6 pt-6 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fe Anne Malasarte. Designed with care.</p>
        <p className="hidden md:block">Crafted with creativity and code.</p>
      </div>
    </footer>
  );
}
