'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PageBuilder from '@/components/landing-page/PageBuilder'

interface Page {
  id: string
  title: string
  name: string
  content: any[]
}

export default function LandingPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/landing-pages/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch page')
        }
        const data = await response.json()
        setPage(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page')
      } finally {
        setLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchPage()
    }
  }, [status, router, params.id])

  const handleUpdatePage = async (content: any[]) => {
    if (!page || isUpdating) return

    setIsUpdating(true)
    setError(null)

    try {
      const response = await fetch(`/api/landing-pages/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...page,
          content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update page')
      }

      const updatedPage = await response.json()
      setPage(updatedPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update page')
      // Revert the content in case of error
      setPage(page)
    } finally {
      setIsUpdating(false)
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

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Page not found</div>
      </div>
    )
  }

  return (
    <PageBuilder
      page={page}
      onUpdate={handleUpdatePage}
    />
  )
} 