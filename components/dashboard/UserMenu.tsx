'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = () => {
    setIsOpen(false)
    signOut({ redirect: false }).then(() => {
      router.push('/')
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-full p-2 hover:bg-accent"
      >
        <span className="text-sm font-medium">{session?.user?.name}</span>
        <svg
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed right-4 mt-2 w-48 rounded-md border bg-card py-1 shadow-lg z-[100]">
          <Link
            href="/settings/store"
            className="block px-4 py-2 text-sm hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Store Settings
          </Link>
          <Link
            href="/settings/account"
            className="block px-4 py-2 text-sm hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            Account Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
} 