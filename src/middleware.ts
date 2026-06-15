import { auth } from '@/lib/middleware-auth'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Rutas públicas
  if (pathname === '/login' || pathname === '/' || pathname.startsWith('/api/auth') || pathname.startsWith('/_next')) {
    return
  }

  // No autenticado → login
  if (!session) {
    const url = new URL('/login', req.url)
    url.searchParams.set('callbackUrl', pathname)
    return Response.redirect(url)
  }

  const needsPassword = session.user?.needsPassword
  const roleId = session.user?.roleId ?? 2

  // Usuario sin contraseña → solo puede ir a crear-contrasena
  if (needsPassword && !pathname.startsWith('/auth/crear-contrasena')) {
    return Response.redirect(new URL('/auth/crear-contrasena', req.url))
  }

  // Admin → solo Administrador (roleId = 1)
  if (pathname.startsWith('/admin') && roleId !== 1) {
    return Response.redirect(new URL('/client', req.url))
  }

  // Client → Estudiante (2) o Docente (3), Admin redirigido a /admin
  if (pathname.startsWith('/client')) {
    if (roleId === 1) {
      return Response.redirect(new URL('/admin', req.url))
    }
    if (roleId !== 2 && roleId !== 3) {
      return Response.redirect(new URL('/login', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
    '/supplies/:path*',
    '/auth/crear-contrasena',
  ],
}
