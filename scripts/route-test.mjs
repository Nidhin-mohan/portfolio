/**
 * Production route smoke test. Zero dependencies — node:test and global fetch.
 *
 * Boots `next start` against the real build output and walks every route. The
 * asset check is the point: a stale or half-written .next directory serves HTML
 * that references chunks which no longer exist, which surfaces in the browser as
 * "Cannot find module './447.js'" while the server itself still reports 200.
 * Status codes alone will not catch that, so we follow every script the page
 * asks for.
 *
 *   npm run test:routes
 */

import assert from "node:assert/strict";
import { execSync, spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync } from "node:fs";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
const BOOT_TIMEOUT_MS = 90_000;

const ROUTES = [
  {
    path: "/",
    // The href is the only route into /genjutsu — nothing else links to it.
    expect: ["NIDHIN M", "BACKEND FIRST", "WORKLOG.TXT", 'href="/genjutsu"'],
  },
  {
    path: "/writing",
    expect: ["The N+1 Query That Killed a Sync Pipeline"],
  },
  {
    path: "/genjutsu",
    // Server-rendered proof that the WebGL client component mounts without
    // throwing: its copy is only reachable if the component rendered.
    expect: [
      "Tsukuyomi",
      "eye contact",
      "Break the illusion",
      "Experiment 01",
      // The pitch itself: rows render hidden, so they must be in the markup
      // whether or not anyone triggers the illusion.
      "EVIDENCE.LOG",
      "Hire me",
      "BullMQ",
      // The payoff has to land somewhere real.
      'href="/#contact"',
    ],
  },
];

// Markers Next emits when a route falls back to an error or not-found page.
const FAILURE_MARKERS = ["This page could not be found", "Application error:"];

/**
 * Blank out inline script bodies while keeping the tags (and their src=).
 * The App Router serialises the whole RSC tree into `self.__next_f.push(...)`,
 * including the not-found boundary, so every page's raw HTML contains the 404
 * copy. Only rendered markup is meaningful for content assertions.
 */
function renderedMarkup(html) {
  return html.replace(/(<script\b[^>]*>)[\s\S]*?(<\/script>)/gi, "$1$2");
}

/**
 * `next start` spawns a worker. On Windows child.kill() reaps only the parent,
 * leaving the worker alive holding a handle on .next — the next build then
 * half-deletes the directory and every route 500s with "Cannot find module
 * './<n>.js'". Kill the whole tree.
 */
function killTree(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: "ignore" });
      return;
    } catch {
      // fall through to the portable path
    }
  }
  try {
    process.kill(-child.pid, "SIGKILL");
  } catch {
    child.kill("SIGKILL");
  }
}

/**
 * A `next dev` running alongside this test shares .next and will corrupt the
 * production build mid-flight. Fail loudly rather than emitting a confusing
 * pile of MODULE_NOT_FOUND.
 */
function assertNoRivalNextProcess() {
  let out = "";
  try {
    out =
      process.platform === "win32"
        ? execSync(
            'powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name=\'node.exe\'\\" | Select-Object -ExpandProperty CommandLine"',
            { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
          )
        : execSync("ps -eo args", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return; // cannot enumerate processes; not worth failing the run over
  }
  const rivals = out
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /next[\\/]dist[\\/](bin[\\/]next|server[\\/]lib[\\/]start-server)/.test(l))
    .filter((l) => !l.includes("route-test"));

  assert.equal(
    rivals.length,
    0,
    `another Next process is running and shares .next/ with this test:\n  ${rivals.join(
      "\n  "
    )}\nStop it (dev server included) and re-run.`
  );
}

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

async function waitForServer(base, child) {
  const deadline = Date.now() + BOOT_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited early with code ${child.exitCode}`);
    }
    try {
      const res = await fetch(base, { signal: AbortSignal.timeout(4000) });
      if (res.status < 500) return;
    } catch {
      // not listening yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`server did not become ready within ${BOOT_TIMEOUT_MS}ms`);
}

/** Every /_next/ asset the document references, from src= and href= alike. */
function referencedAssets(html) {
  const found = new Set();
  const re = /(?:src|href)="(\/_next\/[^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    found.add(m[1].replace(/&amp;/g, "&"));
  }
  return [...found];
}

describe("production routes", () => {
  let child;
  let base;

  before(async () => {
    assert.ok(
      existsSync(path.join(ROOT, ".next")),
      "no .next directory — run `next build` first (npm run test:routes does this for you)"
    );

    assertNoRivalNextProcess();

    const port = await freePort();
    base = `http://127.0.0.1:${port}`;
    child = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(port)], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
      detached: process.platform !== "win32",
    });
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (d) => process.stderr.write(`[next] ${d}`));

    await waitForServer(base, child);
  });

  after(() => {
    killTree(child);
  });

  for (const route of ROUTES) {
    it(`${route.path} renders and its assets resolve`, async () => {
      const res = await fetch(base + route.path);
      assert.equal(res.status, 200, `${route.path} returned ${res.status}`);

      const html = await res.text();
      const markup = renderedMarkup(html);
      for (const marker of FAILURE_MARKERS) {
        assert.ok(
          !markup.includes(marker),
          `${route.path} rendered an error page (found ${JSON.stringify(marker)})`
        );
      }
      for (const needle of route.expect) {
        assert.ok(
          markup.includes(needle),
          `${route.path} is missing expected content ${JSON.stringify(needle)}`
        );
      }

      const assets = referencedAssets(html);
      assert.ok(assets.length > 0, `${route.path} referenced no /_next/ assets`);

      const broken = [];
      await Promise.all(
        assets.map(async (asset) => {
          const a = await fetch(base + asset, { method: "GET" });
          if (a.status !== 200) broken.push(`${asset} -> ${a.status}`);
        })
      );
      assert.deepEqual(
        broken,
        [],
        `${route.path} references assets that 404 (stale .next?):\n  ${broken.join("\n  ")}`
      );
    });
  }

  it("/opengraph-image returns a PNG", async () => {
    const res = await fetch(base + "/opengraph-image");
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /image\/png/);
  });

  it("unknown routes 404 rather than 500", async () => {
    const res = await fetch(base + "/definitely-not-a-route");
    assert.equal(res.status, 404);
  });
});
