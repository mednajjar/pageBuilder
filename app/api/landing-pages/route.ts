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
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Get user's store
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { store: true }
    })

    if (!user?.store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Update the page in the database
    const updatedPage = await prisma.page.update({
      where: {
        id: body.id,
        storeId: user.store.id // Ensure the page belongs to the user's store
      },
      data: {
        title: body.title,
        name: body.name,
        content: body.content,
        published: body.published
      }
    })

    return NextResponse.json(updatedPage)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Get user's store
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { store: true }
    })

    if (!user?.store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Delete the page from the database
    await prisma.page.delete({
      where: {
        id: id,
        storeId: user.store.id // Ensure the page belongs to the user's store
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
} 