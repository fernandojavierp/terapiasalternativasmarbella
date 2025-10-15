// scripts/change-password.ts
import bcrypt from 'bcryptjs'

/**
 * Genera una nueva contraseña para el usuario admin y muestra el SQL.
 * Lee ADMIN_USERNAME y ADMIN_PASSWORD del entorno.
 */
async function generateNewPassword() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const nuevaPassword = process.env.ADMIN_PASSWORD || ''

  if (!nuevaPassword) {
    console.error('Falta ADMIN_PASSWORD en el entorno. Aborta.')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(nuevaPassword, 12)
  
  console.log('=== NUEVA CONTRASEÑA (no imprimir en logs públicos) ===')
  console.log('Usuario:', username)
  console.log('Contraseña:', nuevaPassword)
  console.log('\nEjecuta este SQL en Supabase:')
  console.log(`
    UPDATE usuarios_admin 
    SET password_hash = '${hashedPassword}'
    WHERE username = '${username}';
  `)
}

generateNewPassword()