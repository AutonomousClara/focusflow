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
      console.log('👀 Visibility changed:', {
        hidden: document.hidden,
        isRunning,
        currentState,
        distractionStart,
      });

      if (document.hidden && isRunning && currentState === 'focus') {
        console.log('🚨 Distraction started!');
        setDistractionStart(Date.now());
        setLastDistractionDuration(null);
      } else if (!document.hidden && distractionStart) {
        const duration = Math.floor((Date.now() - distractionStart) / 1000);
        console.log('✅ Back to focus! Duration:', duration, 's');
        
        if (duration > 2) {
          console.log('📊 Recording distraction:', duration, 's');
          onDistraction(duration);
          setLastDistractionDuration(duration);

          if (showNotificationTimeoutRef.current) {
            clearTimeout(showNotificationTimeoutRef.current);
          }
          showNotificationTimeoutRef.current = setTimeout(() => {
            setLastDistractionDuration(null);
          }, 5000);
        } else {
          console.log('⏭️ Distraction too short, ignoring');
        }
        setDistractionStart(null);
      }
    };

    console.log('🔧 Setting up visibility listener. isRunning:', isRunning, 'state:', currentState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      console.log('🧹 Cleaning up visibility listener');
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (showNotificationTimeoutRef.current) {
        clearTimeout(showNotificationTimeoutRef.current);
      }
    };
  }, [isRunning, currentState, distractionStart, onDistraction]);

  return { lastDistractionDuration };
}
