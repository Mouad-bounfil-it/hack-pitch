import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    isBanned: boolean
  }
  interface Session {
    user: {
      id: string
      email: string
      isBanned: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    isBanned: boolean
  }
}