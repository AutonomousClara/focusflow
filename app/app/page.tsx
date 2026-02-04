'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import TimerDisplay from '@/components/TimerDisplay';
import Controls from '@/components/Controls';
import TaskList from '@/components/TaskList';
import StatsCard from '@/components/StatsCard';
import DistractionAlert from '@/components/DistractionAlert';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTimer } from '@/hooks/useTimer';
import { useDistraction } from '@/hooks/useDistraction';
import { Task, Settings, DEFAULT_SETTINGS, Session } from '@/lib/types';

export default function AppPage() {
  const [settings] = useLocalStorage<Settings>('settings', DEFAULT_SETTINGS);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [sessions] = useLocalStorage<Session[]>('sessions', []);

  const {
    currentState,
    timeRemaining,
    isRunning,
    currentSession,
    currentTaskId,
    start,
    pause,
    skip,
    reset,
    addDistraction,
    setActiveTask,
  } = useTimer(settings);

  const { lastDistractionDuration } = useDistraction(
    isRunning,
    currentState,
    addDistraction
  );

  const getDuration = (state: typeof currentState) => {
    switch (state) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'short-break':
        return settings.shortBreakDuration * 60;
      case 'long-break':
        return settings.longBreakDuration * 60;
    }
  };

  const handleAddTask = useCallback((text: string) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const handleToggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const handleSelectTask = useCallback((id: string) => {
    setActiveTask(currentTaskId === id ? undefined : id);
  }, [currentTaskId, setActiveTask]);

  const todaySessions = sessions.filter(s => {
    const today = new Date().setHours(0, 0, 0, 0);
    return s.completedAt && s.completedAt >= today;
  });

  const focusSessions = todaySessions.filter(s => s.type === 'focus');
  const totalFocusTime = focusSessions.reduce((acc, s) => {
    if (s.completedAt && s.startedAt) {
      return acc + Math.floor((s.completedAt - s.startedAt) / 1000 / 60);
    }
    return acc;
  }, 0);

  const totalDistractions = focusSessions.reduce((acc, s) => acc + s.distractions.length, 0) +
    (currentSession?.distractions.length || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/30">
      <nav className="border-b border-text/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FocusFlow
            </h1>
            <div className="flex gap-4">
              <Link
                href="/app/stats"
                className="px-4 py-2 rounded-lg text-text/80 hover:text-text hover:bg-surface/50 transition-all"
              >
                📊 Relatórios
              </Link>
              <Link
                href="/app/settings"
                className="px-4 py-2 rounded-lg text-text/80 hover:text-text hover:bg-surface/50 transition-all"
              >
                ⚙️ Configurações
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {lastDistractionDuration && <DistractionAlert duration={lastDistractionDuration} />}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
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
            variant="default"
          />
          <StatsCard
            icon="⚠️"
            value={totalDistractions}
            label="Distrações"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <TimerDisplay
              timeRemaining={timeRemaining}
              totalTime={getDuration(currentState)}
              state={currentState}
            />
            <Controls
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onSkip={skip}
              onReset={reset}
            />
          </div>

          <div>
            <TaskList
              tasks={tasks}
              activeTaskId={currentTaskId}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onSelectTask={handleSelectTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
