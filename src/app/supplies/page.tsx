'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Home,
  Search,
  Filter,
  CheckCircle2,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function OfficeSupplies() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Bolígrafos Azules (Caja x12)',
      price: 3.50,
      stock: 50,
      image: 'https://images.unsplash.com/photo-1620275765334-4ed948bb4502?w=400',
      category: 'escritura'
    },
    {
      id: 2,
      name: 'Cuaderno Universitario 100 Hojas',
      price: 2.50,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1512279093314-5926a353720c?w=400',
      category: 'cuadernos'
    },
    {
      id: 3,
      name: 'Set de Marcadores Colores (x12)',
      price: 5.00,
      stock: 25,
      image: 'https://images.unsplash.com/photo-1617177435596-1c9e30d6d608?w=400',
      category: 'escritura'
    },
    {
      id: 4,
      name: 'Lápices HB (Caja x24)',
      price: 4.00,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1605641987825-c1664626d79f?w=400',
      category: 'escritura'
    },
    {
      id: 5,
      name: 'Portaminas 0.7mm',
      price: 1.50,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1510936994138-07e06c7c5add?w=400',
      category: 'escritura'
    },
    {
      id: 6,
      name: 'Resaltadores Pastel (Set x6)',
      price: 4.50,
      stock: 35,
      image: 'https://images.unsplash.com/photo-1656941599882-808d7b04b86a?w=400',
      category: 'escritura'
    },
    {
      id: 7,
      name: 'Carpeta Archivadora A4',
      price: 2.00,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1620275765334-4ed948bb4502?w=400',
      category: 'organizacion'
    },
    {
      id: 8,
      name: 'Hojas Bond A4 (Paquete x500)',
      price: 6.00,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1512279093314-5926a353720c?w=400',
      category: 'papeleria'
    },
    {
      id: 9,
      name: 'Corrector Líquido',
      price: 1.00,
      stock: 70,
      image: 'https://images.unsplash.com/photo-1617177435596-1c9e30d6d608?w=400',
      category: 'accesorios'
    },
    {
      id: 10,
      name: 'Regla 30cm Transparente',
      price: 0.75,
      stock: 55,
      image: 'https://images.unsplash.com/photo-1605641987825-c1664626d79f?w=400',
      category: 'accesorios'
    },
    {
      id: 11,
      name: 'Tijera Escolar',
      price: 1.25,
      stock: 40,
      image: 'https://images.unsplash.com/photo-1510936994138-07e06c7c5add?w=400',
      category: 'accesorios'
    },
    {
      id: 12,
      name: 'Grapadora + Grapas',
      price: 3.00,
      stock: 30,
      image: 'https://images.unsplash.com/photo-1656941599882-808d7b04b86a?w=400',
      category: 'accesorios'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'escritura', name: 'Escritura' },
    { id: 'cuadernos', name: 'Cuadernos' },
    { id: 'organizacion', name: 'Organización' },
    { id: 'papeleria', name: 'Papelería' },
    { id: 'accesorios', name: 'Accesorios' }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
        toast.success(`${product.name} agregado al carrito`);
      } else {
        toast.error('Stock insuficiente');
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} agregado al carrito`);
    }
  };

  const updateQuantity = (productId: number, change: number) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else if (newQuantity <= item.stock) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      toast.error('Stock insuficiente');
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Producto eliminado del carrito');
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-2">
                <ShoppingCart className="size-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent block">
                  CopyCampus
                </span>
                <span className="text-xs text-gray-600">Útiles de Escritorio</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Home className="size-5" />
                <span className="font-medium hidden md:block">Inicio</span>
              </Link>

              <Link
                href="/client"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <Copy className="size-5" />
                <span className="font-medium hidden md:block">Impresiones</span>
              </Link>

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                  <ShoppingCart className="size-5" />
                  <span>Carrito</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-sm font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Útiles de Escritorio
              </h1>
              <p className="text-gray-600 text-lg">
                Todo lo que necesitas para tus estudios en un solo lugar
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-11 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none appearance-none bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Stock</p>
                        <p className={`font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock} unidades
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105"
                    >
                      {product.stock > 0 ? (
                        <span className="flex items-center justify-center gap-2">
                          <Plus className="size-5" />
                          Agregar al Carrito
                        </span>
                      ) : (
                        'Sin Stock'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {getFilteredProducts().length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package className="size-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">
                  No se encontraron productos
                </p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="size-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Carrito
                </h2>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-gray-200 pb-4 last:border-0"
                      >
                        <div className="flex gap-3 mb-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-orange-600 font-bold">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition"
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="font-semibold text-gray-900 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">IVA (12%):</span>
                      <span className="font-semibold">${(cartTotal * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span className="text-orange-600">${(cartTotal * 1.12).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toast.success('Pedido realizado con éxito');
                      setCart([]);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-xl hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="size-5" />
                    Finalizar Compra
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Paga al recoger tu pedido
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
