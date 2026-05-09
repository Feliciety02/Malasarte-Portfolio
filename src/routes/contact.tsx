import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Dribbble,
  Instagram,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { FloatingOrbs, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Fe Anne Malasarte" },
      {
        name: "description",
        content: "Let's create something meaningful together - start a project with Fe Anne.",
      },
      { property: "og:title", content: "Contact - Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "Reach out for design, branding, and creative collaborations.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative overflow-hidden px-6 pb-16 md:pb-20">
      <FloatingOrbs />
      <div
        aria-hidden
        className="page-midshade pointer-events-none absolute inset-x-0 top-0 h-[34rem]"
      />
      <section className="relative mx-auto max-w-6xl pt-12">
        <Reveal className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Contact
          </span>
          <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-7xl">
            Let&apos;s create something <span className="text-gradient">meaningful</span> together.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
            Have a project, idea, or collaboration in mind? Drop a note - I read every message.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-5">
          <Reveal delay={0.1} className="md:col-span-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
                (event.currentTarget as HTMLFormElement).reset();
              }}
              className="space-y-5 rounded-3xl glass-strong p-6 md:p-10"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name" name="name" placeholder="Jane Doe" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@studio.com"
                  required
                />
              </div>
              <Field label="Subject" name="subject" placeholder="Brand identity for..." />
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] md:px-7 md:py-3.5"
              >
                Send message
                <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-emerald-300"
                >
                  <CheckCircle2 size={16} /> Message sent - I&apos;ll get back to you shortly.
                </motion.div>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2">
            <div className="space-y-4">
              <a
                href="mailto:hello@feanne.design"
                className="group flex items-start gap-4 rounded-3xl glass p-6 hover-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-hero shadow-glow">
                  <Mail size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <div className="mt-0.5 font-display text-lg font-semibold">
                    hello@feanne.design
                  </div>
                </div>
              </a>

              <div className="rounded-3xl glass p-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Find me on
                </div>
                <div className="mt-4 flex gap-3">
                  {[
                    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                    { Icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
                    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  ].map(({ Icon, href, label }) => (
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
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Currently
                </div>
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
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
