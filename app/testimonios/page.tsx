'use client'

import { useState } from 'react'
import { TestimonioFormData } from '@/app/types'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Send, Star, MessageCircle, Heart, Users } from 'lucide-react'
import Link from 'next/link'

export default function TestimoniosPage() {
  const [formData, setFormData] = useState<TestimonioFormData>({
    nombre: '',
    email: '',
    contenido: '',
    calificacion: 5
  })
  const [enviando, setEnviando] = useState(false)
  const [exitoso, setExitoso] = useState(false)

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
        toast.success('¡Gracias por tu testimonio! Será revisado antes de publicarse.', {
          duration: 5000,
          position: 'top-center',
        })
        setExitoso(true)
        setFormData({
          nombre: '',
          email: '',
          contenido: '',
          calificacion: 5
        })
        // Resetear el estado de éxito después de 5 segundos
        setTimeout(() => setExitoso(false), 5000)
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
    <div className="bg-background w-full min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Comparte tu experiencia
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tu testimonio es muy valioso para nosotros y puede ayudar a otras personas. 
              Comparte tu experiencia con nuestras terapias alternativas.
            </p>
          </div>

          {/* Benefits Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-6 text-center rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Ayuda a otros</h3>
              <p className="text-muted-foreground text-sm">
                Tu experiencia puede inspirar a otras personas a comenzar su proceso de sanación.
              </p>
            </div>

            <div className="bg-card p-6 text-center rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Construye comunidad</h3>
              <p className="text-muted-foreground text-sm">
                Forma parte de una comunidad de personas comprometidas con su bienestar.
              </p>
            </div>

            <div className="bg-card p-6 text-center rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Comparte tu historia</h3>
              <p className="text-muted-foreground text-sm">
                Cada historia es única y valiosa. Tu voz importa en nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Star className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  Formulario de Testimonio
                </h2>
                <p className="text-muted-foreground">
                  Completa el formulario a continuación para compartir tu experiencia con nosotros.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {exitoso && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      ¡Testimonio Enviado con Éxito!
                    </h3>
                    <p className="text-green-700 text-sm">
                      Gracias por compartir tu experiencia. Tu testimonio será revisado por nuestro equipo 
                      y publicado una vez aprobado. Te notificaremos por email cuando esté disponible.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="calificacion" className="block text-sm font-medium mb-2">
                    Calificación *
                  </label>
                  <select
                    id="calificacion"
                    name="calificacion"
                    value={formData.calificacion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excelente</option>
                    <option value={4}>⭐⭐⭐⭐ Muy bueno</option>
                    <option value={3}>⭐⭐⭐ Bueno</option>
                    <option value={2}>⭐⭐ Regular</option>
                    <option value={1}>⭐ Necesita mejorar</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contenido" className="block text-sm font-medium mb-2">
                    Tu testimonio *
                  </label>
                  <textarea
                    id="contenido"
                    name="contenido"
                    value={formData.contenido}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Comparte tu experiencia con nuestras terapias. ¿Cómo te has sentido? ¿Qué cambios has notado? ¿Recomendarías nuestros servicios?"
                  />
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    <strong>Nota:</strong> Tu testimonio será revisado por nuestro equipo antes de ser publicado. 
                    Nos reservamos el derecho de editar o no publicar testimonios que no cumplan con nuestras políticas.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={enviando}
                  className="w-full"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {enviando ? 'Enviando...' : 'Enviar Testimonio'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-muted-foreground mb-8">
              Si necesitas más información sobre nuestras terapias o tienes alguna duda, 
              no dudes en contactarnos. Estamos aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contacto">
                  Contáctanos
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  Volver al inicio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}