import { Head, Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'framer-motion';
import { memo, useMemo } from 'react';

import { UpliftaPhoneStack } from '@/features/welcome/components/uplifta-phone-stack';
import { VibyraDeviceStack } from '@/features/welcome/components/vibyra-device-stack';
import { PROJECT_ITEMS } from '@/features/welcome/data/project-items';
import type { ProjectItem } from '@/features/welcome/types';
import { publicAsset } from '@/lib/preview-assets';

const PROJECT_MEDIA_HOVER_CLASS =
    'cursor-pointer transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-[1deg]';

export default function Projects() {
    const reduceMotion = useReducedMotion();
    const projects = useMemo(
        () => PROJECT_ITEMS.filter((project) => !project.isCta),
        [],
    );

    return (
        <>
            <Head title="Projects" />

            <div className="portfolio-flow-root min-h-screen">
                <div className="portfolio-flow-background" aria-hidden />

                <main className="relative mx-auto flex w-full max-w-[96rem] flex-col px-8 pt-10 pb-20 sm:px-10 lg:px-14 lg:pt-14 lg:pb-28 xl:px-16">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-4xl">
                            <p className="text-sm tracking-[0.34em] text-fuchsia-100/62 uppercase">
                                Selected Work
                            </p>
                            <h1 className="mt-5 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,232,255,0.96)_34%,rgba(216,180,254,0.84)_70%,rgba(217,70,239,0.66)_100%)] bg-clip-text pt-1 pb-2 text-[clamp(2.8rem,12vw,5.25rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-transparent sm:tracking-[-0.045em]">
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
                            className="inline-flex w-fit items-center justify-center border border-white/16 bg-white/8 px-6 py-3 text-sm font-medium tracking-[0.24em] whitespace-nowrap text-white uppercase transition duration-300 hover:bg-white hover:text-[#140a1f]"
                        >
                            Back home
                        </Link>
                    </div>

                    <div className="mt-14 overflow-visible py-10">
                        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {projects.map((project) => (
                                <motion.article
                                    key={project.index}
                                    whileHover={
                                        reduceMotion
                                            ? undefined
                                            : {
                                                  rotateX: -3,
                                                  rotateY:
                                                      project.title ===
                                                          'EPOS Software' ||
                                                      project.title ===
                                                          'Chatora AI'
                                                          ? -2
                                                          : 2,
                                                  scale: 1.025,
                                                  y: -12,
                                              }
                                    }
                                    transition={{
                                        type: 'spring',
                                        stiffness: 220,
                                        damping: 18,
                                        mass: 0.9,
                                    }}
                                    className="group relative isolate overflow-visible [contain:layout_paint] focus-within:z-30 hover:z-30"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="pointer-events-none absolute inset-[-22px] -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2)_0%,rgba(217,70,239,0.13)_32%,rgba(88,28,135,0.05)_52%,transparent_74%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-[-10px] -z-10 rounded-[2.35rem] bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.12)_0%,rgba(236,72,153,0.07)_42%,transparent_78%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(240,171,252,0.72),0_0_18px_rgba(217,70,239,0.56),0_0_42px_rgba(236,72,153,0.32)]" />

                                    <div className="relative flex h-full flex-col rounded-[2rem] border border-fuchsia-300/10 bg-[linear-gradient(180deg,rgba(5,2,8,0.985)_0%,rgba(2,1,4,0.975)_54%,rgba(0,0,0,0.985)_100%)] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.48)] sm:p-6">
                                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.12),transparent_36%)] opacity-[0.42] transition duration-500 group-hover:opacity-70" />
                                        <MemoizedProjectCardMedia
                                            project={project}
                                        />

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
    const movesFrameOnHover = project.title === 'Bear Lane Ecommerce';
    const isAiVoiceAssistant = project.title === 'AI Voice Assistant';
    const isUplifta = project.title === 'Uplifta App';
    const isVibyra = project.title === 'Vibyra App';
    const isChatora = project.title === 'Chatora AI';
    const isAccountant = project.title === 'Accountant AI Software';
    const isAiResume = project.title === 'AI Resume Builder';
    const isDroneScan = project.title === 'Drone Scan Company';
    const isServicePriorityAi = project.title === 'Service Priority AI';
    const isTallMedia =
        isAiVoiceAssistant ||
        isVibyra ||
        isAccountant ||
        isDroneScan ||
        isServicePriorityAi;

    if (project.title === 'EPOS Software') {
        return (
            <div className="relative h-44 overflow-hidden rounded-[1.5rem] sm:h-48">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    decoding="async"
                    loading="lazy"
                    className={`absolute inset-y-0 left-0 h-full w-[68%] object-contain object-left group-hover:scale-[1.03] hover:scale-[1.08] ${PROJECT_MEDIA_HOVER_CLASS}`}
                />
                <img
                    src={publicAsset('/Till.webp')}
                    alt="EPOS till system"
                    decoding="async"
                    loading="lazy"
                    className={`absolute right-[-2%] bottom-0 h-[84%] w-[50%] object-contain object-right-bottom group-hover:translate-x-[-4px] group-hover:scale-[1.04] hover:translate-x-[-8px] hover:scale-[1.1] ${PROJECT_MEDIA_HOVER_CLASS}`}
                />
            </div>
        );
    }

    if (isUplifta) {
        return (
            <div className="relative h-44 overflow-visible rounded-[1.5rem] sm:h-48">
                <UpliftaPhoneStack variant="archive" />
            </div>
        );
    }

    if (isVibyra) {
        return (
            <div className="relative h-44 overflow-visible rounded-[1.5rem] sm:h-48">
                <VibyraDeviceStack variant="archive" />
            </div>
        );
    }

    if (project.imageUrl) {
        const imageClass = isAiVoiceAssistant
            ? 'h-[82%] w-[82%] object-contain p-0 group-hover:scale-[1.01] hover:scale-[1.04] sm:h-[80%] sm:w-[80%]'
            : isVibyra
              ? 'object-contain p-0 group-hover:scale-[1.04] hover:scale-[1.08]'
              : isChatora
                ? 'object-contain p-0 group-hover:scale-[1.07] hover:scale-[1.12]'
                : isAccountant
                  ? 'h-[72%] w-[72%] object-contain p-0 group-hover:scale-[1.01] hover:scale-[1.02] sm:h-[76%] sm:w-[76%]'
                  : isServicePriorityAi
                    ? 'object-contain p-0 group-hover:scale-[1.01] hover:scale-[1.03]'
                    : isDroneScan
                      ? 'object-contain p-0 group-hover:scale-[1.01] hover:scale-[1.04]'
                      : movesFrameOnHover
                        ? 'object-cover'
                        : project.transparentImage
                          ? isAiResume
                              ? 'object-contain p-0 group-hover:scale-[1.04] hover:scale-[1.09]'
                              : 'object-contain p-3 group-hover:scale-[1.03] hover:scale-[1.08]'
                          : 'object-cover group-hover:scale-[1.05] hover:scale-[1.1]';

        return (
            <div
                className={`relative flex items-center justify-center overflow-hidden rounded-[1.5rem] ${
                    isTallMedia ? 'h-48' : 'h-44'
                } ${isAiVoiceAssistant && !project.transparentImage ? 'bg-[#ece7ff]' : ''} ${isServicePriorityAi && !project.transparentImage ? 'bg-[#f7fbfa]' : ''} ${movesFrameOnHover ? PROJECT_MEDIA_HOVER_CLASS : ''}`}
            >
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    decoding="async"
                    loading={
                        isAiVoiceAssistant || isServicePriorityAi
                            ? 'eager'
                            : 'lazy'
                    }
                    className={`h-full w-full ${imageClass} ${movesFrameOnHover ? '' : PROJECT_MEDIA_HOVER_CLASS}`}
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

const MemoizedProjectCardMedia = memo(ProjectCardMedia);
