import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export requires unoptimized images — swap for CF Images loader post-launch
    unoptimized: true,
  },
};

export default nextConfig;
