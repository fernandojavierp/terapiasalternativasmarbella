// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('ADVERTENCIA: Falta SUPABASE_SERVICE_ROLE_KEY. Las operaciones privilegiadas fallarán con RLS activo.')
}

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey)