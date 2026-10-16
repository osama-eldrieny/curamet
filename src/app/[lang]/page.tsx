import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { ThemeRedirect } from "@/components/theme-redirect";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export default async function Root({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ThemeRedirect lang={lang} />;
}
