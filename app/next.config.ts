import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Date the site was built (America/New_York). The holiday notice renders this list first so it matches the static HTML.
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }),
  },
  images: {
    // Static export requires unoptimized images — swap for CF Images loader post-launch
    unoptimized: true,
  },
};

export default nextConfig;
