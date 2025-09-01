import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    remotePatterns: [new URL("https://images.pexels.com/photos/**")],
  },
};

export default nextConfig;
