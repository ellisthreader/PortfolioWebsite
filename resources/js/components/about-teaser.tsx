import { Link, usePage } from '@inertiajs/react';
import { Availability } from '@/components/availability';
import { Container } from '@/components/container';
import { ArrowIcon } from '@/components/icons';
import { SectionHeader } from '@/components/section-header';
import { SocialIcons } from '@/components/social-links';

const JOURNEY = [
    { year: '2021', label: 'Roblox games in Lua' },
    { year: '2023', label: 'Python, data and automation' },
    { year: '2024', label: 'AI agents and integrations' },
    { year: '2025', label: 'Freelance full-stack' },
    { year: '2026', label: 'My own products' },
];

/** A short introduction, the facts at a glance, and how I got here. */
export function AboutTeaser() {
    const { site } = usePage().props;

    return (
        <section aria-labelledby="about-teaser" className="pt-28 sm:pt-40">
            <Container>
                <SectionHeader
                    id="about-teaser"
                    title="About"
                    aside={
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 font-[550]"
                        >
                            <span className="link">More about me</span>
                            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    }
                />

                <div className="mt-10 grid gap-10 sm:mt-12 md:grid-cols-12 md:gap-8">
                    <p className="type-lead text-pretty md:col-span-7">
                        I started writing code building games on Roblox, moved
                        into Python, and now build production software for
                        clients and for my own products.{' '}
                        <span className="text-muted">
                            I like owning the whole thing: the data model, the
                            server, the interface and the last detail of how it
                            feels to use.
                        </span>
                    </p>

                    <dl className="panel grid gap-5 self-start text-[0.96875rem] md:col-span-5 lg:col-span-4 lg:col-start-9">
                        <div className="flex items-baseline justify-between gap-6">
                            <dt className="type-meta">Based in</dt>
                            <dd className="text-right">{site.location}</dd>
                        </div>
                        <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-5">
                            <dt className="type-meta">Focus</dt>
                            <dd className="text-right">Web, AI and apps</dd>
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
                </div>

                <ol
                    aria-label="How I got here"
                    className="journey mt-14 grid gap-6 sm:mt-16 sm:grid-cols-5 sm:gap-4"
                >
                    {JOURNEY.map((step, index) => (
                        <li
                            key={step.year}
                            className="journey-step"
                            data-current={
                                index === JOURNEY.length - 1 || undefined
                            }
                        >
                            <span className="type-meta tabular-nums">
                                {step.year}
                            </span>
                            <span className="mt-1 block text-[0.96875rem] leading-snug font-[520]">
                                {step.label}
                            </span>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}
