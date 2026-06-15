import { ProductosRepository } from '@/lib/repositories/productos.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoriaId = searchParams.get('categoria')
    const q = searchParams.get('q')
    const db = await getServerClient()
    const repo = new ProductosRepository(db)
    let data
    if (q) data = await repo.buscar(q)
    else if (categoriaId) data = await repo.findByCategoria(Number(categoriaId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.nombre || body.precio === undefined) return badRequest('Los campos nombre y precio son requeridos')
    const db = await getServerClient()
    const repo = new ProductosRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
