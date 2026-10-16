"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** next/link that keeps visitors inside the current theme (/en/theme-2/...) when they navigate. */
export default function TLink({ href, ...props }: ComponentProps<typeof Link>) {
  const path = usePathname();
  const m = path.match(/^\/(?:en|sv)\/(theme-[123])(?=\/|$)/);
  let h = href;
  if (m && typeof h === "string" && /^\/(en|sv)(\/|#|$)/.test(h) && !/^\/(en|sv)\/theme-/.test(h)) {
    h = h.replace(/^\/(en|sv)/, (_, l) => `/${l}/${m[1]}`);
  }
  return <Link href={h} {...props} />;
}
