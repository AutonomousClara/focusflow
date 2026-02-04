'use client';

import { useState } from 'react';
import { Task } from '@/lib/types';

type TaskListProps = {
  tasks: Task[];
  activeTaskId: string | undefined;
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
};

export default function TaskList({
  tasks,
  activeTaskId,
  onAddTask,
  onToggleTask,
  onSelectTask,
}: TaskListProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-text/10">
      <h2 className="text-2xl font-bold text-text mb-4">Tarefas</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Adicionar tarefa..."
            className="flex-1 px-4 py-3 rounded-xl bg-background/50 text-text placeholder-text/40 border border-text/10 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary text-text font-semibold hover:opacity-90 transition-opacity"
          >
            Adicionar
          </button>
        </div>
      </form>

      {activeTaskId && (
        <div className="mb-4 p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-sm text-text/60 mb-1">Focando em:</p>
          <p className="text-text font-semibold">
            {tasks.find(t => t.id === activeTaskId)?.text || 'Tarefa não encontrada'}
          </p>
        </div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {pendingTasks.length === 0 && completedTasks.length === 0 && (
          <p className="text-text/40 text-center py-8">Nenhuma tarefa ainda</p>
        )}

        {pendingTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeTaskId === task.id
                ? 'bg-primary/20 border border-primary/40'
                : 'bg-background/30 hover:bg-background/50'
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="w-5 h-5 rounded accent-primary cursor-pointer"
            />
            <button
              onClick={() => onSelectTask(task.id)}
              className="flex-1 text-left text-text"
            >
              {task.text}
            </button>
          </div>
        ))}

        {completedTasks.length > 0 && (
          <>
            <div className="pt-4">
              <p className="text-text/40 text-sm mb-2">Concluídas</p>
            </div>
            {completedTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-background/30 opacity-60"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-5 h-5 rounded accent-primary cursor-pointer"
                />
                <p className="flex-1 text-text line-through">{task.text}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
