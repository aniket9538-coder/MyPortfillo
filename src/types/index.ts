export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'web' | 'mobile' | 'open-source';
  github: string;
  live: string;
  featured: boolean;
  gradient: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'devops';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string[];
  type: 'work' | 'open-source';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface GitHubStats {
  repos: number;
  stars: number;
  contributions: number;
  followers: number;
}
