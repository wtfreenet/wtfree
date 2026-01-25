import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321', // Specify the port if needed
        pathname: '/storage/v1/object/public/images/**', // Adjust the pathname as needed
      },
    ],
  },
};

export default nextConfig;
