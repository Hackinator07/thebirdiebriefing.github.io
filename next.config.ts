import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  images: {
    unoptimized: true
  },
  // Add compression for better performance
  compress: true,
  // Optimize bundle size
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
