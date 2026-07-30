export type ProjectStatus =
  | "Live in production"
  | "Live, handed off"
  | "Delivered"
  | "Working build"
  | "Soft launch";

export type ProjectType = "Client work" | "Employment" | "Own product";

export type ProjectGroup =
  | "Operations & Intelligence"
  | "AI Agents & Assistants"
  | "Products & Platforms"
  | "Web & Brand";

export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  status: ProjectStatus;
  type: ProjectType;
  speed?: string;
  group?: ProjectGroup;
  featured?: boolean;
  link?: string;
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
