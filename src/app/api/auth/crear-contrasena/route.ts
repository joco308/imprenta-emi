import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { createClient } from '@supabase/supabase-js'
import { UsuariosRepository } from '@/lib/repositories/usuarios.repository'
import { SubDominioRepository } from '@/lib/repositories/sub_dominio.repository'
import { auth } from '@/auth'
import { splitName } from '@/lib/auth-shared'

export async function POST(req: Request) {
  try {
    const { userId, password } = await req.json()

    if (!userId || !password) {
      return NextResponse.json({ error: 'Usuario y contraseña son requeridos' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    )

    const repo = new UsuariosRepository(db)

    // userId puede ser un ID numérico o un email (fallback cuando la creación inicial falló)
    const userIdNum = Number(userId)
    let user = !isNaN(userIdNum) ? await repo.findById(userIdNum) : null

    // Si no se encontró por ID, buscar por email
    if (!user) {
      user = await repo.findByCorreo(userId)
    }

    if (user) {
      if (user.contraseña_hash) {
        return NextResponse.json({ error: 'El usuario ya tiene una contraseña registrada' }, { status: 409 })
      }
      await repo.update(user.id, { contraseña_hash: hash })
      return NextResponse.json({ ok: true })
    }

    // Obtener nombre real desde la sesión de Microsoft
    const session = await auth()
    const fullName = session?.user?.name ?? ''
    const { firstName, lastName } = splitName(fullName)

    const subDominioRepo = new SubDominioRepository(db)

    let idRol = 2
    let idAuthType = 5
    try {
      const rol = await subDominioRepo.findBySubdominioAndDominio('Estudiante', 'Roles')
      const authType = await subDominioRepo.findBySubdominioAndDominio('Microsoft', 'Autenticacion')
      if (rol) idRol = rol.id
      if (authType) idAuthType = authType.id
    } catch {
      // fallback IDs
    }

    await repo.create({
      id_tipo_autenticacion: idAuthType,
      id_rol: idRol,
      nombres: firstName || 'Usuario',
      apellidos: lastName || 'Microsoft',
      correo: userId,
      contraseña_hash: hash,
      estado: true,
      codigo_2FA: null,
      vigencia_2FA: null,
      estado_2FA: false,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[crear-contrasena] error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
