import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { hasTheme, themes } from "@/lib/themes";
import { HeroCubes } from "@/components/hero-cubes";
import { HeroMask } from "@/components/hero-mask";
import { NewSite } from "@/components/new-site";
import { ServiceCards } from "@/components/service-cards";
import { Clients } from "@/components/clients";
import { Values } from "@/components/values";
import { Benefits } from "@/components/benefits";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => themes.map((theme) => ({ lang, theme })));
}

export default async function ThemeHome({ params }: PageProps<"/[lang]/[theme]">) {
  const { lang, theme } = await params;
  if (!hasLocale(lang) || !hasTheme(theme)) notFound();
  const d = getDict(lang);
  if (theme === "theme-3") return <NewSite lang={lang} d={d} />;
  return (
    <>
      {theme === "theme-1" ? <HeroCubes lang={lang} d={d} /> : <HeroMask lang={lang} d={d} />}
      <Clients d={d} />
      <ServiceCards lang={lang} d={d} />
      <Values d={d} />
      <Benefits lang={lang} d={d} />
    </>
  );
}
