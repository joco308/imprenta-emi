import { NextRequest } from 'next/server'
import { createClient } from '@/lib/server'
import { ok, serverError } from '@/lib/api-helpers'

interface EnrichedOrder {
  id: string
  id_num: number
  studentName: string
  email: string
  service: string
  pages: number
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled'
  priority: boolean
  total: number
  deliveryTime: string
  submittedAt: string
  userType: 'teacher' | 'student'
}

function mapStatus(dbStatus: string): EnrichedOrder['status'] {
  switch (dbStatus) {
    case 'Pendiente': return 'pending'
    case 'Pagado': return 'processing'
    case 'Entregado': return 'delivered'
    case 'Cancelado': return 'cancelled'
    default: return 'pending'
  }
}

export async function GET() {
  try {
    const db = await createClient()

    const [ordenResult, usuariosResult, subdominioResult, impresionesResult, productosResult] = await Promise.all([
      db.from('Orden').select('*'),
      db.from('Usuarios').select('*'),
      db.from('Sub_dominio').select('*'),
      db.from('Impresion').select('*'),
      db.from('Productos').select('*'),
    ])

    const orders = ordenResult.data ?? []
    const users = usuariosResult.data ?? []
    const subdominios = subdominioResult.data ?? []
    const impresiones = impresionesResult.data ?? []
    const productos = productosResult.data ?? []

    const enrichedOrders: EnrichedOrder[] = orders.map((order: any) => {
      const user = users.find((u: any) => u.id === order.id_usuario)
      const status = subdominios.find((s: any) => s.id === order.id_estado)
      const statusName = status?.subdominio ?? 'Pendiente'

      const date = new Date().toISOString().split('T')[0]

      return {
        id: `ORD-${String(order.id).padStart(4, '0')}`,
        id_num: order.id,
        studentName: user ? `${user.nombres} ${user.apellidos}` : 'Usuario',
        email: user?.correo ?? '',
        service: 'Impresión',
        pages: 0,
        status: mapStatus(statusName),
        priority: false,
        total: Number(order.precio_total),
        deliveryTime: date,
        submittedAt: date,
        userType: user?.id_rol === 3 ? 'teacher' as const : 'student' as const,
      }
    })

    const totalOrders = enrichedOrders.length
    const pending = enrichedOrders.filter(o => o.status === 'pending').length
    const processing = enrichedOrders.filter(o => o.status === 'processing').length
    const ready = enrichedOrders.filter(o => o.status === 'ready').length
    const delivered = enrichedOrders.filter(o => o.status === 'delivered').length
    const cancelled = enrichedOrders.filter(o => o.status === 'cancelled').length
    const totalRevenue = enrichedOrders.reduce((sum, o) => sum + o.total, 0)
    const priorityOrders = enrichedOrders.filter(o => o.priority).length

    const revenueByStatus = {
      pending: enrichedOrders.filter(o => o.status === 'pending').reduce((s, o) => s + o.total, 0),
      processing: enrichedOrders.filter(o => o.status === 'processing').reduce((s, o) => s + o.total, 0),
      delivered: enrichedOrders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.total, 0),
      cancelled: enrichedOrders.filter(o => o.status === 'cancelled').reduce((s, o) => s + o.total, 0),
    }

    const servicesChart = [
      { name: 'Fotocopias', value: 450 },
      { name: 'Impresiones', value: 380 },
      { name: 'Empastados', value: 120 },
      { name: 'Anillados', value: 200 },
      { name: 'CD/DVD', value: 80 },
    ]

    const dailyOrders = [
      { day: 'Lun', orders: 45 },
      { day: 'Mar', orders: 52 },
      { day: 'Mié', orders: 48 },
      { day: 'Jue', orders: 61 },
      { day: 'Vie', orders: 70 },
      { day: 'Sáb', orders: 35 },
    ]

    const peakHours = [
      { hour: '8-10', count: 15 },
      { hour: '10-12', count: 32 },
      { hour: '12-14', count: 45 },
      { hour: '14-16', count: 38 },
      { hour: '16-18', count: 28 },
      { hour: '18-20', count: 12 },
    ]

    const userOrderCounts: Record<number, { name: string; orders: number; total: number }> = {}
    enrichedOrders.forEach(o => {
      const idNum = o.id_num
      if (!userOrderCounts[idNum]) {
        const user = users.find((u: any) => u.id === idNum)
        userOrderCounts[idNum] = {
          name: o.studentName,
          orders: 0,
          total: 0,
        }
      }
      userOrderCounts[idNum].orders++
      userOrderCounts[idNum].total += o.total
    })

    const topUsers = Object.values(userOrderCounts)
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10)

    return ok({
      orders: enrichedOrders,
      stats: {
        totalOrders,
        pending,
        processing,
        ready,
        delivered,
        cancelled,
        totalRevenue,
        priorityOrders,
        revenueByStatus,
      },
      statsData: {
        servicesChart,
        dailyOrders,
        peakHours,
      },
      topUsers,
    })
  } catch (e) {
    return serverError(e)
  }
}
