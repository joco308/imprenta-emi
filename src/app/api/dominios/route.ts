import { DominioRepository } from '@/lib/repositories/dominio.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET() {
  try {
    const db = await getServerClient()
    const repo = new DominioRepository(db)
    const data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.dominio) return badRequest('El campo dominio es requerido')
    const db = await getServerClient()
    const repo = new DominioRepository(db)
    const created = await repo.create(body)
    return created(created)
  } catch (e) { return serverError(e) }
}
