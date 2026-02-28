'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Globe, GitBranch, Zap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stats = [
  { value: '5+', label: 'Projects Completed' },
  { value: '500+', label: 'Contributions' },
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Technologies' },
];

const highlights = [
  { icon: Code2, text: 'Clean, maintainable code with best practices' },
  { icon: Globe, text: 'Responsive & accessible web applications' },
  { icon: GitBranch, text: 'Version control & collaborative development' },
  { icon: Zap, text: 'Performance-first approach to development' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" subtitle="A passionate developer building impactful digital experiences" />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] leading-relaxed mb-4">
              I&apos;m a passionate full-stack developer with over 2 years of experience building modern web applications.
              I love turning complex problems into simple, beautiful solutions that make a real difference.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] leading-relaxed mb-4">
              My journey started with curiosity about how websites work, and evolved into a deep passion for crafting
              exceptional digital experiences. I specialize in the React/Node.js ecosystem.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] leading-relaxed mb-8">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects,
              or sharing knowledge with the developer community.
            </motion.p>

            <div className="space-y-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-[var(--text-secondary)]"
                >
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 font-mono text-sm">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-2 text-[var(--text-secondary)]">
                <p><span className="text-indigo-400">const</span> <span className="text-green-400">developer</span> = {'{'}</p>
                <p className="pl-4"><span className="text-purple-400">name</span>: <span className="text-yellow-400">&apos;Aniket&apos;</span>,</p>
                <p className="pl-4"><span className="text-purple-400">role</span>: <span className="text-yellow-400">&apos;Full-Stack Developer&apos;</span>,</p>
                <p className="pl-4"><span className="text-purple-400">passion</span>: <span className="text-yellow-400">&apos;Building great products&apos;</span>,</p>
                <p className="pl-4"><span className="text-purple-400">available</span>: <span className="text-green-400">true</span>,</p>
                <p>{'}'}</p>
              </div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl -z-10 blur-xl" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]"
            >
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
                {value}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
