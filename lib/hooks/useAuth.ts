import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface AuthError {
  message: string
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError({ message: result.error })
        return false
      }

      router.push('/dashboard')
      return true
    } catch (error) {
      setError({ message: 'An error occurred during login' })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Automatically sign in after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError({ message: result.error })
        return false
      }

      router.push('/dashboard')
      return true
    } catch (error) {
      setError({ message: error instanceof Error ? error.message : 'Registration failed' })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    register,
    isLoading,
    error,
  }
} 