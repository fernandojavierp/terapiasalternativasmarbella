import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, createJWT } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validar que se proporcionen username y password
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username y password son requeridos' },
        { status: 400 }
      )
    }

    // Validar credenciales
    const user = await validateCredentials(username, password)
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Crear JWT token
    const token = await createJWT({
      userId: user.userId,
      username: user.username,
      role: user.role
    })

    // Configurar cookie con el token
    const cookieStore = cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/'
    })

    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}