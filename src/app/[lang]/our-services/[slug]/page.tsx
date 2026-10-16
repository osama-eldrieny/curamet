import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { en } from "@/content/en";
import { ServicePageView } from "@/components/service-page";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => en.services.items.map((s) => ({ lang, slug: s.slug })));
}

export default async function ServicePage({ params }: PageProps<"/[lang]/our-services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  return <ServicePageView lang={lang} slug={slug} />;
}
