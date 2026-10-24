import { Head, Link, usePage } from '@inertiajs/react';
import { ButtonLink, buttonClasses } from '@/components/button';
import { ContactBand } from '@/components/contact-band';
import { Container } from '@/components/container';
import { HeroStatus } from '@/components/hero-status';
import { ArrowIcon } from '@/components/icons';
import { KineticName } from '@/components/kinetic-name';
import { ProjectSpotlight } from '@/components/project-spotlight';
import { SectionHeader } from '@/components/section-header';
import { WorkCard } from '@/components/work-card';
import { EXPERIENCE } from '@/content/experience';
import type {
    LatestPush,
    ProjectSummary,
    SpotlightProject,
} from '@/types/portfolio';

type HomeProps = {
    featured: ProjectSummary[];
    spotlight: SpotlightProject | null;
    projectCount: number;
    latestPush?: LatestPush | null;
};

export default function Home({
    featured,
    spotlight,
    projectCount,
    latestPush,
}: HomeProps) {
    const { site } = usePage().props;

    return (
        <>
            <Head />

            <section aria-labelledby="intro">
                <Container className="pt-8 pb-20 sm:pt-12 sm:pb-28">
                    <div className="name-fit relative">
                        <KineticName id="intro" name={site.name} />
                        <HeroStatus
                            latestPush={latestPush}
                            className="hero-status mt-8 md:absolute md:top-0 md:right-0 md:mt-0 md:flex md:h-[calc(100cqi/4.62*0.84)] md:flex-col md:justify-end md:pb-[0.4cqi]"
                        />
                    </div>

                    <div className="hero-rule mt-9 sm:mt-11" aria-hidden />

                    <div className="hero-follow mt-7 grid gap-8 sm:mt-9 lg:grid-cols-12 lg:items-end">
                        <p className="type-lead max-w-[42ch] lg:col-span-8">
                            Software engineer in London. I design and build
                            complete products, from the database to the
                            interface: restaurant platforms, online shops, AI
                            phone lines and tools for coding with AI agents.
                        </p>
                        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                            <a href="#work" className={buttonClasses()}>
                                See the work
                            </a>
                            <ButtonLink href="/contact" variant="secondary">
                                Get in touch
                            </ButtonLink>
                        </div>
                    </div>
                </Container>
            </section>

            <section id="work" aria-labelledby="selected-work">
                <Container>
                    <SectionHeader
                        id="selected-work"
                        title="Selected work"
                        aside={
                            <Link
                                href="/work"
                                className="group inline-flex items-center gap-2 font-[550]"
                            >
                                <span className="link">
                                    All {projectCount} projects
                                </span>
                                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </Link>
                        }
                    />

                    {spotlight && (
                        <div className="mt-8 sm:mt-10">
                            <ProjectSpotlight project={spotlight} />
                        </div>
                    )}

                    <div className="mt-6 grid gap-x-6 gap-y-14 sm:mt-8 md:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
                        {featured.map((project) => (
                            <WorkCard key={project.slug} project={project} />
                        ))}
                    </div>
                </Container>
            </section>

            <section aria-labelledby="about-intro" className="pt-28 sm:pt-40">
                <Container>
                    <SectionHeader
                        id="about-intro"
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

                    <div className="mt-10 grid gap-12 sm:mt-12 lg:grid-cols-12 lg:gap-8">
                        <p className="type-lead lg:col-span-6">
                            I started out writing games on Roblox, moved into
                            Python, and now build production software for
                            clients and for my own products.{' '}
                            <span className="text-muted">
                                I like owning the whole thing: the data model,
                                the server, the interface and how it feels to
                                use.
                            </span>
                        </p>

                        <ol
                            aria-label="Experience"
                            className="border-t border-rule lg:col-span-5 lg:col-start-8"
                        >
                            {EXPERIENCE.map((item, index) => (
                                <li
                                    key={item.title}
                                    className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-rule py-3.5"
                                >
                                    <span className="type-meta">
                                        {item.years}
                                    </span>
                                    <span
                                        className={
                                            index === 0
                                                ? 'font-[560]'
                                                : 'text-muted'
                                        }
                                    >
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </section>

            <section
                aria-labelledby="contact-cta"
                className="pt-28 pb-24 sm:pt-40 sm:pb-32"
            >
                <Container>
                    <ContactBand />
                </Container>
            </section>
        </>
    );
}
