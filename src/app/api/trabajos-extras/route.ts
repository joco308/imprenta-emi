import { TrabajosImpresionExtrasRepository } from '@/lib/repositories/trabajos_impresion_extras.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET() {
  try {
    const db = await getServerClient()
    const repo = new TrabajosImpresionExtrasRepository(db)
    const data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.opcion_nombre) return badRequest('El campo opcion_nombre es requerido')
    const db = await getServerClient()
    const repo = new TrabajosImpresionExtrasRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
