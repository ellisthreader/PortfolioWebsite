import { publicAsset } from '@/lib/preview-assets';
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
        imageUrl: publicAsset('/BL.webp'),
    },
    {
        index: '02',
        title: 'EPOS Software',
        category: 'Hospitality System',
        stack: 'Laravel, React, TypeScript, POS Integrations, Automation',
        description:
            'A fully integrated EPOS platform combining a website, till system, kitchen display, payment integration, automated workflows, and ongoing setup and support, enhanced with phone and website LLM features to streamline service and day-to-day operations.',
        accent: 'from-violet-400/90 via-fuchsia-400/75 to-sky-300/55',
        imageUrl: publicAsset('/HKE.webp'),
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
        imageUrl: publicAsset('/AIAssistantCutout.webp'),
        transparentImage: true,
    },
    {
        index: '04',
        title: 'Uplifta App',
        category: 'Wellness Platform',
        stack: 'React Native, TypeScript, UX Design, Habit Tracking',
        description:
            'A lifestyle improvement app designed to help users get life back on track by reducing screen time, breaking unhealthy phone habits, and building a more focused, active, and balanced daily routine. Uplifta encourages digital detox, consistent exercise, stronger concentration, and healthier living through a clean, motivating product experience.',
        accent: 'from-rose-400/90 via-pink-400/75 to-amber-200/60',
        imageUrl: publicAsset('/Uplifta.webp'),
        transparentImage: true,
        hideFromHome: true,
    },
    {
        index: '05',
        title: 'Vibyra App',
        category: 'AI Workflow Command Center',
        stack: 'React Native, Expo, Laravel, Desktop Bridge, AI Agents',
        description:
            'A phone-first coding command center for building whenever, wherever, pairing with a desktop bridge to browse projects, start previews, send AI prompts, review code changes, and apply or discard agent work.',
        accent: 'from-violet-400/90 via-fuchsia-400/75 to-cyan-300/60',
        imageUrl: publicAsset('/VibyraApp.webp'),
        transparentImage: true,
    },
    {
        index: '06',
        title: 'RelayClarity',
        category: 'Voice Agent Deployment Platform',
        stack: 'React, TypeScript, Voice AI, Enterprise Integrations, Evaluation',
        description:
            'A production-focused platform for moving AI voice agents from pilot to launch. RelayClarity brings customer workspaces, CRM and telephony integrations, voice tuning, scripted and adversarial evaluation gates, deployment insights, and handoff reporting into one operational workflow.',
        accent: 'from-cyan-300/90 via-blue-400/75 to-teal-300/60',
        imageUrl: publicAsset('/RelayClarity-transparent.webp'),
        transparentImage: true,
    },
    {
        index: '07',
        title: 'Property Digital Twin',
        category: '3D Real Estate Platform',
        stack: 'React, TypeScript, Gaussian Splatting, Python, Tauri',
        description:
            'A property digital-twin platform that transforms guided phone captures into photorealistic Gaussian-splat 3D tours, giving estate agents a workspace to process scans, edit rooms, save viewpoints, add hotspots, and publish immersive property listings.',
        accent: 'from-amber-200/90 via-yellow-500/70 to-stone-300/60',
        imageUrl: publicAsset('/PropertyDigitalTwinAgent.webp'),
    },
    {
        index: '08',
        title: 'Service Priority AI',
        category: 'Azure MLOps Platform',
        stack: 'Azure ML, FastAPI, React, scikit-learn, Responsible AI',
        description:
            'An Azure-ready MLOps and Responsible AI triage dashboard for service requests, combining synthetic data generation, model training, FastAPI serving, React review workflows, monitoring contracts, and human-in-the-loop governance documentation.',
        accent: 'from-cyan-300/90 via-sky-400/75 to-violet-300/60',
        imageUrl: publicAsset('/ServicePriorityAI.webp'),
        transparentImage: true,
    },
    {
        index: '09',
        title: 'AI Resume Builder',
        category: 'Career AI Tool',
        stack: 'AI Writing, Resume Optimization, React, TypeScript',
        description:
            'An AI-powered resume builder that creates polished, professional CVs with natural wording and a refined structure, designed to help users produce strong resumes that feel authentic and highly competitive.',
        accent: 'from-fuchsia-400/90 via-pink-400/75 to-violet-300/60',
        imageUrl: publicAsset('/AIResume.webp'),
        transparentImage: true,
        hideFromHome: true,
    },
    {
        index: '10',
        title: 'Checkmate AI',
        category: 'Chess Analysis System',
        stack: 'React, TypeScript, Analytics, Chess Engine Tooling',
        description:
            'A high-level chess analysis platform built specifically for serious improvement, giving players the tools to track games, spot costly mistakes, uncover stronger move sequences, and review performance through detailed analytics. Checkmate AI is designed to make advanced chess insight more accessible, practical, and actionable.',
        accent: 'from-sky-400/90 via-blue-400/70 to-fuchsia-300/60',
        imageUrl: publicAsset('/ChessAI.webp'),
        transparentImage: true,
        hideFromHome: true,
    },
    {
        index: '11',
        title: 'Drone Scan Company',
        category: '3D Capture Marketplace',
        stack: 'Drone Mapping, Photogrammetry, 3D Scans, Web Marketplace',
        description:
            'A drone scanning company that captures real-world places as detailed digital 3D assets, then packages and sells those scans to customers who need accurate spaces for planning, design, marketing, or virtual walkthroughs.',
        accent: 'from-cyan-300/90 via-sky-400/75 to-fuchsia-300/60',
        imageUrl: publicAsset('/DroneScanAI.webp'),
        transparentImage: true,
        hideFromHome: true,
    },
    {
        index: '12',
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
