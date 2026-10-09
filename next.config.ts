import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: { formats: ["image/webp"], qualities: [85] },
};
export default config;
