import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { MetallicPage } from "@/components/site/MetallicPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Fe Anne Malasarte" },
      {
        name: "description",
        content: "Let's create something meaningful together - start a project with Fe Anne.",
      },
      { property: "og:title", content: "Fe Anne Malasarte" },
      {
        property: "og:description",
        content: "Reach out for design, branding, and creative collaborations.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <MetallicPage variant="contact" className="relative px-6 pb-24">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="contact-glow-orb -left-32 top-20 h-96 w-96" style={{ background: "oklch(0.62 0.24 295 / 0.12)" }} />
        <div className="contact-glow-orb right-0 top-40 h-80 w-80" style={{ background: "oklch(0.78 0.16 85 / 0.08)" }} />
        <div className="contact-glow-orb left-1/3 top-3/4 h-72 w-72" style={{ background: "oklch(0.6 0.22 330 / 0.1)" }} />
        <div className="contact-grid-bg absolute inset-0" />
      </div>

      <section className="relative z-10 mx-auto max-w-5xl pt-8 md:pt-12">
        <ContactHeader />

        <div className="mt-10 grid gap-6 md:grid-cols-5 lg:gap-8">
          <div className="md:col-span-3">
            <ContactForm />
          </div>
          <div className="md:col-span-2">
            <ContactSidebar />
          </div>
        </div>
      </section>
    </MetallicPage>
  );
}
