"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

type Token = { t: string; c?: string };

const CODE: Token[][] = [
  [{ t: "// nidhin.config.ts", c: "#6b7280" }],
  [],
  [
    { t: "const", c: "#c084fc" },
    { t: " developer = {" },
  ],
  [
    { t: "  name" },
    { t: ": ", c: "#9ca3af" },
    { t: '"Nidhin M"', c: "#86efac" },
    { t: "," },
  ],
  [
    { t: "  role" },
    { t: ": ", c: "#9ca3af" },
    { t: '"Software Engineer"', c: "#86efac" },
    { t: "," },
  ],
  [
    { t: "  focus" },
    { t: ": ", c: "#9ca3af" },
    { t: '"Full-stack, backend-first"', c: "#86efac" },
    { t: "," },
  ],
  [
    { t: "  available" },
    { t: ": ", c: "#9ca3af" },
    { t: "true", c: "#c084fc" },
    { t: "," },
  ],
  [
    { t: "  openTo" },
    { t: ": ", c: "#9ca3af" },
    { t: "[" },
  ],
  [{ t: '    "Full-time roles"', c: "#86efac" }, { t: "," }],
  [{ t: '    "Remote or on-site"', c: "#86efac" }, { t: "," }],
  [{ t: "  ]," }],
  [
    { t: "  strengths" },
    { t: ": ", c: "#9ca3af" },
    { t: "[" },
  ],
  [{ t: '    "Scalable architecture"', c: "#86efac" }, { t: "," }],
  [{ t: '    "Maintainable code"', c: "#86efac" }, { t: "," }],
  [{ t: '    "Multi-tenant SaaS"', c: "#86efac" }, { t: "," }],
  [{ t: '    "API & integration design"', c: "#86efac" }, { t: "," }],
  [{ t: "  ]," }],
  [
    { t: "  location" },
    { t: ": ", c: "#9ca3af" },
    { t: '"Kochi, India"', c: "#86efac" },
    { t: "," },
  ],
  [{ t: "};" }],
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20 pointer-events-none" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text content */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Status indicator */}
            <motion.div variants={item} className="mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/20 bg-primary/5 rounded-full px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                available · open to full-time roles
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-foreground">Full-stack dev,</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/50 bg-clip-text text-transparent">
                backend-focused.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8"
            >
              3 years in B2B SaaS — multi-tenant and single-tenant systems, property management platforms, and scalable integrations. I design and build systems that handle real operational load:{" "}
              <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                Node.js
              </code>
              ,{" "}
              <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                TypeScript
              </code>
              ,{" "}
              <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                MongoDB
              </code>
              {" "}— optimising for scale, not just shipping features.
            </motion.p>

            {/* Terminal block */}
            <motion.div variants={item} className="mb-10">
              <div className="inline-block rounded-lg border border-border bg-muted/40 px-5 py-3.5 font-mono text-sm leading-relaxed">
                <div>
                  <span className="text-muted-foreground select-none">$ </span>
                  <span className="text-foreground">whoami</span>
                </div>
                <div>
                  <span className="text-muted-foreground select-none">&gt; </span>
                  <span className="text-primary">nidhin</span>
                  <span className="text-muted-foreground">
                    {" "}· software engineer · backend focus · Kochi, India
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground select-none">&gt; </span>
                  <span className="text-muted-foreground">
                    Node.js · TypeScript · React · MongoDB · Redis · BullMQ
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/#projects">
                  View my work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-border hover:border-primary/50"
              >
                <Link href="/#contact">Get in touch</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: animated code window */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Code window */}
              <div className="rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden w-[420px]">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 font-mono text-xs text-[#6b7280]">
                    nidhin.config.ts
                  </span>
                </div>
                {/* Code lines */}
                <div className="p-5 font-mono text-[13px] leading-6">
                  {CODE.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 + i * 0.07, duration: 0.25 }}
                      className="whitespace-pre"
                    >
                      {line.length === 0
                        ? " "
                        : line.map((tok, j) => (
                            <span key={j} style={{ color: tok.c ?? "#9ca3af" }}>
                              {tok.t}
                            </span>
                          ))}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Ambient glow behind the window */}
              <div className="absolute -inset-8 bg-primary/8 blur-3xl rounded-full -z-10" />

              {/* Floating badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 0.4 }}
                className="absolute -top-4 -right-6 bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-mono shadow-lg"
              >
                <span className="text-[#28c840]">✓</span>{" "}
                <span className="text-muted-foreground">available: true</span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.4 }}
                className="absolute -bottom-4 -left-6 bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-mono shadow-lg"
              >
                <span className="text-primary">→</span>{" "}
                <span className="text-muted-foreground">open to full-time</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <Link
          href="/#projects"
          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        >
          <ChevronDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
