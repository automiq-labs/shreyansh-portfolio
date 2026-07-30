export interface Project {
  id: number;
  number: string;
  name: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  link?: string;
  featured?: boolean;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  issuer: string;
  name: string;
  date: string;
}

export type Skills = Record<string, string[]>;
