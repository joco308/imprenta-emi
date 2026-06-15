import { OrdenRepository } from '@/lib/repositories/orden.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuario')
    const estadoId = searchParams.get('estado')
    const db = await getServerClient()
    const repo = new OrdenRepository(db)
    let data
    if (usuarioId) data = await repo.findByUsuario(Number(usuarioId))
    else if (estadoId) data = await repo.findByEstado(Number(estadoId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.id_usuario) return badRequest('El campo id_usuario es requerido')
    const db = await getServerClient()
    const repo = new OrdenRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
