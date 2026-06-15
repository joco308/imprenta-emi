import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Impresora } from './types'

export class ImpresorasRepository implements IRepository<Impresora> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Impresora[]> {
    const { data } = await this.db.from('Impresoras').select('*')
    return (data ?? []) as Impresora[]
  }

  async findById(id: number): Promise<Impresora | null> {
    const { data } = await this.db.from('Impresoras').select('*').eq('id', id).single()
    return data as Impresora | null
  }

  async create(data: Omit<Impresora, 'id'>): Promise<Impresora> {
    const { data: created } = await this.db.from('Impresoras').insert(data).select().single()
    return created as Impresora
  }

  async update(id: number, data: Partial<Impresora>): Promise<Impresora> {
    const { data: updated } = await this.db.from('Impresoras').update(data).eq('id', id).select().single()
    return updated as Impresora
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Impresoras').delete().eq('id', id)
  }

  async findByStatus(estatusId: number): Promise<Impresora[]> {
    const { data } = await this.db.from('Impresoras').select('*').eq('id_estatus', estatusId)
    return (data ?? []) as Impresora[]
  }

  async findDisponibles(): Promise<Impresora[]> {
    const { data } = await this.db.from('Impresoras').select('*').eq('id_estatus', 1)
    return (data ?? []) as Impresora[]
  }
}
