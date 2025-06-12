export async function getAuthRedirect() {
  try {
    const response = await fetch('/api/auth/redirect')
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get redirect path')
    }

    return data.redirect
  } catch (error) {
    console.error('Error getting auth redirect:', error)
    return '/auth/signin'
  }
} 