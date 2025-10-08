'use client'

import { useState, useEffect } from 'react'
import { Testimonio } from '@/app/types'

export default function TestimonialSlider() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarTestimonios()
  }, [])

  const cargarTestimonios = async () => {
    try {
      const response = await fetch('/api/testimonios')
      if (response.ok) {
        const data = await response.json()
        setTestimonios(data)
      }
    } catch (error) {
      console.error('Error al cargar testimonios:', error)
    } finally {
      setCargando(false)
    }
  }

  const nextTestimonio = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonio = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    )
  }

  if (cargando) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Cargando testimonios...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonios.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Testimonios de Nuestros Pacientes
            </h2>
            <p className="text-gray-600 mb-8">
              Pronto tendremos testimonios de nuestros pacientes aquí.
            </p>
            <a
              href="/testimonios"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
              Deja tu Testimonio
            </a>
          </div>
        </div>
      </section>
    )
  }

  const testimonioActual = testimonios[currentIndex]

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Testimonios de Nuestros Pacientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre las experiencias reales de personas que han transformado sus vidas 
            con nuestras terapias alternativas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            {/* Navegación */}
            {testimonios.length > 1 && (
              <>
                <button
                  onClick={prevTestimonio}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
                  aria-label="Testimonio anterior"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextTestimonio}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
                  aria-label="Siguiente testimonio"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Contenido del testimonio */}
            <div className="text-center">
              {/* Calificación */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < testimonioActual.calificacion ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Comillas decorativas */}
              <div className="text-6xl text-green-200 mb-4">"</div>
              
              {/* Contenido */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                {testimonioActual.contenido}
              </blockquote>
              
              {/* Autor */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-semibold text-gray-800 text-lg">
                  {testimonioActual.nombre}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(testimonioActual.fechaCreacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Indicadores */}
          {testimonios.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Call to action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ¿Has tenido una experiencia positiva con nuestras terapias?
            </p>
            <a
              href="/testimonios"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
              Comparte tu Testimonio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}