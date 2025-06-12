import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const storeSchema = z.object({
  storeName: z.string().min(3).max(63).regex(/^[a-z0-9-]+$/),
  language: z.enum(['en', 'ar']),
  currency: z.string().min(3).max(3),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { storeName, language, currency } = storeSchema.parse(body)

    // Generate a unique subdomain from the store name
    const subdomain = storeName.toLowerCase().replace(/[^a-z0-9-]/g, '-')

    // Check if store name is already taken
    const existingStore = await prisma.store.findUnique({
      where: { name: storeName }
    })

    if (existingStore) {
      return NextResponse.json(
        { error: 'Store name is already taken' },
        { status: 400 }
      )
    }

    // Check if subdomain is already taken
    const existingSubdomain = await prisma.store.findUnique({
      where: { subdomain }
    })

    if (existingSubdomain) {
      return NextResponse.json(
        { error: 'Subdomain is already taken' },
        { status: 400 }
      )
    }

    // Check if user already has a store
    const userStore = await prisma.store.findUnique({
      where: { userId: session.user.id }
    })

    if (userStore) {
      return NextResponse.json(
        { error: 'User already has a store' },
        { status: 400 }
      )
    }

    // Create store
    const store = await prisma.store.create({
      data: {
        name: storeName,
        subdomain,
        userId: session.user.id,
        language,
        currency,
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }

    console.error('Store creation error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 