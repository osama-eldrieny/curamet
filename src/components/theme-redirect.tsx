"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/** The site only has three themes, so the bare /en and /sv addresses forward to Theme 1. */
export function ThemeRedirect({ lang }: { lang: Locale }) {
  const router = useRouter();
  const to = `/${lang}/theme-1`;
  useEffect(() => router.replace(to), [router, to]);
  return (
    <p className="px-5 py-24 text-center">
      <Link href={to}>Curamet</Link>
    </p>
  );
}
