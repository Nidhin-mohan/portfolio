"use client";

import { useEffect, useRef } from "react";

type Crow = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  flap: number;
  flapRate: number;
  life: number;
};

type Feather = {
  x: number;
  y: number;
  vy: number;
  sway: number;
  swayRate: number;
  size: number;
  rot: number;
  spin: number;
  life: number;
};

const CROWS = 40;
const FEATHERS = 26;

// A bird in flight: two swept wings meeting at the body, wings driven by `w`.
function drawCrow(ctx: CanvasRenderingContext2D, c: Crow) {
  const w = Math.sin(c.flap);
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(Math.atan2(c.vy, c.vx) + Math.PI / 2);
  ctx.scale(c.size, c.size);
  ctx.beginPath();
  ctx.moveTo(0, -0.25);
  ctx.quadraticCurveTo(-0.55, -0.75 * w - 0.15, -1.25, -0.3 * w + 0.1);
  ctx.quadraticCurveTo(-0.6, 0.1, 0, 0.34);
  ctx.quadraticCurveTo(0.6, 0.1, 1.25, -0.3 * w + 0.1);
  ctx.quadraticCurveTo(0.55, -0.75 * w - 0.15, 0, -0.25);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawFeather(ctx: CanvasRenderingContext2D, f: Feather) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rot);
  ctx.scale(f.size, f.size);
  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.quadraticCurveTo(0.42, -0.1, 0, 1);
  ctx.quadraticCurveTo(-0.42, -0.1, 0, -1);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function CrowFlock({
  active,
  burstKey,
  motion,
}: {
  active: boolean;
  burstKey: number;
  motion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crows = useRef<Crow[]>([]);
  const feathers = useRef<Feather[]>([]);
  const activeRef = useRef(active);
  const opacity = useRef(0);

  activeRef.current = active;

  // A burst throws the whole murder outward from the centre of the screen.
  useEffect(() => {
    if (burstKey === 0) return;
    const el = canvasRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    crows.current = Array.from({ length: CROWS }, () => {
      const a = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 13;
      return {
        // Nothing moves under reduced motion, so lay the murder out across the
        // frame rather than bursting it from a point it would never leave.
        x: motion ? w / 2 + Math.cos(a) * 12 : Math.random() * w,
        y: motion ? h / 2 + Math.sin(a) * 12 : Math.random() * h * 0.75,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed * 0.7,
        size: 6 + Math.random() * 20,
        flap: Math.random() * Math.PI * 2,
        flapRate: 0.18 + Math.random() * 0.22,
        life: 1,
      };
    });
    feathers.current = [];
  }, [burstKey, motion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnFeather = (w: number, h: number): Feather => ({
      x: Math.random() * w,
      // Same reasoning as the crows: unanimated feathers must start in frame.
      y: motion ? -20 - Math.random() * h * 0.4 : Math.random() * h,
      vy: 0.25 + Math.random() * 0.7,
      sway: Math.random() * Math.PI * 2,
      swayRate: 0.008 + Math.random() * 0.02,
      size: 5 + Math.random() * 11,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.01,
      life: 1,
    });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      opacity.current += ((activeRef.current ? 1 : 0) - opacity.current) * 0.05;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (opacity.current < 0.01) return;

      if (activeRef.current && feathers.current.length < FEATHERS) {
        feathers.current.push(spawnFeather(w, h));
      }

      ctx.globalAlpha = opacity.current * 0.55;
      ctx.fillStyle = "#05070a";
      for (const f of feathers.current) {
        if (motion) {
          f.sway += f.swayRate;
          f.y += f.vy;
          f.x += Math.sin(f.sway) * 0.8;
          f.rot += f.spin + Math.sin(f.sway) * 0.004;
        }
        if (f.y > h + 30) {
          Object.assign(f, spawnFeather(w, h), { y: -20 });
        }
        drawFeather(ctx, f);
      }

      ctx.globalAlpha = opacity.current * 0.92;
      ctx.fillStyle = "#030406";
      for (const c of crows.current) {
        if (motion) {
          // Burst velocity bleeds off into a steady cruise.
          c.vx += (Math.sign(c.vx) * 1.6 - c.vx) * 0.012;
          c.vy += (Math.sign(c.vy) * 0.5 - c.vy) * 0.012;
          c.x += c.vx;
          c.y += c.vy;
          c.flap += c.flapRate;
        }
        const m = c.size * 2;
        if (c.x < -m) c.x = w + m;
        if (c.x > w + m) c.x = -m;
        if (c.y < -m) c.y = h + m;
        if (c.y > h + m) c.y = -m;
        drawCrow(ctx, c);
      }
      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [motion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
