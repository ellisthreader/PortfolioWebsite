import type { ProjectItem } from '../types';

export const PROJECT_ITEMS: ProjectItem[] = [
    {
        index: '01',
        title: 'Bear Lane Ecommerce',
        category: 'Luxury E-Commerce',
        stack: 'Laravel, React, TypeScript, Tailwind CSS, MySQL',
        description:
            'A luxury e-commerce platform with secure profile login, full order management, and deep product customisation for embroidered or printed shirts, backed by a powerful admin panel with detailed analytics and complete control over the website experience.',
        accent: 'from-fuchsia-400/90 via-pink-400/70 to-rose-300/60',
        imageUrl: '/BL.png',
    },
    {
        index: '02',
        title: 'EPOS Software',
        category: 'Hospitality System',
        stack: 'Laravel, React, TypeScript, POS Integrations, Automation',
        description:
            'A fully integrated EPOS platform combining a website, till system, kitchen display, payment integration, automated workflows, and ongoing setup and support, enhanced with phone and website LLM features to streamline service and day-to-day operations.',
        accent: 'from-violet-400/90 via-fuchsia-400/75 to-sky-300/55',
        imageUrl: '/HKE.png',
        transparentImage: true,
    },
    {
        index: '03',
        title: 'AI Voice Assistant',
        category: 'Voice AI System',
        stack: 'Python, Speech-to-Text, LLMs, Text-to-Speech, Pico',
        description:
            'An elegant voice assistant platform that turns spoken requests into fast, natural conversations by combining speech-to-text, LLM reasoning, and text-to-speech in a polished real-time experience. Built with Pico and supporting electronics, it delivers responses in around three seconds while maintaining a refined, premium interface.',
        accent: 'from-indigo-400/90 via-fuchsia-400/70 to-cyan-300/60',
        imageUrl: '/AIAssistant.png',
    },
    {
        index: '04',
        title: 'Uplifta App',
        category: 'Wellness Platform',
        stack: 'React Native, TypeScript, UX Design, Habit Tracking',
        description:
            'A lifestyle improvement app designed to help users get life back on track by reducing screen time, breaking unhealthy phone habits, and building a more focused, active, and balanced daily routine. Uplifta encourages digital detox, consistent exercise, stronger concentration, and healthier living through a clean, motivating product experience.',
        accent: 'from-rose-400/90 via-pink-400/75 to-amber-200/60',
        imageUrl: '/Uplifta.png',
        transparentImage: true,
    },
    {
        index: '05',
        title: 'Chatora AI',
        category: 'Business LLM Platform',
        stack: 'LLMs, Voice AI, Dashboards, Automation, Telephony',
        description:
            'A phone and chatbot LLM platform tailored for real-world businesses including takeaways, offices, and supermarkets. Each deployment is customised to fit the business precisely, delivering realistic voice interactions, ultra-natural conversations, minimal operating costs, and a dedicated dashboard for tracking activity and performance.',
        accent: 'from-purple-400/90 via-fuchsia-400/75 to-orange-200/60',
        imageUrl: '/ChatoraAI.png',
        transparentImage: true,
    },
    {
        index: '06',
        title: 'Checkmate AI',
        category: 'Chess Analysis System',
        stack: 'React, TypeScript, Analytics, Chess Engine Tooling',
        description:
            'A high-level chess analysis platform built specifically for serious improvement, giving players the tools to track games, spot costly mistakes, uncover stronger move sequences, and review performance through detailed analytics. Checkmate AI is designed to make advanced chess insight more accessible, practical, and actionable.',
        accent: 'from-sky-400/90 via-blue-400/70 to-fuchsia-300/60',
        imageUrl: '/ChessAI.png',
        transparentImage: true,
    },
    {
        index: '07',
        title: 'AI Resume Builder',
        category: 'Career AI Tool',
        stack: 'AI Writing, Resume Optimization, React, TypeScript',
        description:
            'An AI-powered resume builder that creates polished, professional CVs with natural wording and a refined structure, designed to help users produce strong resumes that feel authentic and highly competitive.',
        accent: 'from-fuchsia-400/90 via-pink-400/75 to-violet-300/60',
        imageUrl: '/AIResume.png',
        transparentImage: true,
        hideFromHome: true,
    },
    {
        index: '08',
        title: 'See more of my work!',
        category: 'Project Archive',
        stack: 'Portfolio, Product Design, Frontend Development',
        description:
            'Explore all my latest creations in one place, with a full overview of the products, systems, and concepts I have been building.',
        accent: 'from-pink-300/90 via-fuchsia-400/75 to-indigo-400/60',
        isCta: true,
        href: '/projects',
        buttonLabel: 'View more',
    },
];
