import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      needsPassword: boolean
      email: string
      name: string
      roleId: number
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    needsPassword: boolean
    roleId: number
  }
}
