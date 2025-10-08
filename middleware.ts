import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Solo aplicar middleware a rutas de admin, pero no a la página de login
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Si ya está en la página de login, permitir acceso
    if (request.nextUrl.pathname === '/admin/testimonios') {
      return NextResponse.next()
    }

    try {
      // Obtener token de las cookies
      const token = request.cookies.get('auth-token')?.value

      if (!token) {
        // Redirigir al login si no hay token
        return NextResponse.redirect(new URL('/admin/testimonios', request.url))
      }

      // Verificar el token
      const payload = await verifyJWT(token)
      
      if (!payload) {
        // Token inválido, eliminar cookie y redirigir
        const response = NextResponse.redirect(new URL('/admin/testimonios', request.url))
        response.cookies.delete('auth-token')
        return response
      }

      // Token válido, continuar con la request
      return NextResponse.next()

    } catch (error) {
      console.error('Error en middleware de autenticación:', error)
      // En caso de error, eliminar cookie y redirigir
      const response = NextResponse.redirect(new URL('/admin/testimonios', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }

  // Para todas las demás rutas, continuar normalmente
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}