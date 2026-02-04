'use client';

type ControlsProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
};

export default function Controls({ isRunning, onStart, onPause, onSkip, onReset }: ControlsProps) {
  return (
    <div className="flex gap-4 items-center justify-center mt-8">
      <button
        onClick={isRunning ? onPause : onStart}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-text font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg backdrop-blur-sm"
      >
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
      <button
        onClick={onSkip}
        className="px-6 py-4 rounded-xl bg-surface/50 text-text/80 font-semibold hover:bg-surface/70 transition-colors backdrop-blur-sm border border-text/10"
      >
        Pular
      </button>
      <button
        onClick={onReset}
        className="px-6 py-4 rounded-xl bg-surface/50 text-text/80 font-semibold hover:bg-surface/70 transition-colors backdrop-blur-sm border border-text/10"
      >
        Resetar
      </button>
    </div>
  );
}
