'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/constants';
import type { Project } from '@/types';

const filters: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Open Source', value: 'open-source' },
];

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/20 text-7xl font-bold select-none">{project.title.charAt(0)}</span>
        </div>
        <motion.div
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 p-4"
        >
          <p className="text-white text-sm text-center leading-relaxed">{project.description}</p>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{project.title}</h3>
        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => <Badge key={tech}>{tech}</Badge>)}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-indigo-400 transition-colors"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-indigo-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" subtitle="Things I've built with passion and purpose" />

        <div className="flex justify-center gap-3 mb-12">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === value
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
