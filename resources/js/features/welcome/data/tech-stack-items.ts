import awsLogo from '../assets/aws.svg';
import bootstrapLogo from '../assets/bootstrap.svg';
import cLogo from '../assets/c.svg';
import cplusplusLogo from '../assets/cplusplus.svg';
import cssLogo from '../assets/css.svg';
import dockerLogo from '../assets/docker.svg';
import figmaLogo from '../assets/figma.svg';
import gitLogo from '../assets/git.svg';
import githubLogo from '../assets/github.svg';
import bashLogo from '../assets/gnubash.svg';
import htmlLogo from '../assets/html5.svg';
import javascriptLogo from '../assets/javascript.svg';
import linuxLogo from '../assets/linux.svg';
import mysqlLogo from '../assets/mysql.svg';
import nextLogo from '../assets/nextdotjs.svg';
import nodeLogo from '../assets/nodedotjs.svg';
import numpyLogo from '../assets/numpy.svg';
import openAiLogo from '../assets/openai-logo.svg';
import pythonLogo from '../assets/python.svg';
import reactLogo from '../assets/react.svg';
import tailwindLogo from '../assets/tailwindcss.svg';
import typescriptLogo from '../assets/typescript.svg';
import vscodeLogo from '../assets/vscode.svg';

export type TechStackItem = {
    accent: string;
    description: string;
    label: string;
    logo: string;
};

export const TECH_STACK_ITEMS: TechStackItem[] = [
    {
        accent: '#3776AB',
        description:
            'Automation, APIs, data workflows, and intelligent application backends.',
        label: 'Python',
        logo: pythonLogo,
    },
    {
        accent: '#F7DF1E',
        description:
            'Interactive browser behavior and flexible client-side application logic.',
        label: 'JavaScript',
        logo: javascriptLogo,
    },
    {
        accent: '#3178C6',
        description:
            'Typed frontend and backend code with stronger safety and maintainability.',
        label: 'TypeScript',
        logo: typescriptLogo,
    },
    {
        accent: '#A8B9CC',
        description:
            'Low-level systems programming with direct control over memory and performance.',
        label: 'C',
        logo: cLogo,
    },
    {
        accent: '#00599C',
        description:
            'High-performance native software, algorithms, and systems-oriented engineering.',
        label: 'C++',
        logo: cplusplusLogo,
    },
    {
        accent: '#E34F26',
        description:
            'Semantic page structure and accessible markup for modern web interfaces.',
        label: 'HTML',
        logo: htmlLogo,
    },
    {
        accent: '#1572B6',
        description:
            'Responsive layouts, visual polish, and expressive user interface styling.',
        label: 'CSS',
        logo: cssLogo,
    },
    {
        accent: '#4EAA25',
        description:
            'Command-line automation, scripting, and efficient local development workflows.',
        label: 'Bash',
        logo: bashLogo,
    },
    {
        accent: '#61DAFB',
        description:
            'Component-driven interfaces and dynamic frontend experiences.',
        label: 'React',
        logo: reactLogo,
    },
    {
        accent: '#FFFFFF',
        description:
            'Fast React applications with routing, hybrid rendering, and modern DX.',
        label: 'Next.js',
        logo: nextLogo,
    },
    {
        accent: '#7952B3',
        description:
            'Rapid UI construction with a proven component and utility framework.',
        label: 'Bootstrap',
        logo: bootstrapLogo,
    },
    {
        accent: '#5FA04E',
        description:
            'Server-side JavaScript for APIs, tooling, and realtime product workflows.',
        label: 'Node.js',
        logo: nodeLogo,
    },
    {
        accent: '#06B6D4',
        description:
            'Utility-first styling for fast visual iteration and consistent design systems.',
        label: 'Tailwind',
        logo: tailwindLogo,
    },
    {
        accent: '#013243',
        description:
            'Numerical computing and performant array-based data processing in Python.',
        label: 'NumPy',
        logo: numpyLogo,
    },
    {
        accent: '#4479A1',
        description:
            'Relational data modeling, queries, and production-ready persistence.',
        label: 'MySQL',
        logo: mysqlLogo,
    },
    {
        accent: '#2496ED',
        description:
            'Portable containers and consistent local-to-production environments.',
        label: 'Docker',
        logo: dockerLogo,
    },
    {
        accent: '#F05032',
        description:
            'Version control, branching, and reliable collaboration through clean history.',
        label: 'Git',
        logo: gitLogo,
    },
    {
        accent: '#FFFFFF',
        description:
            'Code hosting, reviews, and team-based shipping workflows.',
        label: 'GitHub',
        logo: githubLogo,
    },
    {
        accent: '#FCC624',
        description:
            'Development and deployment on dependable Unix-like environments.',
        label: 'Linux',
        logo: linuxLogo,
    },
    {
        accent: '#FF9900',
        description:
            'Cloud infrastructure, deployment services, and scalable application hosting.',
        label: 'AWS',
        logo: awsLogo,
    },
    {
        accent: '#007ACC',
        description:
            'Focused coding workflows with a fast editor and rich extension ecosystem.',
        label: 'VS Code',
        logo: vscodeLogo,
    },
    {
        accent: '#F24E1E',
        description:
            'Interface design, prototyping, and collaborative product exploration.',
        label: 'Figma',
        logo: figmaLogo,
    },
    {
        accent: '#61DAFB',
        description:
            'Cross-platform mobile interfaces built with familiar React patterns.',
        label: 'React Native',
        logo: reactLogo,
    },
    {
        accent: '#FFFFFF',
        description:
            'Model-powered products, assistants, and AI-enhanced software experiences.',
        label: 'OpenAI',
        logo: openAiLogo,
    },
];
