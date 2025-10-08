import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Testimonio } from '@/app/types'

const TESTIMONIOS_FILE = path.join(process.cwd(), 'data', 'testimonios.json')

async function leerTestimonios(): Promise<Testimonio[]> {
  try {
    const data = await fs.readFile(TESTIMONIOS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function guardarTestimonios(testimonios: Testimonio[]) {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
  await fs.writeFile(TESTIMONIOS_FILE, JSON.stringify(testimonios, null, 2))
}

// PUT - Actualizar testimonio (para admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    const testimonios = await leerTestimonios()
    const index = testimonios.findIndex(t => t.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 })
    }
    
    // Actualizar campos permitidos
    testimonios[index] = {
      ...testimonios[index],
      ...body,
      id, // Mantener el ID original
      fechaCreacion: testimonios[index].fechaCreacion // Mantener fecha original
    }
    
    await guardarTestimonios(testimonios)
    
    return NextResponse.json({ 
      message: 'Testimonio actualizado correctamente',
      testimonio: testimonios[index]
    })
    
  } catch (error) {
    console.error('Error al actualizar testimonio:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// DELETE - Eliminar testimonio (para admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const testimonios = await leerTestimonios()
    const index = testimonios.findIndex(t => t.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 })
    }
    
    testimonios.splice(index, 1)
    await guardarTestimonios(testimonios)
    
    return NextResponse.json({ message: 'Testimonio eliminado correctamente' })
    
  } catch (error) {
    console.error('Error al eliminar testimonio:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}