import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Evita inferência do monorepo quando há outro lockfile no diretório pai. */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
