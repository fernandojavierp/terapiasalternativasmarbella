'use client'

import { useState, useEffect } from 'react'
import { Testimonio } from '@/app/types'
import toast from 'react-hot-toast'

export default function AdminTestimoniosPage() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState<'todos' | 'pendientes' | 'aprobados'>('todos')
  const [autenticado, setAutenticado] = useState(false)
  const [credenciales, setCredenciales] = useState({ username: '', password: '' })

  // Función simple de autenticación (en producción usar algo más seguro)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Credenciales simples (en producción usar hash y JWT)
    if (credenciales.username === 'ines' && credenciales.password === 'admin2024') {
      setAutenticado(true)
      toast.success('Acceso concedido')
      cargarTestimonios()
    } else {
      toast.error('Credenciales incorrectas')
    }
  }

  const cargarTestimonios = async () => {
    try {
      const response = await fetch('/api/testimonios?admin=true')
      if (response.ok) {
        const data = await response.json()
        setTestimonios(data)
      } else {
        toast.error('Error al cargar testimonios')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al cargar testimonios')
    } finally {
      setCargando(false)
    }
  }

  const actualizarTestimonio = async (id: string, cambios: Partial<Testimonio>) => {
    try {
      const response = await fetch(`/api/testimonios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cambios),
      })

      if (response.ok) {
        toast.success('Testimonio actualizado')
        cargarTestimonios()
      } else {
        toast.error('Error al actualizar testimonio')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al actualizar testimonio')
    }
  }

  const eliminarTestimonio = async (id: string) => {
    if (!confirm('¿Estás segura de que quieres eliminar este testimonio?')) {
      return
    }

    try {
      const response = await fetch(`/api/testimonios/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Testimonio eliminado')
        cargarTestimonios()
      } else {
        toast.error('Error al eliminar testimonio')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al eliminar testimonio')
    }
  }

  const testimoniosFiltrados = testimonios.filter(testimonio => {
    switch (filtro) {
      case 'pendientes':
        return !testimonio.aprobado
      case 'aprobados':
        return testimonio.aprobado
      default:
        return true
    }
  })

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={credenciales.username}
                onChange={(e) => setCredenciales(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={credenciales.password}
                onChange={(e) => setCredenciales(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Gestión de Testimonios</h1>
            <button
              onClick={() => setAutenticado(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 rounded ${filtro === 'todos' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Todos ({testimonios.length})
            </button>
            <button
              onClick={() => setFiltro('pendientes')}
              className={`px-4 py-2 rounded ${filtro === 'pendientes' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              Pendientes ({testimonios.filter(t => !t.aprobado).length})
            </button>
            <button
              onClick={() => setFiltro('aprobados')}
              className={`px-4 py-2 rounded ${filtro === 'aprobados' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              Aprobados ({testimonios.filter(t => t.aprobado).length})
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-8">
            <p>Cargando testimonios...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimoniosFiltrados.map((testimonio) => (
              <div key={testimonio.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{testimonio.nombre}</h3>
                    <p className="text-gray-600">{testimonio.email}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(testimonio.fechaCreacion).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">
                      {'⭐'.repeat(testimonio.calificacion)}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      testimonio.aprobado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {testimonio.aprobado ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-4">{testimonio.contenido}</p>
                
                <div className="flex space-x-2">
                  {!testimonio.aprobado && (
                    <button
                      onClick={() => actualizarTestimonio(testimonio.id, { aprobado: true })}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Aprobar
                    </button>
                  )}
                  
                  {testimonio.aprobado && (
                    <button
                      onClick={() => actualizarTestimonio(testimonio.id, { aprobado: false })}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Desaprobar
                    </button>
                  )}
                  
                  <button
                    onClick={() => actualizarTestimonio(testimonio.id, { visible: !testimonio.visible })}
                    className={`px-4 py-2 rounded transition-colors ${
                      testimonio.visible 
                        ? 'bg-gray-500 text-white hover:bg-gray-600' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {testimonio.visible ? 'Ocultar' : 'Mostrar'}
                  </button>
                  
                  <button
                    onClick={() => eliminarTestimonio(testimonio.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            
            {testimoniosFiltrados.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-gray-500">No hay testimonios para mostrar</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}