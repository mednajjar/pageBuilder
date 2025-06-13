'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const email = searchParams?.get('email')
        const token = searchParams?.get('token')

        if (!email || !token) {
          setVerificationStatus('error')
          setError('Missing verification parameters')
          return
        }

        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, token }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Verification failed')
        }

        setVerificationStatus('success')
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } catch (err) {
        setVerificationStatus('error')
        setError(err instanceof Error ? err.message : 'An error occurred during verification')
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          {verificationStatus === 'loading' && 'Verifying your email...'}
          {verificationStatus === 'success' && 'Email verified successfully!'}
          {verificationStatus === 'error' && 'Verification failed'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationStatus === 'loading' && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        {verificationStatus === 'success' && (
          <div className="text-center">
            <p className="text-green-600 mb-4">Your email has been verified successfully!</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </div>
        )}
        {verificationStatus === 'error' && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={() => router.push('/auth/login')}
            >
              Return to Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </CardContent>
        </Card>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  )
} 