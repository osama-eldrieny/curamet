"use client";
import Image from "next/image";
import Link from "./tlink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";

export function Header({ lang, d }: { lang: Locale; d: Dict }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const other: Locale = lang === "en" ? "sv" : "en";
  const switchHref = path.replace(/^\/(en|sv)/, `/${other}`);

  const link =
    "label !text-[13px] !font-bold !text-ink transition-colors duration-200 cursor-pointer hover:!text-orange";

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5">
        <Link href={`/${lang}`} aria-label="Curamet">
          <Image src="/brand/curamet-logo.png" alt="Curamet" width={96} height={36} priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href={`/${lang}`} className={link}>{d.nav.home}</Link>
          <div
            className="relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button
              className={`${link} inline-flex items-center gap-1`}
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              {d.nav.services} <ChevronDown size={12} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.ul
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="card absolute left-1/2 top-full w-72 -translate-x-1/2 p-2"
                >
                  {d.services.items.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${lang}/our-services/${s.slug}`}
                        className="block cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-canvas"
                        onClick={() => setMenu(false)}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <Link href={`/${lang}/career`} className={link}>{d.nav.career}</Link>
          <Link href={`/${lang}/about`} className={link}>{d.nav.about}</Link>
          <Link href={`/${lang}/contact`} className={link}>{d.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={switchHref} className="cursor-pointer text-xl leading-none transition-transform hover:scale-110" aria-label={other === "sv" ? "Svenska" : "English"} title={other === "sv" ? "Svenska" : "English"}>
            {other === "sv" ? "🇸🇪" : "🇬🇧"}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-transform duration-200 hover:scale-[1.03] sm:inline-block"
          >
            {d.nav.cta} →
          </Link>
          <button
            className="cursor-pointer md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-5">
              <Link href={`/${lang}`} onClick={() => setOpen(false)}>{d.nav.home}</Link>
              {d.services.items.map((s) => (
                <Link key={s.slug} href={`/${lang}/our-services/${s.slug}`} className="pl-4 text-sm text-muted" onClick={() => setOpen(false)}>
                  {s.title}
                </Link>
              ))}
              <Link href={`/${lang}/career`} onClick={() => setOpen(false)}>{d.nav.career}</Link>
              <Link href={`/${lang}/about`} onClick={() => setOpen(false)}>{d.nav.about}</Link>
              <Link href={`/${lang}/contact`} onClick={() => setOpen(false)}>{d.nav.contact}</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
