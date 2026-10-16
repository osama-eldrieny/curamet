import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { hasTheme, themes } from "@/lib/themes";
import { AboutCollage, AboutPanels } from "@/components/about-layouts";
import { NewAbout } from "@/components/new-site";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => themes.map((theme) => ({ lang, theme })));
}

export default async function ThemeAbout({ params }: PageProps<"/[lang]/[theme]/about">) {
  const { lang, theme } = await params;
  if (!hasLocale(lang) || !hasTheme(theme)) notFound();
  const d = getDict(lang);
  if (theme === "theme-3") return <NewAbout lang={lang} d={d} />;
  return theme === "theme-1" ? <AboutCollage a={d.about} /> : <AboutPanels a={d.about} />;
}
