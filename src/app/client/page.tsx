'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Copy,
  Upload,
  FileText,
  Settings,
  Clock,
  CheckCircle2,
  Package,
  LogOut,
  User,
  ShoppingCart,
  QrCode,
  Bell,
  Palette,
  FileType,
  Hash,
  Layers,
  Star,
  BookOpen,
  Disc,
  Home
} from 'lucide-react';
import { toast } from 'sonner';

export default function ClientDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'new-order' | 'my-orders' | 'queue'>('new-order');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [printConfig, setPrintConfig] = useState({
    color: 'bw',
    size: 'carta',
    doubleSided: false,
    copies: 1,
    quality: 'standard',
    binding: 'none',
    cdBurning: false,
    deliveryDate: '',
    deliveryTime: ''
  });

  const userRole = typeof window !== 'undefined' ? (localStorage.getItem('userRole') || 'student') : 'student';
  const userEmail = typeof window !== 'undefined' ? (localStorage.getItem('userEmail') || 'usuario@universidad.edu') : 'usuario@universidad.edu';

  const [myOrders] = useState([
    {
      id: 'ORD-2024-001',
      status: 'ready',
      service: 'Impresión + Anillado',
      pages: 50,
      total: 4.50,
      qrCode: 'QR-001',
      date: '2024-05-18',
      priority: userRole === 'teacher'
    },
    {
      id: 'ORD-2024-002',
      status: 'processing',
      service: 'Fotocopias B/N',
      pages: 100,
      total: 5.00,
      qrCode: 'QR-002',
      date: '2024-05-18',
      priority: userRole === 'teacher'
    },
    {
      id: 'ORD-2024-003',
      status: 'queue',
      service: 'Empastado',
      pages: 200,
      total: 15.00,
      qrCode: 'QR-003',
      date: '2024-05-17',
      priority: userRole === 'teacher'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} archivo(s) agregado(s)`);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitOrder = () => {
    if (selectedFiles.length === 0) {
      toast.error('Por favor sube al menos un archivo');
      return;
    }

    if (!printConfig.deliveryDate || !printConfig.deliveryTime) {
      toast.error('Por favor selecciona fecha y hora de entrega');
      return;
    }

    toast.success('¡Pedido registrado exitosamente!');
    setSelectedFiles([]);
    setPrintConfig({
      color: 'bw',
      size: 'carta',
      doubleSided: false,
      copies: 1,
      quality: 'standard',
      binding: 'none',
      cdBurning: false,
      deliveryDate: '',
      deliveryTime: ''
    });
    setActiveTab('my-orders');
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast.success('Sesión cerrada');
    router.push('/');
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      queue: { label: 'En Cola', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
      processing: { label: 'En Proceso', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      ready: { label: 'Listo para Recoger', color: 'bg-green-100 text-green-700 border-green-300' },
      delivered: { label: 'Entregado', color: 'bg-gray-100 text-gray-700 border-gray-300' }
    };
    return badges[status as keyof typeof badges] || badges.queue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
                  <Copy className="size-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  CopyCampus
                </span>
              </Link>

              {userRole === 'teacher' && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 rounded-full">
                  <Star className="size-4 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-700">Prioridad Docente</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <User className="size-5 text-gray-600" />
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{userEmail}</p>
                  <p className="text-gray-500 text-xs">{userRole === 'teacher' ? 'Docente' : 'Estudiante'}</p>
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
        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-blue-500 flex items-center gap-3"
          >
            <div className="bg-blue-100 p-3 rounded-lg">
              <Home className="size-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Inicio</p>
              <p className="text-sm text-gray-500">Volver</p>
            </div>
          </Link>

          <button
            onClick={() => setActiveTab('new-order')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-blue-500 flex items-center gap-3"
          >
            <div className="bg-green-100 p-3 rounded-lg">
              <Upload className="size-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Nuevo Pedido</p>
              <p className="text-sm text-gray-500">Subir archivos</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('my-orders')}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-blue-500 flex items-center gap-3"
          >
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="size-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Mis Pedidos</p>
              <p className="text-sm text-gray-500">{myOrders.length} activos</p>
            </div>
          </button>

          <Link
            href="/supplies"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-blue-500 flex items-center gap-3"
          >
            <div className="bg-orange-100 p-3 rounded-lg">
              <ShoppingCart className="size-6 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Útiles</p>
              <p className="text-sm text-gray-500">Tienda</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('new-order')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                activeTab === 'new-order'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="size-5" />
              Nuevo Pedido
            </button>
            <button
              onClick={() => setActiveTab('my-orders')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                activeTab === 'my-orders'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="size-5" />
              Mis Pedidos
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                activeTab === 'queue'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="size-5" />
              Cola Virtual
            </button>
          </div>
        </div>

        {/* New Order Tab */}
        {activeTab === 'new-order' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - File Upload */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="size-6 text-blue-600" />
                  Archivos
                </h2>

                <label className="block border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                  <Upload className="size-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Arrastra tus archivos aquí
                  </p>
                  <p className="text-gray-500 mb-4">
                    o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-400">
                    PDF, Word, PowerPoint, Imágenes (Máx. 50MB)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {selectedFiles.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold text-gray-900">
                      Archivos seleccionados ({selectedFiles.length})
                    </h3>
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="size-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-700 font-semibold"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Print Configuration */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Settings className="size-6 text-blue-600" />
                  Configuración de Impresión
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Color */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Palette className="size-4" />
                      Color
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPrintConfig({ ...printConfig, color: 'bw' })}
                        className={`p-4 rounded-lg border-2 transition ${
                          printConfig.color === 'bw'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-semibold">Blanco y Negro</p>
                        <p className="text-sm text-gray-600">$0.05/página</p>
                      </button>
                      <button
                        onClick={() => setPrintConfig({ ...printConfig, color: 'color' })}
                        className={`p-4 rounded-lg border-2 transition ${
                          printConfig.color === 'color'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-semibold">Color</p>
                        <p className="text-sm text-gray-600">$0.20/página</p>
                      </button>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FileType className="size-4" />
                      Tamaño
                    </label>
                    <select
                      value={printConfig.size}
                      onChange={(e) => setPrintConfig({ ...printConfig, size: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="carta">Carta (8.5" x 11")</option>
                      <option value="oficio">Oficio (8.5" x 14")</option>
                      <option value="a4">A4 (210mm x 297mm)</option>
                    </select>
                  </div>

                  {/* Copies */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Hash className="size-4" />
                      Cantidad de Copias
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={printConfig.copies}
                      onChange={(e) => setPrintConfig({ ...printConfig, copies: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Quality */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Layers className="size-4" />
                      Calidad
                    </label>
                    <select
                      value={printConfig.quality}
                      onChange={(e) => setPrintConfig({ ...printConfig, quality: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="draft">Borrador (Rápido)</option>
                      <option value="standard">Estándar</option>
                      <option value="high">Alta Calidad</option>
                    </select>
                  </div>
                </div>

                {/* Double Sided */}
                <label className="flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={printConfig.doubleSided}
                    onChange={(e) => setPrintConfig({ ...printConfig, doubleSided: e.target.checked })}
                    className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Impresión a doble cara</p>
                    <p className="text-sm text-gray-600">Ahorra papel y reduce costos</p>
                  </div>
                </label>
              </div>

              {/* Additional Services */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Servicios Adicionales
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Encuadernado
                    </label>
                    <select
                      value={printConfig.binding}
                      onChange={(e) => setPrintConfig({ ...printConfig, binding: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="none">Ninguno</option>
                      <option value="anillado">Anillado (+$1.50)</option>
                      <option value="empastado">Empastado (+$5.00)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={printConfig.cdBurning}
                      onChange={(e) => setPrintConfig({ ...printConfig, cdBurning: e.target.checked })}
                      className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <Disc className="size-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Quemado de CD/DVD</p>
                        <p className="text-sm text-gray-600">+$2.00 por disco</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="size-6 text-blue-600" />
                  Fecha y Hora de Entrega
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={printConfig.deliveryDate}
                      onChange={(e) => setPrintConfig({ ...printConfig, deliveryDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={printConfig.deliveryTime}
                      onChange={(e) => setPrintConfig({ ...printConfig, deliveryTime: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Archivos:</span>
                    <span className="font-semibold">{selectedFiles.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-semibold">
                      {printConfig.color === 'bw' ? 'Blanco y Negro' : 'Color'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tamaño:</span>
                    <span className="font-semibold uppercase">{printConfig.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Copias:</span>
                    <span className="font-semibold">{printConfig.copies}</span>
                  </div>
                  {printConfig.doubleSided && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Doble cara:</span>
                      <span className="font-semibold text-green-600">Sí</span>
                    </div>
                  )}
                  {printConfig.binding !== 'none' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Encuadernado:</span>
                      <span className="font-semibold capitalize">{printConfig.binding}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold">$4.50</span>
                  </div>
                  {printConfig.binding !== 'none' && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Encuadernado:</span>
                      <span className="font-semibold">
                        ${printConfig.binding === 'anillado' ? '1.50' : '5.00'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span>Total:</span>
                    <span className="text-blue-600">$6.00</span>
                  </div>
                </div>

                {userRole === 'teacher' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Star className="size-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-900 text-sm">Prioridad Docente</p>
                        <p className="text-xs text-yellow-700">
                          Tu pedido será procesado con prioridad
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSubmitOrder}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
                >
                  Registrar Pedido
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Recibirás una notificación cuando esté listo
                </p>
              </div>
            </div>
          </div>
        )}

        {/* My Orders Tab */}
        {activeTab === 'my-orders' && (
          <div className="space-y-4">
            {myOrders.map((order) => {
              const status = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${status.color}`}>
                          {status.label}
                        </span>
                        {order.priority && (
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
                            Prioridad
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{order.service}</p>
                    </div>

                    {order.status === 'ready' && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                        <QrCode className="size-5" />
                        Mostrar QR
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Páginas</p>
                      <p className="font-semibold text-gray-900">{order.pages}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fecha</p>
                      <p className="font-semibold text-gray-900">{order.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Queue Tab */}
        {activeTab === 'queue' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="bg-blue-100 size-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="size-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Cola Virtual
              </h2>
              <p className="text-gray-600">
                Monitoreo en tiempo real de tu posición
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
                <p className="text-lg mb-2">Tu turno</p>
                <p className="text-6xl font-bold mb-4">#003</p>
                <p className="text-blue-200">Tu pedido está siendo procesado</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-2">2</p>
                  <p className="text-sm text-gray-600">Personas delante</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-2">15</p>
                  <p className="text-sm text-gray-600">Minutos estimados</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-green-600 mb-2">Alta</p>
                  <p className="text-sm text-gray-600">Prioridad</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-semibold text-yellow-900 mb-4">Estado Actual</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="text-gray-700">Pedido recibido</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-green-600" />
                    <span className="text-gray-700">En cola de impresión</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-5 border-2 border-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-semibold">Imprimiendo...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-5 border-2 border-gray-300 rounded-full"></div>
                    <span className="text-gray-400">Listo para recoger</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
