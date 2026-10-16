"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import type { Dict } from "@/content/en";
import { Reveal } from "./reveal";
import { BlurWords } from "./text-fx";

type A = Dict["about"];
const photos = [1, 2, 3, 4, 5].map((n) => `/team/culture-${n}.webp`);
const ph = (src: string, cls: string, sizes = "(min-width:1024px) 33vw, 100vw") => (
  <div className={`relative overflow-hidden ${cls}`}>
    <Image src={src} alt="Curamet team culture" fill sizes={sizes} className="object-cover transition-transform duration-700 hover:scale-105" />
  </div>
);
const fade = {
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
} as const;

function Quote({ a, dark = false }: { a: A; dark?: boolean }) {
  return (
    <section className={dark ? "bg-night text-white" : ""}>
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <p className={`label ${dark ? "!text-white/50" : ""}`}>— {a.quoteTitle} —</p>
          <blockquote className="mt-6 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">“{a.quote}”</blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Image src="/team/ceo.png" alt={a.quoteBy} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            <div className="text-left">
              <p className="font-bold">{a.quoteBy}</p>
              <p className={`label ${dark ? "!text-white/50" : ""}`}>{a.quoteRole}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 1 — default site: bento photo grid, all photos visible */
export function AboutBento({ a }: { a: A }) {
  const cell = [
    "col-span-2 row-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-1",
    "col-span-1",
  ];
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-24">
        <Reveal className="text-center">
          <p className="label">— {a.label} —</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4.4rem)]"><BlurWords text={a.title} /></h1>
        </Reveal>
        <Reveal className="mt-14 grid gap-5 md:grid-cols-[1fr_1.5fr]">
          <div className="relative min-h-72 overflow-hidden rounded-[28px]">
            <Image src="/team/office.png" alt="Curamet office" fill sizes="40vw" className="object-cover" />
          </div>
          <div className="rounded-[28px] bg-[#f7f6f1] p-8 ring-1 ring-black/5 sm:p-10">
            <p className="text-[17px] leading-relaxed text-muted">{a.story}</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[clamp(1.8rem,4.4vw,3.2rem)]"><BlurWords text={a.cultureTitle} /></h2>
          <p className="mt-5 text-muted">{a.culture}</p>
        </Reveal>
        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] lg:grid-cols-4">
          {photos.map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.08 }} className={`${cell[i]} overflow-hidden rounded-3xl`}>
              {ph(src, "h-full w-full", "(min-width:1024px) 50vw, 100vw")}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <Reveal className="text-center">
          <h2 className="display text-[clamp(1.8rem,4.4vw,3.2rem)]">{a.valuesTitle}</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-[28px] bg-[#f7f6f1] p-8 ring-1 ring-black/5">
                <span className={`tile ${["tile-orange", "", "tile-chalk"][i]} flex h-12 w-12 items-center justify-center font-mono text-xs font-bold ${i === 2 ? "text-ink/70" : "text-white"}`}>0{i + 1}</span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Quote a={a} />
    </>
  );
}

