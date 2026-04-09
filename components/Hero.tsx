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

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20 pointer-events-none" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
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
            3+ years building production MERN apps. I live in{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
              Node.js
            </code>
            ,{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
              MongoDB
            </code>
            , and{" "}
            <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
              GraphQL
            </code>{" "}
            — designing schemas, writing APIs, and fixing the bugs nobody else
            wants to touch.
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
                  {" "}· full-stack · backend focus · 3yr exp
                </span>
              </div>
              <div>
                <span className="text-muted-foreground select-none">&gt; </span>
                <span className="text-muted-foreground">
                  TypeScript · Node.js · GraphQL · MongoDB
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
