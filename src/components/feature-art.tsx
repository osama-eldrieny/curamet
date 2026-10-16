"use client";
import { motion } from "motion/react";
import { Check, Sparkles, Loader2 } from "lucide-react";

const dots =
  "absolute inset-0 [background-image:radial-gradient(circle,rgba(17,17,17,0.16)_1px,transparent_1.3px)] [background-size:11px_11px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]";

const pill = "rounded-full px-2 py-0.5 text-[10px] font-bold";

/** Tilted stack of UI rows (product engineering) */
function Stack() {
  const rows = [
    { t: "Web app", p: "v2.4", c: "bg-orange/15 text-orange-deep" },
    { t: "Mobile", p: "beta", c: "bg-green/15 text-green" },
    { t: "API", p: "live", c: "bg-ink/10 text-ink" },
  ];
  return (
    <div className="[perspective:700px]">
      <div className="w-52 [transform:rotateX(48deg)_rotateZ(-22deg)] [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateX(40deg)_rotateZ(-16deg)_translateY(-6px)]">
        {rows.map((r, i) => (
          <motion.div
            key={r.t}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            className="mb-2 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-[0_10px_20px_-8px_rgba(17,17,17,0.25)] ring-1 ring-black/5"
          >
            <span className="text-xs font-bold">{r.t}</span>
            <span className={`${pill} ${r.c}`}>{r.p}</span>
          </motion.div>
        ))}
        <div className="space-y-1.5 px-1 pt-1">
          <div className="h-1.5 w-40 rounded-full bg-ink/10" />
          <div className="h-1.5 w-28 rounded-full bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

/** Pipeline checklist (cloud & devops) */
function Pipeline() {
  const steps = ["Build", "Test", "Deploy", "Monitor"];
  return (
    <div className="w-52 space-y-2 [transform:rotate(-4deg)] transition-transform duration-500 group-hover:[transform:rotate(0deg)_scale(1.04)]">
      {steps.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.18 }}
          className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2 shadow-[0_8px_18px_-8px_rgba(17,17,17,0.22)] ring-1 ring-black/5"
        >
          {i < 3 ? (
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.5 + i * 0.3 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-white"
            >
              <Check size={12} strokeWidth={3} />
            </motion.span>
          ) : (
            <Loader2 size={20} className="animate-spin text-orange" />
          )}
          <span className="text-xs font-bold">{s}</span>
          <span className="ml-auto h-1.5 w-10 rounded-full bg-ink/10" />
        </motion.div>
      ))}
    </div>
  );
}

/** Glossy icon with pulsing rings (AI & automation) */
function Orb() {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-orange/40"
          animate={{ scale: [0.7, 1.35], opacity: [0.7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
        />
      ))}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="tile tile-orange flex h-20 w-20 items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
      >
        <Sparkles size={34} className="text-white" />
      </motion.div>
    </div>
  );
}

/** Avatars + chat bubbles (consulting & dedicated teams) */
function Team() {
  const people = [
    { n: "A", c: "bg-orange" },
    { n: "M", c: "bg-green" },
    { n: "S", c: "bg-ink" },
  ];
  return (
    <div className="w-52 space-y-2.5">
      <div className="flex -space-x-2">
        {people.map((p, i) => (
          <motion.span
            key={p.n}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 + i * 0.12 }}
            className={`flex h-9 w-9 items-center justify-center rounded-full ${p.c} text-xs font-bold text-white ring-2 ring-white transition-transform duration-300 group-hover:translate-y-[-4px]`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {p.n}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl rounded-bl-md bg-white px-3 py-2 text-xs font-semibold shadow-[0_8px_18px_-8px_rgba(17,17,17,0.22)] ring-1 ring-black/5"
      >
        Standup · 09:00
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="ml-8 rounded-2xl rounded-br-md bg-orange px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_18px_-8px_rgba(224,98,42,0.6)]"
      >
        Shipped. On to the next.
      </motion.div>
    </div>
  );
}

const arts = [Stack, Pipeline, Orb, Team];

export function FeatureArt({ index, big = false }: { index: number; big?: boolean }) {
  const Art = arts[index % arts.length];
  // `big` is used inside a hero that already has its own dotted background, so it drops the panel.
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${big ? "h-[26rem]" : "h-56 rounded-[22px] bg-[#efeee7]"}`}>
      {!big && <div className={dots} />}
      <div className={`relative ${big ? "scale-[1.75]" : ""}`}>
        <Art />
      </div>
    </div>
  );
}
