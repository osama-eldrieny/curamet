import { Cloud, Code2, Cpu, Users, type LucideProps } from "lucide-react";

const map = { code: Code2, cloud: Cloud, ai: Cpu, team: Users } as const;
export type IconName = keyof typeof map;

export function Icon({ name, ...p }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden {...p} />;
}
