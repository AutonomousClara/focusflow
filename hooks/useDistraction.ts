'use client';

import { useEffect, useRef, useState } from 'react';

export function useDistraction(
  isRunning: boolean,
  currentState: 'focus' | 'short-break' | 'long-break',
  onDistraction: (duration: number) => void
) {
  const [distractionStart, setDistractionStart] = useState<number | null>(null);
  const [lastDistractionDuration, setLastDistractionDuration] = useState<number | null>(null);
  const showNotificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRunning && currentState === 'focus') {
        setDistractionStart(Date.now());
        setLastDistractionDuration(null);
      } else if (!document.hidden && distractionStart) {
        const duration = Math.floor((Date.now() - distractionStart) / 1000);
        if (duration > 2) {
          onDistraction(duration);
          setLastDistractionDuration(duration);

          if (showNotificationTimeoutRef.current) {
            clearTimeout(showNotificationTimeoutRef.current);
          }
          showNotificationTimeoutRef.current = setTimeout(() => {
            setLastDistractionDuration(null);
          }, 5000);
        }
        setDistractionStart(null);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (showNotificationTimeoutRef.current) {
        clearTimeout(showNotificationTimeoutRef.current);
      }
    };
  }, [isRunning, currentState, distractionStart, onDistraction]);

  return { lastDistractionDuration };
}
