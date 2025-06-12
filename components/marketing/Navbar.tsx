import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">PageBuilder</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link href="/features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="/docs" className="text-sm font-medium">
              Documentation
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin" prefetch>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/register" prefetch>
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 