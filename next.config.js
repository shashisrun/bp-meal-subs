/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos'],
  },
}


module.exports = withPWA(nextConfig)
