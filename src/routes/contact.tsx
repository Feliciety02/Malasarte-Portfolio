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
    <MetallicPage variant="contact" className="px-6 pb-20">
      <section className="mx-auto max-w-6xl pt-12 md:pt-20">
        <ContactHeader />

        <div className="mt-16 grid gap-8 md:grid-cols-5">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </MetallicPage>
  );
}
