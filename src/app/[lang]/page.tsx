import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/hero";
import { ServiceCards } from "@/components/service-cards";
import { Clients } from "@/components/clients";
import { Values } from "@/components/values";
import { Benefits } from "@/components/benefits";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <>
      <Hero lang={lang} d={d} />
      <Clients d={d} />
      <ServiceCards lang={lang} d={d} />
      <Values d={d} />
      <Benefits lang={lang} d={d} />
    </>
  );
}
