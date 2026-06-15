import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Impresion } from './types'

export class ImpresionRepository implements IRepository<Impresion> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Impresion[]> {
    const { data } = await this.db.from('Impresion').select('*')
    return (data ?? []) as Impresion[]
  }

  async findById(id: number): Promise<Impresion | null> {
    const { data } = await this.db.from('Impresion').select('*').eq('id', id).single()
    return data as Impresion | null
  }

  async create(data: Omit<Impresion, 'id'>): Promise<Impresion> {
    const { data: created } = await this.db.from('Impresion').insert(data).select().single()
    return created as Impresion
  }

  async update(id: number, data: Partial<Impresion>): Promise<Impresion> {
    const { data: updated } = await this.db.from('Impresion').update(data).eq('id', id).select().single()
    return updated as Impresion
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Impresion').delete().eq('id', id)
  }

  async findByUsuario(usuarioId: number): Promise<Impresion[]> {
    const { data } = await this.db.from('Impresion').select('*').eq('id_usuario', usuarioId)
    return (data ?? []) as Impresion[]
  }

  async findByEstado(estadoId: number): Promise<Impresion[]> {
    const { data } = await this.db.from('Impresion').select('*').eq('id_estado_imprecion', estadoId)
    return (data ?? []) as Impresion[]
  }

  async getQueue(): Promise<Impresion[]> {
    const { data } = await this.db
      .from('Impresion')
      .select('*')
      .in('id_estado_imprecion', [1, 2])
      .order('prioridad', { ascending: false })
      .order('entrada_cola', { ascending: true })
    return (data ?? []) as Impresion[]
  }
}
