import { UsuariosTokensRepository } from '@/lib/repositories/usuarios_tokens.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuario')
    const token = searchParams.get('token')
    const db = await getServerClient()
    const repo = new UsuariosTokensRepository(db)
    let data
    if (token) data = await repo.findByToken(token)
    else if (usuarioId) data = await repo.findByUsuario(Number(usuarioId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.token || !body.id_usuario) return badRequest('Los campos token e id_usuario son requeridos')
    const db = await getServerClient()
    const repo = new UsuariosTokensRepository(db)
    const created = await repo.create(body)
    return created(created)
  } catch (e) { return serverError(e) }
}
