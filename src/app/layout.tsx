import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Preloader } from '@/components/layout/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

export const metadata: Metadata = {
  title: 'Aniket | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in React, Next.js, and Node.js. Building beautiful, performant web applications.',
  keywords: ['Aniket', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Aniket' }],
  openGraph: {
    title: 'Aniket | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, and Node.js.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aniket Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aniket | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, and Node.js.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <ThemeProvider>
          <Preloader />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
