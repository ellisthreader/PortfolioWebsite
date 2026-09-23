import { Link } from '@inertiajs/react';
import { Container } from '@/components/container';
import { ArrowIcon } from '@/components/icons';
import { Picture } from '@/components/picture';
import { SectionHeader } from '@/components/section-header';
import type { ImageSet, Tone } from '@/types/portfolio';

export type CapabilityArt = Record<string, ImageSet | null>;

type Capability = {
    key: string;
    title: string;
    body: string;
    tone: Tone;
    tools: string[];
    work: { slug: string; title: string }[];
};

const CAPABILITIES: Capability[] = [
    {
        key: 'web-platforms',
        title: 'Web platforms',
        body: 'Shops, ordering systems and the admin panels that run them, with payments, shipping and the APIs underneath.',
        tone: 'porcelain',
        tools: [
            'Laravel',
            'React',
            'TypeScript',
            'Rust',
            'PostgreSQL',
            'Stripe',
        ],
        work: [
            { slug: 'hke-epos', title: 'Hong Kong Express' },
            { slug: 'bear-lane', title: 'Bear Lane' },
        ],
    },
    {
        key: 'ai-systems',
        title: 'AI systems',
        body: 'Voice agents that answer customer calls, LLM features inside real products, and assistants that run on hardware.',
        tone: 'mist',
        tools: [
            'OpenAI Realtime',
            'Speech to text',
            'ElevenLabs',
            'Twilio',
            'Python',
        ],
        work: [
            { slug: 'relayclarity', title: 'RelayClarity' },
            { slug: 'ai-voice-assistant', title: 'Voice Assistant' },
        ],
    },
    {
        key: 'apps-devices',
        title: 'Apps and devices',
        body: 'iPhone apps, desktop apps built on Tauri, and software that runs on real hardware like a Raspberry Pi.',
        tone: 'stone',
        tools: ['React Native', 'Expo', 'Tauri', 'Rust', 'Raspberry Pi'],
        work: [
            { slug: 'vibyra', title: 'Vibyra' },
            { slug: 'ai-voice-assistant', title: 'Voice Assistant' },
        ],
    },
];

/** Three areas of work: a rendered object for each, its tools, and the projects that show it. */
export function Capabilities({ art }: { art: CapabilityArt }) {
    return (
        <section aria-labelledby="capabilities" className="pt-28 sm:pt-40">
            <Container>
                <SectionHeader
                    id="capabilities"
                    title="What I build"
                    aside={
                        <p className="type-meta max-w-[36ch] lg:text-right">
                            End to end, from the data model to the last detail
                            of the interface.
                        </p>
                    }
                />

                <ol className="mt-10 grid gap-x-6 gap-y-14 sm:mt-12 md:grid-cols-3 lg:gap-x-8">
                    {CAPABILITIES.map((item, index) => {
                        const image = art[item.key];

                        return (
                            <li key={item.key} className="flex flex-col">
                                <div
                                    className="plate capability-plate aspect-[5/4]"
                                    data-tone={item.tone}
                                >
                                    <span className="capability-index type-meta">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {image && (
                                        <Picture
                                            image={image}
                                            alt=""
                                            sizes="(min-width: 1320px) 400px, (min-width: 768px) 31vw, 94vw"
                                            className="capability-art"
                                        />
                                    )}
                                </div>

                                <h3 className="type-subheading mt-6 text-[1.5rem]">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 max-w-[42ch] text-muted">
                                    {item.body}
                                </p>

                                <ul
                                    aria-label="Tools"
                                    className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.875rem]"
                                >
                                    {item.tools.map((tool) => (
                                        <li
                                            key={tool}
                                            className="inline-flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <span
                                                aria-hidden
                                                className="size-1 rounded-full bg-accent"
                                            />
                                            {tool}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6">
                                    <ul className="flex flex-wrap gap-2 border-t border-rule pt-5">
                                        {item.work.map((project) => (
                                            <li key={project.slug}>
                                                <Link
                                                    href={`/work/${project.slug}`}
                                                    className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-rule-strong pr-3 pl-3.5 text-[0.875rem] font-[520] transition-colors duration-150 hover:border-ink hover:bg-paper"
                                                >
                                                    {project.title}
                                                    <ArrowIcon
                                                        width={13}
                                                        height={13}
                                                        className="text-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
                                                    />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
}
