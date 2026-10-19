import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // cacheComponents: true,
        useCache: true,
    },
};

export default nextConfig;
