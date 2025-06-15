import { NextApiRequest, NextApiResponse } from 'next'
import { DatabaseError } from '@/lib/db-utils'

interface PrismaError extends Error {
  code?: string
}

export function dbErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res)
    } catch (error: unknown) {
      console.error('API Error:', error)

      if (error instanceof DatabaseError) {
        return res.status(400).json({
          status: 'error',
          message: error.message,
          error: process.env.NODE_ENV === 'development' ? error.originalError : undefined
        })
      }

      // Handle Prisma errors
      const prismaError = error as PrismaError
      if (prismaError.code?.startsWith('P')) {
        return res.status(400).json({
          status: 'error',
          message: 'Database operation failed',
          error: process.env.NODE_ENV === 'development' ? error : undefined
        })
      }

      // Handle connection errors
      if (error instanceof Error && error.message?.includes('connection')) {
        return res.status(503).json({
          status: 'error',
          message: 'Database connection error',
          error: process.env.NODE_ENV === 'development' ? error : undefined
        })
      }

      // Handle other errors
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      })
    }
  }
} 