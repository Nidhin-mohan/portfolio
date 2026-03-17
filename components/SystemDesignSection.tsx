"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";

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
    takeaway: "Every background job now logs: records processed, records failed, and duration. Zero records is an alert, not a success.",
  },
  {
    title: "Schema Change Without a Migration Plan",
    description:
      "Changed a MongoDB document shape in production without thinking about existing documents. Old and new shapes coexisted, and the API returned inconsistent data for a day.",
    takeaway: "Now I treat every schema change as a multi-step process: add new field with defaults, backfill, then remove the old one.",
  },
];

export default function SystemDesignSection() {
  return (
    <section
      id="system-design"
      className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <AnimatedText
              text="Lessons Learned"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <p className="max-w-[600px] text-muted-foreground text-lg">
              Mistakes I&apos;ve made in production and what I do differently now.
            </p>
          </div>

          <div className="space-y-5">
            {learnings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="text-xs text-primary/80 font-medium border-t border-primary/10 pt-3">
                  What changed: {item.takeaway}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
