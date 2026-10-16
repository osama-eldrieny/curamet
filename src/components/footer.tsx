import Image from "next/image";
import { GasellBadge } from "./gasell-badge";
import Link from "./tlink";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Dict } from "@/content/en";
import type { Locale } from "@/lib/i18n";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const c = d.contact;
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
<Image src="/brand/curamet-logo-dark.png" alt="Curamet" width={150} height={56} />
          <p className="mt-5 max-w-xs text-sm text-white/60">{d.footer.tagline}</p>
          <GasellBadge className="mt-6" />
        </div>
        <div>
          <p className="label !text-white/40">{d.footer.quick}</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-orange" href={`/${lang}`}>{d.nav.home}</Link></li>
            <li><Link className="hover:text-orange" href={`/${lang}#services`}>{d.nav.services}</Link></li>
            <li><Link className="hover:text-orange" href={`/${lang}/career`}>{d.nav.career}</Link></li>
            <li><Link className="hover:text-orange" href={`/${lang}/about`}>{d.nav.about}</Link></li>
          </ul>
        </div>
        <div>
          <p className="label !text-white/40">{d.footer.contact}</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 text-orange" />{c.mailAddr}</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 text-orange" />{c.phone}</li>
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 text-orange" />{c.address[0]}, {c.address[1]}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center">
        <p className="label !text-white/40">{d.footer.rights}</p>
      </div>
    </footer>
  );
}
