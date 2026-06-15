import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { ImpresionOrden } from './types'

export class ImpresionesOrdenesRepository implements IRepository<ImpresionOrden> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<ImpresionOrden[]> {
    const { data } = await this.db.from('impresiones_ordenes').select('*')
    return (data ?? []) as ImpresionOrden[]
  }

  async findById(id: number): Promise<ImpresionOrden | null> {
    const { data } = await this.db.from('impresiones_ordenes').select('*').eq('id', id).single()
    return data as ImpresionOrden | null
  }

  async create(data: Omit<ImpresionOrden, 'id'>): Promise<ImpresionOrden> {
    const { data: created } = await this.db.from('impresiones_ordenes').insert(data).select().single()
    return created as ImpresionOrden
  }

  async update(id: number, data: Partial<ImpresionOrden>): Promise<ImpresionOrden> {
    const { data: updated } = await this.db.from('impresiones_ordenes').update(data).eq('id', id).select().single()
    return updated as ImpresionOrden
  }

  async delete(id: number): Promise<void> {
    await this.db.from('impresiones_ordenes').delete().eq('id', id)
  }

  async findByOrden(ordenId: number): Promise<ImpresionOrden[]> {
    const { data } = await this.db.from('impresiones_ordenes').select('*').eq('id_orden', ordenId)
    return (data ?? []) as ImpresionOrden[]
  }

  async findByImpresion(impresionId: number): Promise<ImpresionOrden[]> {
    const { data } = await this.db.from('impresiones_ordenes').select('*').eq('id_impresion', impresionId)
    return (data ?? []) as ImpresionOrden[]
  }
}
