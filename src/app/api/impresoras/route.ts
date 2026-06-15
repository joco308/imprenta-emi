import { ImpresorasRepository } from '@/lib/repositories/impresoras.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const disponibles = searchParams.get('disponibles')
    const db = await getServerClient()
    const repo = new ImpresorasRepository(db)
    const data = disponibles === 'true' ? await repo.findDisponibles() : await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.nombre) return badRequest('El campo nombre es requerido')
    const db = await getServerClient()
    const repo = new ImpresorasRepository(db)
    const created = await repo.create(body)
    return created(created)
  } catch (e) { return serverError(e) }
}
