import { en, type Dict } from "@/content/en";
import { sv } from "@/content/sv";

export const locales = ["en", "sv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";

const dictionaries: Record<Locale, Dict> = { en, sv };

export const hasLocale = (l: string): l is Locale =>
  (locales as readonly string[]).includes(l);

export const getDict = (l: Locale): Dict => dictionaries[l];
