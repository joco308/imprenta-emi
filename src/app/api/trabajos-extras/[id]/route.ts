import { TrabajosImpresionExtrasRepository } from '@/lib/repositories/trabajos_impresion_extras.repository'
import { getServerClient, ok, notFound, serverError, noContent } from '@/lib/api-helpers'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getServerClient()
    const repo = new TrabajosImpresionExtrasRepository(db)
    const data = await repo.findById(Number(id))
    if (!data) return notFound()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const db = await getServerClient()
    const repo = new TrabajosImpresionExtrasRepository(db)
    const updated = await repo.update(Number(id), body)
    return ok(updated)
  } catch (e) { return serverError(e) }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const db = await getServerClient()
    const repo = new TrabajosImpresionExtrasRepository(db)
    await repo.delete(Number(id))
    return noContent()
  } catch (e) { return serverError(e) }
}
