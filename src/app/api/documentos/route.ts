import { DocumentosRepository } from '@/lib/repositories/documentos.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuario')
    const db = await getServerClient()
    const repo = new DocumentosRepository(db)
    const data = usuarioId ? await repo.findByUsuario(Number(usuarioId)) : await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.original_nombre || !body.id_usuario) return badRequest('Los campos original_nombre e id_usuario son requeridos')
    const db = await getServerClient()
    const repo = new DocumentosRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
