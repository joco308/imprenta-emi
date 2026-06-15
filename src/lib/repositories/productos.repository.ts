import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Producto } from './types'

export class ProductosRepository implements IRepository<Producto> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Producto[]> {
    const { data } = await this.db.from('Productos').select('*')
    return (data ?? []) as Producto[]
  }

  async findById(id: number): Promise<Producto | null> {
    const { data } = await this.db.from('Productos').select('*').eq('id', id).single()
    return data as Producto | null
  }

  async create(data: Omit<Producto, 'id'>): Promise<Producto> {
    const { data: created } = await this.db.from('Productos').insert(data).select().single()
    return created as Producto
  }

  async update(id: number, data: Partial<Producto>): Promise<Producto> {
    const { data: updated } = await this.db.from('Productos').update(data).eq('id', id).select().single()
    return updated as Producto
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Productos').delete().eq('id', id)
  }

  async findByCategoria(categoriaId: number): Promise<Producto[]> {
    const { data } = await this.db.from('Productos').select('*').eq('id_cateogira', categoriaId)
    return (data ?? []) as Producto[]
  }

  async buscar(query: string): Promise<Producto[]> {
    const { data } = await this.db.from('Productos').select('*').ilike('nombre', `%${query}%`)
    return (data ?? []) as Producto[]
  }
}
