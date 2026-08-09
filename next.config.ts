import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async rewrites() {
    // Proxies the shared backend (see docs/koyeb-shared-backend.md) at
    // /backend/* so client requests are same-origin (cookies work, no CORS).
    // Deliberately NOT /api/* — that prefix already serves this app's own
    // WordPress-JSON-backed routes (src/app/api/**).
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.technocratng.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.technocratng.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.blessingcomputers.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "technocratblessingcomputers.fra1.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.madrasthemes.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.blessingcomputers.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
