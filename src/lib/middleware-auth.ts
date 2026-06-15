import NextAuth from 'next-auth'
import {
  microsoftProvider,
  jwtCallback,
  sessionCallback,
  signInCallback,
} from '@/lib/auth-shared'

export const { auth } = NextAuth({
  providers: [microsoftProvider],
  callbacks: {
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },
})
