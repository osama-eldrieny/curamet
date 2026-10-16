"use client";
import Link from "./tlink";
import { HeroScene } from "./three/lazy";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";

export function Hero({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <div aria-hidden className="absolute inset-0"><HeroScene /></div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <p className="label">
          {d.hero.kicker}
          <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-orange" />
        </p>
        <h1 className="display mt-6 text-[clamp(2.6rem,8vw,6.2rem)]">
          <span className="block">{d.hero.line1}</span>
          <span className="block text-orange">{d.hero.line2}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg text-muted">{d.hero.sub}</p>
        <Link
          href={`/${lang}/contact`}
          className="mt-9 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.04]"
        >
          {d.hero.cta} →
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex items-end justify-between px-6">
        <span className="label hidden sm:block">{d.hero.footLeft}</span>
        <span className="label mx-auto sm:mx-0">{d.nav.scroll} ↓</span>
        <span className="label hidden sm:block">{d.hero.footRight}</span>
      </div>
    </section>
  );
}
