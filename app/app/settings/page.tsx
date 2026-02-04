'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Settings, DEFAULT_SETTINGS } from '@/lib/types';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<Settings>(
    'settings',
    DEFAULT_SETTINGS
  );
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setLocalSettings(DEFAULT_SETTINGS);
  };

  const handleClearData = () => {
    if (
      confirm(
        'Tem certeza? Isso apagará todos os seus dados (tarefas, sessões, estatísticas).'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/30">
      <nav className="border-b border-text/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/app">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer">
                ← FocusFlow
              </h1>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-text mb-8">⚙️ Configurações</h2>

        <div className="space-y-6">
          {/* Timer Durations */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
            <h3 className="text-xl font-semibold text-text mb-6">
              Duração das Sessões
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-text font-medium">Foco</label>
                  <span className="text-text/60 font-mono">
                    {localSettings.focusDuration} min
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={localSettings.focusDuration}
                  onChange={e =>
                    setLocalSettings(prev => ({
                      ...prev,
                      focusDuration: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-text font-medium">Pausa Curta</label>
                  <span className="text-text/60 font-mono">
                    {localSettings.shortBreakDuration} min
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={localSettings.shortBreakDuration}
                  onChange={e =>
                    setLocalSettings(prev => ({
                      ...prev,
                      shortBreakDuration: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-text font-medium">Pausa Longa</label>
                  <span className="text-text/60 font-mono">
                    {localSettings.longBreakDuration} min
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={localSettings.longBreakDuration}
                  onChange={e =>
                    setLocalSettings(prev => ({
                      ...prev,
                      longBreakDuration: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
            <h3 className="text-xl font-semibold text-text mb-4">Som</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-text font-medium">Notificações Sonoras</p>
                <p className="text-text/60 text-sm mt-1">
                  Toca um som quando a sessão termina
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={localSettings.soundEnabled}
                  onChange={e =>
                    setLocalSettings(prev => ({
                      ...prev,
                      soundEnabled: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-surface rounded-full peer peer-checked:bg-primary transition-colors"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-text rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-text font-semibold hover:opacity-90 transition-opacity"
            >
              {saved ? '✓ Salvo!' : 'Salvar Configurações'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-surface/50 text-text/80 font-semibold hover:bg-surface/70 transition-colors backdrop-blur-sm border border-text/10"
            >
              Resetar
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-error/10 backdrop-blur-sm rounded-2xl p-6 border border-error/30">
            <h3 className="text-xl font-semibold text-error mb-4">
              ⚠️ Zona de Perigo
            </h3>
            <p className="text-text/80 mb-4">
              Apagar todos os dados permanentemente (tarefas, sessões, estatísticas).
              Esta ação não pode ser desfeita.
            </p>
            <button
              onClick={handleClearData}
              className="px-6 py-3 rounded-xl bg-error text-text font-semibold hover:opacity-90 transition-opacity"
            >
              Limpar Todos os Dados
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
