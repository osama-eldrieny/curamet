import { MapPin, MessageSquare, Phone, Mail } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";


export function ContactPage({ lang }: { lang: Locale }) {
  const c = getDict(lang).contact;
  const info = [
    { I: MapPin, t: c.find, l: c.address },
    { I: Phone, t: c.call, l: [c.phone], s: c.hours },
    { I: Mail, t: c.mail, l: [c.mailAddr], s: c.reply },
    { I: MessageSquare, t: c.feedback, l: [], s: c.feedbackSub },
  ];
  return (
    <section className="mx-auto max-w-5xl px-5 pb-28 pt-24">
      <Reveal className="text-center">
        <p className="label">— {c.label} —</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4.4rem)]">
          {c.line1} <span className="text-orange">{c.line2}</span> {c.line3}
        </h1>
      </Reveal>
      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1.4fr_1fr]">
        <Reveal className="h-full"><ContactForm c={c} /></Reveal>
        <Reveal delay={0.1} className="h-full">
          <ul className="card h-full divide-y divide-line p-3">
            {info.map(({ I, t, l, s }) => (
              <li key={t} className="p-4">
                <p className="flex items-center gap-2 text-sm font-bold"><I size={16} className="text-orange" />{t}</p>
                {l.map((x) => <p key={x} className="mt-1 text-sm text-muted">{x}</p>)}
                {s && <p className="label mt-2 !text-[10px]">{s}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
