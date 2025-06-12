'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserMenu } from '@/components/dashboard/UserMenu'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Orders', href: '/orders' },
  { name: 'Products', href: '/products' },
  { name: 'Landing Pages', href: '/landing-pages' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Store Settings', href: '/settings/store' },
  { name: 'Account Settings', href: '/settings/account' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-card transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="text-xl font-bold">
            PageBuilder
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-2 hover:bg-accent"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`flex min-h-screen flex-col transition-all duration-200 ease-in-out ${
          isSidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 hover:bg-accent"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              Balance: <span className="font-medium">$0.00</span>
            </div>
            <div className="text-sm">
              Plan: <span className="font-medium">Free</span>
            </div>
            <UserMenu />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
} 