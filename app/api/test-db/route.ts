import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET() {
  try {
    // Test database connection with a timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 5000)
    })

    const queryPromise = prisma.$queryRaw`SELECT 1`
    await Promise.race([queryPromise, timeoutPromise])
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      databaseUrl: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    // Check for specific error types
    let errorMessage = 'Failed to connect to database'
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Database connection timed out'
      } else if (error.message.includes('connection')) {
        errorMessage = 'Database connection failed'
      } else if (error.message.includes('authentication')) {
        errorMessage = 'Database authentication failed'
      }
    }

    return NextResponse.json({
      status: 'error',
      message: errorMessage,
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Configured' : 'Not configured'
    }, { status: 500 })
  }
} 