"use client";

import { motion } from "framer-motion";

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
    <section id="about" className="w-full py-20 md:py-28 relative">
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-10 pointer-events-none" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
              03 · About
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              I like building things that work reliably.
            </h2>
            <p className="text-muted-foreground">And I like debugging the ones that don&apos;t.</p>
          </div>

          {/* Narrative */}
          <div className="grid gap-6 lg:grid-cols-2 mb-16 text-muted-foreground leading-relaxed text-[0.9375rem]">
            <div className="space-y-4">
              <p>
                I&apos;m a full-stack engineer with a strong backend focus. My day-to-day is building
                the systems that hotels and hospitality businesses depend on — OTA sync pipelines,
                billing engines, room pricing logic, and the APIs that connect it all.
              </p>
              <p>
                Most of my work lives in{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  Node.js
                </code>{" "}
                and{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  TypeScript
                </code>
                , with{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  MongoDB
                </code>{" "}
                as the primary store. I&apos;ve built GraphQL APIs, designed aggregation pipelines for
                reporting, and wired up{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  BullMQ
                </code>{" "}
                queues for background jobs that have to be reliable — not just &quot;run and hope.&quot;
              </p>
            </div>
            <div className="space-y-4">
              <p>
                I care about error handling, structured logging, and writing code that the next person
                can actually read.{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
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
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
              // how i got here
            </h3>
            <div className="divide-y divide-border">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex gap-6 py-5"
                >
                  <div className="font-mono text-sm text-primary/70 w-20 shrink-0 pt-0.5">
                    {item.year}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid gap-6 sm:grid-cols-2 pt-8 border-t border-border">
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                // education
              </h3>
              <p className="text-sm text-foreground font-medium">Diploma in Electronics and Communication</p>
              <p className="text-sm text-muted-foreground">Govt Polytechnic Cherthala · 2020 · Grade 8/10</p>
              <p className="text-xs text-muted-foreground/60 mt-1">15 years of formal education</p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                // certifications
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Full Stack JavaScript Bootcamp — Professional Certification",
                ].map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <span className="text-primary/50 shrink-0">→</span>
                    {cert}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  // languages
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
