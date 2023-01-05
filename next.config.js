/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'training.cleverland.by',
        port: '',
        pathname: '/shop/**',
      },
    ],
  },
}

module.exports = nextConfig
