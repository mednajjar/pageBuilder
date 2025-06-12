import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's store
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { store: true }
    })

    if (!user?.store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Get all pages for the store
    const pages = await prisma.page.findMany({
      where: { storeId: user.store.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's store
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { store: true }
    })

    if (!user?.store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const body = await request.json()

    // Create new page in the database
    const page = await prisma.page.create({
      data: {
        storeId: user.store.id,
        title: body.title || 'Untitled Page',
        name: body.name || `page-${Date.now()}`,
        content: body.content || [],
        published: false
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  const index = pages.findIndex(page => page.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }
  pages[index] = body
  return NextResponse.json(body)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  const index = pages.findIndex(p => p.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }
  pages.splice(index, 1)
  return NextResponse.json({ success: true })
} 