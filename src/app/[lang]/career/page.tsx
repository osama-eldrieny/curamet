import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getCareer } from "@/content/career";
import { CareerBento } from "@/components/career-layouts";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export default async function Career({ params }: PageProps<"/[lang]/career">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <CareerBento c={getCareer(lang)} lang={lang} />;
}
