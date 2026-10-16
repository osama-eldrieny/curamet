// Used only for the GitHub Pages export: serves public/ images from under the /curamet base path.
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
