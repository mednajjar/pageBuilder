import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const session = await getServerSession(authOptions)
    
    // Log session for debugging
    console.log('Session in store setup:', session)

    // Check if user is authenticated
    if (!session?.user?.id || !session?.user?.email) {
      console.log('No session or missing user data:', session)
      return new Response(JSON.stringify({ error: 'Unauthorized - Please sign in' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const { name, subdomain, language, currency } = await request.json()

    if (!name || !subdomain || !language || !currency) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9-]+\.pagebuilder\.com$/
    if (!subdomainRegex.test(subdomain)) {
      return new Response(JSON.stringify({ error: 'Invalid subdomain format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // Get user with their store
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { store: true }
    })

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // Check if store name or subdomain is already taken by another user
    const existingStore = await prisma.store.findFirst({
      where: {
        OR: [
          { name },
          { subdomain }
        ],
        NOT: {
          userId: user.id
        }
      }
    })

    if (existingStore) {
      return new Response(JSON.stringify({ error: 'Store name or subdomain already taken' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // Update store and user in a transaction
    const [store] = await prisma.$transaction([
      // Update store
      prisma.store.upsert({
        where: { userId: user.id },
        create: {
          name,
          subdomain,
          language,
          currency,
          userId: user.id
        },
        update: {
          name,
          subdomain,
          language,
          currency
        }
      }),
      // Mark setup as completed
      prisma.user.update({
        where: { id: user.id },
        data: { setupCompleted: true }
      })
    ])

    return new Response(JSON.stringify(store), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Store setup error:', error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 