"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";

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
    <section
      id="about"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="space-y-4 mb-12">
            <AnimatedText
              text="About Me"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <p className="max-w-[600px] text-muted-foreground text-lg leading-relaxed">
              I like building things that work reliably, and I like
              debugging the ones that don&apos;t.
            </p>
          </div>

          {/* Narrative */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a full-stack developer who gravitates toward the backend. I enjoy the
                problems that live there — data modeling, query performance, API design,
                figuring out why something fails silently at 2 AM.
              </p>
              <p>
                Most of my experience is in the MERN stack with TypeScript. I&apos;ve built
                GraphQL APIs with complex resolvers, MongoDB schemas that handle real
                business logic, and cron jobs that need to be reliable — not just
                &quot;run and hope.&quot;
              </p>
            </div>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I care about error handling, clear logging, and writing code that the
                next person can actually understand. TypeScript everywhere — I&apos;ve been
                bitten too many times by untyped code that &quot;worked on my machine.&quot;
              </p>
              <p>
                I&apos;m not claiming to be a system architect. But I think carefully
                about how my code fits into the bigger picture — what breaks when
                this changes, what happens under load, and whether this solution
                will survive the next feature request.
              </p>
            </div>
          </div>

          {/* Journey */}
          <div className="space-y-4 mb-12">
            <h3 className="text-xl font-bold text-foreground">
              How I Got Here
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/25 transition-colors"
                >
                  <div className="text-sm font-mono text-primary mb-1">
                    {item.year}
                  </div>
                  <div className="font-semibold text-foreground mb-2">
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                Education
              </h3>
              <p className="text-muted-foreground">
                BSc in Computer Science (2017–2021)
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                Certifications
              </h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>AWS Certified Developer – Associate</li>
                <li>Meta Full-Stack Developer Certificate</li>
                <li>MongoDB for Developers – Engineering Digest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
