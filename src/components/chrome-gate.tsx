"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the classic header/footer on the Theme 3 site. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (/^\/(en|sv)\/theme-3(\/|$)/.test(path)) return null;
  return <>{children}</>;
}
