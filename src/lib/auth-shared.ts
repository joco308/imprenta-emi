/* eslint-disable @typescript-eslint/no-explicit-any */

import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id'
import { createClient } from '@supabase/supabase-js'
import { UsuariosRepository } from '@/lib/repositories/usuarios.repository'
import { SubDominioRepository } from '@/lib/repositories/sub_dominio.repository'

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

export function getDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts.slice(0, 2).join(' ')
  const lastName = parts.slice(2).join(' ')
  return { firstName, lastName }
}

export const microsoftProvider = MicrosoftEntraID({
  clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
  clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
  tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID!,
  authorization: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID!}/oauth2/v2.0/authorize`,
  token: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID!}/oauth2/v2.0/token`,
})

export async function jwtCallback({ token, account, profile }: any) {
  // Consultar Supabase en el login inicial (cuando account existe),
  // la primera vez (cuando token.userId no está seteado),
  // o si roleId aún no fue seteado (migración desde tokens viejos)
  if (account || !token.userId || !token.roleId) {
    const db = getDb()
    const repo = new UsuariosRepository(db)

    const email = profile?.email ?? token.email

    if (email) {
      try {
        const user = await repo.findByCorreo(email)
        if (user) {
          token.userId = String(user.id)
          token.needsPassword = !user.contraseña_hash
          token.roleId = user.id_rol
          return token
        }
      } catch {
        // fallback a defaults abajo
      }
    }

    // Si no se pudo obtener el usuario, setear defaults
    token.userId = profile?.email ?? token.email ?? ''
    token.needsPassword = false
    token.roleId = 2
  }

  return token
}

export async function sessionCallback({ session, token }: any) {
  return {
    ...session,
    user: {
      ...session.user,
      id: token.userId,
      needsPassword: token.needsPassword,
      roleId: token.roleId,
      role: token.roleId === 1 ? 'Administrador' : token.roleId === 3 ? 'Docente' : 'Estudiante',
    },
  }
}

export async function signInCallback({ user, account: _account, profile }: any) {
  try {
    if (!user.email) {
      console.error('[auth] signIn: email vacío', { user })
      return false
    }

    const db = getDb()
    const usuariosRepo = new UsuariosRepository(db)
    const subDominioRepo = new SubDominioRepository(db)

    const existingUser = await usuariosRepo.findByCorreo(user.email)

    if (existingUser) {
      const profileName = profile?.name ?? user.name ?? ''
      const { firstName, lastName } = splitName(profileName)
      if (firstName !== existingUser.nombres || lastName !== existingUser.apellidos) {
        await usuariosRepo.update(existingUser.id, {
          nombres: firstName,
          apellidos: lastName,
        })
      }
      return true
    }

    const profileName = profile?.name ?? user.name ?? ''
    const { firstName, lastName } = splitName(profileName)

    let idRol = 2
    let idAuthType = 5

    try {
      const rol = await subDominioRepo.findBySubdominioAndDominio('Estudiante', 'Roles')
      const authType = await subDominioRepo.findBySubdominioAndDominio('Microsoft', 'Autenticacion')
      if (rol) idRol = rol.id
      if (authType) idAuthType = authType.id
    } catch (e) {
      console.warn('[auth] signIn: error al leer Sub_dominio, usando fallback IDs', e)
    }

    try {
      await usuariosRepo.create({
        id_tipo_autenticacion: idAuthType,
        id_rol: idRol,
        nombres: firstName,
        apellidos: lastName,
        correo: user.email,
        contraseña_hash: '',
        estado: true,
        codigo_2FA: null,
        vigencia_2FA: null,
        estado_2FA: false,
      })
    } catch (e) {
      console.error('[auth] signIn: error al crear usuario en Supabase', e)
    }

    return true
  } catch (error) {
    console.error('[auth] signIn: error inesperado', error)
    return true
  }
}
