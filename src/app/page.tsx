'use client';

import Link from 'next/link';
import {
  Copy,
  Printer,
  BookOpen,
  CircleDot,
  Disc,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Users,
  Zap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: <Copy className="size-8" />,
      title: "Fotocopias",
      description: "Blanco y negro o color, en todos los tamaños",
      color: "bg-blue-500"
    },
    {
      icon: <Printer className="size-8" />,
      title: "Impresiones",
      description: "PDF, Word, PowerPoint e imágenes",
      color: "bg-green-500"
    },
    {
      icon: <BookOpen className="size-8" />,
      title: "Empastados",
      description: "Acabado profesional para tus trabajos",
      color: "bg-purple-500"
    },
    {
      icon: <CircleDot className="size-8" />,
      title: "Anillados",
      description: "Rápido y de calidad",
      color: "bg-yellow-500"
    },
    {
      icon: <Disc className="size-8" />,
      title: "Quemado de Discos",
      description: "CD y DVD con grabado personalizado",
      color: "bg-red-500"
    },
    {
      icon: <ShoppingCart className="size-8" />,
      title: "Útiles de Escritorio",
      description: "Todo lo que necesitas para estudiar",
      color: "bg-indigo-500"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sube tu archivo",
      description: "Ingresa a tu cuenta y carga tus documentos"
    },
    {
      number: "2",
      title: "Configura tu pedido",
      description: "Elige tamaño, color, cantidad y servicios adicionales"
    },
    {
      number: "3",
      title: "Recibe notificación",
      description: "Te avisamos cuando esté listo para recoger"
    },
    {
      number: "4",
      title: "Recoge y paga",
      description: "Presenta tu código QR y lleva tu pedido"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="size-6" />,
      title: "Rápido y eficiente",
      description: "Sistema de cola inteligente con prioridad para docentes"
    },
    {
      icon: <Clock className="size-6" />,
      title: "Ahorra tiempo",
      description: "No hagas fila, recibe notificaciones cuando esté listo"
    },
    {
      icon: <CheckCircle2 className="size-6" />,
      title: "Calidad garantizada",
      description: "Equipos de última generación para mejores resultados"
    },
    {
      icon: <Users className="size-6" />,
      title: "Atención personalizada",
      description: "Soporte en línea y presencial para ayudarte"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
                <Copy className="size-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CopyCampus
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Servicios
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Cómo Funciona
              </a>
              <a href="#beneficios" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Beneficios
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Contacto
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/client"
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Registrar Pedido
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                Servicio Universitario Premium
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Tus impresiones listas en
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> tiempo récord</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sistema de cola inteligente, notificaciones en tiempo real y prioridad para docentes.
                La forma más eficiente de imprimir en tu universidad.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/client"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-xl transition transform hover:scale-105"
                >
                  Hacer un Pedido
                </Link>
                <a
                  href="#como-funciona"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
                >
                  Ver Cómo Funciona
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle2 className="size-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Pedido #1234</p>
                      <p className="text-sm text-gray-600">Listo para recoger</p>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">50 páginas B/N</span>
                      <span className="font-semibold">$2.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Anillado</span>
                      <span className="font-semibold">$1.50</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-2xl p-4 shadow-xl">
                <p className="text-2xl font-bold text-gray-900">⚡ 15 min</p>
                <p className="text-sm text-gray-700">Tiempo promedio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para tus trabajos académicos en un solo lugar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition cursor-pointer"
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cuatro pasos simples para obtener tus impresiones
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold size-12 rounded-full flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-4 text-blue-300 text-4xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Beneficios para la Comunidad Universitaria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diseñado especialmente para estudiantes y docentes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center h-fit">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👨‍🏫</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Prioridad para Docentes
                </h3>
                <p className="text-gray-700">
                  Los pedidos de profesores tienen prioridad automática en la cola de impresión,
                  asegurando que sus materiales estén listos a tiempo para las clases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="size-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-8">
            Horarios de Atención
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Lunes a Viernes</h3>
              <p className="text-3xl font-bold">7:00 AM - 8:00 PM</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Sábados</h3>
              <p className="text-3xl font-bold">8:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
                  <Copy className="size-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  CopyCampus
                </span>
              </div>
              <p className="text-gray-400">
                Tu fotocopiadora universitaria de confianza. Calidad, rapidez y servicio excepcional.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="size-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-blue-400" />
                  <span>info@copycampus.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-blue-400" />
                  <span>Campus Central, Edificio A</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#servicios" className="hover:text-blue-400 transition">Servicios</a>
                </li>
                <li>
                  <a href="#como-funciona" className="hover:text-blue-400 transition">Cómo Funciona</a>
                </li>
                <li>
                  <Link href="/supplies" className="hover:text-blue-400 transition">Útiles de Escritorio</Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-400 transition">Iniciar Sesión</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition">
                  <Facebook className="size-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-pink-600 transition">
                  <Instagram className="size-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-blue-400 transition">
                  <Twitter className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2026 CopyCampus. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
