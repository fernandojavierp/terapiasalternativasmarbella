import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { verifyJWT } from '@/lib/auth';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Obtener datos del request
    const { message, files } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'El mensaje del commit es requerido' },
        { status: 400 }
      );
    }

    // Configurar usuario de Git si no está configurado
    try {
      await execAsync('git config user.name "Inés - Admin Panel"');
      await execAsync('git config user.email "admin@terapiasalternativasmarbella.com"');
    } catch (configError) {
      console.warn('Advertencia configurando usuario Git:', configError);
    }

    // Si se especifican archivos, añadirlos individualmente
    if (files && Array.isArray(files) && files.length > 0) {
      for (const file of files) {
        if (typeof file === 'string' && file.trim()) {
          try {
            await execAsync(`git add "${file.replace(/"/g, '\\"')}"`);
          } catch (addError) {
            console.error(`Error añadiendo archivo ${file}:`, addError);
            return NextResponse.json(
              { error: `Error añadiendo archivo: ${file}` },
              { status: 400 }
            );
          }
        }
      }
    } else {
      // Si no se especifican archivos, añadir todos los cambios
      await execAsync('git add .');
    }

    // Verificar que hay cambios para commitear
    const statusResult = await execAsync('git status --porcelain --cached');
    if (!statusResult.stdout.trim()) {
      return NextResponse.json(
        { error: 'No hay cambios para commitear' },
        { status: 400 }
      );
    }

    // Hacer el commit
    const commitMessage = message.trim().replace(/"/g, '\\"');
    const commitResult = await execAsync(`git commit -m "${commitMessage}"`);

    // Obtener información del commit recién creado
    const lastCommitResult = await execAsync(
      'git log -1 --pretty=format:"%H|%h|%an|%ad|%s" --date=iso'
    );

    let commitInfo = null;
    if (lastCommitResult.stdout) {
      const [fullHash, shortHash, author, date, commitMsg] = lastCommitResult.stdout.split('|');
      commitInfo = {
        fullHash,
        shortHash,
        author,
        date,
        message: commitMsg
      };
    }

    return NextResponse.json({
      success: true,
      message: 'Commit realizado exitosamente',
      commit: commitInfo,
      output: commitResult.stdout,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error realizando commit:', error);
    
    // Manejar errores específicos de Git
    if (error.message?.includes('nothing to commit')) {
      return NextResponse.json(
        { error: 'No hay cambios para commitear' },
        { status: 400 }
      );
    }

    if (error.message?.includes('not a git repository')) {
      return NextResponse.json(
        { error: 'No es un repositorio Git válido' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor al realizar commit' },
      { status: 500 }
    );
  }
}