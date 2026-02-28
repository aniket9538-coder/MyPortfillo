'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'fadeUp' | 'blurIn' | 'slideIn';
  element?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({ text, className, delay = 0, type = 'fadeUp', element: Tag = 'p' }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    blurIn: {
      hidden: { opacity: 0, filter: 'blur(20px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
    slideIn: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[type]}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      <Tag>{text}</Tag>
    </motion.div>
  );
}
