"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, FileText } from "lucide-react";
import { AnimatedText } from "./animated-text";

const contactLinks = [
  {
    icon: Mail,
    label: "nidhinmohannidhin@gmail.com",
    href: "mailto:nidhinmohannidhin@gmail.com",
    description: "For opportunities & collaboration",
  },
  {
    icon: Github,
    label: "github.com/Nidhin-mohan",
    href: "https://github.com/Nidhin-mohan",
    description: "Code & open source",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/nidhinm",
    href: "https://www.linkedin.com/in/nidhinm/",
    description: "Professional network",
  },
  {
    icon: FileText,
    label: "Technical Blog",
    href: "https://hashnode.com/@nidhinmohan",
    description: "Writing on MongoDB, GraphQL & backend patterns",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="space-y-4 mb-12">
            <AnimatedText
              text="Let's Talk"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <p className="text-muted-foreground text-lg">
              Looking for a backend-heavy full-stack engineer? I&apos;m interested in
              roles focused on system design, API architecture, and building
              infrastructure that other developers depend on.
            </p>
          </div>

          {/* Contact Links */}
          <div className="grid gap-4 sm:grid-cols-2 text-left">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {link.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {link.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
