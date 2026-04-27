import openAiLogo from '../assets/openai-logo.svg';

export type TechStackItem = {
    accent: string;
    description: string;
    label: string;
    logo: string;
};

export const TECH_STACK_ITEMS: TechStackItem[] = [
    {
        accent: '#3776AB',
        description: 'Automation, APIs, data workflows, and intelligent application backends.',
        label: 'Python',
        logo: 'https://cdn.simpleicons.org/python/3776AB',
    },
    {
        accent: '#F7DF1E',
        description: 'Interactive browser behavior and flexible client-side application logic.',
        label: 'JavaScript',
        logo: 'https://cdn.simpleicons.org/javascript/F7DF1E',
    },
    {
        accent: '#3178C6',
        description: 'Typed frontend and backend code with stronger safety and maintainability.',
        label: 'TypeScript',
        logo: 'https://cdn.simpleicons.org/typescript/3178C6',
    },
    {
        accent: '#A8B9CC',
        description: 'Low-level systems programming with direct control over memory and performance.',
        label: 'C',
        logo: 'https://cdn.simpleicons.org/c/A8B9CC',
    },
    {
        accent: '#00599C',
        description: 'High-performance native software, algorithms, and systems-oriented engineering.',
        label: 'C++',
        logo: 'https://cdn.simpleicons.org/cplusplus/00599C',
    },
    {
        accent: '#E34F26',
        description: 'Semantic page structure and accessible markup for modern web interfaces.',
        label: 'HTML',
        logo: 'https://cdn.simpleicons.org/html5/E34F26',
    },
    {
        accent: '#1572B6',
        description: 'Responsive layouts, visual polish, and expressive user interface styling.',
        label: 'CSS',
        logo: 'https://cdn.simpleicons.org/css/1572B6',
    },
    {
        accent: '#4EAA25',
        description: 'Command-line automation, scripting, and efficient local development workflows.',
        label: 'Bash',
        logo: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    },
    {
        accent: '#61DAFB',
        description: 'Component-driven interfaces and dynamic frontend experiences.',
        label: 'React',
        logo: 'https://cdn.simpleicons.org/react/61DAFB',
    },
    {
        accent: '#FFFFFF',
        description: 'Fast React applications with routing, hybrid rendering, and modern DX.',
        label: 'Next.js',
        logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF',
    },
    {
        accent: '#7952B3',
        description: 'Rapid UI construction with a proven component and utility framework.',
        label: 'Bootstrap',
        logo: 'https://cdn.simpleicons.org/bootstrap/7952B3',
    },
    {
        accent: '#5FA04E',
        description: 'Server-side JavaScript for APIs, tooling, and realtime product workflows.',
        label: 'Node.js',
        logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
    },
    {
        accent: '#06B6D4',
        description: 'Utility-first styling for fast visual iteration and consistent design systems.',
        label: 'Tailwind',
        logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
    },
    {
        accent: '#013243',
        description: 'Numerical computing and performant array-based data processing in Python.',
        label: 'NumPy',
        logo: 'https://cdn.simpleicons.org/numpy/013243',
    },
    {
        accent: '#4479A1',
        description: 'Relational data modeling, queries, and production-ready persistence.',
        label: 'MySQL',
        logo: 'https://cdn.simpleicons.org/mysql/4479A1',
    },
    {
        accent: '#2496ED',
        description: 'Portable containers and consistent local-to-production environments.',
        label: 'Docker',
        logo: 'https://cdn.simpleicons.org/docker/2496ED',
    },
    {
        accent: '#F05032',
        description: 'Version control, branching, and reliable collaboration through clean history.',
        label: 'Git',
        logo: 'https://cdn.simpleicons.org/git/F05032',
    },
    {
        accent: '#FFFFFF',
        description: 'Code hosting, reviews, and team-based shipping workflows.',
        label: 'GitHub',
        logo: 'https://cdn.simpleicons.org/github/FFFFFF',
    },
    {
        accent: '#FCC624',
        description: 'Development and deployment on dependable Unix-like environments.',
        label: 'Linux',
        logo: 'https://cdn.simpleicons.org/linux/FCC624',
    },
    {
        accent: '#FF9900',
        description: 'Cloud infrastructure, deployment services, and scalable application hosting.',
        label: 'AWS',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    },
    {
        accent: '#007ACC',
        description: 'Focused coding workflows with a fast editor and rich extension ecosystem.',
        label: 'VS Code',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    },
    {
        accent: '#F24E1E',
        description: 'Interface design, prototyping, and collaborative product exploration.',
        label: 'Figma',
        logo: 'https://cdn.simpleicons.org/figma/F24E1E',
    },
    {
        accent: '#61DAFB',
        description: 'Cross-platform mobile interfaces built with familiar React patterns.',
        label: 'React Native',
        logo: 'https://cdn.simpleicons.org/react/61DAFB',
    },
    {
        accent: '#FFFFFF',
        description: 'Model-powered products, assistants, and AI-enhanced software experiences.',
        label: 'OpenAI',
        logo: openAiLogo,
    },
];
