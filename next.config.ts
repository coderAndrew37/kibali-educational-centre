import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows Next.js to optimize images from Sanity's CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
    // Improves performance by allowing higher quality with smaller file sizes
    formats: ["image/avif", "image/webp"],
    // Prevents potential layout shift by being strict about device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  // Experimental/Advanced optimizations
  experimental: {
    // Optimizes the bundling of heavy libraries like Framer Motion or Lucide
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // Ensures your console isn't flooded with Framer Motion warnings in dev
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Recommended for large galleries to prevent memory issues during build
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
