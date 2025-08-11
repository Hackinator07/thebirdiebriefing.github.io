import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  images: {
    unoptimized: true
  },
  turbopack: {
    rules: {
      '*.json': {
        loaders: ['json'],
        as: '*.json',
      },
    },
  },
};

export default nextConfig;
