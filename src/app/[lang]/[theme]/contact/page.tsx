import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { hasTheme, themes } from "@/lib/themes";
import { ContactPage } from "@/components/contact-page";
import { NewShell } from "@/components/new-site";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => themes.map((theme) => ({ lang, theme })));
}

export default async function ThemeContact({ params }: PageProps<"/[lang]/[theme]/contact">) {
  const { lang, theme } = await params;
  if (!hasLocale(lang) || !hasTheme(theme)) notFound();
  if (theme === "theme-3") return <NewShell lang={lang} d={getDict(lang)}><ContactPage lang={lang} /></NewShell>;
  return <ContactPage lang={lang} />;
}
