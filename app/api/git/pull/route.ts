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
    const { branch, rebase = false } = body;

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

    // Verificar si hay cambios locales sin commitear
    const statusResult = await execAsync('git status --porcelain');
    const hasUncommittedChanges = statusResult.stdout.trim().length > 0;

    if (hasUncommittedChanges) {
      return NextResponse.json(
        { 
          error: 'Hay cambios sin commitear. Haz commit o stash antes de hacer pull',
          hasUncommittedChanges: true
        },
        { status: 409 }
      );
    }

    // Hacer fetch primero para obtener los últimos cambios
    await execAsync('git fetch origin');

    // Construir comando de pull
    let pullCommand = `git pull origin ${targetBranch}`;
    if (rebase) {
      pullCommand += ' --rebase';
    }

    // Ejecutar pull con timeout
    const pullResult = await Promise.race([
      execAsync(pullCommand),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 30000)
      )
    ]) as { stdout: string; stderr: string };

    // Obtener información actualizada del repositorio
    const [newStatusResult, lastCommitResult, changedFilesResult] = await Promise.allSettled([
      execAsync('git status -uno'),
      execAsync('git log -1 --pretty=format:"%h|%an|%ad|%s" --date=relative'),
      execAsync('git diff --name-only HEAD@{1} HEAD').catch(() => ({ stdout: '' }))
    ]);

    let remoteStatus = 'unknown';
    if (newStatusResult.status === 'fulfilled') {
      const output = newStatusResult.value.stdout;
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

    let changedFiles: string[] = [];
    if (changedFilesResult.status === 'fulfilled') {
      changedFiles = changedFilesResult.value.stdout
        .split('\n')
        .filter(file => file.trim().length > 0);
    }

    // Determinar si hubo cambios
    const hadChanges = pullResult.stdout.includes('files changed') || 
                      pullResult.stdout.includes('file changed') ||
                      changedFiles.length > 0;

    return NextResponse.json({
      success: true,
      message: hadChanges ? 'Pull realizado exitosamente con cambios' : 'Ya estás actualizado',
      branch: targetBranch,
      remoteStatus,
      lastCommit,
      changedFiles,
      hadChanges,
      output: pullResult.stdout,
      stderr: pullResult.stderr,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error realizando pull:', error);

    // Manejar errores específicos
    if (error.message?.includes('Timeout')) {
      return NextResponse.json(
        { error: 'Timeout: El pull tardó demasiado tiempo' },
        { status: 408 }
      );
    }

    if (error.message?.includes('CONFLICT')) {
      return NextResponse.json(
        { 
          error: 'Conflicto de merge detectado. Resuelve los conflictos manualmente',
          hasConflicts: true
        },
        { status: 409 }
      );
    }

    if (error.message?.includes('not a git repository')) {
      return NextResponse.json(
        { error: 'No es un repositorio Git válido' },
        { status: 400 }
      );
    }

    if (error.message?.includes('No such remote')) {
      return NextResponse.json(
        { error: 'No se encontró el repositorio remoto' },
        { status: 400 }
      );
    }

    if (error.message?.includes('Already up to date')) {
      return NextResponse.json({
        success: true,
        message: 'Ya estás actualizado',
        hadChanges: false,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { 
        error: 'Error interno del servidor al realizar pull',
        details: error.message 
      },
      { status: 500 }
    );
  }
}