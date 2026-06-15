import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Sub_dominio } from './types'

export class SubDominioRepository implements IRepository<Sub_dominio> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Sub_dominio[]> {
    const { data } = await this.db.from('Sub_dominio').select('*')
    return (data ?? []) as Sub_dominio[]
  }

  async findById(id: number): Promise<Sub_dominio | null> {
    const { data } = await this.db.from('Sub_dominio').select('*').eq('id', id).single()
    return data as Sub_dominio | null
  }

  async create(data: Omit<Sub_dominio, 'id'>): Promise<Sub_dominio> {
    const { data: created } = await this.db.from('Sub_dominio').insert(data).select().single()
    return created as Sub_dominio
  }

  async update(id: number, data: Partial<Sub_dominio>): Promise<Sub_dominio> {
    const { data: updated } = await this.db.from('Sub_dominio').update(data).eq('id', id).select().single()
    return updated as Sub_dominio
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Sub_dominio').delete().eq('id', id)
  }

  async findByDominio(dominioId: number): Promise<Sub_dominio[]> {
    const { data } = await this.db.from('Sub_dominio').select('*').eq('id_dominio', dominioId)
    return (data ?? []) as Sub_dominio[]
  }

  async findBySubdominioAndDominio(subdominio: string, dominio: string): Promise<Sub_dominio | null> {
    const { data: dominios } = await this.db.from('Dominio').select('id').eq('dominio', dominio).maybeSingle()
    if (!dominios) return null
    const { data } = await this.db
      .from('Sub_dominio')
      .select('*')
      .eq('subdominio', subdominio)
      .eq('id_dominio', (dominios as { id: number }).id)
      .maybeSingle()
    return data as Sub_dominio | null
  }
}
