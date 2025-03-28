// import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

interface UserMetadata {
  role?: string;
}

export const checkRole = async () => {
  const { sessionClaims } = await auth()
  return (sessionClaims?.metadata as UserMetadata)?.role === "admin"
}