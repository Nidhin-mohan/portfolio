"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, FileText, ArrowUpRight } from "lucide-react";
import SectionHead from "@/components/SectionHead";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactLinks = [
  {
    icon: Mail,
    label: "nidhinmohannidhin@gmail.com",
    href: "mailto:nidhinmohannidhin@gmail.com",
    description: "Fastest way to reach me",
  },
  {
    icon: GithubIcon,
    label: "github.com/Nidhin-mohan",
    href: "https://github.com/Nidhin-mohan",
    description: "Code & open source",
  },
  {
    icon: LinkedinIcon,
    label: "linkedin.com/in/nidhinm",
    href: "https://www.linkedin.com/in/nidhinm/",
    description: "Professional network",
  },
  {
    icon: FileText,
    label: "nidhinm.vercel.app/writing",
    href: "/writing",
    description: "Postmortems & backend patterns, written down",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-16 md:py-24">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="07" tag="CONTACT" meta="INBOX: OPEN" title="LET'S TALK" />
          <p className="mb-12 max-w-xl text-sm leading-relaxed text-muted-foreground">
            If you have a question about anything on this page, or a backend problem you want
            another pair of eyes on, email me. I read everything that isn&apos;t spam.
          </p>

          <div className="grid border-2 border-foreground lg:grid-cols-2">
            {/* Terminal CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="border-b-2 border-foreground lg:border-b-0 lg:border-r-2"
            >
              <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
                <span>~/contact — zsh</span>
                <span className="animate-blink">█</span>
              </div>
              <div className="px-5 py-5 text-sm leading-relaxed">
                <div>
                  <span className="select-none text-primary">$ </span>
                  <span className="text-foreground">contact nidhin</span>
                  <span className="text-primary"> --re</span>
                  <span className="text-muted-foreground"> &quot;new opportunity&quot;</span>
                </div>
                <div className="text-muted-foreground">
                  <span className="select-none">&gt; </span>opening preferred channel…
                </div>
                <div>
                  <span className="select-none text-muted-foreground">&gt; </span>
                  <Link
                    href="mailto:nidhinmohannidhin@gmail.com"
                    className="font-bold text-primary underline-offset-4 hover:underline"
                  >
                    nidhinmohannidhin@gmail.com
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Contact links */}
            <div>
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      target={link.href.startsWith("https") ? "_blank" : undefined}
                      rel={link.href.startsWith("https") ? "noreferrer" : undefined}
                      className={`group flex items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-primary ${
                        index !== contactLinks.length - 1 ? "border-b-2 border-foreground" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0 text-foreground transition-colors group-hover:text-primary-foreground" />
                        <div>
                          <div className="text-sm font-bold text-foreground transition-colors group-hover:text-primary-foreground">
                            {link.label}
                          </div>
                          <div className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">
                            {link.description}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-foreground" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
