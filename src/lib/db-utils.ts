import { prisma } from './db'
import { Prisma } from '@prisma/client'

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors
      switch (error.code) {
        case 'P2002':
          throw new DatabaseError('A unique constraint would be violated', error)
        case 'P2025':
          throw new DatabaseError('Record not found', error)
        default:
          throw new DatabaseError(`Database error: ${error.message}`, error)
      }
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new DatabaseError('Unknown database error', error)
    } else if (error instanceof Prisma.PrismaClientRustPanicError) {
      throw new DatabaseError('Database connection error', error)
    } else {
      throw new DatabaseError(errorMessage, error)
    }
  }
}

// Example usage:
export async function findUserByEmail(email: string) {
  return withErrorHandling(
    () => prisma.user.findUnique({ where: { email } }),
    'Error finding user by email'
  )
}

export async function createUser(data: Prisma.UserCreateInput) {
  return withErrorHandling(
    () => prisma.user.create({ data }),
    'Error creating user'
  )
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  return withErrorHandling(
    () => prisma.user.update({ where: { id }, data }),
    'Error updating user'
  )
}

export async function deleteUser(id: string) {
  return withErrorHandling(
    () => prisma.user.delete({ where: { id } }),
    'Error deleting user'
  )
} 