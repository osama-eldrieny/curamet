"use client";
import dynamic from "next/dynamic";

export const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });
export const ObjectCanvas = dynamic(
  () => import("./object-canvas").then((m) => m.ObjectCanvas),
  { ssr: false },
);
