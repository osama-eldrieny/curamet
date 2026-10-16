"use client";
import Link from "./tlink";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";
import { useMaskReveal } from "./use-mask";
import { dotsStyle } from "./dot-texture";

/** Cursor-following SVG mask reveals a bolder message underneath. */
export function HeroMask({ lang, d }: { lang: Locale; d: Dict }) {
  const m = useMaskReveal();
  const big = "display text-[clamp(2.2rem,5.6vw,4.6rem)] max-w-5xl px-5 text-center";

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-canvas">
      <div
        ref={m.box}
        onPointerMove={m.onPointerMove}
        onPointerLeave={m.onPointerLeave}
        className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
      >
        {/* dotted texture: light grey dots that turn orange (same grid, no doubling) around the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            ...dotsStyle("rgba(17,17,17,0.09)", 11),
            maskImage: `radial-gradient(circle 220px at ${m.pos.x}px ${m.pos.y}px, transparent 30%, black 100%), radial-gradient(ellipse at center, black 30%, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(circle 220px at ${m.pos.x}px ${m.pos.y}px, transparent 30%, black 100%), radial-gradient(ellipse at center, black 30%, transparent 75%)`,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            ...dotsStyle("rgba(224,98,42,0.75)", 11),
            maskImage: `radial-gradient(circle 220px at ${m.pos.x}px ${m.pos.y}px, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 220px at ${m.pos.x}px ${m.pos.y}px, black 30%, transparent 100%)`,
          }}
        />

        {/* revealed layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-orange text-white" style={m.layerStyle}>
          <div aria-hidden className="pointer-events-none absolute inset-0" style={dotsStyle("rgba(255,255,255,0.28)", 14)} />
          <p className={`${big} relative`}>{d.hero.sub}</p>
        </div>

        {/* base layer */}
        <div ref={m.text} className="relative flex flex-col items-center">
          <p className="label">{d.hero.kicker}</p>
          <h1 className={`${big} mt-6 text-ink`}>
            {d.hero.line1} <span className="text-orange">{d.hero.line2}</span>
          </h1>
          <p className="label mt-8">{d.nav.scroll} ↓</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-12 flex justify-center">
        <Link
          href={`/${lang}/contact`}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.04]"
        >
          {d.hero.cta} →
        </Link>
      </div>
    </section>
  );
}
