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

const readout: { k: string; v: string; note?: string; signal?: boolean }[] = [
  { k: "QUERIES/CYCLE", v: "401 → 5", note: "−99%" },
  { k: "OTA API TRAFFIC", v: "BULK", note: "−96%" },
  { k: "EXPERIENCE", v: "3 YRS" },
  { k: "STACK", v: "NODE·TS·MONGO" },
  { k: "LOCATION", v: "KOCHI, IN" },
  { k: "STATUS", v: "AVAILABLE", signal: true },
];

const ticker = [
  "NODE.JS", "TYPESCRIPT", "GRAPHQL", "MONGODB", "REDIS", "BULLMQ",
  "DOCKER", "AWS", "NEXT.JS", "REACT", "POSTGRES", "CI/CD",
];

export default function Hero() {
  return (
    <section id="hero" className="relative border-b-2 border-foreground">
      {/* Masthead strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border"
      >
        <div className="container flex items-center justify-between px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:px-6">
          <span className="text-foreground">[ NIDHIN_M ]</span>
          <span className="hidden sm:inline">SOFTWARE_ENGINEER // BACKEND·FULLSTACK</span>
          <span className="inline-flex items-center gap-2 text-primary">
            <span className="h-2 w-2 animate-flicker bg-primary" />
            ONLINE
          </span>
        </div>
      </motion.div>

      <div className="container px-4 py-14 md:px-6 md:py-20">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* eyebrow */}
          <motion.p
            variants={item}
            className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-primary"
          >
            // BACKEND &amp; DISTRIBUTED SYSTEMS — EST. 2023
          </motion.p>

          {/* Massive headline */}
          <motion.h1
            variants={item}
            className="font-display text-foreground"
          >
            <span className="block text-[clamp(3rem,13vw,11rem)]">BACKEND</span>
            <span className="block text-[clamp(3rem,13vw,11rem)]">
              SYSTEMS{" "}
              <span
                className="glitch bg-primary px-2 text-primary-foreground"
                data-text="THAT"
              >
                THAT
              </span>
            </span>
            <span className="block text-[clamp(3rem,13vw,11rem)] text-muted-foreground">
              HOLD UNDER LOAD
            </span>
          </motion.h1>

          {/* lower band */}
          <div className="mt-12 grid gap-0 border-2 border-foreground md:mt-16 lg:grid-cols-12">
            {/* Left: pitch */}
            <motion.div
              variants={item}
              className="border-b-2 border-foreground p-6 md:p-8 lg:col-span-7 lg:border-b-0 lg:border-r-2"
            >
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                3 years building B2B SaaS — multi-tenant property management
                platforms, OTA sync pipelines, billing engines. I design for the
                moment the data gets large and the edge cases get real, not just the
                happy path in dev.
              </p>

              <div className="mt-8 flex flex-col gap-0 sm:flex-row">
                <Link
                  href="/#projects"
                  className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  VIEW THE WORK
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center border-2 border-foreground px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-foreground hover:text-background sm:border-l-0"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </motion.div>

            {/* Right: data readout */}
            <motion.div variants={item} className="lg:col-span-5">
              <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-background">
                <span>SYSTEM_STATUS.LOG</span>
                <span className="animate-blink">█</span>
              </div>
              <dl className="text-xs">
                {readout.map((row, i) => (
                  <div
                    key={row.k}
                    className={`flex items-center justify-between gap-4 px-4 py-[0.6rem] ${
                      i !== readout.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <dt className="text-muted-foreground">{row.k}</dt>
                    <dd className="flex items-center gap-2 text-foreground">
                      {row.signal && <span className="h-2 w-2 animate-flicker bg-primary" />}
                      <span className="font-medium">{row.v}</span>
                      {row.note && (
                        <span className="bg-primary px-1 font-bold text-primary-foreground">
                          {row.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
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
