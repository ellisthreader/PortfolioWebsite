import { Link } from '@inertiajs/react';
import { Plate } from '@/components/plate';
import type { ProjectSummary, ProjectType } from '@/types/portfolio';

export const TYPE_LABEL: Record<ProjectType, string> = {
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
            className="work-card group flex h-full flex-col rounded-[18px] focus-visible:outline-offset-4"
        >
            <Plate
                project={project}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1320px) 600px, (min-width: 768px) 46vw, 94vw"
            />

            <div className="flex items-center justify-between gap-4 pt-5">
                <span className="flex min-w-0 items-center gap-2.5">
                    <span
                        className={
                            project.type === 'client'
                                ? 'work-tag work-tag-accent'
                                : 'work-tag'
                        }
                    >
                        {TYPE_LABEL[project.type]}
                    </span>
                    <span className="type-meta truncate">
                        {project.category}
                    </span>
                </span>
                <span className="type-meta shrink-0">{project.year}</span>
            </div>

            <h3 className="type-subheading mt-3 text-[1.5rem] decoration-accent decoration-2 underline-offset-[0.18em] group-hover:underline">
                {project.title}
            </h3>
            <p className="mt-2 line-clamp-3 max-w-[54ch] text-muted">
                {project.summary}
            </p>
        </Link>
    );
}
