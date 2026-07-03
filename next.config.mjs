import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  async redirects() {
    return [
      // /plant-care was the original path; /care is the canonical home now.
      { source: "/plant-care", destination: "/care", permanent: true },
      { source: "/plant-care/:path*", destination: "/care/:path*", permanent: true },
      // Canonicalize www to the apex so the domain has one true home.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.greenerynetworks.com" }],
        destination: "https://greenerynetworks.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
