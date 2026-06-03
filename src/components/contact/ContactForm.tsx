import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <Reveal delay={0.1} className="md:col-span-3">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
          setTimeout(() => setSent(false), 4000);
          event.currentTarget.reset();
        }}
        className="metal-panel space-y-5 p-8 md:p-10"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Your name" name="name" placeholder="Jane Doe" required />
          <Field label="Email" name="email" type="email" placeholder="jane@studio.com" required />
        </div>
        <Field label="Subject" name="subject" placeholder="Brand identity for..." />
        <div>
          <label
            htmlFor="message"
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell me about your project..."
            className="metal-input mt-2 w-full resize-none px-4 py-3 text-sm outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="metal-cta group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Send message
          <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-primary"
          >
            <CheckCircle2 size={16} /> Message sent. I&apos;ll get back to you shortly.
          </motion.div>
        ) : null}
      </form>
    </Reveal>
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
        className="metal-input mt-2 w-full px-4 py-3 text-sm outline-none transition-all"
      />
    </div>
  );
}
