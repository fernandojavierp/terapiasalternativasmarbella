'use client';

import { useState, useEffect } from 'react';

interface GitStatus {
  currentBranch: string;
  changedFiles: Array<{
    file: string;
    status: string;
  }>;
  hasChanges: boolean;
  lastCommit: {
    hash: string;
    author: string;
    date: string;
    message: string;
  } | null;
  remoteStatus: string;
  timestamp: string;
}

interface GitPanelProps {
  onRefresh?: () => void;
}

export default function GitPanel({ onRefresh }: GitPanelProps) {
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commitMessage, setCommitMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showCommitForm, setShowCommitForm] = useState(false);

  // Cargar estado inicial
  useEffect(() => {
    fetchGitStatus();
  }, []);

  const fetchGitStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/git/status');
      if (!response.ok) {
        throw new Error('Error obteniendo estado de Git');
      }
      
      const data = await response.json();
      setGitStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      setError('El mensaje del commit es requerido');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/git/commit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          files: selectedFiles.length > 0 ? selectedFiles : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error realizando commit');
      }

      setCommitMessage('');
      setSelectedFiles([]);
      setShowCommitForm(false);
      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handlePush = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/git/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error realizando push');
      }

      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handlePull = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/git/pull', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error realizando pull');
      }

      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const toggleFileSelection = (file: string) => {
    setSelectedFiles(prev => 
      prev.includes(file) 
        ? prev.filter(f => f !== file)
        : [...prev, file]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'modified': return 'text-yellow-600';
      case 'added': return 'text-green-600';
      case 'deleted': return 'text-red-600';
      case 'untracked': return 'text-blue-600';
      case 'conflict': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'modified': return 'M';
      case 'added': return 'A';
      case 'deleted': return 'D';
      case 'untracked': return '?';
      case 'conflict': return '!';
      default: return '·';
    }
  };

  const getRemoteStatusColor = (status: string) => {
    switch (status) {
      case 'up-to-date': return 'text-green-600';
      case 'ahead': return 'text-blue-600';
      case 'behind': return 'text-orange-600';
      case 'diverged': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading && !gitStatus) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Control de Versiones Git</h3>
          <button
            onClick={fetchGitStatus}
            disabled={loading}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
          >
            {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {gitStatus && (
          <div className="space-y-6">
            {/* Estado del repositorio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Rama actual</h4>
                <p className="text-sm bg-gray-50 px-3 py-2 rounded-md font-mono">
                  {gitStatus.currentBranch}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Estado remoto</h4>
                <p className={`text-sm px-3 py-2 rounded-md font-medium ${getRemoteStatusColor(gitStatus.remoteStatus)}`}>
                  {gitStatus.remoteStatus === 'up-to-date' && 'Actualizado'}
                  {gitStatus.remoteStatus === 'ahead' && 'Cambios locales pendientes'}
                  {gitStatus.remoteStatus === 'behind' && 'Cambios remotos disponibles'}
                  {gitStatus.remoteStatus === 'diverged' && 'Ramas divergentes'}
                  {gitStatus.remoteStatus === 'unknown' && 'Estado desconocido'}
                </p>
              </div>
            </div>

            {/* Último commit */}
            {gitStatus.lastCommit && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Último commit</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-mono text-gray-600 mb-1">
                    {gitStatus.lastCommit.hash} • {gitStatus.lastCommit.author} • {gitStatus.lastCommit.date}
                  </p>
                  <p className="text-sm text-gray-800">{gitStatus.lastCommit.message}</p>
                </div>
              </div>
            )}

            {/* Archivos modificados */}
            {gitStatus.changedFiles.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Archivos modificados ({gitStatus.changedFiles.length})
                  </h4>
                  <button
                    onClick={() => setShowCommitForm(!showCommitForm)}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md"
                  >
                    {showCommitForm ? 'Cancelar' : 'Hacer Commit'}
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-md max-h-40 overflow-y-auto">
                  {gitStatus.changedFiles.map((file, index) => (
                    <div key={index} className="flex items-center px-3 py-2 border-b border-gray-200 last:border-b-0">
                      {showCommitForm && (
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.file)}
                          onChange={() => toggleFileSelection(file.file)}
                          className="mr-3"
                        />
                      )}
                      <span className={`text-xs font-mono mr-2 w-4 ${getStatusColor(file.status)}`}>
                        {getStatusIcon(file.status)}
                      </span>
                      <span className="text-sm font-mono text-gray-700 flex-1">{file.file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulario de commit */}
            {showCommitForm && gitStatus.hasChanges && (
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Nuevo Commit</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Mensaje del commit *
                    </label>
                    <input
                      type="text"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="Describe los cambios realizados..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCommit}
                      disabled={loading || !commitMessage.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md disabled:opacity-50"
                    >
                      {loading ? 'Commiteando...' : 'Hacer Commit'}
                    </button>
                    <button
                      onClick={() => setShowCommitForm(false)}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Controles de Git */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handlePull}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Pull (Descargar)'}
              </button>
              
              <button
                onClick={handlePush}
                disabled={loading || gitStatus.remoteStatus === 'up-to-date'}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Push (Subir)'}
              </button>
            </div>

            {/* Información adicional */}
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              Última actualización: {new Date(gitStatus.timestamp).toLocaleString('es-ES')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}