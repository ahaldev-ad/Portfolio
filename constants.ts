import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Alex Dev",
    title: "Senior Full Stack Engineer",
    tagline: "Building digital experiences that matter.",
    about: "I am a passionate developer with over 5 years of experience in building scalable web applications. I specialize in the React ecosystem and cloud-native architectures. When I'm not coding, I'm exploring new UI/UX trends or contributing to open source.",
    email: "hello@alexdev.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    location: "San Francisco, CA",
    heroImage: "https://picsum.photos/400/400"
  },
  skills: [
    { id: '1', name: 'React', category: 'Frontend', level: 95 },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 90 },
    { id: '3', name: 'Node.js', category: 'Backend', level: 85 },
    { id: '4', name: 'Tailwind CSS', category: 'Design', level: 90 },
    { id: '5', name: 'PostgreSQL', category: 'Backend', level: 80 },
    { id: '6', name: 'Docker', category: 'Tools', level: 75 },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization.',
      technologies: ['React', 'D3.js', 'Firebase'],
      imageUrl: 'https://picsum.photos/600/400?random=1',
      category: 'Web',
      demoLink: 'https://example.com',
      repoLink: 'https://github.com'
    },
    {
      id: '2',
      title: 'TaskMaster App',
      description: 'Productivity application focused on drag-and-drop task management.',
      technologies: ['React Native', 'Redux', 'Node.js'],
      imageUrl: 'https://picsum.photos/600/400?random=2',
      category: 'Mobile',
      repoLink: 'https://github.com'
    },
    {
      id: '3',
      title: 'Portfolio v1',
      description: 'My previous portfolio site built with Gatsby and GraphQL.',
      technologies: ['Gatsby', 'GraphQL', 'Styled Components'],
      imageUrl: 'https://picsum.photos/600/400?random=3',
      category: 'Web',
      demoLink: 'https://example.com'
    }
  ]
};