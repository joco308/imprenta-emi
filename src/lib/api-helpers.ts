import { NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function getServerClient() {
  return await createClient()
}

export function ok<T>(data: T) {
  return NextResponse.json(data)
}

export function created<T>(data: T) {
  return NextResponse.json(data, { status: 201 })
}

export function noContent() {
  return new NextResponse(null, { status: 204 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function notFound(message = 'Recurso no encontrado') {
  return NextResponse.json({ error: message }, { status: 404 })
}

export function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : 'Error interno del servidor'
  return NextResponse.json({ error: message }, { status: 500 })
}
