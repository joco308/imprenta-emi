import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Documento } from './types'

export class DocumentosRepository implements IRepository<Documento> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Documento[]> {
    const { data } = await this.db.from('Documentos').select('*')
    return (data ?? []) as Documento[]
  }

  async findById(id: number): Promise<Documento | null> {
    const { data } = await this.db.from('Documentos').select('*').eq('id', id).single()
    return data as Documento | null
  }

  async create(data: Omit<Documento, 'id'>): Promise<Documento> {
    const { data: created } = await this.db.from('Documentos').insert(data).select().single()
    return created as Documento
  }

  async update(id: number, data: Partial<Documento>): Promise<Documento> {
    const { data: updated } = await this.db.from('Documentos').update(data).eq('id', id).select().single()
    return updated as Documento
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Documentos').delete().eq('id', id)
  }

  async findByUsuario(usuarioId: number): Promise<Documento[]> {
    const { data } = await this.db.from('Documentos').select('*').eq('id_usuario', usuarioId)
    return (data ?? []) as Documento[]
  }
}
