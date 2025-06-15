// "use client";

import { AnimatedText } from "./animated-text";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-30"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-4">
            {/* Heading */}
            <div className="space-y-2">
              <AnimatedText
                text="About Me"
                className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              />
              <AnimatedText
                text="I'm a full-stack developer with 3+ years of hands-on experience building scalable, efficient web applications using modern technologies."
                className="max-w-[600px] text-muted-foreground md:text-xl"
              />
            </div>

            {/* Bio */}
            <div className="space-y-4 text-muted-foreground">
              <p>
                I started my professional journey in 2021, and since then, I’ve been deeply involved in building full-stack applications using the MERN stack. My work spans startups and enterprise solutions, where I focus on crafting performant, maintainable, and secure systems.
              </p>
              <p>
                I specialize in backend development with Node.js and MongoDB, implementing optimized queries, cron jobs, and complex business logic. On the frontend, I build elegant and responsive UIs using React, Tailwind CSS, and TypeScript—often using frameworks like ShadCN and Framer Motion.
              </p>
              <p>
                I’ve worked on diverse projects like a Channel Manager system (GraphQL, MongoDB, dynamic booking flows) and MoodMate (a mental wellness app with blog, mood analysis, and role-based access).
              </p>
              <p>
                Beyond coding, I enjoy writing technical blogs to share my learnings—especially around MongoDB, performance tuning, and GraphQL. I’m passionate about clean code, debugging complex issues, and continuously learning to stay ahead in the tech space.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Education
              </h3>
              <p className="text-muted-foreground">
                BSc in Computer Science, University of Technology (2017–2021)
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Certifications
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>AWS Certified Developer – Associate</li>
                <li>Meta Full-Stack Developer Certificate</li>
                <li>MongoDB for Developers – Engineering Digest</li>
              </ul>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl border-2 border-primary/10 shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="Full Stack Developer"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
