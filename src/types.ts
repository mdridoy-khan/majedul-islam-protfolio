export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  detailedDescription?: string;
  challenges?: string[];
  features?: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'tools' | 'other';
  icon?: string;
  level: number; // 0-100
}
