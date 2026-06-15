import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { ProductoOrden } from './types'

export class ProductoOrdenesRepository implements IRepository<ProductoOrden> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<ProductoOrden[]> {
    const { data } = await this.db.from('producto_ordenes').select('*')
    return (data ?? []) as ProductoOrden[]
  }

  async findById(id: number): Promise<ProductoOrden | null> {
    const { data } = await this.db.from('producto_ordenes').select('*').eq('id', id).single()
    return data as ProductoOrden | null
  }

  async create(data: Omit<ProductoOrden, 'id'>): Promise<ProductoOrden> {
    const { data: created } = await this.db.from('producto_ordenes').insert(data).select().single()
    return created as ProductoOrden
  }

  async update(id: number, data: Partial<ProductoOrden>): Promise<ProductoOrden> {
    const { data: updated } = await this.db.from('producto_ordenes').update(data).eq('id', id).select().single()
    return updated as ProductoOrden
  }

  async delete(id: number): Promise<void> {
    await this.db.from('producto_ordenes').delete().eq('id', id)
  }

  async findByOrden(ordenId: number): Promise<ProductoOrden[]> {
    const { data } = await this.db.from('producto_ordenes').select('*').eq('id_orden', ordenId)
    return (data ?? []) as ProductoOrden[]
  }

  async findByProducto(productoId: number): Promise<ProductoOrden[]> {
    const { data } = await this.db.from('producto_ordenes').select('*').eq('id_producto', productoId)
    return (data ?? []) as ProductoOrden[]
  }
}
