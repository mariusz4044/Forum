import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: "http://localhost:2137",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "2137",
        pathname: "/image/avatar/**",
      },
    ],
  },
};

export default nextConfig;
