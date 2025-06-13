import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Add connection pooling configuration
  log: ['error', 'warn'],
  // Configure connection pooling
  connectionLimit: 5,
  // Add pgbouncer configuration
  __internal: {
    engine: {
      connectionTimeout: 10000,
      poolTimeout: 10000,
      maxConnections: 10,
      minConnections: 2,
      idleTimeout: 30000,
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 