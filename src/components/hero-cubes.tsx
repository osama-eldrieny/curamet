"use client";
import { useEffect, useRef } from "react";
import Link from "./tlink";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";
import { TypewriterHeadline } from "./text-fx";

type Ripple = { i: number; j: number; t0: number; s: number };

const TOP = [251, 250, 246];
const LEFT = [232, 230, 221];
const RIGHT = [215, 212, 201];
const GLOW = [224, 98, 42];
const mix = (a: number[], b: number[], k: number) =>
  `rgb(${(a[0] + (b[0] - a[0]) * k) | 0},${(a[1] + (b[1] - a[1]) * k) | 0},${(a[2] + (b[2] - a[2]) * k) | 0})`;

/** Isometric cube field that ripples under the cursor (canvas 2D). */
export function CubesCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    const w = 112; // tile width in px
    const ripples: Ripple[] = [];
    let last = 0, lastMove = performance.now(), lx = 0, ly = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const toGrid = (x: number, y: number) => {
      const a = (x - W / 2) * 2 / w, b = (y - H / 2) * 4 / w;
      return { i: (a + b) / 2, j: (b - a) / 2 };
    };
    const drop = (x: number, y: number, s = 1) => {
      const g = toGrid(x, y);
      ripples.push({ ...g, t0: performance.now() / 1000, s });
      if (ripples.length > 4) ripples.shift();
    };
    const move = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (y < 0 || y > H) return;
      lastMove = performance.now();
      if (Math.hypot(x - lx, y - ly) > 160 && lastMove - last > 450) {
        drop(x, y, 0.4);
        last = lastMove; lx = x; ly = y;
      }
    };
    addEventListener("pointermove", move);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = (ms: number) => {
      const t = ms / 1000;
      if (!reduce && ms - lastMove > 4000 && ms - last > 6000) {
        drop(Math.random() * W, Math.random() * H, 0.5);
        last = ms;
      }
      for (let k = ripples.length - 1; k >= 0; k--) if (t - ripples[k].t0 > 6) ripples.splice(k, 1);

      ctx.clearRect(0, 0, W, H);
      const n = Math.ceil(Math.max(W, H) / w) * 2 + 6;
      const sideH = w * 0.62;
      const hw = w / 2, qh = w / 4, g = 0.975;
      for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
          const sx = W / 2 + (i - j) * hw;
          const sy0 = H / 2 + (i + j) * qh;
          if (sx < -w || sx > W + w || sy0 < -w || sy0 > H + w * 1.4) continue;
          let z = 0;
          for (const r of ripples) {
            const age = t - r.t0;
            const d = Math.hypot(i - r.i, j - r.j);
            const f = age * 3.2;
            z += r.s * Math.exp(-((d - f) ** 2) / 3.2) * Math.exp(-age * 0.7);
          }
          const lift = z * 0.4 * w;
          const gl = Math.min(1, z * 0.9);
          const sy = sy0 - lift;
          const a = hw * g, b = qh * g;
          ctx.fillStyle = mix(LEFT, GLOW, gl * 0.35);
          ctx.beginPath();
          ctx.moveTo(sx - a, sy); ctx.lineTo(sx, sy + b); ctx.lineTo(sx, sy + b + sideH); ctx.lineTo(sx - a, sy + sideH); ctx.fill();
          ctx.fillStyle = mix(RIGHT, GLOW, gl * 0.45);
          ctx.beginPath();
          ctx.moveTo(sx + a, sy); ctx.lineTo(sx, sy + b); ctx.lineTo(sx, sy + b + sideH); ctx.lineTo(sx + a, sy + sideH); ctx.fill();
          ctx.fillStyle = mix(TOP, GLOW, gl * 0.6);
          ctx.beginPath();
          ctx.moveTo(sx, sy - b); ctx.lineTo(sx + a, sy); ctx.lineTo(sx, sy + b); ctx.lineTo(sx - a, sy); ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

export function HeroCubes({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-canvas">
      <CubesCanvas />
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center">
        <div className="absolute -inset-x-10 -inset-y-12 -z-10 [background:radial-gradient(ellipse_at_center,rgba(244,243,238,0.94)_30%,rgba(244,243,238,0)_70%)]" />
        <p className="label">{d.hero.kicker}</p>
        <h1 className="display mt-6 text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.02]">
          <TypewriterHeadline
            lines={[
              ...d.hero.line1.split(/(?<=\.)\s+/).map((text) => ({ text })),
              { text: d.hero.line2, className: "text-orange" },
            ]}
          />
        </h1>
        <Link
          href={`/${lang}/contact`}
          className="pointer-events-auto mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.04]"
        >
          {d.hero.cta} →
        </Link>
      </div>
    </section>
  );
}
