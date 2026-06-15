import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Orden } from './types'

export class OrdenRepository implements IRepository<Orden> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Orden[]> {
    const { data } = await this.db.from('Orden').select('*')
    return (data ?? []) as Orden[]
  }

  async findById(id: number): Promise<Orden | null> {
    const { data } = await this.db.from('Orden').select('*').eq('id', id).single()
    return data as Orden | null
  }

  async create(data: Omit<Orden, 'id'>): Promise<Orden> {
    const { data: created } = await this.db.from('Orden').insert(data).select().single()
    return created as Orden
  }

  async update(id: number, data: Partial<Orden>): Promise<Orden> {
    const { data: updated } = await this.db.from('Orden').update(data).eq('id', id).select().single()
    return updated as Orden
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Orden').delete().eq('id', id)
  }

  async findByUsuario(usuarioId: number): Promise<Orden[]> {
    const { data } = await this.db.from('Orden').select('*').eq('id_usuario', usuarioId)
    return (data ?? []) as Orden[]
  }

  async findByEstado(estadoId: number): Promise<Orden[]> {
    const { data } = await this.db.from('Orden').select('*').eq('id_estado', estadoId)
    return (data ?? []) as Orden[]
  }
}
