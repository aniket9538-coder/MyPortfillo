'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { personalInfo } from '@/lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: MapPin, label: 'Location', value: personalInfo.location, href: undefined },
  { icon: Clock, label: 'Availability', value: 'Open to opportunities', href: undefined },
];

const socialLinks = [
  { icon: Github, href: personalInfo.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' },
];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-indigo-500 placeholder:text-[var(--text-secondary)] ${
      hasError ? 'border-red-500' : 'border-[var(--border)]'
    }`;

  return (
    <section id="contact" className="py-24 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Contact" subtitle="Let's work together on something amazing" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Let&apos;s Work Together</h3>
            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
              Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing together.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">{label}</p>
                    {href ? (
                      <a href={href} className="text-[var(--text-primary)] text-sm hover:text-indigo-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-[var(--text-primary)] text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-indigo-400 hover:border-indigo-500/40 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.form
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <input {...register('honeypot')} type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Message sent! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Failed to send. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input {...register('name')} placeholder="Your Name" className={inputClass(!!errors.name)} />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </motion.p>
                )}
              </div>
              <div>
                <input {...register('email')} placeholder="Email Address" type="email" className={inputClass(!!errors.email)} />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <input {...register('subject')} placeholder="Subject" className={inputClass(!!errors.subject)} />
              {errors.subject && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xs text-red-400">
                  {errors.subject.message}
                </motion.p>
              )}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Your message..."
                rows={6}
                className={`${inputClass(!!errors.message)} resize-none`}
              />
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xs text-red-400">
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            <Button type="submit" loading={status === 'loading'} className="w-full" size="lg">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
