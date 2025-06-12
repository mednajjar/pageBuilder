import { prisma } from './prisma'

export async function getUserStore(userId: string) {
  return await prisma.store.findUnique({
    where: { userId }
  })
}

export async function requireStore(userId: string) {
  const store = await getUserStore(userId)
  if (!store) {
    throw new Error('Store not found')
  }
  return store
} 