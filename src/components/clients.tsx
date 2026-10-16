import Image from "next/image";
import type { Dict } from "@/content/en";

const logos = ["volvo", "ibm", "ikea", "oracle", "salesforce", "ncoa", "axis", "acordo", "cybercom", "workforcelogiq"];

export function Clients({ d }: { d: Dict }) {
  const row = [...logos, ...logos];
  return (
    <section className="border-y border-line py-10">
      <p className="label mb-6 text-center">{d.clients.label}</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee flex w-max items-center gap-16 px-8">
          {row.map((l, i) => (
            <Image
              key={i}
              src={`/clients/${l}.webp`}
              alt={l}
              width={120}
              height={40}
              className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
