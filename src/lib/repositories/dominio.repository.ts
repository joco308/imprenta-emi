import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Dominio } from './types'

export class DominioRepository implements IRepository<Dominio> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Dominio[]> {
    const { data } = await this.db.from('Dominio').select('*')
    return (data ?? []) as Dominio[]
  }

  async findById(id: number): Promise<Dominio | null> {
    const { data } = await this.db.from('Dominio').select('*').eq('id', id).single()
    return data as Dominio | null
  }

  async create(data: Omit<Dominio, 'id'>): Promise<Dominio> {
    const { data: created } = await this.db.from('Dominio').insert(data).select().single()
    return created as Dominio
  }

  async update(id: number, data: Partial<Dominio>): Promise<Dominio> {
    const { data: updated } = await this.db.from('Dominio').update(data).eq('id', id).select().single()
    return updated as Dominio
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Dominio').delete().eq('id', id)
  }
}
