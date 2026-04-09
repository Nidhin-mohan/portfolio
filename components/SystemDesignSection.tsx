"use client";

import { motion } from "framer-motion";

const learnings = [
  {
    title: "The N+1 Query That Slowed Everything Down",
    description:
      "Shipped a GraphQL resolver that looked clean but made a separate MongoDB query per item in a list. 200ms for 10 items, 4 seconds for 200. I didn't catch it because I tested with small datasets.",
    takeaway: "Now I always profile with realistic data volumes, and I use DataLoader for batching.",
  },
  {
    title: "The Cron Job That Silently Did Nothing",
    description:
      "A booking sync job failed mid-run but exited cleanly — zero error, zero records processed. Took 3 days for a customer to notice stale data. The job 'succeeded' because nothing threw.",
    takeaway:
      "Every background job now logs: records processed, records failed, and duration. Zero records is an alert, not a success.",
  },
  {
    title: "Schema Change Without a Migration Plan",
    description:
      "Changed a MongoDB document shape in production without thinking about existing documents. Old and new shapes coexisted, and the API returned inconsistent data for a day.",
    takeaway:
      "Now I treat every schema change as a multi-step process: add new field with defaults, backfill, then remove the old one.",
  },
];

export default function SystemDesignSection() {
  return (
    <section id="system-design" className="w-full py-20 md:py-28 bg-muted/20 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
              06 · Lessons
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Lessons learned
            </h2>
            <p className="text-muted-foreground">
              Mistakes I&apos;ve made in production and what I do differently now.
            </p>
          </div>

          {/* Learnings */}
          <div className="space-y-5">
            {learnings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-mono text-xs text-primary/40 shrink-0 pt-0.5 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-6">
                  {item.description}
                </p>
                <div className="flex gap-2 pl-6 pt-3 border-t border-border">
                  <span className="text-primary/60 text-sm shrink-0 mt-0.5">→</span>
                  <p className="text-sm text-primary/80">{item.takeaway}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
