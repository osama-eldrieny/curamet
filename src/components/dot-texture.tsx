/** Soft dotted texture that fades out toward the edges (same look as the service-card panels). */
export const dotsStyle = (rgba = "rgba(17,17,17,0.16)", size = 11) =>
  ({
    backgroundImage: `radial-gradient(circle, ${rgba} 1px, transparent 1.3px)`,
    backgroundSize: `${size}px ${size}px`,
  }) as const;

export function DotTexture({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] ${className}`}
      style={dotsStyle()}
    />
  );
}
