export interface FormData {
  name: string
  email: string
  message: string
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface Benefit {
  title: string
  description: string
}

// Nuevos tipos para el sistema de testimonios
export interface Testimonio {
  id: string
  nombre: string
  email: string
  contenido: string
  calificacion: number // 1-5 estrellas
  fechaCreacion: string
  aprobado: boolean
  visible: boolean
}

export interface TestimonioFormData {
  nombre: string
  email: string
  contenido: string
  calificacion: number
}

export interface AdminCredentials {
  username: string
  password: string
}

