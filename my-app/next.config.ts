import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*', // bắt tất cả URL
        destination: 'http://localhost:8080/:path*' // Proxy tới Spring Boot
      }
    ]
  }
};

export default nextConfig;
