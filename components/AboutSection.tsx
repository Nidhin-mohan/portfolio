"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";

const journey = [
  {
    year: "2020",
    title: "Diploma & First Steps Into Code",
    description:
      "Completed a Diploma in Electronics and Communication. Got curious about web development on the side — started with HTML, CSS, and JavaScript. Self-taught path began here.",
  },
  {
    year: "2021–22",
    title: "Full-Stack Bootcamp & Building",
    description:
      "Completed a Full Stack JavaScript bootcamp. Built personal projects with React and Node.js, learned Express, MongoDB schema design by making mistakes, and got comfortable shipping things end-to-end.",
  },
  {
    year: "2023",
    title: "First Professional Role",
    description:
      "Joined a multi-tenant enterprise SaaS team. Learned what it means to write code that multiple client organizations depend on — production bug fixes, performance tuning, BullMQ background jobs, and CI/CD with Azure DevOps.",
  },
  {
    year: "2025–Now",
    title: "Backend-Heavy Systems in Hospitality",
    description:
      "Building a PMS and Channel Manager that syncs room inventory, rates, and bookings across OTA platforms. Solved a 99% query bottleneck, built a billing module covering multiple invoice types, and manage staging deployments on AWS EC2 and S3.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="03" tag="ABOUT" meta="SELF-TAUGHT" title="RELIABLE BY DEFAULT" />

          {/* Narrative */}
          <div className="mb-14 grid gap-8 border-2 border-foreground bg-card p-6 text-[0.9375rem] leading-relaxed text-muted-foreground md:p-8 lg:grid-cols-2">
            <div className="space-y-4">
              <p>
                I&apos;m a full-stack engineer with a strong backend focus. My day-to-day is building
                the systems that hotels and hospitality businesses depend on — OTA sync pipelines,
                billing engines, room pricing logic, and the APIs that connect it all.
              </p>
              <p>
                Most of my work lives in{" "}
                <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                  Node.js
                </code>{" "}
                and{" "}
                <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                  TypeScript
                </code>
                , with{" "}
                <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                  MongoDB
                </code>{" "}
                as the primary store. I&apos;ve built GraphQL APIs, designed aggregation pipelines for
                reporting, and wired up{" "}
                <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                  BullMQ
                </code>{" "}
                queues for background jobs that have to be reliable — not just &quot;run and hope.&quot;
              </p>
            </div>
            <div className="space-y-4">
              <p>
                I care about error handling, structured logging, and writing code that the next person
                can actually read.{" "}
                <code className="border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">
                  TypeScript
                </code>{" "}
                everywhere — I&apos;ve been bitten too many times by untyped code that &quot;worked
                on my machine.&quot;
              </p>
              <p>
                I&apos;m not claiming to be a system architect. But I think carefully about how my
                code fits into the bigger picture — what breaks when this changes, what happens
                under load, and whether this solution will survive the next feature request.
              </p>
            </div>
          </div>

          {/* Journey */}
          <div className="mb-14">
            <h3 className="mb-0 flex items-stretch border-2 border-foreground">
              <span className="bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                HOW I GOT HERE
              </span>
            </h3>
            <div className="border-2 border-t-0 border-foreground">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`group flex flex-col gap-2 px-4 py-5 transition-colors hover:bg-primary hover:text-primary-foreground sm:flex-row sm:gap-6 ${
                    index !== journey.length - 1 ? "border-b-2 border-border" : ""
                  }`}
                >
                  <div className="w-24 shrink-0 font-display text-2xl leading-none text-primary group-hover:text-primary-foreground">
                    {item.year}
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-foreground group-hover:text-primary-foreground">
                      {item.title}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/90">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid border-2 border-foreground sm:grid-cols-2">
            <div className="border-b-2 border-foreground p-5 sm:border-b-0 sm:border-r-2">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                [ EDUCATION ]
              </h3>
              <p className="text-sm font-bold uppercase tracking-[0.04em] text-foreground">
                Diploma in Electronics &amp; Communication
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Govt Polytechnic Cherthala · 2020 · Grade 8/10</p>
              <p className="mt-1 text-xs text-muted-foreground/60">15 years of formal education</p>
            </div>
            <div className="p-5">
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                [ CERTIFICATIONS ]
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Full Stack JavaScript Bootcamp — Professional Certification",
                ].map((cert) => (
                  <li key={cert} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 text-primary">→</span>
                    {cert}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  [ LANGUAGES ]
                </h3>
                <p className="text-sm text-muted-foreground">English, Malayalam, Tamil, Hindi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
