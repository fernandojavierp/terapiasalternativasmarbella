'use client'

import { useState } from 'react'
import { TestimonioFormData } from '@/app/types'
import toast from 'react-hot-toast'

export default function TestimoniosPage() {
  const [formData, setFormData] = useState<TestimonioFormData>({
    nombre: '',
    email: '',
    contenido: '',
    calificacion: 5
  })
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    try {
      const response = await fetch('/api/testimonios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('¡Gracias por tu testimonio! Será revisado antes de publicarse.')
        setFormData({
          nombre: '',
          email: '',
          contenido: '',
          calificacion: 5
        })
      } else {
        toast.error(data.error || 'Error al enviar el testimonio')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al enviar el testimonio')
    } finally {
      setEnviando(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'calificacion' ? parseInt(value) : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Comparte tu Experiencia
            </h1>
            <p className="text-gray-600">
              Tu testimonio es muy valioso para nosotros y puede ayudar a otras personas. 
              Comparte tu experiencia con nuestras terapias alternativas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="calificacion" className="block text-sm font-medium text-gray-700 mb-2">
                Calificación *
              </label>
              <select
                id="calificacion"
                name="calificacion"
                value={formData.calificacion}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              >
                <option value={5}>⭐⭐⭐⭐⭐ Excelente</option>
                <option value={4}>⭐⭐⭐⭐ Muy bueno</option>
                <option value={3}>⭐⭐⭐ Bueno</option>
                <option value={2}>⭐⭐ Regular</option>
                <option value={1}>⭐ Necesita mejorar</option>
              </select>
            </div>

            <div>
              <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-2">
                Tu testimonio *
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                placeholder="Comparte tu experiencia con nuestras terapias. ¿Cómo te has sentido? ¿Qué cambios has notado? ¿Recomendarías nuestros servicios?"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Tu testimonio será revisado por nuestro equipo antes de ser publicado. 
                Nos reservamos el derecho de editar o no publicar testimonios que no cumplan con nuestras políticas.
              </p>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enviando ? 'Enviando...' : 'Enviar Testimonio'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              ¿Tienes alguna pregunta? 
              <a href="/contacto" className="text-green-600 hover:text-green-700 ml-1">
                Contáctanos aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}