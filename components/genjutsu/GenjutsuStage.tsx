"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import CrowFlock from "./CrowFlock";
import { FRAG, VERT } from "./glsl";

// Tsukuyomi's whole conceit: seventy-two hours pass for every second outside.
const RATIO = 72 * 60 * 60;

/**
 * The pitch, paid out in perceived time. `at` is in perceived days — the clock
 * runs at three of them per real second, so the whole record lands in about
 * fifteen seconds of anyone's actual life.
 */
const EVIDENCE = [
  { at: 0, stamp: "0000d", text: "OTA sync cron · 401 DB reads → 5" },
  { at: 3, stamp: "0003d", text: "60-day bulk sync · 60 calls → 1" },
  { at: 9, stamp: "0009d", text: "Billing engine · 8 document types" },
  { at: 18, stamp: "0018d", text: "Report generation → BullMQ queue" },
  { at: 30, stamp: "0030d", text: "3 years MERN · B2B hospitality SaaS" },
  { at: 45, stamp: "0045d", text: "Open to backend-heavy roles · Kochi / remote" },
];

function pad(n: number, w = 2) {
  return String(Math.floor(n)).padStart(w, "0");
}

function formatReal(sec: number) {
  return `${pad(sec / 60)}:${pad(sec % 60)}.${pad((sec % 1) * 1000, 3)}`;
}

