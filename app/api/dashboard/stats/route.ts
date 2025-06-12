import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's store
    const store = await prisma.store.findUnique({
      where: { userId: session.user.id },
      include: {
        products: true,
        pages: true,
        orders: true,
      },
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      )
    }

    // Calculate total revenue
    const totalRevenue = store.orders.reduce((sum, order) => sum + order.amount, 0)

    return NextResponse.json({
      totalOrders: store.orders.length,
      totalRevenue,
      totalProducts: store.products.length,
      totalPages: store.pages.length,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 