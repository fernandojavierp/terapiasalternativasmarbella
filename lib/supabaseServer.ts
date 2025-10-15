// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js'

// Usa SUPABASE_URL si está disponible, sino NEXT_PUBLIC_SUPABASE_URL
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Falta SUPABASE_URL o NEXT_PUBLIC_SUPABASE_URL en el entorno')
}

if (!supabaseServiceRoleKey) {
  console.warn('ADVERTENCIA: Falta SUPABASE_SERVICE_ROLE_KEY. Las operaciones privilegiadas fallarán con RLS activo.')
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey || '')