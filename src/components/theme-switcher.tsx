"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Palette } from "lucide-react";

const THEMES = [
  { id: 1, name: "Theme 1" },
  { id: 2, name: "Theme 2" },
  { id: 3, name: "Theme 3" },
] as const;

/** Works out language, current theme and the rest of the path (about, career, ...) from the URL. */
function parse(path: string) {
  const m = path.match(/^\/(en|sv)(?:\/theme-([123]))?(\/.*)?$/);
  return { lang: m?.[1] ?? "sv", theme: m?.[2] ? Number(m[2]) : null, rest: m?.[3] ?? "" };
}

export function ThemeSwitcher() {
  const path = usePathname();
  const { lang, theme, rest } = parse(path);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    addEventListener("pointerdown", close);
    return () => removeEventListener("pointerdown", close);
  }, []);

  return (
    <div ref={box} className="fixed left-3 top-3 z-[70] max-sm:bottom-3 max-sm:top-auto">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/15 transition-transform duration-200 hover:scale-[1.03]"
      >
        <Palette size={14} className="text-orange" />
        {theme ? `Theme ${theme}` : "Themes"}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 w-44 origin-top-left rounded-2xl bg-white p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] ring-1 ring-black/10 max-sm:bottom-full max-sm:top-auto max-sm:mb-2 max-sm:mt-0"
          >
            {THEMES.map((t) => (
              <Link
                key={t.id}
                role="menuitem"
                href={`/${lang}/theme-${t.id}${rest}`}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 ${theme === t.id ? "text-orange" : "text-ink"}`}
              >
                {t.name}
                {theme === t.id && <Check size={15} />}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
