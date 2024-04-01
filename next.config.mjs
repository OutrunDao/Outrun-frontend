/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // ignore graphprotocol build warnning
    // see: https://github.com/graphprotocol/graph-client/issues/303
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;