/* 2 — /new: editorial, forest header, staggered tall photo row, ruled values */
export function AboutEditorial({ a }: { a: A }) {
  return (
    <>
      <section className="px-5 pb-24 pt-40 text-white" style={{ background: "#0f2218" }}>
        <div className="mx-auto max-w-[1200px]">
          <p className="label !text-white/55"><span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-orange" />{a.label}</p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[1.04] tracking-[-0.035em]"><BlurWords text={a.title} /></h1>
        </div>
      </section>

      <section className="bg-canvas px-5 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...fade} transition={{ duration: 0.8 }} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src="/team/office.png" alt="Curamet office" fill sizes="40vw" className="object-cover" />
          </motion.div>
          <motion.p {...fade} transition={{ duration: 0.8, delay: 0.1 }} className="self-center text-lg leading-[1.8] text-muted first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-orange">
            {a.story}
          </motion.p>
        </div>
      </section>

      <section className="bg-paper px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 md:grid-cols-2">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]"><BlurWords text={a.cultureTitle} /></h2>
            <p className="text-muted">{a.culture}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((src, i) => (
              <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.1 }} className={i % 2 ? "lg:mt-12" : ""}>
                {ph(src, "aspect-[3/4] rounded-xl", "20vw")}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-canvas px-5 py-24">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.03em]">{a.valuesTitle}</h2>
          <div className="mt-12 border-t border-ink/15">
            {a.values.map((v, i) => (
              <motion.div key={v.title} {...fade} transition={{ duration: 0.6, delay: i * 0.08 }} className="grid items-baseline gap-4 border-b border-ink/15 py-8 md:grid-cols-[80px_1fr_1.4fr]">
                <span className="font-mono text-sm text-orange">0{i + 1}</span>
                <h3 className="text-2xl font-semibold tracking-tight">{v.title}</h3>
                <p className="text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* 3 — v/cubes: wide lead photo + four-up row, split story */
export function AboutCollage({ a }: { a: A }) {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-10 pt-24">
        <Reveal>
          <p className="label">— {a.label} —</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6.5vw,5.4rem)]"><BlurWords text={a.title} /></h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1400px] px-5">
        <motion.div {...fade} transition={{ duration: 0.9 }}>
          {ph(photos[0], "aspect-[21/9] rounded-[28px]", "100vw")}
        </motion.div>
      </section>
      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)] lg:sticky lg:top-28">{a.cultureTitle}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] leading-relaxed text-muted">{a.story}</p>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">{a.culture}</p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1400px] px-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {photos.slice(1).map((src, i) => (
            <motion.div key={src} {...fade} transition={{ duration: 0.7, delay: i * 0.1 }}>
              {ph(src, "aspect-[4/3] rounded-3xl", "25vw")}
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-24">
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-ink/10 md:grid-cols-3">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full bg-paper p-10">
                <p className="text-6xl font-semibold tracking-[-0.05em] text-orange">0{i + 1}</p>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Quote a={a} />
    </>
  );
}

/* 4 — v/mask: hover-expanding photo panels, orange story block */
export function AboutPanels({ a }: { a: A }) {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-24 text-center">
        <Reveal>
          <p className="label">— {a.label} —</p>
          <h1 className="display mx-auto mt-4 max-w-5xl text-[clamp(2.4rem,6.5vw,5.4rem)]"><BlurWords text={a.title} /></h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5">
        <div className="flex h-[420px] gap-3 max-md:h-auto max-md:flex-col">
          {photos.map((src, i) => (
            <motion.div
              key={src}
              {...fade}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              onMouseEnter={() => setOpen(i)}
              className="relative cursor-pointer overflow-hidden rounded-3xl transition-[flex-grow] duration-500 max-md:h-44"
              style={{ flexGrow: open === i ? 4 : 1, flexBasis: 0 }}
            >
              <Image src={src} alt="Curamet team culture" fill sizes="50vw" className="object-cover" />
              <div className={`absolute inset-0 bg-orange/30 transition-opacity duration-500 ${open === i ? "opacity-0" : "opacity-100"}`} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5">
        <Reveal>
          <div className="grid gap-10 rounded-[32px] bg-orange p-10 text-white md:grid-cols-[1fr_1.4fr] md:p-16">
            <h2 className="display text-[clamp(1.8rem,3.6vw,3rem)]">{a.cultureTitle}</h2>
            <div>
              <p className="text-[17px] leading-relaxed text-white/90">{a.story}</p>
              <p className="mt-6 text-[17px] leading-relaxed text-white/80">{a.culture}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {a.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="border-t-2 border-ink pt-6">
                <p className="font-mono text-xs text-orange">0{i + 1}</p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">{v.title}</h3>
                <p className="mt-3 text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Quote a={a} dark />
    </>
  );
}
