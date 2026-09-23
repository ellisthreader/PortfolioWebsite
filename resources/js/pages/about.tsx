import { Head, usePage } from '@inertiajs/react';
import { Availability } from '@/components/availability';
import { ButtonLink, buttonClasses } from '@/components/button';
import { Container } from '@/components/container';
import { DownloadIcon } from '@/components/icons';
import { SocialIcons } from '@/components/social-links';

const EXPERIENCE = [
    {
        years: '2026 – now',
        title: 'Independent products',
        body: 'Building my own software: Vibyra, a desktop workspace and iPhone app for running AI coding agents, and RelayClarity, a platform for taking voice agents from pilot to launch.',
    },
    {
        years: '2025 – now',
        title: 'Freelance full-stack engineer',
        body: 'Complete systems for clients, from the database to the interface: ordering, till, kitchen display and delivery dispatch for a takeaway, and a printed-clothing shop with a design tool and its own admin panel.',
    },
    {
        years: '2024',
        title: 'AI engineering',
        body: 'Chatbots, agents and API integrations, and the first Python version of my voice assistant.',
    },
    {
        years: '2023',
        title: 'Started programming properly',
        body: 'Python fundamentals through small tools and games, then data, automation and APIs.',
    },
    {
        years: '2021 – 2022',
        title: 'Roblox development and design',
        body: 'Lua scripting for Roblox games, early freelance work for other creators, then graphic design and 3D work.',
    },
];

const TOOLS = [
    {
        group: 'Languages',
        items: [
            'TypeScript',
            'JavaScript',
            'PHP',
            'Rust',
            'Python',
            'SQL',
            'Bash',
        ],
    },
    {
        group: 'Web',
        items: [
            'React',
            'Inertia',
            'Tailwind CSS',
            'Vite',
            'Next.js',
            'Three.js',
        ],
    },
    {
        group: 'Backend and data',
        items: [
            'Laravel',
            'Axum',
            'Express',
            'NestJS',
            'FastAPI',
            'MySQL',
            'PostgreSQL',
            'SQLite',
            'Redis',
        ],
    },
    {
        group: 'Mobile and desktop',
        items: ['React Native', 'Expo', 'Tauri', 'egui', 'Raspberry Pi'],
    },
    {
        group: 'AI and machine learning',
        items: [
            'OpenAI Realtime',
            'Speech APIs',
            'ElevenLabs',
            'scikit-learn',
            'Azure Machine Learning',
        ],
    },
    {
        group: 'Infrastructure and services',
        items: [
            'Railway',
            'Docker',
            'GitHub Actions',
            'Linux',
            'Stripe',
            'Twilio',
        ],
    },
];

export default function About() {
    const { site } = usePage().props;

    return (
        <>
            <Head title="About" />

            <Container className="pt-14 sm:pt-20">
                <h1 className="type-title">About</h1>

                <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="space-y-6 lg:col-span-7">
                        <p className="type-lead">
                            I’m Ellis, a software engineer in London. I build
                            complete products: the data model and the server,
                            the interface, and the details that make it feel
                            finished.
                        </p>
                        <p className="measure text-muted">
                            Most of my work sits where web platforms meet AI.
                            For clients that has meant a takeaway’s ordering,
                            till, kitchen and delivery system, and a
                            printed-clothing shop with its own design tool. For
                            myself it has meant a platform for voice agents, a
                            Raspberry Pi assistant written in Rust, and a
                            workspace for running AI coding agents from a desk
                            or a phone.
                        </p>
                        <p className="measure text-muted">
                            I work across the stack by choice. Owning the whole
                            thing is how the small details stay right, and it’s
                            the part of the job I enjoy most.
                        </p>
                    </div>

                    <aside className="self-start lg:col-span-4 lg:col-start-9">
                        <dl className="panel grid gap-5 text-[0.96875rem]">
                            <div className="flex items-baseline justify-between gap-6">
                                <dt className="type-meta">Based in</dt>
                                <dd className="text-right">{site.location}</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-5">
                                <dt className="type-meta">Working on</dt>
                                <dd className="text-right">
                                    Web, AI systems and apps
                                </dd>
                            </div>
                            {site.availability.open && (
                                <div className="border-t border-rule pt-5">
                                    <dt className="sr-only">Availability</dt>
                                    <dd>
                                        <Availability />
                                    </dd>
                                </div>
                            )}
                            <div className="flex items-center justify-between gap-6 border-t border-rule pt-5">
                                <dt className="type-meta">Elsewhere</dt>
                                <dd>
                                    <SocialIcons />
                                </dd>
                            </div>
                        </dl>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {site.cv && (
                                <a
                                    href={site.cv}
                                    className={buttonClasses('primary')}
                                    download
                                >
                                    <DownloadIcon />
                                    Download CV
                                </a>
                            )}
                            <ButtonLink
                                href="/contact"
                                variant={site.cv ? 'secondary' : 'primary'}
                                className="flex-1"
                            >
                                Get in touch
                            </ButtonLink>
                        </div>
                    </aside>
                </div>
            </Container>

            <Container
                as="section"
                aria-labelledby="experience"
                className="pt-28 sm:pt-40"
            >
                <h2 id="experience" className="type-heading">
                    Experience
                </h2>
                <ol className="mt-10 border-t border-rule">
                    {EXPERIENCE.map((item) => (
                        <li
                            key={item.title}
                            className="grid gap-2 border-b border-rule py-7 md:grid-cols-12 md:gap-8"
                        >
                            <p className="type-meta md:col-span-3 md:pt-1">
                                {item.years}
                            </p>
                            <h3 className="type-subheading md:col-span-4">
                                {item.title}
                            </h3>
                            <p className="max-w-[52ch] text-muted md:col-span-5">
                                {item.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </Container>

            <Container
                as="section"
                aria-labelledby="tools"
                className="pt-28 pb-28 sm:pt-40 sm:pb-40"
            >
                <h2 id="tools" className="type-heading">
                    Tools I use
                </h2>
                <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {TOOLS.map((tool) => (
                        <div key={tool.group} className="panel">
                            <dt className="font-[600] [font-stretch:104%]">
                                {tool.group}
                            </dt>
                            <dd className="mt-4">
                                <ul className="flex flex-wrap gap-1.5">
                                    {tool.items.map((item) => (
                                        <li key={item} className="work-chip">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </>
    );
}
