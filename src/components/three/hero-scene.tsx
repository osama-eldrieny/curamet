"use client";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import type { Group } from "three";
import { Shape, type Kind } from "./objects";
import { Studio } from "./studio";

// positions as fractions of the visible viewport (-0.5..0.5), scale in world units
const items: { kind: Kind; x: number; y: number; s: number; sp: number }[] = [
  { kind: "cloud", x: -0.34, y: 0.2, s: 1.0, sp: 1.2 },
  { kind: "chip", x: 0.36, y: 0.24, s: 0.85, sp: 1.6 },
  { kind: "server", x: -0.38, y: -0.24, s: 0.75, sp: 1.1 },
  { kind: "app", x: 0.38, y: -0.2, s: 0.8, sp: 1.4 },
  { kind: "network", x: -0.1, y: 0.3, s: 0.55, sp: 1.8 },
  { kind: "cubes", x: 0.1, y: -0.34, s: 0.58, sp: 1.5 },
];

function Rig() {
  const root = useRef<Group>(null);
  const { viewport } = useThree();
  const narrow = viewport.width < 6;
  useFrame((s) => {
    if (!root.current) return;
    root.current.rotation.y += (s.pointer.x * 0.35 - root.current.rotation.y) * 0.04;
    root.current.rotation.x += (-s.pointer.y * 0.2 - root.current.rotation.x) * 0.04;
  });
  return (
    <group ref={root}>
      {items.slice(0, narrow ? 4 : items.length).map((it, i) => (
        <Float key={it.kind} speed={it.sp} rotationIntensity={0.35} floatIntensity={0.9}>
          <group
            position={[it.x * viewport.width * (narrow ? 1.25 : 1), it.y * viewport.height, 0]}
            scale={it.s * (narrow ? 0.6 : 1)}
            rotation={[0, (i % 2 ? 0.25 : -0.25), 0]}
          >
            <Shape kind={it.kind} />
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas
      frameloop={reduced ? "demand" : "always"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Studio />
      <Rig />
      <ContactShadows position={[0, -4, 0]} opacity={0.25} scale={20} blur={3} far={8} />
    </Canvas>
  );
}
