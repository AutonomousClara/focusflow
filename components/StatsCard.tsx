'use client';

type StatsCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  variant?: 'default' | 'success' | 'warning';
};

export default function StatsCard({ icon, value, label, variant = 'default' }: StatsCardProps) {
  const variantStyles = {
    default: 'from-primary/20 to-secondary/20 border-primary/30',
    success: 'from-success/20 to-success/10 border-success/30',
    warning: 'from-warning/20 to-warning/10 border-warning/30',
  };

  return (
    <div className={`bg-gradient-to-br ${variantStyles[variant]} backdrop-blur-sm rounded-2xl p-6 border`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-3xl font-bold text-text font-mono">{value}</p>
          <p className="text-text/60 text-sm mt-1">{label}</p>
        </div>
      </div>
    </div>
  );
}
