import { Link } from '@inertiajs/react';
import { ButtonLink, buttonClasses } from '@/components/button';
import { ExternalIcon } from '@/components/icons';
import { BrowserWindow } from '@/components/plate';
import { hostname } from '@/lib/utils';
import type { SpotlightProject } from '@/types/portfolio';

/**
 * The lead project on the home page. It inverts the page's theme (dark on
 * light, light on dark) so it reads as its own moment, and sits beside its
 * screen so the whole story fits in one view.
 */
export function ProjectSpotlight({ project }: { project: SpotlightProject }) {
    const { cover, links } = project;
    const context = [project.category, project.year]
        .filter(Boolean)
        .join(' · ');

    return (
        <article
            aria-labelledby="spotlight-title"
            className="spotlight overflow-hidden rounded-[20px]"
        >
            <div className="grid lg:grid-cols-12">
                <div className="flex flex-col px-6 pt-10 pb-8 sm:px-10 sm:pt-12 lg:col-span-5 lg:py-12 lg:pr-4 lg:pl-12">
                    <div className="flex items-center gap-2.5">
                        <span className="work-tag work-tag-accent">
                            Featured
                        </span>
                        <span className="type-meta">{context}</span>
                    </div>
                    <h3
                        id="spotlight-title"
                        className="type-heading mt-4 text-[clamp(2rem,3.6vw,2.75rem)]"
                    >
                        <Link
                            href={`/work/${project.slug}`}
                            className="decoration-accent decoration-2 underline-offset-[0.12em] hover:underline"
                        >
                            {project.title}
                        </Link>
                    </h3>
                    <p className="mt-4 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
                        {project.summary}
                    </p>

                    {project.points.length > 0 && (
                        <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                            {project.points.map((point) => (
                                <li key={point} className="flex gap-3">
                                    <span
                                        aria-hidden
                                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                                    />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                        <ButtonLink href={`/work/${project.slug}`}>
                            Read the case study
                        </ButtonLink>
                        {links.live && (
                            <a
                                href={links.live}
                                target="_blank"
                                rel="noreferrer"
                                className={buttonClasses('secondary')}
                            >
                                Visit {hostname(links.live)}
                                <ExternalIcon />
                            </a>
                        )}
                    </div>
                </div>

                {cover.desktop && (
                    <Link
                        href={`/work/${project.slug}`}
                        tabIndex={-1}
                        aria-hidden
                        className="spotlight-screen relative block aspect-[16/10] overflow-hidden pl-6 sm:pl-10 lg:col-span-7 lg:aspect-auto lg:pl-0"
                    >
                        <BrowserWindow
                            image={cover.desktop}
                            url={cover.url}
                            alt={`${project.title} Calls console, showing a live call handled by the AI agent`}
                            sizes="(min-width: 1320px) 760px, (min-width: 1024px) 58vw, 94vw"
                            className="!relative w-[128%] !rounded-r-none !rounded-b-none lg:!absolute lg:top-12 lg:left-4 lg:w-[118%]"
                        />
                    </Link>
                )}
            </div>
        </article>
    );
}
