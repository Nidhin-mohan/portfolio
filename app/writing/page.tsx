import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Writing — Nidhin M | Postmortems & Backend Patterns",
  description:
    "Production postmortems and backend patterns from building OTA sync pipelines, billing systems, and the integrations around them.",
};

interface Post {
  id: string;
  title: string;
  tags: string[];
  body: string[];
  takeaway: string;
}

const posts: Post[] = [
  {
    id: "backend-that-only-worked-with-my-frontend",
    title: "The Backend That Only Worked With My Frontend",
    tags: ["API Design", "GraphQL", "Architecture"],
    body: [
      "As the full-stack developer on both ends, I shipped backend code shaped around my own frontend. Response payloads matched my components. Some business rules lived client-side, because when you own both ends, putting logic wherever you're currently typing is always faster.",
      "Then a mobile app joined the product, and everything I'd cut corners on became their problem. A mobile team can't ship an app-store release every time a small rule changes — they need complete, client-agnostic APIs with the rules on the server. Every place I'd let logic leak into my web frontend was now something to re-implement, and keep in sync, in a second client.",
      "It compounded: we were maintaining REST and GraphQL for the same features. Two implementations of the same business logic, drifting a little further apart with every change — fix a rule in the resolver, forget the controller, ship a subtle inconsistency.",
      "The refactor moved business logic into a shared service layer. REST controllers and GraphQL resolvers became thin adapters over the same functions: a change lands once, and web, mobile, and whatever client comes next all get it.",
    ],
    takeaway:
      "Design APIs as if you've never met the client. Rules live on the server, transport layers stay thin, and business logic exists in exactly one place.",
  },
  {
    id: "cron-job-that-did-nothing",
    title: "The Cron Job That Silently Did Nothing",
    tags: ["Observability", "BullMQ", "Reliability"],
    body: [
      "A scheduled job failed mid-run — and exited cleanly. Zero errors thrown, zero records processed, zero alerts. By every signal we monitored, it had 'succeeded.' It took days for anyone to notice the downstream data was stale.",
      "The root problem: the job's definition of success was 'didn't throw.' An upstream condition made its work set come back empty, so it looped over nothing, wrote nothing, and exited 0. Try/catch and exit codes can't see that kind of failure — the job did exactly what the code said, and the code said nothing about what the job was for.",
      "The change: each run now logs a structured summary — records scanned, written, failed, duration — and 'zero records processed' fires an alert instead of counting as a pass.",
    ],
    takeaway:
      "An exit code can't tell you whether a job did its work. Log the counts, and alert when a run processes nothing.",
  },
  {
    id: "schema-change-without-migration",
    title: "Schema Change Without a Migration Plan",
    tags: ["MongoDB", "Migrations", "Production"],
    body: [
      "MongoDB will let you change a document shape and deploy without complaint. I changed one in production without accounting for the documents already in the old shape. The result: both shapes coexisting in one collection, an API returning inconsistent data depending on which document it hit, and no rollback path — for nearly a day before I caught it.",
      "The schema still exists in a schemaless store; it just lives in your code's assumptions instead of database constraints, so nothing warns you when you break it.",
      "Every schema change I make now is a three-step migration, never a one-shot swap: (1) expand — add the new field with a safe default, with code reading both shapes; (2) backfill — migrate existing documents in controlled batches, verifying counts; (3) contract — remove the old field only after nothing reads it. Each step is independently deployable and independently reversible.",
    ],
    takeaway:
      "Expand → backfill → contract. In a schemaless store the migration discipline has to live in your process, because the database won't enforce it for you.",
  },
  {
    id: "n-plus-one-sync-pipeline",
    title: "The N+1 That Only Showed Up At Production Scale",
    tags: ["MongoDB", "Performance", "Cron"],
    body: [
      "A scheduled sync job looked quick in development. In production, with real data volumes, each cycle was firing 401 MongoDB queries — one lookup per record, inside a loop. The textbook N+1 shape, and I shipped it.",
      "Nothing was broken, which is why it lasted. No errors, no timeouts — just a job quietly turning into a ceiling. It surfaced only when I profiled a cycle against production-scale data and counted the round trips, which I should have done before it went out.",
      "The fix wasn't clever: hoist every in-loop lookup into a few batched prefetch queries before the loop, then read from in-memory maps inside it. 401 queries collapsed to 5. The same pass batched the outbound side, and a 60-day update went from 60 sequential HTTP calls to 1. The harder problem was that my development environment was never going to surface this on its own.",
    ],
    takeaway:
      "Profile background jobs with production-scale data before shipping. Query count per cycle is part of the definition of done — an N+1 that's invisible at ten records is a ceiling at ten thousand.",
  },
];

export default function WritingPage() {
  return (
    <div className="scanlines relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-12">
        <section className="relative w-full border-b-2 border-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              {/* Head */}
              <div className="mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-primary">[ WRITING ]</span>
                <span>{posts.length} POSTS · POSTMORTEMS &amp; PATTERNS</span>
              </div>
              <h1 className="font-display mb-6 text-5xl text-foreground md:text-7xl">
                LESSONS, WRITTEN DOWN
              </h1>
              <p className="mb-14 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Long-form versions of the incidents on the{" "}
                <Link href="/#system-design" className="text-primary underline-offset-4 hover:underline">
                  front page
                </Link>
                , written up as patterns, with anything proprietary stripped out.
              </p>

              {/* Posts */}
              <div className="space-y-10">
                {posts.map((post, index) => (
                  <article key={post.id} id={post.id} className="border-2 border-foreground bg-card">
                    {/* header bar */}
                    <div className="flex items-stretch border-b-2 border-foreground">
                      <span className="flex items-center bg-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground">
                        POST-{String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="flex items-center px-4 py-2 text-sm font-bold uppercase tracking-[0.05em] text-foreground">
                        {post.title}
                      </h2>
                    </div>

                    {/* tags */}
                    <div className="flex flex-wrap gap-1.5 border-b-2 border-border px-5 py-2.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* body */}
                    <div className="space-y-4 px-5 py-6 md:px-7">
                      {post.body.map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* takeaway */}
                    <div className="border-t-2 border-foreground px-5 py-4 md:px-7">
                      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                        [ TAKEAWAY ]
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-foreground/90">
                        {post.takeaway}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-12 border-2 border-foreground p-5 text-sm text-muted-foreground">
                Questions about any of these?{" "}
                <Link
                  href="mailto:nidhinmohannidhin@gmail.com"
                  className="font-bold text-primary underline-offset-4 hover:underline"
                >
                  Email me
                </Link>{" "}
                — I like talking about failure modes.
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
