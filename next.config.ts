import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.9'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  devIndicators: false,
  images: {
    domains: ['https://dfedcyxxbfybgagsyybe.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dfedcyxxbfybgagsyybe.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
