import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, SendHorizonal } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const projectTypes = [
  "Software Development",
  "Full-Stack Application",
  "UI/UX Design",
  "Branding & Identity",
  "Consultation",
  "Collaboration",
] as const;

const CHAR_LIMIT = 500;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const resetSentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetSentTimerRef.current) clearTimeout(resetSentTimerRef.current);
    };
  }, []);

  return (
    <Reveal delay={0.1}>
      <div className="metal-panel rounded-[1.75rem] p-6 sm:p-8 md:p-10">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
            if (resetSentTimerRef.current) clearTimeout(resetSentTimerRef.current);
            resetSentTimerRef.current = setTimeout(() => setSent(false), 4000);
            event.currentTarget.reset();
            setProjectType("");
            setMessage("");
          }}
          className="space-y-5"
        >
          <div className="border-b border-white/8 pb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(211,188,255,0.76)]">
              Project Brief
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/58">
              Share the core details and I&apos;ll reply with scope, timing, and a clear next step.
            </p>
          </div>

          <div className="relative">
            <span className="contact-floating-label">Your name</span>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className="contact-input"
            />
          </div>

          <div className="relative">
            <span className="contact-floating-label">Email address</span>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@studio.com"
              className="contact-input"
            />
          </div>

          <div className="relative">
            <span className="contact-floating-label">Project type</span>
            <select
              id="project-type"
              name="project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
              className="contact-select"
            >
              <option value="" disabled className="bg-[#0a0b0c]">
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0a0b0c]">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <span className="contact-floating-label">Message</span>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={CHAR_LIMIT}
              placeholder="Tell me about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="contact-textarea"
            />
            <span className="absolute bottom-3 right-4 text-xs text-muted-foreground">
              {message.length}/{CHAR_LIMIT}
            </span>
          </div>

          <button
            type="submit"
            className="metal-cta group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.01]"
          >
            <span className="relative">Start a project</span>
            <SendHorizonal size={16} className="relative transition-transform group-hover:translate-x-1" />
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Your information is safe. No spam, ever.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm text-green-400"
            >
              <CheckCircle2 size={16} /> Message sent. I&apos;ll get back to you shortly.
            </motion.div>
          ) : null}
        </form>
      </div>
    </Reveal>
  );
}
