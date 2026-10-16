"use client";
import Image from "next/image";
import Link from "./tlink";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Heart, Sprout, Users } from "lucide-react";
import { JOBS_URL, type Career } from "@/content/career";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { BlurWords, TypewriterHeadline } from "./text-fx";
import { CubesCanvas } from "./hero-cubes";
import { useMaskReveal } from "./use-mask";
import { DotTexture, dotsStyle } from "./dot-texture";

const photos = [1, 2, 3, 4, 5].map((n) => `/team/culture-${n}.webp`);
const icons = [Users, Sprout, Heart];
const fade = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
} as const;

const Photo = ({ src, className = "", sizes = "40vw" }: { src: string; className?: string; sizes?: string }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <Image src={src} alt="Curamet team" fill sizes={sizes} className="object-cover transition-transform duration-700 hover:scale-105" />
  </div>
);

function OfficeBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[16/9] overflow-hidden sm:aspect-[21/9] ${className}`}>
      <Image src="/team/street.jpg" alt="Curamet office in Malmö" fill sizes="100vw" className="object-cover [object-position:35%_62%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <p className="label absolute bottom-4 left-5 !text-white/90">Malmö · Admiralsgatan 4</p>
    </div>
  );
}

function JobsButton({ c, tone = "dark" }: { c: Career; tone?: "dark" | "orange" | "light" }) {
  const cls = {
    dark: "bg-ink text-white hover:bg-black",
    orange: "bg-orange text-white hover:bg-orange-deep",
    light: "bg-white text-ink hover:bg-white/90",
  }[tone];
  return (
    <a href={JOBS_URL} target="_blank" rel="noreferrer" className={`group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-200 ${cls}`}>
      {c.cta} <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function Referral({ c, dark }: { c: Career; dark?: boolean }) {
  return (
    <Reveal className="text-center">
      <h3 className="display text-[clamp(1.6rem,3.4vw,2.6rem)]">{c.referralTitle}</h3>
      <p className={`mx-auto mt-3 max-w-md ${dark ? "text-white/65" : "text-muted"}`}>{c.referral}</p>
    </Reveal>
  );
}

/* 1 — default site: centred hero, stat cards, bento photos, value cards, orange CTA */
export function CareerBento({ c, lang }: { c: Career; lang: Locale }) {
  const cell = ["col-span-2 row-span-2", "", "", "", ""];
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 pb-12 pt-24 text-center">
        <Reveal>
          <p className="label">— {c.label} —</p>
          <h1 className="display mx-auto mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,5.2rem)]"><BlurWords text={c.title} /></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{c.intro[0]}</p>
          <div className="mt-8"><JobsButton c={c} /></div>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {c.facts.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08}>
              <div className="rounded-[28px] bg-[#f7f6f1] p-8 ring-1 ring-black/5">
                <p className="text-5xl font-extrabold tracking-[-0.04em] text-orange">{f.n}</p>
                <p className="label mt-2">{f.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pt-4">
        <Reveal><OfficeBanner className="rounded-[28px]" /></Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {photos.map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.08 }} className={`${cell[i]} overflow-hidden rounded-3xl`}>
              <Photo src={src} className="h-full w-full" sizes="50vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-2">
        <Reveal>
          <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{c.cultureTitle}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.industries.map((x) => (
              <span key={x} className="rounded-full bg-[#f7f6f1] px-4 py-1.5 text-sm font-medium ring-1 ring-black/5">{x}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          {[...c.intro.slice(1), ...c.culture].map((p) => (
            <p key={p} className="mb-5 text-[17px] leading-relaxed text-muted">{p}</p>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <Reveal className="text-center"><h2 className="display text-[clamp(1.8rem,4vw,3rem)]">{c.valuesTitle}</h2></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {c.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-[28px] bg-[#f7f6f1] p-8 ring-1 ring-black/5 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(17,17,17,0.3)]">
                  <span className="tile tile-orange flex h-12 w-12 items-center justify-center text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon size={22} /></span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pb-28 pt-8">
        <Reveal>
          <div className="rounded-[32px] bg-orange px-8 py-16 text-center text-white">
            <Referral c={c} dark />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <JobsButton c={c} tone="light" />
              <Link href={`/${lang}/contact`} className="inline-flex cursor-pointer items-center rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10">{c.contact}</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* 2 — /new: editorial, forest hero with facts row, two-up photos, ruled columns */
export function CareerEditorial({ c, lang }: { c: Career; lang: Locale }) {
  return (
    <>
      <section className="relative px-5 pb-0 pt-40 text-white" style={{ background: "#0f2218" }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="label !text-white/55"><span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-orange" />{c.label}</p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.04] tracking-[-0.035em]"><BlurWords text={c.title} /></h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{c.intro[0]}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={JOBS_URL} target="_blank" rel="noreferrer" className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-deep">{c.cta} <ArrowUpRight size={16} /></a>
            <Link href={`/${lang}/contact`} className="inline-flex cursor-pointer items-center rounded-md border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10">{c.contact}</Link>
          </div>
          <div className="mt-24 grid grid-cols-3 border-t border-white/10">
            {c.facts.map((f) => (
              <div key={f.t} className="border-white/10 py-6 pr-4 first:border-l-0 sm:pl-6 [&:not(:first-child)]:border-l">
                <p className="text-3xl font-semibold tracking-tight sm:text-5xl">{f.n}</p>
                <p className="label mt-2 !text-white/50">{f.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas px-5 pt-20">
        <motion.div {...fade} transition={{ duration: 0.9 }} className="mx-auto max-w-[1200px]">
          <OfficeBanner className="rounded-2xl" />
        </motion.div>
      </section>

      <section className="bg-canvas px-5 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2">
          {photos.slice(0, 2).map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.8, delay: i * 0.12 }} className={i ? "sm:mt-16" : ""}>
              <Photo src={src} className="aspect-[4/3] rounded-2xl" />
            </motion.div>
          ))}
        </div>
        <div className="mx-auto mt-20 grid max-w-[1200px] gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]"><BlurWords text={c.cultureTitle} /></h2>
          <div className="space-y-5 text-[17px] leading-[1.8] text-muted">
            {[...c.intro.slice(1), ...c.culture].map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-3 gap-4 sm:grid-cols-3">
          {photos.slice(2).map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <Photo src={src} className="aspect-[3/4] rounded-xl" sizes="30vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-paper px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.03em]">{c.valuesTitle}</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {c.values.map((v, i) => (
              <motion.div key={v.title} {...fade} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t-2 pt-6" style={{ borderColor: i === 1 ? "#2f7d3b" : "#e0622a" }}>
                <p className="font-mono text-xs text-orange">0{i + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 text-center text-white" style={{ background: "#0f2218" }}>
        <Referral c={c} dark />
        <div className="mt-8"><JobsButton c={c} tone="orange" /></div>
      </section>
    </>
  );
}

/* 3 — v/cubes: cube-field hero, zig-zag photo/text rows, icon values */
export function CareerZigzag({ c, lang }: { c: Career; lang: Locale }) {
  const rows = [
    { src: "/team/street.jpg", text: c.intro.slice(0, 2), title: c.join },
    { src: photos[2], text: c.intro.slice(2).concat(c.culture[0]), title: c.cultureTitle },
  ];
  return (
    <>
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-canvas">
        <CubesCanvas />
        <div className="pointer-events-none relative z-10 mx-auto max-w-4xl px-5 text-center">
          <div className="absolute -inset-x-10 -inset-y-10 -z-10 [background:radial-gradient(ellipse_at_center,rgba(244,243,238,0.95)_30%,rgba(244,243,238,0)_70%)]" />
          <p className="label">{c.label}</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,6.4vw,5rem)]">
            <TypewriterHeadline lines={[{ text: c.title }]} />
          </h1>
          <div className="pointer-events-auto mt-8"><JobsButton c={c} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] space-y-24 px-5 py-24">
        {rows.map((r, i) => (
          <div key={r.title} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <motion.div {...fade} transition={{ duration: 0.8 }}>
              <Photo src={r.src} className="aspect-[4/3] rounded-[28px]" sizes="50vw" />
            </motion.div>
            <Reveal delay={0.1}>
              <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)]">{r.title}</h2>
              {r.text.map((p) => <p key={p} className="mt-5 text-[17px] leading-relaxed text-muted">{p}</p>)}
            </Reveal>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {[photos[1], photos[3], photos[4]].map((src, i) => (
            <motion.div key={src} {...fade} transition={{ delay: i * 0.1, duration: 0.7 }} className={i === 2 ? "col-span-2 lg:col-span-1" : ""}>
              <Photo src={src} className="aspect-[4/3] rounded-3xl" sizes="33vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24">
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-ink/10 md:grid-cols-3">
          {c.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full bg-paper p-10">
                  <Icon size={30} className="text-orange" />
                  <h3 className="mt-6 text-xl font-extrabold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-night px-5 py-24 text-white">
        <Referral c={c} dark />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <JobsButton c={c} tone="orange" />
          <Link href={`/${lang}/contact`} className="inline-flex cursor-pointer items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold hover:bg-white/10">{c.contact}</Link>
        </div>
      </section>
    </>
  );
}

/* 4 — v/mask: cursor-mask headline, staircase photos, big-number values */
export function CareerMask({ c, lang }: { c: Career; lang: Locale }) {
  const m = useMaskReveal();
  const big = "display max-w-5xl px-5 text-center text-[clamp(2.2rem,5.4vw,4.4rem)]";
  return (
    <>
      <section className="relative bg-canvas">
        <div
          ref={m.box}
          onPointerMove={m.onPointerMove}
          onPointerLeave={m.onPointerLeave}
          className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
        >
          <DotTexture />
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-orange text-white" style={m.layerStyle}>
            <div aria-hidden className="pointer-events-none absolute inset-0" style={dotsStyle("rgba(255,255,255,0.28)", 14)} />
            <p className={`${big} relative`}>{c.join}. {c.intro[1]}</p>
          </div>
          <div ref={m.text} className="relative flex flex-col items-center">
            <p className="label">{c.label}</p>
            <h1 className={`${big} mt-6`}>{c.title}</h1>
            <div className="mt-8"><JobsButton c={c} /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pt-4">
        <Reveal><OfficeBanner className="rounded-[28px]" /></Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20">
        <div className="flex items-end gap-3">
          {photos.map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.1 }} className="w-1/5" style={{ height: [180, 260, 360, 260, 180][i] }}>
              <Photo src={src} className="h-full w-full rounded-3xl" sizes="20vw" />
            </motion.div>
          ))}
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal><h2 className="display text-[clamp(1.8rem,3.6vw,3rem)]">{c.cultureTitle}</h2></Reveal>
          <Reveal delay={0.1}>
            {[...c.intro, ...c.culture].map((p) => <p key={p} className="mb-5 text-[17px] leading-relaxed text-muted">{p}</p>)}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {c.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="border-t-2 border-ink pt-6">
                <p className="text-7xl font-extrabold tracking-[-0.05em] text-orange">0{i + 1}</p>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight">{v.title}</h3>
                <p className="mt-3 text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-night px-5 py-24 text-white">
        <Referral c={c} dark />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <JobsButton c={c} tone="orange" />
          <Link href={`/${lang}/contact`} className="inline-flex cursor-pointer items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold hover:bg-white/10">{c.contact}</Link>
        </div>
      </section>
    </>
  );
}
