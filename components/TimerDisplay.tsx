'use client';

type TimerDisplayProps = {
  timeRemaining: number;
  totalTime: number;
  state: 'focus' | 'short-break' | 'long-break';
};

export default function TimerDisplay({ timeRemaining, totalTime, state }: TimerDisplayProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  const stateLabels = {
    'focus': 'Foco',
    'short-break': 'Pausa Curta',
    'long-break': 'Pausa Longa',
  };

  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-80 h-80">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-surface"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-primary" style={{ stopColor: '#8B5CF6' }} />
              <stop offset="100%" className="text-secondary" style={{ stopColor: '#EC4899' }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-text/60 text-lg mb-2">{stateLabels[state]}</p>
          <p className="text-text font-mono text-7xl font-bold">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
