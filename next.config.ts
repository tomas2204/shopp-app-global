import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow all external image hostnames (mock data uses several external domains)
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: true, // Disable Next.js image optimization for external images to avoid CORS issues
  },
};

export default nextConfig;
