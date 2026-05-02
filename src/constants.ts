import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Car Management',
    description: 'A responsive vehicle data handling application with a clean and modern UI.',
    detailedDescription: 'Built with React.js and TypeScript, this application enables efficient vehicle data handling. It features a modern UI using Tailwind CSS and Shadcn components for a seamless user experience.',
    thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Shadcn', 'Tailwind CSS'],
    liveUrl: 'https://power-governoros-frontend.netlify.app/',
    githubUrl: 'https://github.com/mdridoy-khan',
    features: ['Efficient data handling', 'Modern UI/UX', 'Responsive design', 'Type-safe codebase'],
    challenges: ['Managing complex state with TypeScript', 'Integrating Shadcn UI components'],
    featured: true,
  },
  {
    id: '2',
    title: 'Quiz System Management',
    description: 'Modern quiz platform for teachers and students with role-based dashboards.',
    detailedDescription: 'A platform that enables teachers to create and manage quizzes while allowing students to participate online. Features include performance tracking and result management.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    techStack: ['React.js', 'Axios', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://cute-jelly-be4f66.netlify.app/',
    githubUrl: 'https://github.com/mdridoy-khan',
    features: ['Role-based access', 'Dynamic quiz creation', 'Real-time results', 'Interactive UI'],
    challenges: ['Implementing secure role-based navigation', 'Handling asynchronous quiz updates'],
    featured: true,
  },
  {
    id: '3',
    title: 'BPRO - Personal Resume/vCard',
    description: 'Themeforest Approved responsive HTML5 template for professionals.',
    detailedDescription: 'A high-quality vCard template designed for personal branding. Approved on Themeforest for its clean code and design standards.',
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop',
    techStack: ['HTML5', 'Bootstrap 5', 'JavaScript', 'JQuery'],
    liveUrl: 'https://themeforest.net/item/bpro-personal-resumevcard-template/57172020',
    githubUrl: 'https://github.com/mdridoy-khan',
    features: ['Themeforest Approved', 'Ultra Responsive', 'Clean Typography', 'SEO Optimized'],
    challenges: ['Meeting strict Themeforest coding standards', 'Ensuring cross-browser compatibility'],
  },
  {
    id: '4',
    title: 'ERP Project Management',
    description: 'Comprehensive project management dashboard template with advanced layouts.',
    detailedDescription: 'An ERP solution template focusing on project tracking and resource management. Built with scss for modularity and scalability.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    techStack: ['HTML5', 'SCSS', 'Bootstrap 5', 'JQuery'],
    liveUrl: 'https://project-management-erp.netlify.app/',
    githubUrl: 'https://github.com/mdridoy-khan',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'SanMo Bangladesh',
    role: 'Frontend Developer',
    period: 'Jan 2026 - Present',
    description: [
      'Architecting scalable frontend solutions using React and TypeScript.',
      'Integrating RESTful APIs and optimizing application performance.',
      'Collaborating with design teams to ensure pixel-perfect implementation.',
    ],
  },
  {
    id: '2',
    company: 'IT Transmit Ltd',
    role: 'Web Designer',
    period: 'Feb 2025 - Dec 2025',
    description: [
      'Developed responsive web templates using HTML5, CSS3, JavaScript, and Tailwind.',
      'Collaborated with UI/UX designers to create engaging user experiences.',
      'Optimized applications for accessibility and cross-browser compatibility.',
    ],
  },
];

export const SKILLS: Skill[] = [
  { name: 'React.js', category: 'frontend', level: 95 },
  { name: 'Next.js', category: 'frontend', level: 85 },
  { name: 'TypeScript', category: 'frontend', level: 90 },
  { name: 'JavaScript', category: 'frontend', level: 92 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98 },
  { name: 'Shadcn UI', category: 'frontend', level: 95 },
  { name: 'Redux Toolkit', category: 'tools', level: 80 },
  { name: 'Figma', category: 'tools', level: 85 },
];
