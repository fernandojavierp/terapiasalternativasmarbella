import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Eliminar la cookie de autenticación
    const cookieStore = cookies()
    cookieStore.delete('auth-token')

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada correctamente'
    })

  } catch (error) {
    console.error('Error en logout:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}