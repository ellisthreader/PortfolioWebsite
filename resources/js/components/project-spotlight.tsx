import { Link } from '@inertiajs/react';
import { ButtonLink, buttonClasses } from '@/components/button';
import { ExternalIcon } from '@/components/icons';
import { Picture } from '@/components/picture';
import { AppWindow, BrowserWindow, Phone } from '@/components/plate';
import { TYPE_LABEL } from '@/components/work-card';
import { hostname } from '@/lib/utils';
import type { SpotlightProject } from '@/types/portfolio';

/**
 * The lead project on the home page. It inverts the page's theme (dark on
 * light, light on dark) so it reads as its own moment, and sits beside its
 * screens so the whole story fits in one view.
 */
export function ProjectSpotlight({ project }: { project: SpotlightProject }) {
    const { cover, links } = project;
    const screen = {
        alt: '',
        sizes: '(min-width: 1320px) 860px, (min-width: 1024px) 66vw, 120vw',
        className:
            'top-[8cqw] left-[18cqw] w-[112cqw] lg:top-[3.5rem] lg:left-[13cqw]',
    };

    return (
        <article
            aria-labelledby="spotlight-title"
            className="spotlight overflow-hidden rounded-[24px]"
        >
            <div className="grid lg:grid-cols-12">
                <div className="flex flex-col px-6 pt-10 pb-10 sm:px-10 sm:pt-12 lg:col-span-5 lg:py-14 lg:pr-4 lg:pl-12">
                    <div className="flex items-center gap-2.5">
                        <span className="work-tag work-tag-accent">
                            {TYPE_LABEL[project.type]}
                        </span>
                        <span className="type-meta">
                            {[project.category, project.year]
                                .filter(Boolean)
                                .join(', ')}
                        </span>
                    </div>
                    <h3
                        id="spotlight-title"
                        className="type-title mt-5 text-[clamp(2.25rem,4.2vw,3.5rem)]"
                    >
                        <Link
                            href={`/work/${project.slug}`}
                            className="decoration-accent decoration-2 underline-offset-[0.12em] hover:underline"
                        >
                            {project.title}
                        </Link>
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-[1.0625rem] leading-relaxed text-muted">
                        {project.summary}
                    </p>

                    {project.points.length > 0 && (
                        <ul className="mt-7 space-y-3 border-t border-rule pt-6 text-[0.9375rem]">
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

                    <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
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

                {cover.layout === 'image' && cover.image && (
                    <Link
                        href={`/work/${project.slug}`}
                        tabIndex={-1}
                        aria-hidden
                        className="relative block aspect-[3/2] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[36rem]"
                    >
                        <Picture
                            image={cover.image}
                            alt=""
                            sizes="(min-width: 1320px) 720px, (min-width: 1024px) 58vw, 100vw"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ objectPosition: cover.focus ?? 'center' }}
                        />
                    </Link>
                )}

                {cover.desktop && (
                    <Link
                        href={`/work/${project.slug}`}
                        tabIndex={-1}
                        aria-hidden
                        className="spotlight-screen relative block aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[36rem]"
                    >
                        {cover.layout.startsWith('app') ? (
                            <AppWindow image={cover.desktop} {...screen} />
                        ) : (
                            <BrowserWindow
                                image={cover.desktop}
                                url={cover.url}
                                {...screen}
                            />
                        )}
                        {cover.mobile && (
                            <Phone
                                image={cover.mobile}
                                alt=""
                                sizes="(min-width: 1024px) 190px, 26vw"
                                className="top-[16cqw] left-[5cqw] w-[24cqw] lg:top-[7.5rem] lg:left-[2cqw] lg:w-[25cqw]"
                            />
                        )}
                    </Link>
                )}
            </div>
        </article>
    );
}
