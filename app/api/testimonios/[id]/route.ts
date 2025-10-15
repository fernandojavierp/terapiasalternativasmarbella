// app/api/testimonios/[id]/route.ts - CORREGIDA
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { verifyJWT } from '@/lib/auth';

// Define la interfaz para los cambios posibles
interface CambiosTestimonio {
  contenido?: string;
  // Aceptar ambas variantes por compatibilidad
  calificacion?: number;
  puntuacion?: number;
  aprobado?: boolean;
  visible?: boolean;
}

// Define la interfaz para los cambios mapeados a la base de datos
interface CambiosMapeados {
  contenido?: string;
  calificacion?: number;
  aprobado?: boolean;
  visible?: boolean;
  fecha_actualizacion: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación admin
    const token = request.cookies.get('auth-token')?.value;
    const payload = token ? await verifyJWT(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const cambios: CambiosTestimonio = await request.json();
    const id = params.id;

    // ✅ MAPEO CONSISTENTE CON TIPOS
    const cambiosMapeados: CambiosMapeados = {
      fecha_actualizacion: new Date().toISOString()
    };
    
    // Si el frontend envía 'contenido', se mantiene igual
    if (cambios.contenido !== undefined) cambiosMapeados.contenido = cambios.contenido;
    // Aceptar 'calificacion' o 'puntuacion' como input
    if (cambios.calificacion !== undefined) cambiosMapeados.calificacion = cambios.calificacion;
    else if (cambios.puntuacion !== undefined) cambiosMapeados.calificacion = cambios.puntuacion;
    if (cambios.aprobado !== undefined) cambiosMapeados.aprobado = cambios.aprobado;
    if (cambios.visible !== undefined) cambiosMapeados.visible = cambios.visible;

    const { data, error } = await supabaseServer
      .from('testimonios')
      .update(cambiosMapeados)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 });
    }

    // ✅ FORMATO CONSISTENTE
    const testimonioActualizado = {
      id: data[0].id,
      nombre: data[0].nombre,
      email: data[0].email,
      contenido: data[0].contenido,
      calificacion: data[0].calificacion,
      aprobado: data[0].aprobado,
      visible: data[0].visible,
      fechaCreacion: data[0].fecha_creacion ? data[0].fecha_creacion.split('T')[0] : new Date().toISOString().split('T')[0]
    };

    return NextResponse.json(testimonioActualizado);
  } catch (error) {
    console.error('Error updating testimonio:', error);
    return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación admin
    const token = request.cookies.get('auth-token')?.value;
    const payload = token ? await verifyJWT(token) : null;
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const id = params.id;
    const { data, error } = await supabaseServer
      .from('testimonios')
      .delete()
      .eq('id', id)
      .select('*');

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Testimonio no encontrado' }, { status: 404 });
    }

    // Responder con el id eliminado para confirmación
    return NextResponse.json({ id: data[0].id, eliminado: true });
  } catch (error) {
    console.error('Error deleting testimonio:', error);
    return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 });
  }
}