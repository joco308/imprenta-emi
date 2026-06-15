import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { Usuario } from './types'

export class UsuariosRepository implements IRepository<Usuario> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Usuario[]> {
    const { data } = await this.db.from('Usuarios').select('*')
    return (data ?? []) as Usuario[]
  }

  async findById(id: number): Promise<Usuario | null> {
    const { data } = await this.db.from('Usuarios').select('*').eq('id', id).maybeSingle()
    return data as Usuario | null
  }

  async create(data: Omit<Usuario, 'id'>): Promise<Usuario> {
    const { data: created, error } = await this.db.from('Usuarios').insert(data).select().single()
    if (error) throw new Error(`Error al crear usuario: ${error.message}`)
    return created as Usuario
  }

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    const { data: updated, error } = await this.db.from('Usuarios').update(data).eq('id', id).select().single()
    if (error) throw new Error(`Error al actualizar usuario: ${error.message}`)
    return updated as Usuario
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Usuarios').delete().eq('id', id)
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    const { data } = await this.db.from('Usuarios').select('*').eq('correo', correo).maybeSingle()
    return data as Usuario | null
  }

  async findByRol(rolId: number): Promise<Usuario[]> {
    const { data } = await this.db.from('Usuarios').select('*').eq('id_rol', rolId)
    return (data ?? []) as Usuario[]
  }
}
