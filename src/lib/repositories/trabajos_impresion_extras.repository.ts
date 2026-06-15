import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { TrabajoImpresionExtra } from './types'

export class TrabajosImpresionExtrasRepository implements IRepository<TrabajoImpresionExtra> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<TrabajoImpresionExtra[]> {
    const { data } = await this.db.from('Trabajos_impresion_extras').select('*')
    return (data ?? []) as TrabajoImpresionExtra[]
  }

  async findById(id: number): Promise<TrabajoImpresionExtra | null> {
    const { data } = await this.db.from('Trabajos_impresion_extras').select('*').eq('id', id).single()
    return data as TrabajoImpresionExtra | null
  }

  async create(data: Omit<TrabajoImpresionExtra, 'id'>): Promise<TrabajoImpresionExtra> {
    const { data: created } = await this.db.from('Trabajos_impresion_extras').insert(data).select().single()
    return created as TrabajoImpresionExtra
  }

  async update(id: number, data: Partial<TrabajoImpresionExtra>): Promise<TrabajoImpresionExtra> {
    const { data: updated } = await this.db.from('Trabajos_impresion_extras').update(data).eq('id', id).select().single()
    return updated as TrabajoImpresionExtra
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Trabajos_impresion_extras').delete().eq('id', id)
  }
}