function formatPerceived(sec: number) {
  const total = Math.floor(sec * RATIO);
  const days = Math.floor(total / 86400);
  return `${pad(days, 4)}d ${pad((total % 86400) / 3600)}h ${pad(
    (total % 3600) / 60
  )}m ${pad(total % 60)}s`;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

type Uniforms = Record<string, WebGLUniformLocation | null>;

export default function GenjutsuStage() {
  const [caught, setCaught] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [motion, setMotion] = useState(true);
  const [failed, setFailed] = useState(false);
  // How many evidence rows have surfaced. Server-renders as 0; every row is in
  // the DOM either way, so the copy is crawlable and the reveal is pure CSS.
  const [revealed, setRevealed] = useState(0);
  const revealRef = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const realRef = useRef<HTMLSpanElement>(null);
  const perceivedRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const breakRef = useRef<HTMLButtonElement>(null);

  // Animation lives entirely in refs — React never re-renders per frame.
  const sim = useRef({
    charge: 0,
    phase: 0,
    flash: 0,
    holding: false,
    caught: false,
    castAt: 0,
    mx: 0,
    my: 0,
    motion: 1,
  });

  const cast = useCallback(() => {
    if (sim.current.caught) return;
    sim.current.caught = true;
    sim.current.charge = 1;
    sim.current.flash = 1;
    sim.current.castAt = performance.now();
    sim.current.holding = false;
    revealRef.current = 0;
    setRevealed(0);
    setCaught(true);
    setBurstKey((k) => k + 1);
  }, []);

  const release = useCallback(() => {
    if (!sim.current.caught) return;
    sim.current.caught = false;
    sim.current.flash = 1;
    sim.current.holding = false;
    setCaught(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setMotion(!mq.matches);
      sim.current.motion = mq.matches ? 0 : 1;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") release();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [release]);

  // Keep the keyboard where the action is: the only live control swaps each phase.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const target = caught ? breakRef.current : triggerRef.current;
    target?.focus({ preventScroll: true });
  }, [caught]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u: Uniforms = {};
    for (const name of ["uRes", "uTime", "uPhase", "uCharge", "uFlash", "uMotion", "uMouse"]) {
      u[name] = gl.getUniformLocation(prog, name);
    }

    let dpr = 1;
    const resize = () => {
      // 36 SDF samples per pixel — 1.5x is plenty sharp and keeps integrated GPUs honest.
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      sim.current.mx = (e.clientX / window.innerWidth) * 2 - 1;
      sim.current.my = 1 - (e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const onLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    let raf = 0;
    let last = performance.now();
    const t0 = last;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const s = sim.current;

      const holdSeconds = s.motion ? 1.7 : 0.3;
      if (!s.caught) {
        s.charge += (s.holding ? dt / holdSeconds : -dt / 0.45);
        s.charge = Math.max(0, Math.min(1, s.charge));
        if (s.charge >= 1) cast();
      }
      s.phase += ((s.caught ? 1 : 0) - s.phase) * Math.min(dt * 3.2, 1);
      s.flash = Math.max(0, s.flash - dt / 0.4);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${s.charge})`;
      }
      if (s.caught) {
        const elapsed = (now - s.castAt) / 1000;
        if (realRef.current && perceivedRef.current) {
          realRef.current.textContent = formatReal(elapsed);
          perceivedRef.current.textContent = formatPerceived(elapsed);
        }
        // Nothing animates under reduced motion, so hand over the whole record
        // at once rather than making it wait on a clock it cannot see move.
        // Thresholds ascend, so walk the pointer forward — this runs every
        // frame and must not allocate.
        const days = elapsed * (RATIO / 86400);
        let n = revealRef.current;
        if (!s.motion) {
          n = EVIDENCE.length;
        } else {
          while (n < EVIDENCE.length && EVIDENCE[n].at <= days) n++;
        }
        if (n !== revealRef.current) {
          revealRef.current = n;
          setRevealed(n);
        }
      }

      resize();
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform1f(u.uTime, (now - t0) / 1000);
      gl.uniform1f(u.uPhase, s.phase);
      gl.uniform1f(u.uCharge, s.charge);
      gl.uniform1f(u.uFlash, s.flash);
      gl.uniform1f(u.uMotion, s.motion);
      gl.uniform2f(u.uMouse, s.mx, s.my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [cast]);

  const hold = () => {
    sim.current.holding = true;
  };
  const unhold = () => {
    sim.current.holding = false;
  };

  return (
    <main
      className="relative h-[100svh] w-full overflow-hidden bg-black text-[#ded5c9] select-none"
      style={{ ["--gj" as string]: "#d6162a" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <CrowFlock active={caught} burstKey={burstKey} motion={motion} />

      {failed && (
        <p className="absolute left-1/2 top-1/2 z-30 w-[min(90vw,32rem)] -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--gj)] bg-black p-6 text-center text-xs leading-relaxed">
          This page renders with WebGL, and this browser will not give it a context.
          Nothing to see here — the rest of the site works fine.
        </p>
      )}

      {/* chrome */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 text-[10px] uppercase tracking-[0.22em] md:p-8">
        <Link
          href="/"
          className="pointer-events-auto border-b border-transparent transition-colors hover:border-current hover:text-[var(--gj)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gj)]"
        >
          ← Back to the portfolio
        </Link>
        <span className="text-right text-[var(--gj)]">
          Experiment 01
          <br />
          <span className="text-[#ded5c9]/45">Tsukuyomi</span>
        </span>
      </header>

      {/* ---------- dormant ---------- */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-5 pb-10 text-center transition-all duration-700 md:pb-14 ${
          caught ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      >
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--gj)]">
          Hiring? This takes one second
        </p>

        <h1 className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.9]">
          Don&apos;t make
          <br />
          eye contact
        </h1>

        <p className="mt-5 max-w-[30rem] text-xs leading-relaxed text-[#ded5c9]/55">
          A CV gets about six seconds of attention. Give me one of them and
          I&apos;ll give you back seventy-two hours.
        </p>

        <button
          ref={triggerRef}
          type="button"
          disabled={caught}
          onPointerDown={hold}
          onPointerUp={unhold}
          onPointerLeave={unhold}
          onPointerCancel={unhold}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              hold();
            }
          }}
          onKeyUp={unhold}
          onBlur={unhold}
          className="group mt-7 w-[min(88vw,22rem)] border-2 border-[#ded5c9] bg-transparent px-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:border-[var(--gj)] hover:text-[var(--gj)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gj)]"
        >
          {motion ? "Hold to make eye contact" : "Press to make eye contact"}
          <span className="mt-3 block h-[3px] w-full bg-[#ded5c9]/15">
            <span
              ref={barRef}
              className="block h-full origin-left bg-[var(--gj)]"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </button>

        <p className="mt-5 max-w-[26rem] text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#ded5c9]/40">
          One red pulse on entry · Escape breaks the illusion
        </p>
      </div>

      {/* ---------- inside the illusion ---------- */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 px-5 pb-10 transition-all delay-300 duration-700 md:px-8 md:pb-12 ${
          caught ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,8.5vw,6.5rem)] leading-[0.86] text-[#ded5c9]">
              Seventy-two
              <br />
              <span className="text-[var(--gj)]">hours</span>
            </h2>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-[#ded5c9]/55">
              That is what one second costs in here. Your second, my three years
              — the record on the right is what I did with mine, and it is
              writing itself as you stand there. Time dilation is just a very
              large multiplier; not overflowing the counter is the hard part.
            </p>
          </div>

          <div className="w-full shrink-0 border-2 border-[var(--gj)] bg-black/45 backdrop-blur-[2px] lg:w-[27rem]">
            <div className="flex items-center justify-between border-b-2 border-[var(--gj)] bg-[var(--gj)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
              <span>EVIDENCE.LOG</span>
              <span>259,200 ×</span>
            </div>
            <dl className="divide-y divide-[var(--gj)]/25 text-[11px]">
              <div className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                <dt className="uppercase tracking-[0.18em] text-[#ded5c9]/45">Elapsed</dt>
                <dd className="tabular-nums">
                  <span ref={realRef}>00:00.000</span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-3 py-2.5">
                <dt className="uppercase tracking-[0.18em] text-[#ded5c9]/45">Perceived</dt>
                <dd className="tabular-nums text-[var(--gj)]">
                  <span ref={perceivedRef}>0000d 00h 00m 00s</span>
                </dd>
              </div>
            </dl>

            <ul className="border-t-2 border-[var(--gj)]/30">
              {EVIDENCE.map((row, i) => (
                <li
                  key={row.stamp}
                  className={`flex items-baseline gap-3 px-3 py-1.5 text-[11px] transition-all duration-500 ${
                    i < revealed ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  <span className="shrink-0 tabular-nums text-[var(--gj)]/70">{row.stamp}</span>
                  <span className="text-[#ded5c9]/85">{row.text}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 border-t-2 border-[var(--gj)]">
              <Link
                href="/#contact"
                tabIndex={caught ? 0 : -1}
                aria-hidden={!caught}
                className="flex items-center justify-center bg-[var(--gj)] px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-[#ded5c9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ded5c9]"
              >
                Hire me ↗
              </Link>
              <button
                ref={breakRef}
                type="button"
                disabled={!caught}
                onClick={release}
                className="flex items-center justify-center border-l-2 border-[var(--gj)] px-3 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#ded5c9] transition-colors hover:bg-[#ded5c9]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ded5c9]"
              >
                Break the illusion · Esc
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
