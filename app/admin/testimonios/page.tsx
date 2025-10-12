'use client'

import { useState, useEffect, useCallback } from 'react'
import { Testimonio } from '@/app/types'
import toast from 'react-hot-toast'


interface User {
  userId: string
  username: string
  role: string
}

export default function AdminTestimoniosPage() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState<'todos' | 'pendientes' | 'aprobados'>('todos')
  const [autenticado, setAutenticado] = useState(false)
  const [usuario, setUsuario] = useState<User | null>(null)
  const [credenciales, setCredenciales] = useState({ username: '', password: '' })
  const [cargandoLogin, setCargandoLogin] = useState(false)

  const cargarTestimonios = useCallback(async () => {
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
  }, [])

  const verificarAutenticacion = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify')
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          setAutenticado(true)
          setUsuario(data.user)
          cargarTestimonios()
        } else {
          setCargando(false)
        }
      } else {
        setCargando(false)
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error)
      setCargando(false)
    }
  }, [cargarTestimonios])

  // Verificar autenticación al cargar la página
  useEffect(() => {
    verificarAutenticacion()
  }, [verificarAutenticacion])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargandoLogin(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      })

      const data = await response.json()

      if (response.ok) {
        setAutenticado(true)
        setUsuario(data.user)
        toast.success('Acceso concedido')
        cargarTestimonios()
      } else {
        toast.error(data.error || 'Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error en login:', error)
      toast.error('Error al iniciar sesión')
    } finally {
      setCargandoLogin(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAutenticado(false)
      setUsuario(null)
      setCredenciales({ username: '', password: '' })
      toast.success('Sesión cerrada')
    } catch (error) {
      console.error('Error en logout:', error)
      toast.error('Error al cerrar sesión')
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
    if (!confirm('¿Estás seguro de que quieres eliminar este testimonio?')) {
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
    if (filtro === 'pendientes') return !testimonio.aprobado
    if (filtro === 'aprobados') return testimonio.aprobado
    return true
  })

  if (cargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Acceso Administrativo
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={credenciales.username}
                onChange={(e) => setCredenciales({...credenciales, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={credenciales.password}
                onChange={(e) => setCredenciales({...credenciales, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={cargandoLogin}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cargandoLogin ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panel de Administración - Testimonios
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Bienvenido, {usuario?.username}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Gestión de Testimonios
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFiltro('todos')}
                className={`px-4 py-2 rounded-md ${
                  filtro === 'todos'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos ({testimonios.length})
              </button>
              <button
                onClick={() => setFiltro('pendientes')}
                className={`px-4 py-2 rounded-md ${
                  filtro === 'pendientes'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pendientes ({testimonios.filter(t => !t.aprobado).length})
              </button>
              <button
                onClick={() => setFiltro('aprobados')}
                className={`px-4 py-2 rounded-md ${
                  filtro === 'aprobados'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Aprobados ({testimonios.filter(t => t.aprobado).length})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {testimoniosFiltrados.map((testimonio) => (
              <div
                key={testimonio.id}
                className={`border rounded-lg p-4 ${
                  testimonio.aprobado
                    ? 'border-green-200 bg-green-50'
                    : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {testimonio.nombre}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonio.email}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < testimonio.calificacion
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({testimonio.calificacion}/5)
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        actualizarTestimonio(testimonio.id, {
                          aprobado: !testimonio.aprobado,
                        })
                      }
                      className={`px-3 py-1 rounded text-sm ${
                        testimonio.aprobado
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {testimonio.aprobado ? 'Desaprobar' : 'Aprobar'}
                    </button>
                    <button
                      onClick={() =>
                        actualizarTestimonio(testimonio.id, {
                          visible: !testimonio.visible,
                        })
                      }
                      className={`px-3 py-1 rounded text-sm ${
                        testimonio.visible
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-500 text-white hover:bg-gray-600'
                      }`}
                    >
                      {testimonio.visible ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => eliminarTestimonio(testimonio.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{testimonio.contenido}</p>
                <p className="text-xs text-gray-500">
                  Fecha: {new Date(testimonio.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {testimoniosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No hay testimonios para mostrar
            </div>
          )}
        </div>
      </div>
    </div>
  )
}