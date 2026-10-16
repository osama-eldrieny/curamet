import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import { AboutBento } from "@/components/about-layouts";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <AboutBento a={getDict(lang).about} />;
}
