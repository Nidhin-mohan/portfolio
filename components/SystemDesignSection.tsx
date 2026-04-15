"use client";

import { motion } from "framer-motion";

const learnings = [
  {
    title: "The N+1 Query That Killed a Sync Pipeline",
    description:
      "A cron-based OTA sync job was firing 401 MongoDB queries per cycle. It worked fine in development with small datasets — but in production, with growing hotel inventory, it became a bottleneck that blocked scaling to more OTA integrations. I didn't catch it because I never profiled with realistic data volumes.",
    takeaway:
      "Profiling with real data collapsed it to 5 queries per cycle (99% reduction) by batching all lookups upfront. Now I always profile background jobs with production-scale data before shipping. Query count is part of the definition of done.",
  },
  {
    title: "The Cron Job That Silently Did Nothing",
    description:
      "A booking sync job failed mid-run but exited cleanly — zero errors thrown, zero records processed, zero alerts fired. It took 3 days for a hotel client to notice stale availability data. The job 'succeeded' because nothing explicitly threw an exception.",
    takeaway:
      "Every background job now logs: records processed, records failed, and total duration. Zero records processed is an alert, not a success. Exit codes and try/catch aren't enough — you have to assert that the job actually did what it was supposed to do.",
  },
  {
    title: "Schema Change Without a Migration Plan",
    description:
      "Changed a MongoDB document shape in production without accounting for the existing documents. Old and new shapes coexisted in the collection, and the API returned inconsistent data for nearly a day before I caught it. There was no rollback path.",
    takeaway:
      "Now I treat every schema change as a multi-step process: add new field with a safe default, backfill existing documents, then remove the old field once the codebase no longer reads it. Never a one-shot swap in production.",
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
