import type { NextConfig } from "next"

// Static export removed to support dynamic admin routes (/admin/events/[id]).
// Deploy via Firebase App Hosting (supports Next.js server) instead of
// the legacy Firebase Hosting static-file approach.
// Run: firebase experiments:enable webframeworks && firebase deploy
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
