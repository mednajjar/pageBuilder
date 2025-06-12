import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for some hosting providers
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
})

// Test the database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    console.log('Successfully connected to the database')
    client.release()
    return true
  } catch (error) {
    console.error('Error connecting to the database:', error)
    return false
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await pool.end()
    await prisma.$disconnect()
    console.log('Database connections closed')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
})

export { pool } 