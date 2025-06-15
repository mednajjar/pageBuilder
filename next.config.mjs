/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable static optimization for dynamic routes
  experimental: {
    appDir: true,
  },
  // Configure which pages should be static and which should be dynamic
  async generateStaticParams() {
    return {
      // Add any dynamic routes that should be pre-rendered
      '/auth/verify': { dynamic: true },
      '/api/auth/redirect': { dynamic: true },
      '/api/dashboard/stats': { dynamic: true },
      '/api/user': { dynamic: true },
    }
  }
}

export default nextConfig
