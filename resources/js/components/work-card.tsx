import { Link } from '@inertiajs/react';
import { ArrowIcon } from '@/components/icons';
import { Plate } from '@/components/plate';
import type { ProjectSummary, ProjectType } from '@/types/portfolio';

const TYPE_LABEL: Record<ProjectType, string> = {
    client: 'Client',
    product: 'Own product',
    'ai-system': 'AI system',
    other: 'Build',
};

/**
 * A featured project on the home page grid: its screens, then enough to
 * decide whether to open it. The whole card is one link.
 */
export function WorkCard({ project }: { project: ProjectSummary }) {
    return (
        <Link
            href={`/work/${project.slug}`}
            className="work-card group flex h-full flex-col rounded-[16px] focus-visible:outline-offset-4"
        >
            <Plate
                project={project}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1320px) 600px, (min-width: 768px) 46vw, 94vw"
            />

            <div className="flex flex-1 flex-col pt-5">
                <div className="flex items-center gap-2.5">
                    <span
                        className={
                            project.type === 'client'
                                ? 'work-tag work-tag-accent'
                                : 'work-tag'
                        }
                    >
                        {TYPE_LABEL[project.type]}
                    </span>
                    <span className="type-meta">
                        {[project.category, project.year]
                            .filter(Boolean)
                            .join(' · ')}
                    </span>
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                    <h3 className="type-subheading text-[1.5rem] decoration-accent decoration-2 underline-offset-[0.18em] group-hover:underline">
                        {project.title}
                    </h3>
                    <span
                        aria-hidden
                        className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-rule-strong text-muted transition-[transform,color,border-color,background-color] duration-200 group-hover:translate-x-0.5 group-hover:border-ink group-hover:bg-ink group-hover:text-canvas"
                    >
                        <ArrowIcon width={14} height={14} />
                    </span>
                </div>

                <p className="mt-2 line-clamp-3 max-w-[52ch] text-muted">
                    {project.summary}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.stack.slice(0, 4).map((tool) => (
                        <li key={tool} className="work-chip">
                            {tool}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    );
}
