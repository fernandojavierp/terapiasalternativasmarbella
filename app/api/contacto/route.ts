import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validación simple
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Los campos nombre, email y mensaje son obligatorios.' },
        { status: 400 }
      )
    }

    // Insertar en la tabla consultas de Supabase
    const { data, error } = await supabase
      .from('consultas')
      .insert([
        {
          nombre: name,
          email: email,
          telefono: phone || null,
          mensaje: message
        }
      ])
      .select()

    if (error) {
      console.error('Error al guardar consulta en Supabase:', error)
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Consulta registrada correctamente.',
      data: data ? data[0] : null
    })

  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Hubo un error al procesar tu solicitud.' },
      { status: 500 }
    )
  }
}
