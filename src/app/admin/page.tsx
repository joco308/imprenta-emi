'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Copy,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Search,
  Filter,
  MoreVertical,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface Order {
  id: string;
  studentName: string;
  email: string;
  service: string;
  pages: number;
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  priority: boolean;
  total: number;
  deliveryTime: string;
  submittedAt: string;
  userType: 'teacher' | 'student';
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'orders' | 'stats'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      studentName: 'María García',
      email: 'maria.garcia@universidad.edu',
      service: 'Impresión + Anillado',
      pages: 50,
      status: 'processing',
      priority: true,
      total: 4.50,
      deliveryTime: '2024-05-18 14:00',
      submittedAt: '2024-05-18 10:30',
      userType: 'teacher'
    },
    {
      id: 'ORD-2024-002',
      studentName: 'Juan Pérez',
      email: 'juan.perez@universidad.edu',
      service: 'Fotocopias B/N',
      pages: 100,
      status: 'pending',
      priority: false,
      total: 5.00,
      deliveryTime: '2024-05-18 16:00',
      submittedAt: '2024-05-18 11:00',
      userType: 'student'
    },
    {
      id: 'ORD-2024-003',
      studentName: 'Dr. Carlos Rodríguez',
      email: 'carlos.rodriguez@universidad.edu',
      service: 'Empastado',
      pages: 200,
      status: 'pending',
      priority: true,
      total: 15.00,
      deliveryTime: '2024-05-18 15:00',
      submittedAt: '2024-05-18 11:15',
      userType: 'teacher'
    },
    {
      id: 'ORD-2024-004',
      studentName: 'Ana Martínez',
      email: 'ana.martinez@universidad.edu',
      service: 'Impresión Color + CD',
      pages: 30,
      status: 'ready',
      priority: false,
      total: 8.00,
      deliveryTime: '2024-05-18 13:00',
      submittedAt: '2024-05-18 09:00',
      userType: 'student'
    },
    {
      id: 'ORD-2024-005',
      studentName: 'Luis Fernández',
      email: 'luis.fernandez@universidad.edu',
      service: 'Fotocopias + Anillado',
      pages: 75,
      status: 'delivered',
      priority: false,
      total: 5.50,
      deliveryTime: '2024-05-17 16:00',
      submittedAt: '2024-05-17 14:00',
      userType: 'student'
    }
  ]);

  const statsData = {
    servicesChart: [
      { name: 'Fotocopias', value: 450 },
      { name: 'Impresiones', value: 380 },
      { name: 'Empastados', value: 120 },
      { name: 'Anillados', value: 200 },
      { name: 'CD/DVD', value: 80 }
    ],
    dailyOrders: [
      { day: 'Lun', orders: 45 },
      { day: 'Mar', orders: 52 },
      { day: 'Mié', orders: 48 },
      { day: 'Jue', orders: 61 },
      { day: 'Vie', orders: 70 },
      { day: 'Sáb', orders: 35 }
    ],
    peakHours: [
      { hour: '8-10', count: 15 },
      { hour: '10-12', count: 32 },
      { hour: '12-14', count: 45 },
      { hour: '14-16', count: 38 },
      { hour: '16-18', count: 28 },
      { hour: '18-20', count: 12 }
    ]
  };

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast.success('Sesión cerrada');
    router.push('/');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));

    const statusMessages = {
      processing: 'Pedido marcado como en proceso',
      ready: 'Pedido listo para recoger',
      delivered: 'Pedido marcado como entregado',
      cancelled: 'Pedido cancelado'
    };

    toast.success(statusMessages[newStatus] || 'Estado actualizado');
  };

  const getStatusBadge = (status: Order['status']) => {
    const badges = {
      pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: <Clock className="size-4" /> },
      processing: { label: 'En Proceso', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: <Activity className="size-4" /> },
      ready: { label: 'Listo', color: 'bg-green-100 text-green-700 border-green-300', icon: <CheckCircle2 className="size-4" /> },
      delivered: { label: 'Entregado', color: 'bg-gray-100 text-gray-700 border-gray-300', icon: <CheckCircle2 className="size-4" /> },
      cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700 border-red-300', icon: <XCircle className="size-4" /> }
    };
    return badges[status];
  };

  const getSortedOrders = () => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;

      const timeA = new Date(a.deliveryTime).getTime();
      const timeB = new Date(b.deliveryTime).getTime();
      if (timeA !== timeB) return timeA - timeB;

      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    });
  };

  const stats = {
    totalOrders: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    priorityOrders: orders.filter(o => o.priority).length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-2">
                  <Copy className="size-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  CopyCampus Admin
                </span>
              </Link>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-300 rounded-full">
                <Star className="size-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Panel de Administración</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Home className="size-5" />
                <span className="font-medium">Inicio</span>
              </Link>

              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Administrador</p>
                  <p className="text-gray-500 text-xs">admin@copycampus.edu</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
              >
                <LogOut className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="size-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En Proceso</p>
                <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Listos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ready}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Star className="size-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Prioridad</p>
                <p className="text-2xl font-bold text-gray-900">{stats.priorityOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                activeTab === 'orders'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="size-5" />
              Gestión de Pedidos
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                activeTab === 'stats'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="size-5" />
              Estadísticas
            </button>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por código, nombre o email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-11 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none appearance-none bg-white"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="pending">Pendientes</option>
                    <option value="processing">En Proceso</option>
                    <option value="ready">Listos</option>
                    <option value="delivered">Entregados</option>
                    <option value="cancelled">Cancelados</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Priority Queue Info */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="size-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">
                    Sistema de Cola Inteligente
                  </h3>
                  <p className="text-purple-700 mb-3">
                    Los pedidos se ordenan automáticamente siguiendo estas prioridades:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-purple-700">
                    <li className="font-semibold">Pedidos de docentes (prioridad alta)</li>
                    <li>Pedidos con hora de entrega más próxima</li>
                    <li>Orden de llegada (FIFO)</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Código</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cliente</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Servicio</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Páginas</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Estado</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Entrega</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getSortedOrders().map((order) => {
                      const status = getStatusBadge(order.status);
                      return (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {order.priority && (
                                <Star className="size-4 text-yellow-500 fill-yellow-500" />
                              )}
                              <span className="font-semibold text-gray-900">{order.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{order.studentName}</p>
                              <p className="text-sm text-gray-500">{order.email}</p>
                              {order.userType === 'teacher' && (
                                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                  Docente
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{order.service}</td>
                          <td className="px-6 py-4 text-gray-700">{order.pages}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${status.color}`}>
                              {status.icon}
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{order.deliveryTime}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'processing')}
                                  className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                                >
                                  Iniciar
                                </button>
                              )}
                              {order.status === 'processing' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'ready')}
                                  className="px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                                >
                                  Completar
                                </button>
                              )}
                              {order.status === 'ready' && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                                  className="px-3 py-1.5 bg-gray-600 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition"
                                >
                                  Entregar
                                </button>
                              )}
                              <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                                <MoreVertical className="size-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Charts Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Services Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <PieChart className="size-6 text-purple-600" />
                  Servicios Más Usados
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={statsData.servicesChart}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statsData.servicesChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              {/* Daily Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BarChart3 className="size-6 text-blue-600" />
                  Pedidos por Día
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statsData.dailyOrders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#3b82f6" name="Pedidos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="size-6 text-green-600" />
                Horas Pico
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statsData.peakHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" name="Pedidos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="size-6 text-purple-600" />
                Usuarios Frecuentes
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'María García', orders: 25, total: 125.50 },
                  { name: 'Dr. Carlos Rodríguez', orders: 18, total: 245.00 },
                  { name: 'Juan Pérez', orders: 15, total: 78.00 },
                  { name: 'Ana Martínez', orders: 12, total: 95.50 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-600 text-white size-10 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.orders} pedidos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${user.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Total gastado</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
