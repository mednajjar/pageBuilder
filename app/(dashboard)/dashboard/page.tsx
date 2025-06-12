'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalPages: number
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalPages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}</h1>
        <p className="mt-2 text-muted-foreground">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Orders</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalOrders}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
          <div className="mt-2 text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Products</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalProducts}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-sm font-medium text-muted-foreground">Total Pages</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalPages}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="mt-4 text-sm text-muted-foreground">
            No recent orders to display.
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="mt-4 text-sm text-muted-foreground">
            No recent activity to display.
          </div>
        </div>
      </div>
    </div>
  )
} 