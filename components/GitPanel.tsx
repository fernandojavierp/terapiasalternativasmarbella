'use client';

import { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Upload, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  FileText,
  Plus,
  Minus,
  Edit3,
  HelpCircle,
  Activity,
  Zap
} from 'lucide-react';

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cargar estado inicial
  useEffect(() => {
    fetchGitStatus();
  }, []);

  // Auto-hide success messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchGitStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/git/status');
      if (!response.ok) {
        throw new Error('No se pudo obtener el estado del repositorio');
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
      setError('Por favor, escribe un mensaje descriptivo para el commit');
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
        throw new Error(data.error || 'No se pudo realizar el commit');
      }

      setCommitMessage('');
      setSelectedFiles([]);
      setShowCommitForm(false);
      setSuccessMessage('✅ Commit realizado exitosamente');
      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar el commit');
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
        throw new Error(data.error || 'No se pudo subir los cambios');
      }

      setSuccessMessage('🚀 Cambios subidos al repositorio remoto');
      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir los cambios');
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
        throw new Error(data.error || 'No se pudo descargar los cambios');
      }

      setSuccessMessage('⬇️ Cambios descargados del repositorio remoto');
      await fetchGitStatus();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al descargar los cambios');
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'modified': 
        return { 
          color: 'text-amber-600 bg-amber-50 border-amber-200', 
          icon: Edit3, 
          label: 'Modificado',
          badge: 'M'
        };
      case 'added': 
        return { 
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200', 
          icon: Plus, 
          label: 'Agregado',
          badge: 'A'
        };
      case 'deleted': 
        return { 
          color: 'text-red-600 bg-red-50 border-red-200', 
          icon: Minus, 
          label: 'Eliminado',
          badge: 'D'
        };
      case 'untracked': 
        return { 
          color: 'text-blue-600 bg-blue-50 border-blue-200', 
          icon: FileText, 
          label: 'Sin seguimiento',
          badge: '?'
        };
      case 'conflict': 
        return { 
          color: 'text-red-800 bg-red-100 border-red-300', 
          icon: AlertCircle, 
          label: 'Conflicto',
          badge: '!'
        };
      default: 
        return { 
          color: 'text-gray-600 bg-gray-50 border-gray-200', 
          icon: FileText, 
          label: 'Desconocido',
          badge: '·'
        };
    }
  };

  const getRemoteStatusConfig = (status: string) => {
    switch (status) {
      case 'up-to-date': 
        return { 
          color: 'text-emerald-700 bg-emerald-100', 
          icon: CheckCircle, 
          label: '✅ Todo actualizado',
          description: 'Tu repositorio local está sincronizado'
        };
      case 'ahead': 
        return { 
          color: 'text-blue-700 bg-blue-100', 
          icon: Upload, 
          label: '⬆️ Cambios pendientes',
          description: 'Tienes commits locales por subir'
        };
      case 'behind': 
        return { 
          color: 'text-orange-700 bg-orange-100', 
          icon: Download, 
          label: '⬇️ Actualizaciones disponibles',
          description: 'Hay cambios nuevos en el repositorio remoto'
        };
      case 'diverged': 
        return { 
          color: 'text-red-700 bg-red-100', 
          icon: GitPullRequest, 
          label: '🔄 Ramas divergentes',
          description: 'Necesitas sincronizar los cambios'
        };
      default: 
        return { 
          color: 'text-gray-700 bg-gray-100', 
          icon: HelpCircle, 
          label: '❓ Estado desconocido',
          description: 'No se pudo determinar el estado'
        };
    }
  };

  if (loading && !gitStatus) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border border-slate-200">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-300 rounded-lg"></div>
              <div className="h-6 bg-slate-300 rounded w-48"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-slate-300 rounded-lg"></div>
              <div className="h-20 bg-slate-300 rounded-lg"></div>
            </div>
            <div className="h-32 bg-slate-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Control de Versiones</h3>
              <p className="text-slate-300 text-sm">Gestiona tu repositorio Git</p>
            </div>
          </div>
          <button
            onClick={fetchGitStatus}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">
              {loading ? 'Actualizando...' : 'Actualizar'}
            </span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Messages */}
        {error && (
          <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-emerald-800">Éxito</h4>
              <p className="text-sm text-emerald-700 mt-1">{successMessage}</p>
            </div>
          </div>
        )}

        {gitStatus && (
          <div className="space-y-6">
            {/* Repository Status Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Current Branch */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <GitBranch className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Rama Actual</h4>
                    <p className="text-blue-700 font-mono text-sm bg-white/50 px-2 py-1 rounded mt-1">
                      {gitStatus.currentBranch}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remote Status */}
              <div className={`p-4 rounded-lg border ${getRemoteStatusConfig(gitStatus.remoteStatus).color.replace('text-', 'border-').replace('bg-', 'border-').replace('-700', '-300').replace('-100', '-200')}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getRemoteStatusConfig(gitStatus.remoteStatus).color.replace('bg-', 'bg-').replace('-100', '-500').replace('text-', 'text-white')}`}>
                    {(() => {
                      const IconComponent = getRemoteStatusConfig(gitStatus.remoteStatus).icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${getRemoteStatusConfig(gitStatus.remoteStatus).color.replace('bg-', '').replace('-100', '-900')}`}>
                      Estado del Repositorio
                    </h4>
                    <p className={`text-sm ${getRemoteStatusConfig(gitStatus.remoteStatus).color.replace('bg-', '').replace('-100', '-700')}`}>
                      {getRemoteStatusConfig(gitStatus.remoteStatus).label}
                    </p>
                    <p className={`text-xs mt-1 ${getRemoteStatusConfig(gitStatus.remoteStatus).color.replace('bg-', '').replace('-100', '-600')}`}>
                      {getRemoteStatusConfig(gitStatus.remoteStatus).description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Commit */}
            {gitStatus.lastCommit && (
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-600 rounded-lg">
                    <GitCommit className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-2">Último Commit</h4>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center space-x-4 text-xs text-slate-600 mb-2">
                        <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                          {gitStatus.lastCommit.hash.substring(0, 8)}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Activity className="w-3 h-3" />
                          <span>{gitStatus.lastCommit.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{gitStatus.lastCommit.date}</span>
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium">{gitStatus.lastCommit.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Changed Files */}
            {gitStatus.changedFiles.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-500 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900">
                        Archivos Modificados
                      </h4>
                      <p className="text-amber-700 text-sm">
                        {gitStatus.changedFiles.length} archivo{gitStatus.changedFiles.length !== 1 ? 's' : ''} con cambios
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCommitForm(!showCommitForm)}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-200 shadow-sm"
                  >
                    <GitCommit className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {showCommitForm ? 'Cancelar' : 'Crear Commit'}
                    </span>
                  </button>
                </div>
                
                <div className="bg-white rounded-lg border border-amber-200 max-h-48 overflow-y-auto">
                  {gitStatus.changedFiles.map((file, index) => {
                    const statusConfig = getStatusConfig(file.status);
                    const IconComponent = statusConfig.icon;
                    
                    return (
                      <div key={index} className="flex items-center px-4 py-3 border-b border-amber-100 last:border-b-0 hover:bg-amber-25 transition-colors">
                        {showCommitForm && (
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.file)}
                            onChange={() => toggleFileSelection(file.file)}
                            className="mr-3 w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                          />
                        )}
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${statusConfig.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-mono text-slate-700">{file.file}</p>
                          <p className="text-xs text-slate-500">{statusConfig.label}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-mono rounded ${statusConfig.color}`}>
                          {statusConfig.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Commit Form */}
            {showCommitForm && gitStatus.hasChanges && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-blue-900">Crear Nuevo Commit</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-2">
                      Mensaje del commit *
                    </label>
                    <input
                      type="text"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="ej: Actualizar contenido de la página principal"
                      className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      disabled={loading}
                    />
                    <p className="text-xs text-blue-600 mt-1">
                      Describe brevemente los cambios que realizaste
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleCommit}
                      disabled={loading || !commitMessage.trim()}
                      className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <GitCommit className="w-4 h-4" />
                      <span>{loading ? 'Creando commit...' : 'Crear Commit'}</span>
                    </button>
                    <button
                      onClick={() => setShowCommitForm(false)}
                      className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-all duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Git Actions */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <GitPullRequest className="w-5 h-5" />
                <span>Acciones de Sincronización</span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handlePull}
                  disabled={loading}
                  className="flex items-center justify-center space-x-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div>{loading ? 'Descargando...' : 'Descargar Cambios'}</div>
                    <div className="text-xs opacity-90">Pull desde remoto</div>
                  </div>
                </button>
                
                <button
                  onClick={handlePush}
                  disabled={loading || gitStatus.remoteStatus === 'up-to-date'}
                  className="flex items-center justify-center space-x-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Upload className="w-5 h-5" />
                  <div className="text-left">
                    <div>{loading ? 'Subiendo...' : 'Subir Cambios'}</div>
                    <div className="text-xs opacity-90">Push al remoto</div>
                  </div>
                </button>
              </div>
              
              {gitStatus.remoteStatus === 'up-to-date' && (
                <p className="text-center text-sm text-slate-600 mt-3 flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Tu repositorio está completamente sincronizado</span>
                </p>
              )}
            </div>

            {/* Footer Info */}
            <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>Última actualización: {new Date(gitStatus.timestamp).toLocaleString('es-ES')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}