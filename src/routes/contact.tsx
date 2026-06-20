import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { MetallicPage } from "@/components/site/MetallicPage";
import { buildBreadcrumbSchema, buildCanonicalLinks, buildPageSchema, buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: buildSeoMeta({
      title: "Contact",
      description:
        "Contact Fe Anne Malasarte for UI/UX design, branding, social media graphics, web development, and creative collaborations.",
      path: "/contact",
      keywords: [
        "contact Fe Anne Malasarte",
        "hire UI UX designer",
        "branding designer contact",
        "portfolio contact page",
      ],
      schemas: [
        buildPageSchema({
          type: "ContactPage",
          name: "Contact Fe Anne Malasarte",
          description:
            "Contact Fe Anne Malasarte for UI/UX design, branding, social media graphics, web development, and creative collaborations.",
          path: "/contact",
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
    links: buildCanonicalLinks("/contact"),
  }),
  component: Contact,
});

function Contact() {
  return (
    <MetallicPage variant="contact" className="relative overflow-hidden px-6 pb-24">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#090a0c]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.014), transparent 24%, transparent 76%, rgba(255,255,255,0.01)), repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 8px)",
          }}
        />
        <div className="contact-glow-orb -left-32 top-20 h-96 w-96" style={{ background: "oklch(0.62 0.24 295 / 0.11)" }} />
        <div className="contact-glow-orb right-0 top-40 h-80 w-80" style={{ background: "oklch(0.78 0.16 85 / 0.07)" }} />
        <div className="contact-glow-orb left-1/3 top-3/4 h-72 w-72" style={{ background: "oklch(0.6 0.22 330 / 0.08)" }} />
        <div className="contact-grid-bg absolute inset-0" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl pt-8 md:pt-12">
        <ContactHeader />

        <div className="mt-12 grid gap-6 md:grid-cols-5 lg:gap-8">
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
