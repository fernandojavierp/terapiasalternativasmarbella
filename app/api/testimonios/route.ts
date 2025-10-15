// app/api/testimonios/route.ts - VERSIÓN COMPLETA ACTUALIZADA
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabaseServer';
import { verifyJWT } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    
    let query = supabase
      .from('testimonios')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (!admin) {
      query = query
        .eq('aprobado', true)
        .eq('visible', true);
    }

    // Si admin=true, validar JWT y usar cliente servidor (RLS)
    if (admin) {
      const token = request.cookies.get('auth-token')?.value;
      const payload = token ? await verifyJWT(token) : null;
      if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }

      const { data, error } = await supabaseServer
        .from('testimonios')
        .select('*')
        .order('fecha_creacion', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Formatear para que el frontend admin reciba las claves esperadas (calificacion, fechaCreacion)
      const testimoniosFormateados = data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        email: item.email,
        contenido: item.contenido,
        calificacion: typeof item.calificacion === 'number' ? item.calificacion : Number(item.calificacion ?? 0),
        aprobado: item.aprobado,
        visible: item.visible,
        fechaCreacion: item.fecha_creacion ? item.fecha_creacion.split('T')[0] : new Date().toISOString().split('T')[0]
      }));

      return NextResponse.json(testimoniosFormateados);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // ✅ FORMATO CONSISTENTE - claves alineadas con tipos del frontend
    const testimoniosFormateados = data.map(item => ({
      id: item.id,
      nombre: item.nombre,
      // No exponer email en público
      email: undefined,
      contenido: item.contenido,
      calificacion: typeof item.calificacion === 'number' ? item.calificacion : Number(item.calificacion ?? 0),
      aprobado: item.aprobado,
      visible: item.visible,
      fechaCreacion: item.fecha_creacion ? item.fecha_creacion.split('T')[0] : new Date().toISOString().split('T')[0]
    }));

    return NextResponse.json(testimoniosFormateados);
  } catch (error) {
    console.error('Error fetching testimonios:', error);
    return NextResponse.json(
      { error: 'Error al cargar testimonios' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const testimonio = await request.json();
    
    // ✅ FORMATO CONSISTENTE - el frontend envía 'contenido'
    const { data, error } = await supabase
      .from('testimonios')
      .insert([{
        nombre: testimonio.nombre,
        email: testimonio.email,
        contenido: testimonio.contenido, // ← el frontend usa 'contenido'
        calificacion: testimonio.calificacion,
        aprobado: false,
        visible: true
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // ✅ DEVOLVER EN MISMO FORMATO
    const testimonioFormateado = {
      id: data[0].id,
      nombre: data[0].nombre,
      email: data[0].email,
      contenido: data[0].contenido,
      calificacion: data[0].calificacion,
      aprobado: data[0].aprobado,
      visible: data[0].visible,
      fechaCreacion: data[0].fecha_creacion ? data[0].fecha_creacion.split('T')[0] : new Date().toISOString().split('T')[0]
    };

    return NextResponse.json(testimonioFormateado);
  } catch (error) {
    console.error('Error creating testimonio:', error);
    return NextResponse.json(
      { error: 'Error al crear testimonio' },
      { status: 500 }
    );
  }
}