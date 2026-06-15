import { ImpresionesOrdenesRepository } from '@/lib/repositories/impresiones_ordenes.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const ordenId = searchParams.get('orden')
    const impresionId = searchParams.get('impresion')
    const db = await getServerClient()
    const repo = new ImpresionesOrdenesRepository(db)
    let data
    if (ordenId) data = await repo.findByOrden(Number(ordenId))
    else if (impresionId) data = await repo.findByImpresion(Number(impresionId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.id_orden || !body.id_impresion) return badRequest('Los campos id_orden e id_impresion son requeridos')
    const db = await getServerClient()
    const repo = new ImpresionesOrdenesRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
