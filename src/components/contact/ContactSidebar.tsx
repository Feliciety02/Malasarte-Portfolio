import { Github, Linkedin, Facebook, Clock, MapPin, Mail, FileText } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const socials = [
  { Icon: Github, href: "https://github.com/Feliciety02", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/feanne-malasarte/", label: "LinkedIn" },
  { Icon: Facebook, href: "https://www.facebook.com/feanneLM", label: "Facebook" },
];

const availabilities = [
  "Freelance Projects",
  "Collaborations",
  "Internship Opportunities",
] as const;

export function ContactSidebar() {
  return (
    <Reveal delay={0.2}>
      <div className="space-y-4">
        <div className="metal-panel rounded-[1.5rem] p-5 sm:p-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(211,188,255,0.72)]">
            Contact Details
          </h3>
          <div className="mt-4 space-y-3.5">
            <a
              href="mailto:feannemlsrte@gmail.com"
              className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
            >
              <Mail size={16} className="shrink-0 text-muted-foreground transition-colors group-hover:text-yellow" />
              <span>feannemlsrte@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock size={16} className="shrink-0" />
              <span>Usually replies within 24 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={16} className="shrink-0" />
              <span>Davao City, Philippines</span>
            </div>
          </div>
        </div>

        <div className="metal-panel rounded-[1.5rem] p-5 sm:p-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(211,188,255,0.72)]">
            Let&apos;s Connect
          </h3>
          <div className="mt-4 flex gap-2.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="contact-social-icon"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="metal-panel rounded-[1.5rem] p-5 sm:p-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(211,188,255,0.72)]">
            Available For
          </h3>
          <ul className="mt-3 space-y-2">
            {availabilities.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="metal-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Currently accepting new projects
        </div>
      </div>
    </Reveal>
  );
}
