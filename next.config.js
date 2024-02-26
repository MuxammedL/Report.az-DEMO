/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");
module.exports = nextConfig;

module.exports = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.report.az",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};
