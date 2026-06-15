/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { UsuariosRepository } from '@/lib/repositories/usuarios.repository'
import {
  getDb,
  microsoftProvider,
  jwtCallback,
  sessionCallback,
  signInCallback,
} from '@/lib/auth-shared'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    microsoftProvider,
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        if (!email || !password) return null

        const db = getDb()
        const repo = new UsuariosRepository(db)
        const user = await repo.findByCorreo(email)

        if (!user || !user.contraseña_hash) return null

        let bcrypt: any
        try {
          bcrypt = await import('bcrypt')
        } catch {
          return null
        }

        const isValid = await bcrypt.compare(password, user.contraseña_hash)
        if (!isValid) return null

        return {
          id: String(user.id),
          email: user.correo,
          name: `${user.nombres} ${user.apellidos}`,
        }
      },
    }),
  ],
  callbacks: {
    signIn: signInCallback,
    jwt: jwtCallback,
    session: sessionCallback,
  },
})
