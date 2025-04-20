import type { NextConfig } from "next";
// import type { Rewrite } from 'next/dist/lib/load-custom-routes';
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.daisyui.com'],
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
