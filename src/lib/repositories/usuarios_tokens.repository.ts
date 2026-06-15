import type { SupabaseClient } from '@supabase/supabase-js'
import type { IRepository } from './base'
import type { UsuarioToken } from './types'

export class UsuariosTokensRepository implements IRepository<UsuarioToken> {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<UsuarioToken[]> {
    const { data } = await this.db.from('Usuarios_tokens').select('*')
    return (data ?? []) as UsuarioToken[]
  }

  async findById(id: number): Promise<UsuarioToken | null> {
    const { data } = await this.db.from('Usuarios_tokens').select('*').eq('id', id).single()
    return data as UsuarioToken | null
  }

  async create(data: Omit<UsuarioToken, 'id'>): Promise<UsuarioToken> {
    const { data: created } = await this.db.from('Usuarios_tokens').insert(data).select().single()
    return created as UsuarioToken
  }

  async update(id: number, data: Partial<UsuarioToken>): Promise<UsuarioToken> {
    const { data: updated } = await this.db.from('Usuarios_tokens').update(data).eq('id', id).select().single()
    return updated as UsuarioToken
  }

  async delete(id: number): Promise<void> {
    await this.db.from('Usuarios_tokens').delete().eq('id', id)
  }

  async findByUsuario(usuarioId: number): Promise<UsuarioToken[]> {
    const { data } = await this.db.from('Usuarios_tokens').select('*').eq('id_usuario', usuarioId)
    return (data ?? []) as UsuarioToken[]
  }

  async findByToken(token: string): Promise<UsuarioToken | null> {
    const { data } = await this.db.from('Usuarios_tokens').select('*').eq('token', token).single()
    return data as UsuarioToken | null
  }
}
