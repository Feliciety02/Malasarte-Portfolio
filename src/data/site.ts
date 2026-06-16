import { Dribbble, Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const footerExploreLinks = [
  { to: "/works", label: "Works" },
  { to: "/about", label: "About" },
] as const;

export const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/feanneLM", label: "Facebook" },
  { icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:feannemlsrte@gmail.com", label: "Email" },
] as const;
