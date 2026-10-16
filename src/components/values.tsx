"use client";
import { motion } from "motion/react";
import { Scale, Users, Lightbulb, HeartHandshake } from "lucide-react";
import type { Dict } from "@/content/en";
import { Reveal } from "./reveal";
import { BlurWords } from "./text-fx";

const icons = [Scale, Users, Lightbulb, HeartHandshake];
const tiles = ["tile-orange", "", "tile-chalk", "tile-orange"];

export function Values({ d }: { d: Dict }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28">
      <Reveal className="text-center">
        <p className="label">— {d.values.label} —</p>
        <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">
          <BlurWords text={d.values.title} />
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {d.values.items.map((it, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={it.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex h-full gap-5 overflow-hidden rounded-[28px] bg-[#f7f6f1] p-7 ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(17,17,17,0.3)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [background-image:radial-gradient(circle,rgba(224,98,42,0.35)_1px,transparent_1.3px)] [background-size:11px_11px] [mask-image:radial-gradient(circle_at_100%_0%,black,transparent_60%)] group-hover:opacity-100" />
                <div className={`tile ${tiles[i % tiles.length]} relative flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${tiles[i % tiles.length] === "tile-chalk" ? "text-ink/70" : "text-white"}`}>
                  <Icon size={24} />
                </div>
                <div className="relative">
                  <h3 className="text-lg font-extrabold tracking-tight">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{it.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
