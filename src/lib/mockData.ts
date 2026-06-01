// Mock data para simular base de datos

export const mockUsers = [
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@universidad.edu',
    role: 'teacher',
    totalOrders: 25
  },
  {
    id: 2,
    name: 'Juan Pérez',
    email: 'juan.perez@universidad.edu',
    role: 'student',
    totalOrders: 15
  },
  {
    id: 3,
    name: 'Dr. Carlos Rodríguez',
    email: 'carlos.rodriguez@universidad.edu',
    role: 'teacher',
    totalOrders: 18
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana.martinez@universidad.edu',
    role: 'student',
    totalOrders: 12
  }
];

export const mockOrders = [
  {
    id: 'ORD-2024-001',
    userId: 1,
    service: 'Impresión + Anillado',
    pages: 50,
    color: 'bw',
    size: 'carta',
    copies: 1,
    binding: 'anillado',
    status: 'ready',
    priority: true,
    total: 4.50,
    deliveryTime: '2024-05-18 14:00',
    submittedAt: '2024-05-18 10:30'
  },
  {
    id: 'ORD-2024-002',
    userId: 2,
    service: 'Fotocopias B/N',
    pages: 100,
    color: 'bw',
    size: 'carta',
    copies: 1,
    binding: 'none',
    status: 'processing',
    priority: false,
    total: 5.00,
    deliveryTime: '2024-05-18 16:00',
    submittedAt: '2024-05-18 11:00'
  }
];

export const mockProducts = [
  {
    id: 1,
    name: 'Bolígrafos Azules (Caja x12)',
    price: 3.50,
    stock: 50,
    category: 'escritura',
    sold: 120
  },
  {
    id: 2,
    name: 'Cuaderno Universitario 100 Hojas',
    price: 2.50,
    stock: 30,
    category: 'cuadernos',
    sold: 85
  },
  {
    id: 3,
    name: 'Set de Marcadores Colores (x12)',
    price: 5.00,
    stock: 25,
    category: 'escritura',
    sold: 65
  }
];

export const orderStatuses = {
  pending: { label: 'Pendiente', color: 'yellow' },
  processing: { label: 'En Proceso', color: 'blue' },
  ready: { label: 'Listo para Recoger', color: 'green' },
  delivered: { label: 'Entregado', color: 'gray' },
  cancelled: { label: 'Cancelado', color: 'red' }
};

export const serviceCategories = [
  { id: 'fotocopias', name: 'Fotocopias', basePrice: 0.05 },
  { id: 'impresion_bw', name: 'Impresión B/N', basePrice: 0.05 },
  { id: 'impresion_color', name: 'Impresión Color', basePrice: 0.20 },
  { id: 'anillado', name: 'Anillado', basePrice: 1.50 },
  { id: 'empastado', name: 'Empastado', basePrice: 5.00 },
  { id: 'cd_quemado', name: 'Quemado CD/DVD', basePrice: 2.00 }
];

// Función helper para generar código QR simulado
export const generateQRCode = (orderId: string): string => {
  return `QR-${orderId.split('-').pop()}`;
};

// Función helper para calcular tiempo estimado en cola
export const calculateEstimatedTime = (position: number, priority: boolean): number => {
  const baseTime = 10; // minutos por pedido
  const priorityMultiplier = priority ? 0.5 : 1;
  return Math.ceil(position * baseTime * priorityMultiplier);
};

// Función helper para formatear fecha
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
