import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { FloatingOrbs } from "@/components/site/Reveal";

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
  return (
    <div className="relative px-6 pb-10">
      <FloatingOrbs clipped={false} className="-inset-x-24 -inset-y-24" />
      <section className="relative mx-auto max-w-6xl pt-12">
        <ContactHeader />

        <div className="mt-16 grid gap-8 md:grid-cols-5">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </div>
  );
}
