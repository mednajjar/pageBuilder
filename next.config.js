/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
  // Disable static optimization for dynamic routes
  staticPageGenerationTimeout: 120,
  // Configure which pages should be static
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/auth/login': { page: '/auth/login' },
      '/auth/register': { page: '/auth/register' },
      '/auth/verify': { page: '/auth/verify' },
      '/dashboard': { page: '/dashboard' },
      '/dashboard/settings': { page: '/dashboard/settings' },
      '/dashboard/stores': { page: '/dashboard/stores' },
      '/dashboard/stores/[id]': { page: '/dashboard/stores/[id]' },
      '/dashboard/stores/[id]/edit': { page: '/dashboard/stores/[id]/edit' },
      '/dashboard/stores/[id]/preview': { page: '/dashboard/stores/[id]/preview' },
      '/dashboard/stores/[id]/settings': { page: '/dashboard/stores/[id]/settings' },
      '/dashboard/stores/[id]/analytics': { page: '/dashboard/stores/[id]/analytics' },
      '/dashboard/stores/[id]/orders': { page: '/dashboard/stores/[id]/orders' },
      '/dashboard/stores/[id]/products': { page: '/dashboard/stores/[id]/products' },
      '/dashboard/stores/[id]/products/[productId]': { page: '/dashboard/stores/[id]/products/[productId]' },
      '/dashboard/stores/[id]/products/[productId]/edit': { page: '/dashboard/stores/[id]/products/[productId]/edit' },
      '/dashboard/stores/[id]/products/[productId]/preview': { page: '/dashboard/stores/[id]/products/[productId]/preview' },
      '/dashboard/stores/[id]/products/[productId]/analytics': { page: '/dashboard/stores/[id]/products/[productId]/analytics' },
      '/dashboard/stores/[id]/products/[productId]/orders': { page: '/dashboard/stores/[id]/products/[productId]/orders' },
      '/dashboard/stores/[id]/products/[productId]/settings': { page: '/dashboard/stores/[id]/products/[productId]/settings' },
      '/dashboard/stores/[id]/products/[productId]/variants': { page: '/dashboard/stores/[id]/products/[productId]/variants' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/edit': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/edit' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/preview': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/preview' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/analytics': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/analytics' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/orders': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/orders' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/settings': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/settings' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/edit': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/edit' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/preview': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/preview' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/analytics': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/analytics' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/orders': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/orders' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/settings': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/settings' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/edit': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/edit' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/preview': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/preview' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/analytics': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/analytics' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/orders': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/orders' },
      '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/settings': { page: '/dashboard/stores/[id]/products/[productId]/variants/[variantId]/inventory/[inventoryId]/inventory/[inventoryId]/settings' },
    }
  },
}

module.exports = nextConfig 