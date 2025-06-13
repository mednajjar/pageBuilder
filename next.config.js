/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configure static paths
  trailingSlash: true,
  // Disable static optimization for dynamic routes
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig 