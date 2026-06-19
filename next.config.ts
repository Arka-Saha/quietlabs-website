import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    // You must explicitly define which quality arrays are allowed
    qualities: [25, 50, 75, 100], 
  },
};

export default nextConfig;
