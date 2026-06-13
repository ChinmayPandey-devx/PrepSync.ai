import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/PrepSync.ai',
  images: { unoptimized: true },
};

export default nextConfig;
