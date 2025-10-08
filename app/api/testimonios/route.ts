import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Testimonio, TestimonioFormData } from '@/app/types'

const TESTIMONIOS_FILE = path.join(process.cwd(), 'data', 'testimonios.json')

// Función para asegurar que el directorio data existe
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Función para leer testimonios
async function leerTestimonios(): Promise<Testimonio[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(TESTIMONIOS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si el archivo no existe, devolver array vacío
    return []
  }
}

// Función para guardar testimonios
async function guardarTestimonios(testimonios: Testimonio[]) {
  await ensureDataDirectory()
  await fs.writeFile(TESTIMONIOS_FILE, JSON.stringify(testimonios, null, 2))
}

// GET - Obtener testimonios (solo los aprobados y visibles para público)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const admin = searchParams.get('admin') === 'true'
    
    const testimonios = await leerTestimonios()
    
    if (admin) {
      // Para admin, devolver todos los testimonios
      // Aquí deberías verificar autenticación en un caso real
      return NextResponse.json(testimonios)
    } else {
      // Para público, solo testimonios aprobados y visibles
      const testimoniosPublicos = testimonios.filter(t => t.aprobado && t.visible)
      return NextResponse.json(testimoniosPublicos)
    }
  } catch (error) {
    console.error('Error al obtener testimonios:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST - Crear nuevo testimonio
export async function POST(request: NextRequest) {
  try {
    const body: TestimonioFormData = await request.json()
    
    // Validación básica
    if (!body.nombre || !body.email || !body.contenido || !body.calificacion) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }
    
    if (body.calificacion < 1 || body.calificacion > 5) {
      return NextResponse.json({ error: 'La calificación debe estar entre 1 y 5' }, { status: 400 })
    }
    
    const testimonios = await leerTestimonios()
    
    const nuevoTestimonio: Testimonio = {
      id: Date.now().toString(),
      nombre: body.nombre.trim(),
      email: body.email.trim().toLowerCase(),
      contenido: body.contenido.trim(),
      calificacion: body.calificacion,
      fechaCreacion: new Date().toISOString(),
      aprobado: false, // Por defecto no aprobado, requiere revisión de Inés
      visible: true
    }
    
    testimonios.push(nuevoTestimonio)
    await guardarTestimonios(testimonios)
    
    return NextResponse.json({ 
      message: 'Testimonio enviado correctamente. Será revisado antes de publicarse.',
      testimonio: nuevoTestimonio 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error al crear testimonio:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}