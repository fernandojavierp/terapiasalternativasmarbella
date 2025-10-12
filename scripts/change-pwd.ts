// scripts/change-password.ts
import bcrypt from 'bcryptjs';

async function generateNewPassword() {
  const nuevaPassword = 'T3r4p1as_1n3s2024!M4rb3ll4'; // Cambia por la que quieras
  const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
  
  console.log('=== NUEVA CONTRASEÑA ===');
  console.log('Contraseña:', nuevaPassword);
  console.log('\nEjecuta este SQL en Supabase:');
  console.log(`
    UPDATE usuarios_admin 
    SET password_hash = '${hashedPassword}'
    WHERE username = 'admin';
  `);
}

generateNewPassword();