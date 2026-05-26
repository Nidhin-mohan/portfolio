"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";

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
    <section id="principles" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="05" tag="PRINCIPLES" meta="HOW I DECIDE" title="HOW I WORK" />
          <p className="mb-12 max-w-lg text-sm text-muted-foreground">
            A few principles that guide how I write code and make technical decisions.
          </p>

          {/* Principles grid */}
          <div className="grid border-2 border-foreground sm:grid-cols-2">
            {principles.map((principle, index) => {
              const col = index % 2;
              const lastRow = index >= principles.length - (principles.length % 2 === 0 ? 2 : 1);
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`group bg-card p-6 transition-colors hover:bg-primary md:p-8 ${
                    col === 0 ? "sm:border-r-2 sm:border-foreground" : ""
                  } ${!lastRow ? "border-b-2 border-foreground" : ""}`}
                >
                  <span className="block select-none font-display text-6xl leading-none text-primary transition-colors group-hover:text-primary-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.08em] text-foreground group-hover:text-primary-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/90">
                    {principle.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
