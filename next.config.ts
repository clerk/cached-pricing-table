import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // cacheComponents: true,
        useCache: true,
        ppr: true,
    },
};

export default nextConfig;
