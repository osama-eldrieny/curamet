"use client";
import Image from "next/image";
import Link from "./tlink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { FeatureArt } from "./feature-art";
import { AboutEditorial } from "./about-layouts";
import { GasellBadge } from "./gasell-badge";
import { CareerEditorial } from "./career-layouts";
import { getCareer } from "@/content/career";
import { BlurWords } from "./text-fx";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";

export const COPY = {
  en: {
    nav: ["Services", "Career", "About"],
    year: "Since 2016",
    h1a: "Faster delivery,",
    h1b: "fewer errors.",
    tag: "We help businesses build applications faster, run them smoother and cut cloud costs.",
    cta: "Our services",
    chips: { uptime: "99.9% uptime", note: "Malmö · Sweden", cost: "−25% cloud cost" },
    band: ["DEVOPS", "CLOUD", "AI", "AUTOMATION", "CONSULTING", "DELIVERY"],
    s1a: "Reliable engineering.",
    s1b: "Measurable",
    s1c: "results.",
    pathLabel: "How we work",
    pathTitle: "A clear path from idea to production.",
    more: "Learn more",
    statsLabel: "Proof, not promises",
    stats: [
      { n: 99.9, s: "%", t: "uptime on the apps we ship" },
      { n: 30, s: "%", t: "lower maintenance cost" },
      { n: 25, s: "%", t: "lower cloud spend" },
      { n: 2, s: " wks", t: "to a senior engineer on site" },
    ],
    quote: "Success takes time, patience and perseverance.",
    by: "Naser Khalil · Founder & CEO",
    closeA: "Let's build",
    closeB: "smarter solutions",
    closeC: "together.",
    contact: "Get in touch",
    rights: "© 2025 Curamet. All rights reserved.",
  },
  sv: {
    nav: ["Tjänster", "Karriär", "Om oss"],
    year: "Sedan 2016",
    h1a: "Snabbare leverans,",
    h1b: "färre fel.",
    tag: "Vi hjälper företag att bygga applikationer snabbare, driva dem smidigare och sänka molnkostnaderna.",
    cta: "Våra tjänster",
    chips: { uptime: "99,9 % drifttid", note: "Malmö · Sverige", cost: "−25 % molnkostnad" },
    band: ["DEVOPS", "MOLN", "AI", "AUTOMATION", "RÅDGIVNING", "LEVERANS"],
    s1a: "Pålitlig teknik.",
    s1b: "Mätbara",
    s1c: "resultat.",
    pathLabel: "Så arbetar vi",
    pathTitle: "En tydlig väg från idé till produktion.",
    more: "Läs mer",
    statsLabel: "Bevis, inte löften",
    stats: [
      { n: 99.9, s: "%", t: "drifttid på appar vi levererar" },
      { n: 30, s: "%", t: "lägre underhållskostnad" },
      { n: 25, s: "%", t: "lägre molnkostnad" },
      { n: 2, s: " v.", t: "till senior ingenjör på plats" },
    ],
    quote: "Framgång tar tid, tålamod och uthållighet.",
    by: "Naser Khalil · Grundare & VD",
    closeA: "Låt oss bygga",
    closeB: "smartare lösningar",
    closeC: "tillsammans.",
    contact: "Kontakta oss",
    rights: "© 2025 Curamet. Alla rättigheter förbehållna.",
  },
} as const;

const CARD_COLORS = ["#e0622a", "#2f7d3b", "#2f7d3b", "#e0622a"];
const FOREST = "#0f2218";

