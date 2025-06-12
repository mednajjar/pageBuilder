import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Get the page from the database
    const page = await prisma.page.findFirst({
      where: {
        id: params.id,
        storeId: user.store.id
      }
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Update the page in the database
    const page = await prisma.page.update({
      where: {
        id: params.id,
        storeId: user.store.id
      },
      data: {
        title: body.title,
        name: body.name,
        content: body.content,
        published: body.published
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Delete the page from the database
    await prisma.page.delete({
      where: {
        id: params.id,
        storeId: user.store.id
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