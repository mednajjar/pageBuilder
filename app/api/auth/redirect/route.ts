import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ redirect: '/auth/signin' })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user) {
      return NextResponse.json({ redirect: '/auth/signin' })
    }

    // If email is not verified, redirect to verification page
    if (!user.verified) {
      return NextResponse.json({
        redirect: `/auth/verify?email=${encodeURIComponent(user.email || '')}`
      })
    }

    // If store setup is not completed, redirect to setup page
    if (!user.setupCompleted) {
      return NextResponse.json({ redirect: '/store/setup' })
    }

    // If everything is completed, redirect to dashboard
    return NextResponse.json({ redirect: '/dashboard' })
  } catch (error) {
    console.error('Error getting auth redirect:', error)
    return NextResponse.json(
      { error: 'Failed to get redirect path' },
      { status: 500 }
    )
  }
} 