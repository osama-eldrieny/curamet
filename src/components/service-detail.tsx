"use client";
import { Check } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import type { Dict } from "@/content/en";

type Page = Dict["detail"]["pages"][string];

const cols = (n: number) =>
  ({ "--cols": Math.min(n, 5) }) as React.CSSProperties;
const grid = "grid w-full gap-5 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]";

export function WhatWeDo({ items }: { items: Page["what"] }) {
  return (
    <div className={grid} style={cols(items.length)}>
      {items.map((w, i) => (
        <div key={w.t} className="card h-full p-7 transition-transform duration-300 hover:-translate-y-1">
          <span className="font-mono text-xs text-orange">0{i + 1}</span>
          <h3 className="mt-4 text-xl font-bold tracking-tight">{w.t}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.d}</p>
        </div>
      ))}
    </div>
  );
}

const darkCard = "flex h-full flex-col rounded-3xl border border-white/10 bg-night-2 p-6";
const trigger =
  "cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold text-white/70 data-[state=active]:text-ink";

export function GetAndHow({ page, d }: { page: Page; d: Dict["detail"] }) {
  return (
    <Tabs defaultValue="get" className="mx-auto w-full">
      <TabsList className="mx-auto grid h-auto w-fit grid-cols-2 rounded-full bg-white/10 p-1.5">
        <TabsTrigger value="get" className={trigger}>{d.get}</TabsTrigger>
        <TabsTrigger value="how" className={trigger}>{d.how}</TabsTrigger>
      </TabsList>
      <TabsContents className="mt-10 w-full">
        <TabsContent value="get" className={grid} style={cols(page.get.length)}>
          {page.get.map((g, i) => (
            <div key={i} className={darkCard}>
              <span className="tile tile-orange flex h-11 w-11 items-center justify-center">
                <Check size={20} className="text-white" />
              </span>
              <p className="mt-5 text-[15px] leading-relaxed text-white/85">{g}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="how" className={grid} style={cols(page.how.length)}>
          {page.how.map((h, i) => (
            <div key={h.t} className={darkCard}>
              <span className="tile tile-orange flex h-11 w-11 items-center justify-center font-mono text-xs font-bold text-white">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-white">{h.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{h.d}</p>
            </div>
          ))}
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
}
