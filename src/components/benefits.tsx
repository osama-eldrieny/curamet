import Link from "./tlink";
import { Check } from "lucide-react";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { BlurWords } from "./text-fx";

export function Benefits({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section className="bg-night py-28 text-white">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center">
          <p className="label !text-white/40">— {d.benefits.label} —</p>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]">
            <BlurWords text={d.benefits.title} />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {d.benefits.items.map((b, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="flex h-full gap-4 rounded-3xl border border-white/10 bg-night-2 p-6">
                <span className="tile tile-orange flex h-9 w-9 shrink-0 items-center justify-center">
                  <Check size={18} className="text-white" />
                </span>
                <p className="text-[15px] leading-relaxed text-white/85">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center">
          <h3 className="display text-[clamp(1.8rem,4vw,3rem)]">
            <BlurWords text={d.cta.title} />
          </h3>
          <Link
            href={`/${lang}/contact`}
            className="mt-8 inline-flex cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.04]"
          >
            {d.cta.button} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
