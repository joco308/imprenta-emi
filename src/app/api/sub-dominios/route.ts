import { SubDominioRepository } from '@/lib/repositories/sub_dominio.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const dominioId = searchParams.get('dominio')
    const db = await getServerClient()
    const repo = new SubDominioRepository(db)
    const data = dominioId ? await repo.findByDominio(Number(dominioId)) : await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.subdominio || !body.id_dominio) return badRequest('Los campos subdominio e id_dominio son requeridos')
    const db = await getServerClient()
    const repo = new SubDominioRepository(db)
    const record = await repo.create(body)
    return created(record)
  } catch (e) { return serverError(e) }
}
