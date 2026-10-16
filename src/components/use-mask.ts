"use client";
import { useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const NEAR = 240; // px from the text at which the circle starts growing
const MIN = 36;
const MAX = 420;

/** Cursor-following mask: small by default, grows as the cursor approaches the headline. */
export function useMaskReveal() {
  const box = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [size, setSize] = useState(MIN);

  const onPointerMove = (e: React.PointerEvent) => {
    const b = box.current!.getBoundingClientRect();
    setPos({ x: e.clientX - b.left, y: e.clientY - b.top });
    const t = text.current?.getBoundingClientRect();
    if (!t) return;
    const dx = Math.max(t.left - e.clientX, 0, e.clientX - t.right);
    const dy = Math.max(t.top - e.clientY, 0, e.clientY - t.bottom);
    const k = Math.max(0, 1 - Math.hypot(dx, dy) / NEAR);
    setSize(MIN + (MAX - MIN) * k * k);
  };
  const onPointerLeave = () => setSize(MIN);

  const layerStyle = {
    maskImage: `url(${BASE}/mask.svg)`,
    WebkitMaskImage: `url(${BASE}/mask.svg)`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: `${pos.x - size / 2}px ${pos.y - size / 2}px`,
    WebkitMaskSize: `${size}px`,
    transition: "-webkit-mask-position 0.12s ease-out, -webkit-mask-size 0.3s ease-out",
  } as const;

  return { box, text, pos, onPointerMove, onPointerLeave, layerStyle };
}

export const hatch = (rgba: string) =>
  `repeating-linear-gradient(135deg, ${rgba} 0, ${rgba} 1px, transparent 1px, transparent 11px)`;
