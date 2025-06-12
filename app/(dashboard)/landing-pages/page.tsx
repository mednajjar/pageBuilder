'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Page {
  id: string
  title: string
  name: string
}

export default function LandingPagesList() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    const fetchPages = async () => {
      try {
        const response = await fetch('/api/landing-pages')
        if (!response.ok) {
          throw new Error('Failed to fetch pages')
        }
        const data = await response.json()
        setPages(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pages')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchPages()
    }
  }, [status, router])

  const handleCreatePage = async () => {
    try {
      const response = await fetch('/api/landing-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Landing Page',
          name: 'New Landing Page'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create page')
      }

      const newPage = await response.json()
      setPages(prev => [...prev, newPage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
          <button
            onClick={handleCreatePage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create New Page
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/landing-pages/${page.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900">{page.title}</h2>
              <p className="mt-2 text-gray-600">{page.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 