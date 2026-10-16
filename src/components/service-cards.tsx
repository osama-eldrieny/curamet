"use client";
import Link from "./tlink";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { FeatureArt } from "./feature-art";
import { BlurWords } from "./text-fx";

export function ServiceCards({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section id="services" className="mx-auto max-w-[1600px] px-5 py-28">
      <Reveal className="text-center">
        <p className="label">— {d.services.label} —</p>
        <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">
          <BlurWords text={d.services.title} />
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {d.services.items.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.1}>
            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="h-full">
              <Link
                href={`/${lang}/our-services/${s.slug}`}
                className="group flex h-full cursor-pointer flex-col rounded-[28px] bg-[#f7f6f1] p-2.5 ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(17,17,17,0.3)]"
              >
                <FeatureArt index={i} />
                <div className="flex flex-1 flex-col p-4 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-extrabold leading-tight tracking-tight">{s.title}</h3>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/10 transition-all duration-300 group-hover:rotate-90 group-hover:bg-ink group-hover:text-white">
                      <Plus size={16} />
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
