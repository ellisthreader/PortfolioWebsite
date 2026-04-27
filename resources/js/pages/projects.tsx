import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

import { PROJECT_ITEMS } from '@/features/welcome/data/project-items';
import { UpliftaPhoneStack } from '@/features/welcome/components/uplifta-phone-stack';
import type { ProjectItem } from '@/features/welcome/types';

const PROJECT_MEDIA_HOVER_CLASS =
    'cursor-pointer transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-3 hover:rotate-[1deg] hover:drop-shadow-[0_30px_46px_rgba(0,0,0,0.6)]';

export default function Projects() {
    const projects = PROJECT_ITEMS.filter((project) => !project.isCta);

    return (
        <>
            <Head title="Projects" />

            <div className="portfolio-flow-root min-h-screen overflow-hidden">
                <div className="portfolio-flow-background" aria-hidden />

                <main className="relative mx-auto flex w-full max-w-[96rem] flex-col px-6 pt-10 pb-20 sm:px-10 lg:px-14 lg:pt-14 lg:pb-28 xl:px-16">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-4xl">
                            <p className="text-sm tracking-[0.34em] text-fuchsia-100/62 uppercase">
                                Selected Work
                            </p>
                            <h1 className="mt-5 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,232,255,0.96)_34%,rgba(216,180,254,0.84)_70%,rgba(217,70,239,0.66)_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.08em] text-transparent sm:text-6xl lg:text-[5.25rem]">
                                All My Projects
                            </h1>
                            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
                                A collection of platforms, AI systems,
                                interfaces, and business tools designed to be
                                visually polished, commercially useful, and
                                built around real outcomes.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex w-fit items-center justify-center border border-white/16 bg-white/8 px-6 py-3 text-sm font-medium tracking-[0.24em] text-white uppercase transition duration-300 hover:bg-white hover:text-[#140a1f]"
                        >
                            Back home
                        </Link>
                    </div>

                    <div className="mt-14 overflow-x-clip py-8">
                        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <motion.article
                                    key={project.index}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.025,
                                        rotateX: -3,
                                        rotateY:
                                            project.index === '02' ||
                                            project.index === '05'
                                                ? -2
                                                : 2,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 220,
                                        damping: 18,
                                        mass: 0.9,
                                    }}
                                    className="group relative isolate overflow-visible"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="pointer-events-none absolute inset-[-26px] -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.22)_0%,rgba(217,70,239,0.17)_30%,transparent_72%)] opacity-0 blur-[42px] transition duration-500 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-[-14px] -z-10 rounded-[2.35rem] bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.14)_0%,rgba(236,72,153,0.1)_38%,transparent_76%)] opacity-0 blur-[16px] transition duration-500 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(240,171,252,0.72),0_0_18px_rgba(217,70,239,0.56),0_0_42px_rgba(236,72,153,0.32)]" />

                                    <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-fuchsia-300/10 bg-[linear-gradient(180deg,rgba(5,2,8,0.985)_0%,rgba(2,1,4,0.975)_54%,rgba(0,0,0,0.985)_100%)] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.48)] sm:p-6">
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.12),transparent_36%)] opacity-[0.42] transition duration-500 group-hover:opacity-70" />
                                        <ProjectCardMedia project={project} />

                                        <div className="relative mt-5 flex flex-1 flex-col">
                                            <p className="text-xs tracking-[0.34em] text-fuchsia-200/70 uppercase">
                                                {project.index}
                                            </p>
                                            <h2 className="mt-3 max-w-[14ch] text-[1.65rem] font-semibold tracking-[-0.06em] text-white sm:text-[1.8rem]">
                                                {project.title}
                                            </h2>
                                            <p className="mt-2 text-xs tracking-[0.28em] text-pink-200/58 uppercase sm:text-sm">
                                                {project.category}
                                            </p>
                                            <p className="mt-4 text-sm leading-6 text-white/64 sm:text-[0.98rem]">
                                                {project.description}
                                            </p>
                                            <p className="mt-4 text-sm text-violet-200/78 italic">
                                                {project.stack}
                                            </p>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}

function ProjectCardMedia({ project }: { project: ProjectItem }) {
    const movesFrameOnHover = project.index === '01';

    if (project.index === '02') {
        return (
            <div className="relative h-44 overflow-hidden rounded-[1.5rem] sm:h-48">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`absolute inset-y-0 left-0 h-full w-[68%] object-contain object-left group-hover:scale-[1.03] hover:scale-[1.08] ${PROJECT_MEDIA_HOVER_CLASS}`}
                />
                <img
                    src="/Till.png"
                    alt="EPOS till system"
                    className={`absolute right-[-2%] bottom-0 h-[84%] w-[50%] object-contain object-right-bottom group-hover:translate-x-[-4px] group-hover:scale-[1.04] hover:translate-x-[-8px] hover:scale-[1.1] ${PROJECT_MEDIA_HOVER_CLASS}`}
                />
            </div>
        );
    }

    if (project.index === '04') {
        return (
            <div className="relative h-44 overflow-visible rounded-[1.5rem] sm:h-48">
                <UpliftaPhoneStack variant="archive" />
            </div>
        );
    }

    if (project.imageUrl) {
        return (
            <div
                className={`relative flex items-center justify-center overflow-hidden rounded-[1.5rem] ${
                    project.index === '03' || project.index === '06'
                        ? 'h-48'
                        : 'h-44'
                } ${movesFrameOnHover ? PROJECT_MEDIA_HOVER_CLASS : ''}`}
            >
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`h-full w-full ${
                        movesFrameOnHover
                            ? 'object-cover'
                            : project.transparentImage
                              ? project.index === '03'
                                  ? 'object-contain p-0 group-hover:scale-[1.03] hover:scale-[1.08]'
                                  : project.index === '06'
                                    ? 'object-contain p-12 group-hover:scale-[1.02] hover:scale-[1.07]'
                                    : project.index === '07'
                                      ? 'object-contain p-0 group-hover:scale-[1.04] hover:scale-[1.09]'
                                      : 'object-contain p-6 group-hover:scale-[1.03] hover:scale-[1.08]'
                              : 'object-cover group-hover:scale-[1.05] hover:scale-[1.1]'
                    } ${movesFrameOnHover ? '' : PROJECT_MEDIA_HOVER_CLASS}`}
                />
            </div>
        );
    }

    return (
        <div className="relative h-44 overflow-hidden rounded-[1.5rem] border border-fuchsia-300/10 bg-[linear-gradient(145deg,rgba(217,70,239,0.08)_0%,rgba(255,255,255,0.018)_18%,rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(5,2,8,0.96)_0%,rgba(0,0,0,0.98)_100%)]">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.28),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_56%)]" />
        </div>
    );
}
