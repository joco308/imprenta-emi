'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut, signIn } from 'next-auth/react';
import { Copy, UserCircle2, GraduationCap, Shield, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { MicrosoftSignInButton } from '@/components/MicrosoftSignInButton';

export default function Login() {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student' | 'teacher'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const roles = [
    {
      id: 'student' as const,
      name: 'Estudiante',
      icon: <GraduationCap className="size-6" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Acceso al panel de pedidos'
    },
    {
      id: 'teacher' as const,
      name: 'Docente',
      icon: <UserCircle2 className="size-6" />,
      color: 'from-green-500 to-green-600',
      description: 'Prioridad en cola de impresión'
    },
    {
      id: 'admin' as const,
      name: 'Administrador',
      icon: <Shield className="size-6" />,
      color: 'from-purple-500 to-purple-600',
      description: 'Gestión completa del sistema'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('Correo o contraseña incorrectos')
      return
    }

    toast.success('Inicio de sesión exitoso')
    router.push('/client')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2 group-hover:shadow-lg transition">
            <Copy className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            CopyCampus
          </span>
        </Link>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl">
            <h1 className="text-4xl font-bold mb-6">
              Bienvenido de nuevo
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Accede a tu cuenta para gestionar tus impresiones, ver el estado de tus pedidos y mucho más.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Estudiantes</h3>
                  <p className="text-sm text-blue-100">Sistema de pedidos intuitivo</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <UserCircle2 className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Docentes</h3>
                  <p className="text-sm text-blue-100">Prioridad automática</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <Shield className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Administradores</h3>
                  <p className="text-sm text-blue-100">Control total del sistema</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form / Auth Actions */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {authStatus === 'loading' ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-blue-600" />
            </div>
          ) : authStatus === 'authenticated' && session?.user ? (
            <>
              <div className="text-center mb-8">
                <div className="bg-green-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="size-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sesión iniciada
                </h2>
                <p className="text-gray-600">
                  {session.user.name ?? session.user.email}
                </p>
              </div>

              {session.user.needsPassword ? (
                <div className="space-y-4">
                  <p className="text-center text-gray-600">
                    Por ser tu primer inicio de sesión, necesitas crear una contraseña local.
                  </p>
                  <button
                    onClick={() => router.push('/auth/crear-contrasena')}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    <Lock className="size-5" />
                    Crear contraseña
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => router.push(session?.user?.roleId === 1 ? '/admin' : '/client')}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
                  >
                    Ir al panel principal
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-full py-3 text-gray-600 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Iniciar Sesión
                </h2>
                <p className="text-gray-600">
                  Selecciona tu tipo de usuario y accede
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Usuario
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative overflow-hidden rounded-xl p-4 border-2 transition ${
                        selectedRole === role.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${role.color} text-white rounded-lg p-2 mb-2 mx-auto w-fit`}>
                        {role.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{role.name}</p>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {roles.find(r => r.id === selectedRole)?.description}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.correo@universidad.edu"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Recordar sesión</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
                >
                  Iniciar Sesión
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Regístrate aquí
                  </button>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">O continúa con</span>
                  </div>
                </div>
                <MicrosoftSignInButton />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  ¿Primera vez? Usa Microsoft para iniciar sesión y crear tu contraseña
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
