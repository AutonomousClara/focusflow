export interface Session {
  id: string;
  type: 'focus' | 'short-break' | 'long-break';
  taskId?: string;
  startedAt: number;
  completedAt?: number;
  distractions: Distraction[];
}

export interface Distraction {
  timestamp: number;
  duration: number; // seconds
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Settings {
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
};
