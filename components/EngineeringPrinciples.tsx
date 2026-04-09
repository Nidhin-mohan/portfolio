"use client";

import { motion } from "framer-motion";

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
    <section id="principles" className="w-full py-20 md:py-28 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
              05 · Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              How I work
            </h2>
            <p className="text-muted-foreground max-w-lg">
              A few principles that guide how I write code and make technical decisions.
            </p>
          </div>

          {/* Principles list */}
          <div className="divide-y divide-border">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-7"
              >
                <span className="font-mono text-3xl font-bold text-primary/15 shrink-0 sm:w-14 sm:text-right leading-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
