/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STRAPI_HOST: 'http://localhost:1337',
        STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    },
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
