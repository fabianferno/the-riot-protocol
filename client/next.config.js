/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com', 'ipfs.io'],
  },
};

module.exports = nextConfig;
