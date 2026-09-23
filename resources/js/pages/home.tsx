import { Head, Link, usePage } from '@inertiajs/react';
import { AboutTeaser } from '@/components/about-teaser';
import { ButtonLink, buttonClasses } from '@/components/button';
import { Capabilities } from '@/components/capabilities';
import type { CapabilityArt } from '@/components/capabilities';
import { ContactBand } from '@/components/contact-band';
import { Container } from '@/components/container';
import { HeroStatus } from '@/components/hero-status';
import { ArrowIcon } from '@/components/icons';
import { KineticName } from '@/components/kinetic-name';
import { ProjectSpotlight } from '@/components/project-spotlight';
import { SectionHeader } from '@/components/section-header';
import { SocialIcons } from '@/components/social-links';
import { WorkCard } from '@/components/work-card';
import type {
    LatestPush,
    ProjectIndexItem,
    ProjectSummary,
    SpotlightProject,
} from '@/types/portfolio';

type HomeProps = {
    featured: ProjectSummary[];
    spotlight: SpotlightProject | null;
    others: ProjectIndexItem[];
    projectCount: number;
    capabilityArt: CapabilityArt;
    latestPush?: LatestPush | null;
};

export default function Home({
    featured,
    spotlight,
    others,
    projectCount,
    capabilityArt,
    latestPush,
}: HomeProps) {
    const { site } = usePage().props;
    const clientCount = [
        ...(spotlight ? [spotlight] : []),
        ...featured,
        ...others,
    ].filter((project) => project.type === 'client').length;

    return (
        <>
            <Head />

            <section aria-labelledby="intro">
                <Container className="pt-10 pb-20 sm:pt-16 sm:pb-28 lg:pt-20">
                    <div className="name-fit relative">
                        <KineticName id="intro" name={site.name} />
                        <HeroStatus
                            latestPush={latestPush}
                            className="hero-status mt-8 md:absolute md:top-0 md:right-0 md:mt-0 md:flex md:h-[calc(100cqi/4.62*0.84)] md:flex-col md:justify-end md:pb-[0.4cqi]"
                        />
                    </div>

                    <div className="hero-rule mt-10 sm:mt-12" aria-hidden />

                    <div className="hero-follow mt-8 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end">
                        <p className="type-lead max-w-[38ch] lg:col-span-7">
                            Software engineer in London. I design and build web
                            platforms, AI voice systems and mobile apps, from
                            the database to the interface.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
                            <a
                                href="#selected-work"
                                className={buttonClasses()}
                            >
                                View work
                            </a>
                            <ButtonLink href="/contact" variant="secondary">
                                Get in touch
                            </ButtonLink>
                            <span
                                aria-hidden
                                className="mx-1 hidden h-6 w-px bg-rule-strong sm:block"
                            />
                            <SocialIcons />
                        </div>
                    </div>
                </Container>
            </section>

            <section aria-labelledby="selected-work">
                <Container>
                    <SectionHeader
                        id="selected-work"
                        title="Selected work"
                        aside={
                            <>
                                <span className="type-meta">
                                    {projectCount} projects, {clientCount} for
                                    clients
                                </span>
                                <Link href="/work" className="link font-[550]">
                                    See all work
                                </Link>
                            </>
                        }
                    />

                    {spotlight && (
                        <div className="mt-10 sm:mt-12">
                            <ProjectSpotlight project={spotlight} />
                        </div>
                    )}

                    <div className="mt-14 grid gap-x-8 gap-y-14 sm:mt-16 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
                        {featured.map((project) => (
                            <WorkCard key={project.slug} project={project} />
                        ))}
                    </div>

                    {others.length > 0 && (
                        <div className="mt-16 grid gap-6 border-t border-ink pt-5 sm:mt-20 lg:grid-cols-12">
                            <div className="lg:col-span-3">
                                <h3 className="type-subheading">Also built</h3>
                                <Link
                                    href="/work"
                                    className="link type-meta mt-1 inline-block hover:text-ink"
                                >
                                    Browse and filter all {projectCount}
                                </Link>
                            </div>
                            <ul className="-mt-4 divide-y divide-rule lg:col-span-9 lg:-mt-3.5">
                                {others.map((project) => (
                                    <li key={project.slug}>
                                        <Link
                                            href={`/work/${project.slug}`}
                                            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 py-4 sm:grid-cols-[minmax(0,1fr)_12rem_4rem_auto] lg:py-3.5"
                                        >
                                            <span className="truncate text-[1.25rem] font-[600] tracking-[-0.015em] [font-stretch:106%] transition-colors group-hover:text-accent">
                                                {project.title}
                                            </span>
                                            <span className="type-meta hidden sm:block">
                                                {project.category}
                                            </span>
                                            <span className="type-meta hidden text-right sm:block">
                                                {project.year}
                                            </span>
                                            <ArrowIcon className="text-muted transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-ink" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </Container>
            </section>

            <Capabilities art={capabilityArt} />

            <AboutTeaser />

            <section
                aria-labelledby="contact-cta"
                className="pt-28 pb-28 sm:pt-40 sm:pb-40"
            >
                <Container>
                    <ContactBand />
                </Container>
            </section>
        </>
    );
}
