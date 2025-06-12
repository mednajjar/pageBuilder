'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerificationSuccess() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/store/setup')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verified Successfully!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for verifying your email address.
          </p>
          <p className="mt-4 text-center text-sm text-gray-500">
            Redirecting to store setup in {countdown} seconds...
          </p>
          <div className="mt-4">
            <button
              onClick={() => router.push('/store/setup')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Set up your store now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 