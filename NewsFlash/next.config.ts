import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   experimental: {
      reactCompiler: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "*",
            port: "",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
