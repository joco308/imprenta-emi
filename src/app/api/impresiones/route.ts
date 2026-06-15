import { ImpresionRepository } from '@/lib/repositories/impresion.repository'
import { getServerClient, ok, created, badRequest, serverError } from '@/lib/api-helpers'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const usuarioId = searchParams.get('usuario')
    const estadoId = searchParams.get('estado')
    const queue = searchParams.get('queue')
    const db = await getServerClient()
    const repo = new ImpresionRepository(db)
    let data
    if (queue === 'true') data = await repo.getQueue()
    else if (usuarioId) data = await repo.findByUsuario(Number(usuarioId))
    else if (estadoId) data = await repo.findByEstado(Number(estadoId))
    else data = await repo.findAll()
    return ok(data)
  } catch (e) { return serverError(e) }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.id_usuario || !body.total_paginas) return badRequest('Los campos id_usuario y total_paginas son requeridos')
    const db = await getServerClient()
    const repo = new ImpresionRepository(db)
    const created = await repo.create(body)
    return created(created)
  } catch (e) { return serverError(e) }
}
