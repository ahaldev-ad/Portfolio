export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoLink?: string;
  repoLink?: string;
  isFeatured?: boolean;
  category: 'Web' | 'Mobile' | 'Design' | 'Other';
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  level: number; // 0 to 100
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  experience?: string;
  learning?: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  location: string;
  heroImage: string;
}

export interface AppData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  settings?: {
    senderEmail?: string;
    emailServiceName?: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
}