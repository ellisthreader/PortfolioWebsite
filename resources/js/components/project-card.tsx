import { Link } from '@inertiajs/react';
import { Plate } from '@/components/plate';
import { cn } from '@/lib/utils';
import type { ProjectSummary } from '@/types/portfolio';

type ProjectCardProps = {
    project: ProjectSummary;
    size: 'wide' | 'half';
    priority?: boolean;
    /** h3 under a section heading (home); h2 directly under the page title (work index). */
    headingLevel?: 'h2' | 'h3';
};

/** A featured project: its plate, then name, summary and context. */
export function ProjectCard({
    project,
    size,
    priority,
    headingLevel = 'h3',
}: ProjectCardProps) {
    const Heading = headingLevel;
    const context = [project.category, project.year].filter(Boolean).join(', ');

    return (
        <Link
            href={`/work/${project.slug}`}
            className="group block rounded-[14px] focus-visible:outline-offset-4"
        >
            <Plate
                project={project}
                aspect={
                    size === 'half'
                        ? 'aspect-[4/3]'
                        : project.cover.layout === 'diagram'
                          ? 'aspect-[4/3] sm:aspect-[2/1]'
                          : 'aspect-[4/3] sm:aspect-[16/9]'
                }
                sizes={
                    size === 'wide'
                        ? '(min-width: 1320px) 1224px, 94vw'
                        : '(min-width: 1320px) 600px, (min-width: 768px) 46vw, 94vw'
                }
                priority={priority}
            />
            <div
                className={cn(
                    'mt-5 grid gap-x-10 gap-y-1.5',
                    size === 'wide' && 'md:grid-cols-12',
                )}
            >
                <div className={cn(size === 'wide' && 'md:col-span-5')}>
                    <Heading className="type-subheading decoration-accent decoration-1 underline-offset-[0.2em] group-hover:underline">
                        {project.title}
                    </Heading>
                    <p className="type-meta mt-1">{context}</p>
                </div>
                <p
                    className={cn(
                        'max-w-[52ch] text-muted',
                        size === 'wide' && 'md:col-span-7 md:pt-0.5',
                    )}
                >
                    {project.summary}
                </p>
            </div>
        </Link>
    );
}
