import Link from "./tlink";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { FeatureArt } from "./feature-art";
import { DotTexture } from "./dot-texture";
import { Reveal } from "./reveal";
import { WhatWeDo, GetAndHow } from "./service-detail";


export function ServicePageView({ lang, slug }: { lang: Locale; slug: string }) {
  const d = getDict(lang);
  const svc = d.services.items.find((s) => s.slug === slug);
  const page = d.detail.pages[slug];
  if (!svc || !page) notFound();

  return (
    <>
      <section className="relative">
      <DotTexture className="!inset-x-0 !top-0 !bottom-0" />
      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-24 text-center">
        <Link href={`/${lang}#services`} className="label inline-flex items-center gap-1 hover:text-ink">
          <ArrowLeft size={12} /> {d.detail.back}
        </Link>
        <div className="mx-auto mt-6 w-full max-w-2xl"><FeatureArt big index={d.services.items.findIndex((x) => x.slug === slug)} /></div>
        <h1 className="display mt-8 text-[clamp(2.2rem,6vw,4.4rem)]">{svc.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">{page.intro}</p>
      </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pb-24">
        <Reveal><p className="label mb-6">— {d.detail.what} —</p></Reveal>
        <Reveal><WhatWeDo items={page.what} /></Reveal>
      </section>

      <section className="bg-night py-24 text-white">
        <div className="mx-auto max-w-[1600px] px-5">
          <GetAndHow page={page} d={d.detail} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal className="text-center">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex cursor-pointer rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.04]"
          >
            {d.nav.cta} →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
