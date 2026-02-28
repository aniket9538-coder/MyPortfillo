'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const letters = 'Aniket'.split('');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
        >
          <div className="flex gap-1 mb-8">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
