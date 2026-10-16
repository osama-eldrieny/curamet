import Image from "next/image";

/** Gasell award badge, light-on-dark artwork for the dark footers. */
export function GasellBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex ${className}`}>
      <Image src="/brand/gasell-dark.png" alt="Gasell 2022" width={65} height={103} />
    </div>
  );
}
