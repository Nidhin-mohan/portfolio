"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";

const principles = [
  {
    title: "Handle Errors Explicitly",
    description:
      "Every external call can fail. I don't rely on generic catch blocks — I think about what specifically can go wrong and handle each case. Silent failures are production incidents waiting to happen.",
  },
  {
    title: "Design Schemas for How You Read",
    description:
      "In MongoDB, the schema is the most impactful decision. I design around actual query patterns — embedded docs for read-heavy paths, references for write-heavy ones, compound indexes that match real filters.",
  },
  {
    title: "Keep It Readable",
    description:
      "The best code is the code someone else can debug at 3 AM. I'll pick a clear approach over a clever one. If I need a comment to explain what something does, I usually rewrite it instead.",
  },
  {
    title: "Ship, Then Improve",
    description:
      "I don't try to build the perfect system upfront. Ship something that works, see how it behaves with real data, then iterate. Most of my best design decisions came from watching v1 break.",
  },
];

export default function EngineeringPrinciples() {
  return (
    <section
      id="principles"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <AnimatedText
              text="How I Work"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <p className="max-w-[600px] text-muted-foreground text-lg">
              A few principles that guide how I write code and make technical decisions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/25 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
