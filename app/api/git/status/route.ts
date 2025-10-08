import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { verifyJWT } from '@/lib/auth';

const execAsync = promisify(exec);

export async function GET(request: NextRequest) {
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

    // Obtener información del repositorio Git
    const [
      branchResult,
      statusResult,
      lastCommitResult,
      remoteResult
    ] = await Promise.allSettled([
      execAsync('git branch --show-current'),
      execAsync('git status --porcelain'),
      execAsync('git log -1 --pretty=format:"%h|%an|%ad|%s" --date=relative'),
      execAsync('git status -uno')
    ]);

    // Procesar resultados
    const currentBranch = branchResult.status === 'fulfilled' 
      ? branchResult.value.stdout.trim() 
      : 'unknown';

    const changedFiles = statusResult.status === 'fulfilled'
      ? statusResult.value.stdout.split('\n').filter(line => line.trim()).map(line => {
          const status = line.substring(0, 2);
          const file = line.substring(3);
          return {
            file,
            status: getFileStatus(status)
          };
        })
      : [];

    const lastCommit = lastCommitResult.status === 'fulfilled' && lastCommitResult.value.stdout
      ? (() => {
          const [hash, author, date, message] = lastCommitResult.value.stdout.split('|');
          return { hash, author, date, message };
        })()
      : null;

    // Verificar si hay cambios remotos
    let remoteStatus = 'unknown';
    if (remoteResult.status === 'fulfilled') {
      const output = remoteResult.value.stdout;
      if (output.includes('Your branch is up to date')) {
        remoteStatus = 'up-to-date';
      } else if (output.includes('Your branch is ahead')) {
        remoteStatus = 'ahead';
      } else if (output.includes('Your branch is behind')) {
        remoteStatus = 'behind';
      } else if (output.includes('have diverged')) {
        remoteStatus = 'diverged';
      }
    }

    return NextResponse.json({
      currentBranch,
      changedFiles,
      hasChanges: changedFiles.length > 0,
      lastCommit,
      remoteStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error obteniendo estado de Git:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function getFileStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    'M ': 'modified',
    ' M': 'modified',
    'MM': 'modified',
    'A ': 'added',
    ' A': 'added',
    'D ': 'deleted',
    ' D': 'deleted',
    'R ': 'renamed',
    ' R': 'renamed',
    'C ': 'copied',
    ' C': 'copied',
    '??': 'untracked',
    'UU': 'conflict'
  };

  return statusMap[status] || 'unknown';
}