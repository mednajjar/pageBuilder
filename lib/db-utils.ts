export class DatabaseError extends Error {
  originalError: any

  constructor(message: string, originalError?: any) {
    super(message)
    this.name = 'DatabaseError'
    this.originalError = originalError
  }
}

export function isDatabaseError(error: any): error is DatabaseError {
  return error instanceof DatabaseError
}

export function handleDatabaseError(error: any): never {
  if (error.code?.startsWith('P')) {
    // Prisma error
    throw new DatabaseError('Database operation failed', error)
  }

  if (error.message?.includes('connection')) {
    // Connection error
    throw new DatabaseError('Database connection error', error)
  }

  // Generic database error
  throw new DatabaseError('Database error occurred', error)
} 