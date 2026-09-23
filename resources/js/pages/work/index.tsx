import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Container } from '@/components/container';
import { Plate } from '@/components/plate';
import { ProjectCard } from '@/components/project-card';
import { cn } from '@/lib/utils';
import type { ProjectSummary, ProjectType } from '@/types/portfolio';

type WorkIndexProps = {
    projects: ProjectSummary[];
    types: { value: ProjectType; label: string; count: number }[];
};

type Filter = ProjectType | 'all';

export default function WorkIndex({ projects, types }: WorkIndexProps) {
    const [filter, setFilter] = useState<Filter>('all');
    const [activeSlug, setActiveSlug] = useState(projects[0]?.slug);

    const visible = useMemo(
        () =>
            filter === 'all'
                ? projects
                : projects.filter((project) => project.type === filter),
        [filter, projects],
    );

    const active =
        visible.find((project) => project.slug === activeSlug) ?? visible[0];

    const filters: { value: Filter; label: string; count: number }[] = [
        { value: 'all', label: 'All', count: projects.length },
        ...types.filter((type) => type.count > 0),
    ];

    return (
        <>
            <Head title="Work" />

            <Container className="pt-14 pb-28 sm:pt-20 sm:pb-40">
                <h1 className="type-title">Work</h1>
                <p className="type-lead mt-5 max-w-[40ch] text-muted">
                    Client platforms, AI systems and apps I’ve designed and
                    built.
                </p>

                <div
                    role="group"
                    aria-label="Filter projects"
                    className="mt-10 flex flex-wrap gap-2"
                >
                    {filters.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            aria-pressed={filter === item.value}
                            onClick={() => setFilter(item.value)}
                            className={cn(
                                'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-[500] transition-colors duration-150',
                                filter === item.value
                                    ? 'border-ink bg-ink text-canvas'
                                    : 'border-rule-strong text-ink hover:border-ink',
                            )}
                        >
                            {item.label}
                            <span
                                className={cn(
                                    'tabular-nums',
                                    filter === item.value
                                        ? 'text-canvas/70'
                                        : 'text-muted',
                                )}
                            >
                                {item.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Large screens: a typographic index with a live preview. */}
                <div className="mt-12 hidden gap-12 lg:grid lg:grid-cols-12">
                    <ol className="border-t border-rule lg:col-span-7">
                        {visible.map((project) => {
                            const isActive = project.slug === active?.slug;

                            return (
                                <li
                                    key={project.slug}
                                    className="border-b border-rule"
                                >
                                    <Link
                                        href={`/work/${project.slug}`}
                                        onMouseEnter={() =>
                                            setActiveSlug(project.slug)
                                        }
                                        onFocus={() =>
                                            setActiveSlug(project.slug)
                                        }
                                        className="grid grid-cols-[1fr_auto] items-baseline gap-x-8 py-5 xl:grid-cols-[minmax(0,1fr)_11rem_6rem]"
                                    >
                                        <span
                                            className={cn(
                                                'text-[1.625rem] leading-tight font-[600] tracking-[-0.022em] [font-stretch:110%] transition-colors duration-150',
                                                isActive
                                                    ? 'text-ink'
                                                    : 'text-muted',
                                            )}
                                        >
                                            {project.title}
                                        </span>
                                        <span className="type-meta hidden xl:block">
                                            {project.category}
                                        </span>
                                        <span className="type-meta text-right">
                                            {project.year}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="lg:col-span-5">
                        {active && (
                            <div className="sticky top-28">
                                <div
                                    key={active.slug}
                                    className="motion-safe:animate-[fade-in_220ms_ease-out]"
                                >
                                    <Plate
                                        project={active}
                                        aspect="aspect-[4/3]"
                                        sizes="(min-width: 1320px) 500px, 38vw"
                                    />
                                    <p className="mt-5 max-w-[46ch] text-muted">
                                        {active.summary}
                                    </p>
                                    <p className="type-meta mt-3">
                                        {active.stack.slice(0, 4).join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Small screens: every project with its plate. */}
                <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:hidden">
                    {visible.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            size="half"
                            headingLevel="h2"
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}
