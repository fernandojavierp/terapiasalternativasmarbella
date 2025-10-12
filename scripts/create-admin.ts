// scripts/create-admin.ts
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  const password = 'admin123'; // Cambia esta contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Contraseña hasheada:', hashedPassword);
  console.log('Ejecuta este SQL en Supabase:');
  console.log(`
    INSERT INTO usuarios_admin (username, password_hash) VALUES (
      'admin',
      '${hashedPassword}'
    );
  `);
}

createAdminUser();