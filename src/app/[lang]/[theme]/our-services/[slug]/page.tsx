import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { hasTheme, themes } from "@/lib/themes";
import { en } from "@/content/en";
import { ServicePageView } from "@/components/service-page";
import { NewShell } from "@/components/new-site";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    themes.flatMap((theme) => en.services.items.map((s) => ({ lang, theme, slug: s.slug }))),
  );
}

export default async function ThemeService({ params }: PageProps<"/[lang]/[theme]/our-services/[slug]">) {
  const { lang, theme, slug } = await params;
  if (!hasLocale(lang) || !hasTheme(theme)) notFound();
  const view = <ServicePageView lang={lang} slug={slug} />;
  if (theme === "theme-3") return <NewShell lang={lang} d={getDict(lang)}>{view}</NewShell>;
  return view;
}
