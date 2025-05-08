import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
// import type { Rewrite } from 'next/dist/lib/load-custom-routes';
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.daisyui.com','storage.googleapis.com'],
  },
  compiler: isProd
  ? {
      // 只有 production build 時才去掉 log
      removeConsole: { exclude: ["error", "warn"] },
    }
  : undefined,
  experimental: {
    allowedDevOrigins: [
      "https://compromise-found-consistency-open.trycloudflare.com",
    ]
  },
  // async rewrites(): Promise<Rewrite[]> {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://au-twenty-choosing-hypothetical.trycloudflare.com/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;
