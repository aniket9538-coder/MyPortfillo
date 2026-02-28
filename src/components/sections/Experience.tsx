'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GitMerge } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experiences } from '@/lib/constants';

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" subtitle="My professional journey and contributions" />

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-px">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-indigo-500 to-purple-500"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-2 border-[var(--bg-primary)] shadow-lg shadow-indigo-500/30 z-10" />

                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-[calc(50%+2rem)]' : 'md:ml-[calc(50%+2rem)]'}`}>
                    <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-[var(--text-primary)]">{exp.role}</h3>
                          <p className="text-indigo-400 text-sm">{exp.company}</p>
                        </div>
                        <span className="text-xs text-[var(--text-secondary)] bg-white/5 px-2 py-1 rounded-lg flex items-center gap-1">
                          {exp.type === 'open-source' ? <GitMerge className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          {exp.date}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((point, j) => (
                          <li key={j} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
