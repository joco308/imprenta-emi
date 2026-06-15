import { UsuariosRepository } from '@/lib/repositories/usuarios.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const rolId = searchParams.get('rol')
    const correo = searchParams.get('correo')
    const db = await getServerClient()
    const repo = new UsuariosRepository(db)
    let data
    if (correo) data = await repo.findByCorreo(correo)
    else if (rolId) data = await repo.findByRol(Number(rolId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.correo || !body.contraseña_hash) return badRequest('Los campos correo y contraseña_hash son requeridos')
    const db = await getServerClient()
    const repo = new UsuariosRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
