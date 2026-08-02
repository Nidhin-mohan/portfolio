"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Worklog: dated years deliberately stripped (discretion — see linkdn workspace).
const worklog: { tag: string; text: string; note?: string; promoted?: boolean; now?: boolean }[] = [
  { tag: "LOG", text: "CRON OTA SYNC — 401 → 5 DB READS", note: "−99%", promoted: true },
  { tag: "LOG", text: "60-DAY BULK SYNC — 60 → 1 CALLS" },
  { tag: "LOG", text: "BILLING ENGINE — 8 DOC TYPES" },
  { tag: "LOG", text: "REPORT GEN → BULLMQ QUEUE" },
  { tag: "NOW", text: "HEADS-DOWN, SHIPPING", now: true },
];

const ticker = [
  "NODE.JS", "TYPESCRIPT", "GRAPHQL", "MONGODB", "REDIS", "BULLMQ",
  "DOCKER", "AWS", "NEXT.JS", "REACT", "EXPRESS", "CI/CD",
];

export default function Hero() {
  return (
    <section id="hero" className="relative border-b-2 border-foreground">
      <div className="container px-4 py-14 md:px-6 md:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* eyebrow — LinkedIn-continuity keyword line */}
          <motion.p
            variants={item}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-primary"
          >
            // NODE · TYPESCRIPT · REACT · MONGODB · HOSPITALITY SAAS · KOCHI, IN
          </motion.p>

          {/* THE NAME IS THE MONUMENT */}
          <motion.div variants={item} className="relative">
            {/* NM monogram — placeholder block, swappable for 1-bit dithered photo */}
            <div
              aria-hidden
              className="absolute -top-4 right-0 z-10 hidden h-20 w-20 items-center justify-center border-2 border-foreground bg-primary font-display text-4xl text-primary-foreground md:flex lg:h-24 lg:w-24 lg:text-5xl"
            >
              NM
            </div>

            <h1
              className="glitch font-display text-[clamp(3.5rem,16vw,13rem)] text-foreground"
              data-text="NIDHIN M"
            >
              NIDHIN M
            </h1>

            {/* stamp bar — the role rides on the name */}
            <div className="relative z-10 -mt-3 inline-block -rotate-1 border-2 border-foreground bg-primary px-4 py-2 md:-mt-6 md:px-6">
              <span className="font-display text-base text-primary-foreground md:text-2xl">
                SOFTWARE ENGINEER · BACKEND FIRST
              </span>
            </div>
          </motion.div>

          {/* lower band */}
          <div className="mt-12 grid gap-0 border-2 border-foreground md:mt-16 lg:grid-cols-12">
            {/* Left: pitch + CTAs */}
            <motion.div
              variants={item}
              className="border-b-2 border-foreground p-6 md:p-8 lg:col-span-7 lg:border-b-0 lg:border-r-2"
            >
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Three years of full-stack MERN in B2B SaaS — currently hospitality
                tech: property management, OTA sync, billing. Most of my time goes
                into the backend, keeping that stuff correct.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href="/#projects"
                  className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  SEE THE WORK
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="mailto:nidhinmohannidhin@gmail.com"
                  className="text-sm lowercase text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  or just email me
                </Link>
              </div>
            </motion.div>

            {/* Right: worklog */}
            <motion.div variants={item} className="lg:col-span-5">
              <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
                <span>WORKLOG.TXT</span>
                <span className="animate-blink">█</span>
              </div>
              <ul>
                {worklog.map((row, i) => (
                  <li
                    key={row.text}
                    className={`flex items-center gap-3 px-4 py-[0.6rem] ${
                      i !== worklog.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span
                      className={`shrink-0 text-[10px] font-bold tracking-[0.14em] ${
                        row.now ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {row.tag}
                    </span>
                    <span
                      className={`flex items-center gap-2 ${
                        row.promoted
                          ? "text-sm font-bold text-foreground md:text-base"
                          : "text-xs text-muted-foreground"
                      }`}
                    >
                      {row.now && <span className="h-2 w-2 animate-flicker bg-primary" />}
                      {row.text}
                      {row.note && (
                        <span className="bg-primary px-1 text-xs font-bold text-primary-foreground">
                          {row.note}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stack ticker — lime bar */}
      <div className="overflow-hidden border-t-2 border-foreground bg-primary py-2">
        <div className="flex w-max animate-marquee pause-on-hover">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground"
            >
              {t}
              <span aria-hidden>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
