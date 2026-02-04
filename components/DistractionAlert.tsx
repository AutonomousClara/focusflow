'use client';

type DistractionAlertProps = {
  duration: number;
};

export default function DistractionAlert({ duration }: DistractionAlertProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  let message = '';
  if (minutes > 0) {
    message = `Você se distraiu por ${minutes}min`;
    if (seconds > 0) {
      message += ` ${seconds}s`;
    }
  } else {
    message = `Você se distraiu por ${seconds}s`;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-warning/20 border border-warning/40 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <p className="text-warning font-semibold">⚠️ {message}</p>
      </div>
    </div>
  );
}
