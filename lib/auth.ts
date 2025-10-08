import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Configuración de JWT
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-clave-secreta-muy-segura-cambiala-en-produccion'
)
const JWT_EXPIRES_IN = '24h'

// Interfaz para el payload del JWT
export interface JWTPayload {
  userId: string
  username: string
  role: string
  iat?: number
  exp?: number
}

// Función para hashear contraseñas
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Función para verificar contraseñas
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Función para crear JWT token
export async function createJWT(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)
}

// Función para verificar JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // Verificar que el payload tiene las propiedades requeridas
    if (
      typeof payload.userId === 'string' &&
      typeof payload.username === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
        iat: payload.iat,
        exp: payload.exp
      }
    }
    
    return null
  } catch (error) {
    console.error('Error verificando JWT:', error)
    return null
  }
}

// Función para obtener el token de las cookies
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  return token?.value || null
}

// Función para verificar si el usuario está autenticado
export async function isAuthenticated(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  
  return await verifyJWT(token)
}

// Configuración de usuarios (en producción esto debería estar en una base de datos)
export const ADMIN_USERS = [
  {
    id: '1',
    username: 'ines',
    // Contraseña: admin2024 (hasheada con bcrypt)
    password: '$2b$12$TJu7Nni3h.WgmTxxVfGvnugHxZWTot7TU9MV0mor9fgtzJ01dryli',
    role: 'admin'
  }
]

// Función para encontrar usuario por username
export function findUserByUsername(username: string) {
  return ADMIN_USERS.find(user => user.username === username)
}

// Función para validar credenciales
export async function validateCredentials(username: string, password: string): Promise<JWTPayload | null> {
  const user = findUserByUsername(username)
  if (!user) return null
  
  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword) return null
  
  return {
    userId: user.id,
    username: user.username,
    role: user.role
  }
}