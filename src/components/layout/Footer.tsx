'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { navLinks, personalInfo } from '@/lib/constants';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative pt-20 pb-8 border-t border-[var(--border)]">
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 60" className="w-full h-12 text-[var(--bg-secondary)] fill-current" preserveAspectRatio="none">
          <path d="M0,30 C300,60 900,0 1200,30 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
              Aniket.
            </p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Full-Stack Developer passionate about building beautiful, performant web experiences.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-4">Quick Links</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-[var(--text-secondary)] hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-4">Connect</p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-[var(--text-secondary)] hover:text-indigo-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 Aniket. Built with ❤️ and Next.js
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-indigo-400 hover:bg-white/5 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
