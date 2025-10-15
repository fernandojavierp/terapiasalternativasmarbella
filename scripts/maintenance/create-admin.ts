// scripts/create-admin.ts
import bcrypt from 'bcryptjs'

/**
 * Crea el usuario admin imprimiendo el SQL necesario.
 * Lee usuario y contraseña de variables de entorno para evitar hardcode.
 */
async function createAdminUser() {
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || ''

  if (!password) {
    console.error('Falta ADMIN_PASSWORD en el entorno. Aborta.')
    process.exit(1)
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  console.log('== SQL para crear usuario admin ==')
  console.log(`
    INSERT INTO usuarios_admin (username, password_hash) VALUES (
      '${username}',
      '${hashedPassword}'
    );
  `)
}

createAdminUser()