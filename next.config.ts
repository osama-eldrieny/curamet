import type { NextConfig } from "next";

// GitHub Pages build: static export under /curamet. Normal dev/server builds are unchanged.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/curamet" : "";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages
    ? {
        output: "export" as const,
        basePath,
        trailingSlash: true,
        images: { loader: "custom" as const, loaderFile: "./src/lib/image-loader.ts" },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
        async redirects() {
          return [
            { source: "/:lang(en|sv)/new/:path*", destination: "/:lang/theme-3/:path*", permanent: false },
            { source: "/:lang(en|sv)/v/cubes/:path*", destination: "/:lang/theme-1/:path*", permanent: false },
            { source: "/:lang(en|sv)/v/mask/:path*", destination: "/:lang/theme-2/:path*", permanent: false },
          ];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
