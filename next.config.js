/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If using project pages (username.github.io/repo-name), uncomment and update:
   basePath: '/xpChaos',
   assetPrefix: '/xpChaos',
}

module.exports = nextConfig
