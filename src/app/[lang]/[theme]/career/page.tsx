import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { hasTheme, themes } from "@/lib/themes";
import { getCareer } from "@/content/career";
import { CareerMask, CareerZigzag } from "@/components/career-layouts";
import { NewCareer } from "@/components/new-site";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => themes.map((theme) => ({ lang, theme })));
}

export default async function ThemeCareer({ params }: PageProps<"/[lang]/[theme]/career">) {
  const { lang, theme } = await params;
  if (!hasLocale(lang) || !hasTheme(theme)) notFound();
  if (theme === "theme-3") return <NewCareer lang={lang} d={getDict(lang)} />;
  const c = getCareer(lang);
  return theme === "theme-1" ? <CareerZigzag c={c} lang={lang} /> : <CareerMask c={c} lang={lang} />;
}
