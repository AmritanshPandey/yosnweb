import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  // A stray package-lock.json in the parent folder made Next guess the wrong root.
  turbopack: { root: __dirname },
  images: {
    unoptimized: true,
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
