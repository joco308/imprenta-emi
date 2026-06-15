export interface Dominio {
  id: number
  dominio: string
}

export interface Sub_dominio {
  id: number
  id_dominio: number
  subdominio: string
}

export interface Usuario {
  id: number
  id_tipo_autenticacion: number
  id_rol: number
  nombres: string
  apellidos: string
  correo: string
  contraseña_hash: string
  estado: boolean
  codigo_2FA: string | null
  vigencia_2FA: string | null
  estado_2FA: boolean
}

export interface UsuarioToken {
  id: number
  id_usuario: number
  token: string
  expiracion: string
  ip: string
}

export interface Impresora {
  id: number
  id_estatus: number
  id_operativa: number
  nombre: string
  ip_impresora: string | null
  doble_cara: boolean
  color: boolean
}

export interface Documento {
  id: number
  id_usuario: number
  original_nombre: string
  nombre_interno: string
  tipo: string
  tamaño: number
  ruta: string
}

export interface Impresion {
  id: number
  id_usuario: number
  id_documento: number
  id_impresora: number
  id_estado_imprecion: number
  id_tamaño_papel: number
  id_trabajo_extra: number | null
  trabajo_extra: boolean
  prioridad: number
  copias: number
  total_paginas: number
  color: boolean
  doble_cara: boolean
  precio_total: number
  notas: string
  entrada_cola: string
  inicio_impresion: string
  fin_impresion: string | null
}

export interface TrabajoImpresionExtra {
  id: number
  opcion_nombre: string
  costo_extra: number
}

export interface Producto {
  id: number
  id_cateogira: number
  nombre: string
  descripcion: string
  precio: number
  stok: number
}

export interface Orden {
  id: number
  id_usuario: number
  id_estado: number
  id_metodo_pago: number
  precio_total: number
  entragado: boolean
}

export interface ProductoOrden {
  id: number
  id_producto: number
  id_orden: number
  cantidad: number
  precio_unitario: number
  precio_total: number
}

export interface ImpresionOrden {
  id: number
  id_impresion: number
  id_orden: number
  preciototal: number
}