/* ---------- floating pill nav ---------- */
export function PillNav({ lang, t }: { lang: Locale; t: (typeof COPY)[Locale] }) {
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 60));
  const other: Locale = lang === "en" ? "sv" : "en";
  const path = usePathname();
  const switchHref = path.replace(/^\/(en|sv)/, `/${other}`);
  const links = [`/${lang}/theme-3#work`, `/${lang}/theme-3/career`, `/${lang}/theme-3/about`];
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed left-1/2 z-50 flex -translate-x-1/2 origin-top items-center gap-1 rounded-2xl bg-white/90 p-1.5 backdrop-blur-md transition-all duration-500 ease-out ${stuck ? "top-4 scale-100 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]" : "top-7 scale-[1.22] shadow-[0_8px_30px_-10px_rgba(0,0,0,0.25)]"}`}
    >
      <Link href={`/${lang}/theme-3`} className="flex items-center rounded-full px-3 py-1" aria-label="Curamet">
        <Image src="/brand/curamet-logo.png" alt="Curamet" width={78} height={29} priority />
      </Link>
      <div className="hidden items-center sm:flex">
        {t.nav.map((n, i) => (
          <Link key={n} href={links[i]} className="cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-black/5 hover:text-ink">
            {n}
          </Link>
        ))}
      </div>
      <Link href={switchHref} className="cursor-pointer rounded-full px-3 py-1.5 text-xl leading-none transition-transform hover:scale-110" aria-label={other === "sv" ? "Svenska" : "English"} title={other === "sv" ? "Svenska" : "English"}>
        {other === "sv" ? "🇸🇪" : "🇬🇧"}
      </Link>
      <Link href={`/${lang}/contact`} className="group flex cursor-pointer items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]">
        {t.contact}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.nav>
  );
}

/* ---------- hero ---------- */
function Hero({ t, lang }: { t: (typeof COPY)[Locale]; lang: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const line = (s: string, delay: number, cls = "") => (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className={`block ${cls}`}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {s}
      </motion.span>
    </span>
  );
  const facts = [t.chips.uptime, t.chips.cost, t.chips.note];
  return (
    <section ref={ref} className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-32 pt-36 text-white" style={{ background: FOREST }}>
      {/* abstract geometry built from the logo's leaf curve: overlapping lens outlines that slowly turn */}
      <motion.svg
        style={{ y: drift }}
        viewBox="0 0 640 640"
        className="pointer-events-none absolute right-[5%] top-1/2 h-[78%] max-h-[760px] w-auto -translate-y-[45%] max-md:right-[-30%] max-md:opacity-40"
        aria-hidden
      >
        <motion.g
          style={{ transformOrigin: "320px 320px", transformBox: "view-box" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
        >
          {[0, 36, 72, 108, 144].map((deg, i) => (
            <motion.path
              key={deg}
              d="M320 40 C 470 130, 470 510, 320 600 C 170 510, 170 130, 320 40 Z"
              fill="none"
              stroke={i === 0 ? "#e0622a" : i === 2 ? "#7fd08b" : "#ffffff"}
              strokeOpacity={i === 0 ? 0.85 : i === 2 ? 0.55 : 0.16}
              strokeWidth={i === 0 ? 2 : 1.4}
              transform={`rotate(${deg} 320 320)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 0.5 + i * 0.25 }}
            />
          ))}
        </motion.g>
        <motion.circle cx="320" cy="320" r="5" fill="#e0622a" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, type: "spring" }} />
      </motion.svg>

      <motion.div style={{ y: yText }} className="relative z-10 mx-auto w-full max-w-[1200px]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="label !text-white/55"
        >
          <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-orange" />
          {t.year}
        </motion.p>
        <h1 className="mt-7 text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {line(t.h1a, 0.35)}
          {line(t.h1b, 0.5, "text-white/55")}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/70"
        >
          {t.tag}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }} className="mt-10 flex flex-wrap items-center gap-4">
          <Link href={`/${lang}/contact`} className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-deep">
            {t.contact} <ArrowRight size={16} />
          </Link>
          <Link href={`/${lang}/theme-3#work`} className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10">
            {t.cta}
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 sm:grid-cols-3">
          {facts.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.12 }}
              className="border-white/10 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 sm:border-l sm:first:border-l-0"
            >
              {f}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- capabilities strip (marquee) ---------- */
