import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** Sempre a pasta do app (onde está este arquivo), não `process.cwd()`. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /**
   * Ancora PostCSS/Tailwind e resolução de módulos no projeto real.
   * Por quê: com `package.json` em diretórios pai (ex.: home) ou workspace
   * aberto em `Desktop/`, o cwd vira `.../Desktop` e o bundler tenta resolver
   * `tailwindcss` a partir dali — onde não existe `node_modules`.
   */
  turbopack: {
    root: projectRoot,
  },
  serverExternalPackages: ["firebase-admin", "cloudinary"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
