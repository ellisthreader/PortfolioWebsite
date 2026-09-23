import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { buttonClasses } from '@/components/button';
import { Container } from '@/components/container';
import { GalleryFigure } from '@/components/gallery-figure';
import { ExternalIcon } from '@/components/icons';
import { DiagramView, Plate } from '@/components/plate';
import { hostname } from '@/lib/utils';
import type { GalleryItem, Project, ProjectSummary } from '@/types/portfolio';

/** Gallery widths on a six-column grid: screens full width, phones in pairs, touchscreens in threes. */
const GALLERY_SPAN: Record<GalleryItem['frame'], string> = {
    browser: 'sm:col-span-6',
    app: 'sm:col-span-6',
    image: 'sm:col-span-6',
    phone: 'sm:col-span-3',
    device: 'sm:col-span-2',
};

type WorkShowProps = {
    project: Project;
    next: ProjectSummary | null;
};

export default function WorkShow({ project, next }: WorkShowProps) {
    const { caseStudy, links } = project;

    const facts = [
        project.role && { label: 'Role', value: project.role },
        project.client
            ? { label: 'Client', value: project.client }
            : project.category && { label: 'Type', value: project.category },
        { label: 'Year', value: project.year },
        project.stack.length > 0 && {
            label: 'Stack',
            value: project.stack.join(', '),
        },
    ].filter(Boolean) as { label: string; value: string }[];

    return (
        <>
            <Head title={project.title} />

            <article>
                <Container className="pt-10 sm:pt-14">
                    <Link href="/work" className="link type-meta">
                        Work
                    </Link>

                    <h1 className="type-title mt-6 max-w-[16ch]">
                        {project.title}
                    </h1>
                    <p className="type-lead mt-5 max-w-[46ch] text-muted">
                        {project.summary}
                    </p>

                    <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-6 md:grid-cols-4">
                        {facts.map((fact) => (
                            <div
                                key={fact.label}
                                className={
                                    fact.label === 'Stack'
                                        ? 'col-span-2 md:col-span-1'
                                        : undefined
                                }
                            >
                                <dt className="type-meta">{fact.label}</dt>
                                <dd className="mt-1 text-[0.96875rem] leading-snug">
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    {(links.live || links.repo) && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {links.live && (
                                <a
                                    href={links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonClasses('primary')}
                                >
                                    {links.liveLabel ??
                                        `Visit ${hostname(links.live)}`}
                                    <ExternalIcon />
                                </a>
                            )}
                            {links.repo && (
                                <a
                                    href={links.repo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonClasses('secondary')}
                                >
                                    View the code
                                    <ExternalIcon />
                                </a>
                            )}
                        </div>
                    )}

                    <Plate
                        project={project}
                        aspect={
                            project.cover.layout === 'diagram'
                                ? 'aspect-[4/3] sm:aspect-[2/1]'
                                : 'aspect-[4/3] sm:aspect-[16/9]'
                        }
                        sizes="(min-width: 1320px) 1224px, 94vw"
                        priority
                        className="mt-12 sm:mt-16"
                    />
                </Container>

                <Container className="pt-20 sm:pt-28">
                    <div className="space-y-16 sm:space-y-24">
                        {caseStudy.brief && caseStudy.brief.length > 0 && (
                            <CaseSection title="The brief">
                                <div className="prose-case type-lead">
                                    {caseStudy.brief.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                            </CaseSection>
                        )}

                        {caseStudy.built && caseStudy.built.length > 0 && (
                            <CaseSection title="What I built">
                                <ul className="border-t border-rule">
                                    {caseStudy.built.map((item) => (
                                        <li
                                            key={item.title}
                                            className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
                                        >
                                            <h3 className="font-[600] [font-stretch:104%]">
                                                {item.title}
                                            </h3>
                                            <p className="text-muted">
                                                {item.body}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </CaseSection>
                        )}

                        {project.gallery.length > 0 && (
                            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-6 sm:gap-y-14">
                                {project.gallery.map((item, index) => (
                                    <GalleryFigure
                                        key={item.image.src}
                                        item={item}
                                        tone={project.tone}
                                        className={GALLERY_SPAN[item.frame]}
                                        alt={
                                            item.caption ??
                                            `${project.title}, screen ${index + 1}`
                                        }
                                    />
                                ))}
                            </div>
                        )}

                        {((caseStudy.architecture &&
                            caseStudy.architecture.length > 0) ||
                            project.diagram) && (
                            <CaseSection title="How it works">
                                {project.diagram && (
                                    <div
                                        className="plate mb-10 aspect-[4/3] sm:aspect-[16/9]"
                                        data-tone={project.tone}
                                    >
                                        <DiagramView
                                            diagram={project.diagram}
                                            title={project.title}
                                        />
                                    </div>
                                )}
                                {caseStudy.architecture &&
                                    caseStudy.architecture.length > 0 && (
                                        <ol className="space-y-4">
                                            {caseStudy.architecture.map(
                                                (step, index) => (
                                                    <li
                                                        key={step}
                                                        className="grid grid-cols-[2rem_1fr] gap-3"
                                                    >
                                                        <span className="type-meta pt-[0.1em]">
                                                            {index + 1}
                                                        </span>
                                                        <span>{step}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ol>
                                    )}
                            </CaseSection>
                        )}

                        {caseStudy.outcome && caseStudy.outcome.length > 0 && (
                            <CaseSection title="Where it is now">
                                <ul className="space-y-3">
                                    {caseStudy.outcome.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span
                                                aria-hidden
                                                className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent"
                                            />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CaseSection>
                        )}
                    </div>
                </Container>
            </article>

            {next && next.slug !== project.slug && (
                <Container className="pt-28 pb-28 sm:pt-40 sm:pb-40">
                    <Link
                        href={`/work/${next.slug}`}
                        className="group grid gap-8 border-t border-ink pt-6 md:grid-cols-12 md:items-end"
                    >
                        <div className="md:col-span-6">
                            <p className="type-meta">Next project</p>
                            <p className="type-title mt-3 decoration-accent decoration-2 underline-offset-[0.12em] group-hover:underline">
                                {next.title}
                            </p>
                            <p className="mt-4 max-w-[40ch] text-muted">
                                {next.summary}
                            </p>
                        </div>
                        <Plate
                            project={next}
                            aspect="aspect-[16/10]"
                            sizes="(min-width: 768px) 46vw, 94vw"
                            className="md:col-span-6"
                        />
                    </Link>
                </Container>
            )}
        </>
    );
}

function CaseSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="grid gap-5 lg:grid-cols-12 lg:gap-8">
            <h2 className="type-heading lg:col-span-4">{title}</h2>
            <div className="max-w-[68ch] lg:col-span-8">{children}</div>
        </section>
    );
}
