'use client';
import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      const current = texts[indexRef.current];
      if (isDeletingRef.current) {
        charIndexRef.current -= 1;
        setDisplayText(current.slice(0, charIndexRef.current));
        if (charIndexRef.current <= 0) {
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % texts.length;
          charIndexRef.current = 0;
          timeoutRef.current = setTimeout(tick, 300);
          return;
        }
      } else {
        charIndexRef.current += 1;
        setDisplayText(current.slice(0, charIndexRef.current));
        if (charIndexRef.current >= current.length) {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, pauseDuration);
          return;
        }
      }
      timeoutRef.current = setTimeout(tick, isDeletingRef.current ? deletingSpeed : typingSpeed);
    };

    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [texts, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return { displayText, showCursor };
}
