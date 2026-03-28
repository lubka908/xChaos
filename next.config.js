/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If using project pages (username.github.io/repo-name), uncomment and update:
   basePath: '/explChaos',
   assetPrefix: '/explChaos',
}

module.exports = nextConfig
