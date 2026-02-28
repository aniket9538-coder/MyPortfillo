'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = true }: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-2xl border p-6',
        'bg-[var(--bg-card)] border-[var(--border)]',
        hoverable && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
