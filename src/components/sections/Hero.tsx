'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ChevronDown, Download, Eye } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Button } from '@/components/ui/Button';
import { personalInfo } from '@/lib/constants';

const typewriterTexts = ['Full-Stack Developer', 'Open Source Contributor', 'Problem Solver', 'Tech Enthusiast'];

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export function Hero() {
  const { displayText, showCursor } = useTypewriter({ texts: typewriterTexts });

  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm mb-8"
        >
          <span>👋</span>
          <span>Welcome to my portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-[var(--text-primary)] mb-6"
        >
          Hi, I&apos;m{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Aniket
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-6 h-8"
        >
          <span>{displayText}</span>
          <span className={`ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'} text-indigo-400`}>|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button onClick={scrollToProjects} size="lg">
            <Eye className="w-5 h-5" />
            View My Work
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToContact}>
            <Download className="w-5 h-5" />
            Get In Touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
              whileHover={{ scale: 1.2, y: -3 }}
              className="text-[var(--text-secondary)] hover:text-indigo-400 transition-colors p-2 rounded-lg hover:bg-white/5"
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-6 h-6 text-[var(--text-secondary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
