import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/:lang(en|sv)/new/:path*", destination: "/:lang/theme-3/:path*", permanent: false },
      { source: "/:lang(en|sv)/v/cubes/:path*", destination: "/:lang/theme-1/:path*", permanent: false },
      { source: "/:lang(en|sv)/v/mask/:path*", destination: "/:lang/theme-2/:path*", permanent: false },
    ];
  },
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
