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

    // Obtener parámetros opcionales
    const body = await request.json().catch(() => ({}));
    const { branch, force = false } = body;

    // Obtener la rama actual si no se especifica
    let targetBranch = branch;
    if (!targetBranch) {
      const branchResult = await execAsync('git branch --show-current');
      targetBranch = branchResult.stdout.trim();
    }

    if (!targetBranch) {
      return NextResponse.json(
        { error: 'No se pudo determinar la rama actual' },
        { status: 400 }
      );
    }

    // Verificar que hay commits para hacer push
    try {
      const statusResult = await execAsync('git status -uno');
      if (statusResult.stdout.includes('Your branch is up to date')) {
        return NextResponse.json(
          { error: 'No hay cambios para hacer push' },
          { status: 400 }
        );
      }
    } catch (statusError) {
      // Continuar si no se puede verificar el estado
      console.warn('Advertencia verificando estado:', statusError);
    }

    // Construir comando de push
    let pushCommand = `git push origin ${targetBranch}`;
    if (force) {
      pushCommand += ' --force';
    }

    // Ejecutar push con timeout
    const pushResult = await Promise.race([
      execAsync(pushCommand),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 30000)
      )
    ]) as { stdout: string; stderr: string };

    // Obtener información actualizada del repositorio
    const [statusResult, lastCommitResult] = await Promise.allSettled([
      execAsync('git status -uno'),
      execAsync('git log -1 --pretty=format:"%h|%an|%ad|%s" --date=relative')
    ]);

    let remoteStatus = 'unknown';
    if (statusResult.status === 'fulfilled') {
      const output = statusResult.value.stdout;
      if (output.includes('Your branch is up to date')) {
        remoteStatus = 'up-to-date';
      } else if (output.includes('Your branch is ahead')) {
        remoteStatus = 'ahead';
      }
    }

    let lastCommit = null;
    if (lastCommitResult.status === 'fulfilled' && lastCommitResult.value.stdout) {
      const [hash, author, date, message] = lastCommitResult.value.stdout.split('|');
      lastCommit = { hash, author, date, message };
    }

    return NextResponse.json({
      success: true,
      message: 'Push realizado exitosamente',
      branch: targetBranch,
      remoteStatus,
      lastCommit,
      output: pushResult.stdout,
      stderr: pushResult.stderr,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Error realizando push:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    // Manejar errores específicos
    if (errorMessage?.includes('Timeout')) {
      return NextResponse.json(
        { error: 'Timeout: El push tardó demasiado tiempo' },
        { status: 408 }
      );
    }

    if (errorMessage?.includes('rejected')) {
      return NextResponse.json(
        { error: 'Push rechazado. Puede que necesites hacer pull primero' },
        { status: 409 }
      );
    }

    if (errorMessage?.includes('not a git repository')) {
      return NextResponse.json(
        { error: 'No es un repositorio Git válido' },
        { status: 400 }
      );
    }

    if (errorMessage?.includes('No such remote')) {
      return NextResponse.json(
        { error: 'No se encontró el repositorio remoto' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Error interno del servidor al realizar push',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}