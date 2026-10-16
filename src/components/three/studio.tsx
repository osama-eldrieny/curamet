"use client";
import { Environment, Lightformer } from "@react-three/drei";

/** Offline studio lighting: no HDR download needed. */
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-5, 1, 2]} scale={[3, 5, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffb48a" position={[5, 0, -2]} scale={[3, 5, 1]} />
      </Environment>
    </>
  );
}
