import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  // this includes files from the monorepo base two directories up
  outputFileTracingRoot: path.join(__dirname, "../"),
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000", "localhost:3001"] },
  },
};

export default nextConfig;
