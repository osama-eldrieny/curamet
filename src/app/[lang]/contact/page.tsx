import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { ContactPage } from "@/components/contact-page";

// Dev-only instant-navigation validation: opt this route out (it reads URL params).
export const instant = false;

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ContactPage lang={lang} />;
}
