import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
        'hover:scale-105 transition-transform duration-200',
        className
      )}
    >
      {children}
    </span>
  );
}
