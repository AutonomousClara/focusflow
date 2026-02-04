'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Session, Task, Settings } from '@/lib/types';
import { useLocalStorage } from './useLocalStorage';

export type TimerState = 'focus' | 'short-break' | 'long-break';

export function useTimer(settings: Settings) {
  const [sessions, setSessions] = useLocalStorage<Session[]>('sessions', []);
  const [currentState, setCurrentState] = useState<TimerState>('focus');
  const [timeRemaining, setTimeRemaining] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | undefined>(undefined);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getDuration = useCallback((state: TimerState): number => {
    switch (state) {
      case 'focus':
        return settings.focusDuration * 60;
      case 'short-break':
        return settings.shortBreakDuration * 60;
      case 'long-break':
        return settings.longBreakDuration * 60;
    }
  }, [settings]);

  const completeSession = useCallback(() => {
    if (currentSession) {
      const completedSession: Session = {
        ...currentSession,
        completedAt: Date.now(),
      };
      setSessions(prev => [...prev, completedSession]);
    }
  }, [currentSession, setSessions]);

  const getNextState = useCallback((): TimerState => {
    if (currentState === 'focus') {
      const nextCount = pomodoroCount + 1;
      setPomodoroCount(nextCount);
      return nextCount % 4 === 0 ? 'long-break' : 'short-break';
    }
    return 'focus';
  }, [currentState, pomodoroCount]);

  const handleSessionComplete = useCallback(() => {
    completeSession();

    const nextState = getNextState();
    setCurrentState(nextState);
    setTimeRemaining(getDuration(nextState));
    setIsRunning(false);
    setCurrentSession(null);

    if (settings.soundEnabled) {
      playNotificationSound();
    }
  }, [completeSession, getNextState, getDuration, settings.soundEnabled]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSessionComplete();
          return getDuration(getNextState());
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, handleSessionComplete, getDuration, getNextState]);

  const start = useCallback(() => {
    if (!currentSession) {
      const newSession: Session = {
        id: `${Date.now()}-${Math.random()}`,
        type: currentState,
        taskId: currentTaskId,
        startedAt: Date.now(),
        distractions: [],
      };
      setCurrentSession(newSession);
    }
    setIsRunning(true);
  }, [currentSession, currentState, currentTaskId]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const skip = useCallback(() => {
    handleSessionComplete();
  }, [handleSessionComplete]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(getDuration(currentState));
    setCurrentSession(null);
  }, [currentState, getDuration]);

  const addDistraction = useCallback((duration: number) => {
    console.log('⚡ addDistraction called:', duration, 's', 'currentSession:', currentSession);
    if (currentSession) {
      const distraction = {
        timestamp: Date.now(),
        duration,
      };
      console.log('💾 Adding distraction to session:', distraction);
      setCurrentSession(prev => prev ? {
        ...prev,
        distractions: [...prev.distractions, distraction],
      } : null);
    } else {
      console.log('❌ No current session to add distraction to');
    }
  }, [currentSession]);

  const setActiveTask = useCallback((taskId: string | undefined) => {
    setCurrentTaskId(taskId);
  }, []);

  return {
    currentState,
    timeRemaining,
    isRunning,
    currentSession,
    currentTaskId,
    pomodoroCount,
    start,
    pause,
    skip,
    reset,
    addDistraction,
    setActiveTask,
  };
}
