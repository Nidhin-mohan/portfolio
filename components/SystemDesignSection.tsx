"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";

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
      "A scheduled sync job failed mid-run but exited cleanly — zero errors thrown, zero records processed, zero alerts fired. It took days for anyone to notice the downstream data was stale. The job 'succeeded' because nothing explicitly threw an exception.",
    takeaway:
      "Every background job now logs records processed, records failed, and total duration. A run that processes zero records fires an alert. Try/catch alone can't catch a job that quietly does nothing.",
  },
  {
    title: "Schema Change Without a Migration Plan",
    description:
      "Changed a MongoDB document shape in production without accounting for the existing documents. Old and new shapes coexisted in the collection, and the API returned inconsistent data for nearly a day before I caught it. There was no rollback path.",
    takeaway:
      "Now I treat every schema change as a multi-step process: add new field with a safe default, backfill existing documents, then remove the old field once the codebase no longer reads it. Never a one-shot swap in production.",
  },
  {
    title: "The Backend That Only Worked With My Frontend",
    description:
      "As the full-stack dev on both ends, I shipped backend code shaped around my own frontend — response shapes matched my components, and some business rules lived client-side because it was faster to put them there. Then a mobile app joined the product. A mobile team can't ship an app-store release every time a small rule changes, so they needed everything as clean, complete APIs with the logic on the server. Worse: we were maintaining REST and GraphQL for the same features — two implementations of the same business logic, drifting apart a little more with every change.",
    takeaway:
      "We refactored to a shared service layer: business logic lives once in services, and the REST controllers and GraphQL resolvers are thin adapters over the same functions. A change lands in one place and every client — web, mobile, whatever comes next — gets it. The rule since then: business logic lives in services, controllers and resolvers stay thin.",
  },
];

export default function SystemDesignSection() {
  return (
    <section id="system-design" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="06" tag="LESSONS" meta="POSTMORTEMS" title="LESSONS FROM PROD" />
          <p className="mb-12 max-w-xl text-sm text-muted-foreground">
            Mistakes I&apos;ve made in production and what I do differently now.
          </p>

          {/* Learnings */}
          <div className="space-y-8">
            {learnings.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="border-2 border-foreground bg-card"
              >
                {/* incident header */}
                <div className="flex items-stretch border-b-2 border-foreground">
                  <span className="flex items-center bg-destructive px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-destructive-foreground">
                    INC-{String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="flex items-center px-4 py-2 text-sm font-bold uppercase tracking-[0.05em] text-foreground">
                    {item.title}
                  </h4>
                </div>

                <div className="grid lg:grid-cols-2">
                  {/* Incident */}
                  <div className="border-b-2 border-foreground p-5 lg:border-b-0 lg:border-r-2 lg:p-6">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-destructive">
                      [ WHAT HAPPENED ]
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {/* Fix */}
                  <div className="p-5 lg:p-6">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                      [ WHAT I CHANGED ]
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/90">{item.takeaway}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              READ THE FULL POSTMORTEMS →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
