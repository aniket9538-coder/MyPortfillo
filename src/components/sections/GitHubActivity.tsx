'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { githubStats } from '@/lib/constants';

const statCards = [
  { icon: BookOpen, label: 'Repositories', value: githubStats.repos },
  { icon: Star, label: 'Stars Earned', value: githubStats.stars },
  { icon: GitFork, label: 'Contributions', value: githubStats.contributions },
  { icon: Users, label: 'Followers', value: githubStats.followers },
];

const pinnedRepos = [
  { name: 'MyPortfillo', description: 'Personal portfolio website built with Next.js', language: 'TypeScript', stars: 12 },
  { name: 'ecommerce-platform', description: 'Full-stack e-commerce solution', language: 'JavaScript', stars: 45 },
  { name: 'ai-chat-app', description: 'AI-powered chat application', language: 'TypeScript', stars: 38 },
];

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
};

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="github" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="GitHub Activity" subtitle="Open source contributions and projects" />

        <div ref={ref}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {statCards.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-indigo-500/20 text-center"
                style={{ background: 'linear-gradient(135deg, var(--bg-card), rgba(99,102,241,0.05))' }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">{value}+</p>
                <p className="text-xs text-[var(--text-secondary)]">{label}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <Github className="w-5 h-5" /> Pinned Repositories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={`https://github.com/aniket9538-coder/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] block hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium text-[var(--text-primary)] text-sm">{repo.name}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">{repo.description}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: languageColors[repo.language] ?? '#666' }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stars}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
