"use client";
import { useState } from "react";
import type { Dict } from "@/content/en";

export function ContactForm({ c }: { c: Dict["contact"] }) {
  const [state, setState] = useState<"idle" | "error" | "sent">("idle");
  const field =
    "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none transition-colors focus:border-orange";

  return (
    <form
      noValidate
      className="card h-full space-y-4 p-7"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const ok = ["name", "email", "subject", "message"].every((k) => String(f.get(k) ?? "").trim());
        if (!ok) return setState("error");
        // TODO: wire to a real mail backend (open item in the plan)
        setState("sent");
      }}
    >
      <h2 className="text-lg font-bold uppercase tracking-tight text-green">{c.formTitle}</h2>
      <input name="name" aria-label={c.name} placeholder={c.name} className={field} />
      <input name="email" type="email" aria-label={c.email} placeholder={c.email} className={field} />
      <input name="subject" aria-label={c.subject} placeholder={c.subject} className={field} />
      <textarea name="message" aria-label={c.message} placeholder={c.message} rows={5} className={field} />
      <button className="w-full cursor-pointer rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]">
        {c.send}
      </button>
      <p role="status" className={`text-sm ${state === "error" ? "text-red-600" : "text-green"}`}>
        {state === "error" ? c.required : state === "sent" ? c.sent : ""}
      </p>
    </form>
  );
}