function Band({ t }: { t: (typeof COPY)[Locale] }) {
  const row = [...t.band, ...t.band, ...t.band, ...t.band];
  return (
    <div className="relative z-20 overflow-hidden border-b border-line bg-paper py-5">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm font-medium uppercase tracking-[0.22em] text-ink/70">
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- statement ---------- */
function Statement({ t }: { t: (typeof COPY)[Locale] }) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-canvas px-5 py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.08] tracking-[-0.035em]"
      >
        {t.s1a}
        <br />
        {t.s1b}{" "}
        <span className="relative inline-block text-orange">
          {t.s1c}
          <motion.svg viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2 w-full" aria-hidden>
            <motion.path
              d="M2 8 C 50 2, 120 2, 198 6"
              fill="none"
              stroke="#2f7d3b"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
            />
          </motion.svg>
        </span>
      </motion.h2>
    </section>
  );
}

/* ---------- scroll narrative: a road that draws itself, cards slide in beside it ---------- */
function Narrative({ lang, d, t }: { lang: Locale; d: Dict; t: (typeof COPY)[Locale] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const items = d.services.items;
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<{ x: number; y: number; f: number }[]>([]);
  const [active, setActive] = useState(0);
  const dotX = useMotionValue("50%");
  const dotY = useMotionValue("0%");
  const dotOp = useTransform(draw, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const targets = [0.14, 0.36, 0.58, 0.78].map((p) => p * 2300);
    setNodes(
      targets.map((ty) => {
        let best = 0, bd = Infinity;
        for (let l = 0; l <= L; l += 4) {
          const pt = el.getPointAtLength(l);
          const dd = Math.abs(pt.y - ty);
          if (dd < bd) { bd = dd; best = l; }
        }
        const pt = el.getPointAtLength(best);
        return { x: pt.x, y: pt.y, f: best / L };
      }),
    );
  }, []);
  useMotionValueEvent(draw, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const pt = el.getPointAtLength(Math.max(0, Math.min(1, v)) * el.getTotalLength());
    dotX.set(`${pt.x / 10}%`);
    dotY.set(`${(pt.y / 2300) * 100}%`);
    setActive(nodes.filter((n) => v >= n.f).length);
  });
  const side = ["lg:left-[60%]", "lg:left-[4%]", "lg:left-[60%]", "lg:left-[4%]"];
  const top = ["lg:top-[4%]", "lg:top-[26%]", "lg:top-[48%]", "lg:top-[68%]"];

  return (
    <section ref={ref} id="work" className="relative bg-canvas px-5 pb-40 pt-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="label text-center">— {t.pathLabel} —</p>
        <h2 className="mt-4 text-center text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.035em]"><BlurWords text={t.pathTitle} /></h2>

        <div className="relative mt-16 lg:h-[2300px]">
          {/* the timeline: gradient line that draws itself, a glowing marker leads it, nodes light up as it passes */}
          <svg viewBox="0 0 1000 2300" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="tl-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="2300">
                <stop offset="0" stopColor="#2f7d3b" />
                <stop offset="0.55" stopColor="#2f7d3b" />
                <stop offset="1" stopColor="#e0622a" />
              </linearGradient>
            </defs>
            <path d="M500 0 V70 Q500 94 524 94 H526 Q550 94 550 118 V552 Q550 580 522 580 H478 Q450 580 450 608 V1062 Q450 1090 478 1090 H522 Q550 1090 550 1118 V1542 Q550 1570 522 1570 H478 Q450 1570 450 1598 V1960 Q450 1984 474 1984 H476 Q500 1984 500 2008 V2290" fill="none" stroke="#d9d7cb" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <motion.path d="M500 0 V70 Q500 94 524 94 H526 Q550 94 550 118 V552 Q550 580 522 580 H478 Q450 580 450 608 V1062 Q450 1090 478 1090 H522 Q550 1090 550 1118 V1542 Q550 1570 522 1570 H478 Q450 1570 450 1598 V1960 Q450 1984 474 1984 H476 Q500 1984 500 2008 V2290" fill="none" stroke="url(#tl-grad)" strokeWidth="14" strokeLinecap="round" opacity="0.12" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
            <motion.path ref={pathRef} d="M500 0 V70 Q500 94 524 94 H526 Q550 94 550 118 V552 Q550 580 522 580 H478 Q450 580 450 608 V1062 Q450 1090 478 1090 H522 Q550 1090 550 1118 V1542 Q550 1570 522 1570 H478 Q450 1570 450 1598 V1960 Q450 1984 474 1984 H476 Q500 1984 500 2008 V2290" fill="none" stroke="url(#tl-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>

          {nodes.map((n, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
              style={{ left: `${n.x / 10}%`, top: `${(n.y / 2300) * 100}%` }}
              animate={{ scale: active > i ? 1 : 0.6, opacity: active > i ? 1 : 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
            >
              {active > i && <span className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ background: CARD_COLORS[i] }} />}
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] bg-paper font-mono text-base font-bold shadow-lg transition-colors duration-300" style={{ borderColor: active > i ? CARD_COLORS[i] : "#d9d7cb", color: active > i ? CARD_COLORS[i] : "#9a988e" }}>
                0{i + 1}
              </span>
            </motion.span>
          ))}

          <motion.span
            aria-hidden
            className="pointer-events-none absolute z-30 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_0_6px_rgba(224,98,42,0.18),0_0_24px_6px_rgba(224,98,42,0.45)] lg:block"
            style={{ left: dotX, top: dotY, opacity: dotOp }}
          />

          <div className="relative flex flex-col gap-8 lg:absolute lg:inset-0 lg:block">
            {items.map((s, i) => (
              <motion.article
                key={s.slug}
                initial={{ opacity: 0, x: i % 2 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-14%" }}
                transition={{ type: "spring", stiffness: 70, damping: 16 }}
                className={`${side[i]} ${top[i]} z-10 rounded-2xl bg-paper p-4 ring-1 ring-black/5 shadow-[0_24px_50px_-30px_rgba(15,34,24,0.4)] lg:absolute lg:w-[36%]`}
                style={{ borderTop: `3px solid ${CARD_COLORS[i]}` }}
              >
                <div className="group"><FeatureArt index={i} /></div>
                <div className="mt-5 flex items-center justify-between px-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md font-mono text-xs font-bold text-white" style={{ background: CARD_COLORS[i] }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 px-3 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 px-3 text-[15px] leading-relaxed text-muted">{s.desc}</p>
                <Link href={`/${lang}/our-services/${s.slug}`} className="group mx-3 mb-2 mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4" style={{ textDecorationColor: CARD_COLORS[i] }}>
                  {t.more} <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.article>
            ))}
          </div>

                </div>

        {/* team photos: appear in sequence where the line ends */}
        <div className="relative mt-6 flex items-end justify-center gap-4 sm:gap-8">
          {[
            { src: "/team/culture-2.webp", size: 190, y: 30, delay: 0.15 },
            { src: "/team/culture-1.webp", size: 280, y: 0, delay: 0 },
            { src: "/team/culture-4.webp", size: 190, y: 30, delay: 0.3 },
          ].map((im) => (
            <motion.div
              key={im.src}
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: im.y }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: im.delay }}
              className="relative aspect-square overflow-hidden rounded-full border-[8px] border-white shadow-2xl"
              style={{ width: `min(${im.size}px, 28vw)` }}
            >
              <Image src={im.src} alt="Curamet team" fill sizes="280px" className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- proof: count-up stat tiles ---------- */
function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {to % 1 ? v.toFixed(1) : Math.round(v)}
      {suffix}
    </span>
  );
}

function Stats({ t }: { t: (typeof COPY)[Locale] }) {
  const style = [
    "text-white",
    "bg-paper text-ink ring-1 ring-black/5",
    "bg-paper text-ink ring-1 ring-black/5",
    "bg-paper text-ink ring-1 ring-black/5",
  ];
  return (
    <section className="bg-canvas px-5 pb-32">
      <div className="mx-auto max-w-[1200px]">
        <p className="label text-center">— {t.statsLabel} —</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl p-8 sm:p-10 ${style[i]}`}
              style={i === 0 ? { background: FOREST } : undefined}
            >
              <div className="text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.04em]">
                <Count to={s.n} suffix={s.s} />
              </div>
              <p className="mt-3 max-w-xs text-lg font-medium opacity-80">{s.t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- close + footer ---------- */
export function Close({ t, lang, d }: { t: (typeof COPY)[Locale]; lang: Locale; d: Dict }) {
  return (
    <>
      <section className="relative overflow-hidden px-5 py-32 text-center text-white" style={{ background: FOREST }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
          <Quote className="mx-auto text-orange" size={34} />
          <p className="mt-6 text-2xl font-medium leading-snug text-white/85 sm:text-3xl">“{t.quote}”</p>
          <p className="label mt-5 !text-white/45">{t.by}</p>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-[clamp(2.4rem,6.5vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
        >
          {t.closeA}
          <br />
          <span className="text-orange">{t.closeB}</span>
          <br />
          {t.closeC}
        </motion.h2>
        <Link href={`/${lang}/contact`} className="mt-12 inline-flex cursor-pointer items-center gap-2 rounded-md bg-orange px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-deep">
          {t.contact} <ArrowRight size={18} />
        </Link>
      </section>
      <footer className="bg-[#0a1610] px-5 py-12 text-white/70">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image src="/brand/curamet-logo-dark.png" alt="Curamet" width={130} height={48} />
            <GasellBadge />
          </div>
          <p className="text-center text-sm">
            {d.contact.address[0]}, {d.contact.address[1]} · {d.contact.mailAddr} · {d.contact.phone}
          </p>
          <p className="label !text-white/40">{t.rights}</p>
        </div>
      </footer>
    </>
  );
}

export function NewSite({ lang, d }: { lang: Locale; d: Dict }) {
  const t = COPY[lang];
  return (
    <div className="bg-canvas">
      <PillNav lang={lang} t={t} />
      <Hero t={t} lang={lang} />
      <Band t={t} />
      <Statement t={t} />
      <Narrative lang={lang} d={d} t={t} />
      <Stats t={t} />
      <Close t={t} lang={lang} d={d} />
    </div>
  );
}

export function NewAbout({ lang, d }: { lang: Locale; d: Dict }) {
  const t = COPY[lang];
  return (
    <div className="bg-canvas">
      <PillNav lang={lang} t={t} />
      <AboutEditorial a={d.about} />
      <Close t={t} lang={lang} d={d} />
    </div>
  );
}

export function NewCareer({ lang, d }: { lang: Locale; d: Dict }) {
  const t = COPY[lang];
  return (
    <div className="bg-canvas">
      <PillNav lang={lang} t={t} />
      <CareerEditorial c={getCareer(lang)} lang={lang} />
      <footer className="flex flex-col items-center gap-5 bg-[#0a1610] px-5 py-10 text-center text-sm text-white/60">
        <GasellBadge />
        <p>{d.contact.address[0]}, {d.contact.address[1]} · {d.contact.mailAddr} · {d.contact.phone}</p>
      </footer>
    </div>
  );
}

export function NewShell({ lang, d, children }: { lang: Locale; d: Dict; children: React.ReactNode }) {
  const t = COPY[lang];
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PillNav lang={lang} t={t} />
      <div className="flex-1 pt-8">{children}</div>
      <footer className="flex flex-col items-center gap-5 bg-[#0a1610] px-5 py-10 text-center text-sm text-white/60">
        <GasellBadge />
        <p>{d.contact.address[0]}, {d.contact.address[1]} · {d.contact.mailAddr} · {d.contact.phone}</p>
      </footer>
    </div>
  );
}
