'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skills } from '@/lib/constants';
import type { Skill } from '@/types';

const categories: { label: string; value: Skill['category'] }[] = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'DevOps & Tools', value: 'devops' },
];

function SkillCard({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.15)' }}
      className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] group"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-[var(--text-primary)] text-sm">{skill.name}</span>
        <span className="text-xs text-indigo-400 font-semibold">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Skill['category']>('frontend');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
            {categories.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`relative px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === value ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {activeCategory === value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
