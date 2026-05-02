/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fortisinvicta.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
