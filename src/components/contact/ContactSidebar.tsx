import { Dribbble, Instagram, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const socials = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
] as const;

export function ContactSidebar() {
  return (
    <Reveal delay={0.2} className="md:col-span-2">
      <div className="space-y-4">
        <a
          href="mailto:feannemlsrte@gmail.com"
          className="group flex items-start gap-4 rounded-3xl glass p-6 hover-lift"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
            <Mail size={18} className="text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
            <div className="mt-0.5 font-display text-lg font-semibold">feannemlsrte@gmail.com</div>
          </div>
        </a>

        <div className="rounded-3xl glass p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Find me on</div>
          <div className="mt-4 flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-12 w-12 place-items-center rounded-2xl glass transition-all hover:scale-110 hover:bg-primary/20 hover:shadow-glow"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-3xl glass p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Currently</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm">Available for new projects</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
