"use client";

import { motion } from "framer-motion";

const journey = [
  {
    year: "2021",
    title: "Started with Frontend",
    description:
      "React, component libraries, responsive layouts. Got comfortable with the UI side, then got curious about what happens after the button click.",
  },
  {
    year: "2022",
    title: "Moved to Full-Stack",
    description:
      "Picked up Node.js, Express, and MongoDB. Built my first production API. Learned schema design by making mistakes and fixing them under pressure.",
  },
  {
    year: "2023",
    title: "Backend-Heavy Work",
    description:
      "Built a Channel Manager with GraphQL, cron jobs, and multi-tenant data. Started caring more about data modeling and error handling than pixel-perfect UIs.",
  },
  {
    year: "2024–Now",
    title: "Growing as an Engineer",
    description:
      "Docker, AWS, CI/CD. Building MoodMate as a proper production app — role-based access, analytics, structured error handling. Learning what it takes to ship and maintain.",
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
                I&apos;m a full-stack developer who gravitates toward the backend. I enjoy the
                problems that live there — data modeling, query performance, API design,
                figuring out why something fails silently at 2 AM.
              </p>
              <p>
                Most of my experience is in the MERN stack with{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  TypeScript
                </code>
                . I&apos;ve built GraphQL APIs with complex resolvers,{" "}
                <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-foreground">
                  MongoDB
                </code>{" "}
                schemas that handle real business logic, and cron jobs that need to be reliable
                — not just &quot;run and hope.&quot;
              </p>
            </div>
            <div className="space-y-4">
              <p>
                I care about error handling, clear logging, and writing code that the next person
                can actually understand.{" "}
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
              <p className="text-sm text-muted-foreground">BSc in Computer Science (2017–2021)</p>
            </div>
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
                // certifications
              </h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "AWS Certified Developer – Associate",
                  "Meta Full-Stack Developer Certificate",
                  "MongoDB for Developers – Engineering Digest",
                ].map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <span className="text-primary/50 shrink-0">→</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
