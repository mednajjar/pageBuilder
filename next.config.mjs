/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Disable static optimization for dynamic routes
  experimental: {
    appDir: true,
  },
  // Configure which pages should be static and which should be dynamic
  async rewrites() {
    return {
      beforeFiles: [
        // Handle NextAuth API routes
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',
        },
        // Handle other dynamic API routes
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    }
  },
  // Exclude API routes from static generation
  async generateStaticParams() {
    return {
      // Add any dynamic routes that should be pre-rendered
      '/auth/verify': { dynamic: true },
    }
  }
}

export default nextConfig
