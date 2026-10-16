"use client";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type Kind = "app" | "cloud" | "chip" | "network" | "server" | "cubes";

const C = { orange: "#e0622a", char: "#2a2a27", chalk: "#f1f0ea", green: "#2f7d3b" };

type MatProps = { color: string; rough?: number; metal?: number };
function Mat({ color, rough = 0.38, metal = 0.05 }: MatProps) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={rough}
      metalness={metal}
      clearcoat={0.7}
      clearcoatRoughness={0.25}
    />
  );
}

function Slab({ s, p = [0, 0, 0], r = 0.08, color, rough }: { s: [number, number, number]; p?: [number, number, number]; r?: number; color: string; rough?: number }) {
  return (
    <RoundedBox args={s} radius={r} smoothness={5} position={p} castShadow>
      <Mat color={color} rough={rough} />
    </RoundedBox>
  );
}

function Glow({ p, s = [0.08, 0.08, 0.04], color = C.orange }: { p: [number, number, number]; s?: [number, number, number]; color?: string }) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} />
    </mesh>
  );
}

function App() {
  return (
    <group rotation={[0.1, -0.5, 0.05]}>
      <Slab s={[1.1, 1.9, 0.14]} r={0.14} color={C.char} />
      <Slab s={[0.94, 1.7, 0.02]} p={[0, 0, 0.075]} r={0.08} color="#0b0b0a" rough={0.15} />
      <Slab s={[0.7, 0.18, 0.03]} p={[0, 0.55, 0.1]} r={0.05} color={C.orange} />
      <Slab s={[0.7, 0.4, 0.03]} p={[0, 0.1, 0.1]} r={0.06} color={C.chalk} />
      <Slab s={[0.32, 0.32, 0.03]} p={[-0.19, -0.5, 0.1]} r={0.06} color="#34332f" />
      <Slab s={[0.32, 0.32, 0.03]} p={[0.19, -0.5, 0.1]} r={0.06} color={C.green} />
    </group>
  );
}

function Cloud() {
  const puffs: [number, number, number, number][] = [
    [-0.55, -0.1, 0, 0.42],
    [0, 0.12, 0, 0.58],
    [0.58, -0.08, 0, 0.44],
    [0.15, -0.18, 0.1, 0.46],
    [-0.2, -0.2, 0.1, 0.4],
  ];
  return (
    <group rotation={[0.1, -0.35, 0]}>
      {puffs.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[r, 48, 48]} />
          <Mat color={C.chalk} rough={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -0.05, 0.55]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.17, 0.3, 4]} />
        <Mat color={C.orange} />
      </mesh>
      <mesh position={[0, -0.3, 0.55]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
        <Mat color={C.orange} />
      </mesh>
    </group>
  );
}

function Chip() {
  const pins = Array.from({ length: 6 }, (_, i) => -0.5 + i * 0.2);
  return (
    <group rotation={[-0.45, 0.25, 0.45]}>
      <Slab s={[1.3, 1.3, 0.18]} r={0.1} color={C.char} />
      <Slab s={[0.7, 0.7, 0.06]} p={[0, 0, 0.11]} r={0.06} color={C.orange} />
      <Slab s={[0.34, 0.34, 0.04]} p={[0, 0, 0.15]} r={0.04} color={C.chalk} />
      {pins.map((x) => (
        <group key={x}>
          {([[x, 0.72, 0, 0.1, 0.18], [x, -0.72, 0, 0.1, 0.18], [0.72, x, 0, 0.18, 0.1], [-0.72, x, 0, 0.18, 0.1]] as number[][]).map(([px, py, pz, sx, sy], j) => (
            <mesh key={j} position={[px, py, pz]}>
              <boxGeometry args={[sx, sy, 0.05]} />
              <meshStandardMaterial color="#c9c7bd" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Network() {
  const nodes: [number, number, number, string, number][] = [
    [0, 0, 0, C.orange, 0.3],
    [-0.8, 0.5, 0.1, C.char, 0.2],
    [0.8, 0.55, -0.1, C.chalk, 0.22],
    [-0.6, -0.65, 0.1, C.chalk, 0.2],
    [0.7, -0.6, 0, C.char, 0.24],
  ];
  const edges = nodes.slice(1).map((n) => new THREE.Vector3(n[0], n[1], n[2]));
  return (
    <group rotation={[0.2, 0.3, 0]}>
      {edges.map((e, i) => {
        const len = e.length();
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), e.clone().normalize());
        return (
          <mesh key={i} position={e.clone().multiplyScalar(0.5)} quaternion={q}>
            <cylinderGeometry args={[0.035, 0.035, len, 12]} />
            <Mat color="#8a8a83" metal={0.4} />
          </mesh>
        );
      })}
      {nodes.map(([x, y, z, c, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <sphereGeometry args={[r, 40, 40]} />
          <Mat color={c} />
        </mesh>
      ))}
    </group>
  );
}

function Server() {
  return (
    <group rotation={[0.15, -0.5, 0]}>
      {[0.55, 0, -0.55].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <Slab s={[1.5, 0.44, 0.9]} r={0.1} color={i === 1 ? C.chalk : C.char} />
          <Slab s={[1.2, 0.12, 0.02]} p={[-0.05, 0, 0.46]} r={0.03} color={i === 1 ? "#cfcdc3" : "#0b0b0a"} rough={0.2} />
          <Glow p={[0.58, 0, 0.47]} color={i === 0 ? C.orange : C.green} />
        </group>
      ))}
    </group>
  );
}

function Cubes() {
  return (
    <group rotation={[0.25, 0.6, 0]}>
      <Slab s={[0.8, 0.8, 0.8]} p={[-0.45, -0.4, 0]} r={0.1} color={C.char} />
      <Slab s={[0.8, 0.8, 0.8]} p={[0.45, -0.4, 0]} r={0.1} color={C.chalk} />
      <Slab s={[0.8, 0.8, 0.8]} p={[0, 0.42, 0]} r={0.1} color={C.orange} />
    </group>
  );
}

export function Shape({ kind }: { kind: Kind }) {
  switch (kind) {
    case "app": return <App />;
    case "cloud": return <Cloud />;
    case "chip": return <Chip />;
    case "network": return <Network />;
    case "server": return <Server />;
    case "cubes": return <Cubes />;
  }
}
