"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useInView } from "motion/react";
import type { Group } from "three";
import { Shape, type Kind } from "./objects";
import { Studio } from "./studio";

function Spinner({ kind }: { kind: Kind }) {
  const g = useRef<Group>(null);
  useFrame((s, dt) => {
    if (!g.current) return;
    g.current.rotation.y += dt * 0.35;
    g.current.rotation.x += (s.pointer.y * 0.3 - g.current.rotation.x) * 0.05;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={g} scale={0.95}><Shape kind={kind} /></group>
    </Float>
  );
}

/** One small WebGL canvas for a single object; only renders while on screen. */
export function ObjectCanvas({ kind, className }: { kind: Kind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "100px" });
  return (
    <div ref={ref} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 4.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Studio />
        <Spinner kind={kind} />
      </Canvas>
    </div>
  );
}
