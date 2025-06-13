/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Configure static paths
  trailingSlash: true,
  // Disable static optimization for dynamic routes
  staticPageGenerationTimeout: 120,
  // Configure module resolution
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}

module.exports = nextConfig 