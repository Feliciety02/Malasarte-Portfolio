import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Github, Mail, Dribbble } from "lucide-react";

export function Footer() {
  const socials = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:hello@feanne.design", label: "Email" },
  ];

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
            Creative designer & UI/UX storyteller crafting meaningful digital experiences.
          </p>
        </div>

        <div className="md:justify-self-center">
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/works" className="hover:text-foreground">Works</Link></li>
            <li><Link to="/skills" className="hover:text-foreground">Skills</Link></li>
            <li><Link to="/process" className="hover:text-foreground">Process</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>

        <div className="md:justify-self-end">
          <h4 className="text-sm font-semibold text-foreground">Let's connect</h4>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:scale-110 hover:bg-primary/20 hover:shadow-glow"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">hello@feanne.design</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-white/6 pt-6 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fe Anne Malasarte. Designed with care.</p>
        <p className="hidden md:block">Crafted with creativity & code.</p>
      </div>
    </footer>
  );
}
