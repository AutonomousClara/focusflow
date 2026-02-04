'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Session, Task } from '@/lib/types';
import StatsCard from '@/components/StatsCard';
import Link from 'next/link';

export default function StatsPage() {
  const [sessions] = useLocalStorage<Session[]>('sessions', []);
  const [tasks] = useLocalStorage<Task[]>('tasks', []);

  // Today stats
  const today = new Date().setHours(0, 0, 0, 0);
  const todaySessions = sessions.filter(
    s => s.completedAt && s.completedAt >= today
  );
  const focusSessions = todaySessions.filter(s => s.type === 'focus');
  const totalFocusTime = focusSessions.reduce((acc, s) => {
    if (s.completedAt && s.startedAt) {
      return acc + Math.floor((s.completedAt - s.startedAt) / 1000 / 60);
    }
    return acc;
  }, 0);

  const totalDistractions = focusSessions.reduce(
    (acc, s) => acc + s.distractions.length,
    0
  );

  // Week stats (last 7 days)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }).reverse();

  const weekData = weekDays.map(dayStart => {
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const daySessions = sessions.filter(
      s =>
        s.type === 'focus' &&
        s.completedAt &&
        s.completedAt >= dayStart &&
        s.completedAt < dayEnd
    );
    return {
      date: new Date(dayStart),
      sessions: daySessions.length,
    };
  });

  const maxSessions = Math.max(...weekData.map(d => d.sessions), 1);

  // All time stats
  const allFocusSessions = sessions.filter(s => s.type === 'focus');
  const allFocusTime = allFocusSessions.reduce((acc, s) => {
    if (s.completedAt && s.startedAt) {
      return acc + Math.floor((s.completedAt - s.startedAt) / 1000 / 60);
    }
    return acc;
  }, 0);

  const allDistractions = allFocusSessions.reduce(
    (acc, s) => acc + s.distractions.length,
    0
  );

  const completedTasks = tasks.filter(t => t.completed).length;

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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-text mb-8">📊 Relatórios</h2>

        {/* Today Stats */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text mb-4">Hoje</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              icon="🍅"
              value={focusSessions.length}
              label="Pomodoros hoje"
              variant="success"
            />
            <StatsCard
              icon="⏱️"
              value={`${totalFocusTime}min`}
              label="Tempo focado"
              variant="primary"
            />
            <StatsCard
              icon="⚠️"
              value={totalDistractions}
              label="Distrações"
              variant="warning"
            />
          </div>
        </div>

        {/* Week Chart */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text mb-4">Últimos 7 dias</h3>
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
            <div className="flex items-end justify-between gap-4 h-64">
              {weekData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${(day.sessions / maxSessions) * 100}%`,
                      minHeight: day.sessions > 0 ? '20px' : '0px',
                    }}
                  />
                  <p className="text-text/60 text-sm">
                    {day.date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </p>
                  <p className="text-text font-mono text-sm">{day.sessions}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Time Stats */}
        <div>
          <h3 className="text-xl font-semibold text-text mb-4">Total Geral</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
              <p className="text-text/60 text-sm mb-2">Total de Pomodoros</p>
              <p className="text-4xl font-bold text-text font-mono">
                {allFocusSessions.length}
              </p>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
              <p className="text-text/60 text-sm mb-2">Tempo Focado</p>
              <p className="text-4xl font-bold text-text font-mono">
                {Math.floor(allFocusTime / 60)}h
              </p>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
              <p className="text-text/60 text-sm mb-2">Distrações</p>
              <p className="text-4xl font-bold text-text font-mono">
                {allDistractions}
              </p>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
              <p className="text-text/60 text-sm mb-2">Tarefas Concluídas</p>
              <p className="text-4xl font-bold text-text font-mono">
                {completedTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Distractions */}
        {allDistractions > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-text mb-4">
              Distrações Recentes
            </h3>
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {allFocusSessions
                  .filter(s => s.distractions.length > 0)
                  .slice(-10)
                  .reverse()
                  .map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-text/10 last:border-0"
                    >
                      <div>
                        <p className="text-text font-medium">
                          {session.distractions.length} distração(ões)
                        </p>
                        <p className="text-text/60 text-sm">
                          {new Date(session.startedAt).toLocaleDateString('pt-BR')}{' '}
                          às{' '}
                          {new Date(session.startedAt).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <p className="text-warning font-mono">
                        {Math.floor(
                          session.distractions.reduce((acc, d) => acc + d.duration, 0) /
                            60
                        )}
                        min
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
