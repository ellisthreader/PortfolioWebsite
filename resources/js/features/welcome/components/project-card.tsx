import { Link } from '@inertiajs/react';
import { memo, type CSSProperties } from 'react';

import { publicAsset } from '@/lib/preview-assets';
import type { ProjectItem } from '../types';
import { AmbientSectionGlow } from './ambient-section-glow';
import { UpliftaPhoneStack } from './uplifta-phone-stack';
import { VibyraDeviceStack } from './vibyra-device-stack';

type ProjectNeonStyle = CSSProperties & {
    '--project-neon-primary': string;
    '--project-neon-secondary': string;
    '--project-neon-tertiary': string;
    '--project-neon-reflection': string;
    '--project-neon-haze': string;
};

const PROJECT_NEON_STYLES: Record<string, ProjectNeonStyle> = {
    'Bear Lane Ecommerce': {
        '--project-neon-primary': 'rgba(244,114,182,0.54)',
        '--project-neon-secondary': 'rgba(251,113,133,0.34)',
        '--project-neon-tertiary': 'rgba(217,70,239,0.22)',
        '--project-neon-reflection': 'rgba(244,114,182,0.24)',
        '--project-neon-haze': 'rgba(244,114,182,0.13)',
    },
    'EPOS Software': {
        '--project-neon-primary': 'rgba(168,85,247,0.52)',
        '--project-neon-secondary': 'rgba(217,70,239,0.34)',
        '--project-neon-tertiary': 'rgba(244,114,182,0.22)',
        '--project-neon-reflection': 'rgba(168,85,247,0.22)',
        '--project-neon-haze': 'rgba(168,85,247,0.12)',
    },
    'AI Voice Assistant': {
        '--project-neon-primary': 'rgba(168,85,247,0.46)',
        '--project-neon-secondary': 'rgba(217,70,239,0.3)',
        '--project-neon-tertiary': 'rgba(244,114,182,0.2)',
        '--project-neon-reflection': 'rgba(168,85,247,0.2)',
        '--project-neon-haze': 'rgba(217,70,239,0.11)',
    },
    'Uplifta App': {
        '--project-neon-primary': 'rgba(251,113,133,0.56)',
        '--project-neon-secondary': 'rgba(251,191,36,0.24)',
        '--project-neon-tertiary': 'rgba(244,114,182,0.34)',
        '--project-neon-reflection': 'rgba(251,113,133,0.24)',
        '--project-neon-haze': 'rgba(251,113,133,0.13)',
    },
    'Vibyra App': {
        '--project-neon-primary': 'rgba(139,92,246,0.6)',
        '--project-neon-secondary': 'rgba(217,70,239,0.4)',
        '--project-neon-tertiary': 'rgba(217,70,239,0.36)',
        '--project-neon-reflection': 'rgba(139,92,246,0.26)',
        '--project-neon-haze': 'rgba(139,92,246,0.13)',
    },
    'Chatora AI': {
        '--project-neon-primary': 'rgba(168,85,247,0.56)',
        '--project-neon-secondary': 'rgba(251,146,60,0.3)',
        '--project-neon-tertiary': 'rgba(236,72,153,0.34)',
        '--project-neon-reflection': 'rgba(168,85,247,0.24)',
        '--project-neon-haze': 'rgba(236,72,153,0.12)',
    },
    'Accountant AI Software': {
        '--project-neon-primary': 'rgba(168,85,247,0.46)',
        '--project-neon-secondary': 'rgba(217,70,239,0.28)',
        '--project-neon-tertiary': 'rgba(244,114,182,0.2)',
        '--project-neon-reflection': 'rgba(168,85,247,0.2)',
        '--project-neon-haze': 'rgba(168,85,247,0.11)',
    },
    'Service Priority AI': {
        '--project-neon-primary': 'rgba(34,211,238,0.42)',
        '--project-neon-secondary': 'rgba(56,189,248,0.3)',
        '--project-neon-tertiary': 'rgba(168,85,247,0.22)',
        '--project-neon-reflection': 'rgba(34,211,238,0.18)',
        '--project-neon-haze': 'rgba(14,165,233,0.1)',
    },
    'See more of my work!': {
        '--project-neon-primary': 'rgba(244,114,182,0.48)',
        '--project-neon-secondary': 'rgba(139,92,246,0.32)',
        '--project-neon-tertiary': 'rgba(217,70,239,0.3)',
        '--project-neon-reflection': 'rgba(244,114,182,0.2)',
        '--project-neon-haze': 'rgba(244,114,182,0.12)',
    },
};

const DEFAULT_PROJECT_NEON_STYLE: ProjectNeonStyle = {
    '--project-neon-primary': 'rgba(217,70,239,0.48)',
    '--project-neon-secondary': 'rgba(168,85,247,0.3)',
    '--project-neon-tertiary': 'rgba(244,114,182,0.26)',
    '--project-neon-reflection': 'rgba(217,70,239,0.2)',
    '--project-neon-haze': 'rgba(217,70,239,0.11)',
};

function getProjectNeonStyle(project: ProjectItem): ProjectNeonStyle {
    return PROJECT_NEON_STYLES[project.title] ?? DEFAULT_PROJECT_NEON_STYLE;
}

export const ProjectCard = memo(function ProjectCard({
    project,
}: {
    project: ProjectItem;
}) {
    const isVisualTop = Number.parseInt(project.index, 10) % 2 === 0;
    const neonStyle = getProjectNeonStyle(project);

    if (project.isCta) {
        return (
            <article
                style={neonStyle}
                className="group relative h-[min(32rem,calc(100vh-14rem))] w-[78vw] shrink-0 overflow-hidden border border-fuchsia-300/10 bg-black p-6 shadow-[0_22px_70px_rgba(0,0,0,0.48)] [contain:layout_paint] sm:h-[min(36rem,calc(100vh-15rem))] sm:w-[52vw] sm:p-7 lg:h-[min(42rem,calc(100vh-16rem))] lg:w-[33.3333vw] lg:p-8 xl:h-[min(45rem,calc(100vh-16rem))]"
            >
                <CardNeonAura />
                <div className="relative flex h-full flex-col justify-between">
                    <div>
                        <span className="text-sm font-medium tracking-[0.24em] text-fuchsia-100/78">
                            {project.index}
                        </span>

                        <div className="mt-10">
                            <h3 className="max-w-[11ch] text-[2rem] font-semibold tracking-[-0.07em] text-white sm:text-[2.3rem] lg:text-[2.7rem] xl:text-[3rem]">
                                {project.title}
                            </h3>
                            <p className="mt-5 max-w-[24rem] text-sm leading-7 text-white/68 sm:text-base lg:text-[1.02rem]">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-6">
                        <div className="h-px w-full bg-gradient-to-r from-white/70 via-white/18 to-transparent" />
                        <Link
                            href={project.href ?? '/projects'}
                            className="inline-flex items-center justify-center border border-white/18 bg-white/10 px-6 py-3 text-sm font-medium tracking-[0.24em] text-white uppercase transition duration-300 hover:bg-white hover:text-[#140a1f]"
                        >
                            {project.buttonLabel ?? 'View more'}
                        </Link>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article
            style={neonStyle}
            className="group relative h-[min(32rem,calc(100vh-14rem))] w-[78vw] shrink-0 overflow-hidden border border-fuchsia-300/10 bg-black p-6 shadow-[0_22px_70px_rgba(0,0,0,0.48)] [contain:layout_paint] sm:h-[min(36rem,calc(100vh-15rem))] sm:w-[52vw] sm:p-7 lg:h-[min(42rem,calc(100vh-16rem))] lg:w-[33.3333vw] lg:p-8 xl:h-[min(45rem,calc(100vh-16rem))]"
        >
            <CardNeonAura />
            <div className="relative flex h-full flex-col">
                {isVisualTop ? <ProjectVisual project={project} /> : null}

                <div
                    className={`flex flex-1 flex-col ${isVisualTop ? 'pt-8' : ''}`}
                >
                    <span className="text-sm font-medium tracking-[0.24em] text-fuchsia-100/78">
                        {project.index}
                    </span>

                    <div className="mt-6 flex-1">
                        <h3 className="max-w-[12ch] text-[1.75rem] font-semibold tracking-[-0.06em] text-white sm:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]">
                            {project.title}
                        </h3>
                        <p className="mt-4 max-w-[24rem] text-sm leading-7 text-white/62 sm:text-base lg:text-[1.02rem]">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <div className="h-px w-24 bg-gradient-to-r from-fuchsia-300/90 via-fuchsia-200/55 to-transparent lg:w-32" />
                        <span className="text-xs tracking-[0.34em] text-white/45 uppercase">
                            Explore
                        </span>
                    </div>
                </div>

                {!isVisualTop ? <ProjectVisual project={project} /> : null}
            </div>
        </article>
    );
});

function CardNeonAura() {
    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[82%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-haze)_0%,transparent_74%)] opacity-[0.9]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[48%] left-1/2 h-[54%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-reflection)_0%,transparent_76%)] opacity-[0.48]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-16%] left-1/2 h-[34%] w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-reflection)_0%,transparent_74%)] opacity-[0.46]"
            />
        </>
    );
}

function ProjectVisual({ project }: { project: ProjectItem }) {
    if (project.imageUrl) {
        const isEpos = project.title === 'EPOS Software';
        const isAiAssistant = project.title === 'AI Voice Assistant';
        const isUplifta = project.title === 'Uplifta App';
        const isVibyra = project.title === 'Vibyra App';
        const isChatoraAi = project.title === 'Chatora AI';
        const isAccountantAi = project.title === 'Accountant AI Software';
        const isServicePriorityAi = project.title === 'Service Priority AI';
        const isTransparentVisual = project.transparentImage;
        const imagePositionClass = 'object-center';
        const imageFitClass =
            isTransparentVisual || isAiAssistant || isServicePriorityAi
                ? 'object-contain'
                : 'object-cover';
        // Single-screenshot cards stay static. Only true multi-image scenes
        // (Uplifta/Vibyra stacks, EPOS's sliding Till) keep hover motion — base
        // scales below are for sizing, not animation.
        const imageScaleClass = isVibyra
            ? 'scale-[1.06]'
            : isChatoraAi
              ? 'scale-[1.24]'
              : '';
        const imageHoverClass = '';
        const frameHoverClass = '';
        const imageSizingClass = isUplifta
            ? 'h-full w-full max-h-full max-w-full'
            : isAiAssistant
              ? 'h-full w-full max-h-full max-w-full'
              : isAccountantAi
                ? 'h-[70%] w-[70%] max-h-[70%] max-w-[70%] sm:h-[74%] sm:w-[74%] sm:max-h-[74%] sm:max-w-[74%] lg:h-[76%] lg:w-[76%] lg:max-h-[76%] lg:max-w-[76%]'
                : isVibyra
                  ? 'h-full w-full max-h-full max-w-full'
                  : 'h-full w-full';
        const wrapperClass = isTransparentVisual
            ? 'bg-transparent'
            : isAiAssistant
              ? 'bg-[#ece7ff]'
              : isServicePriorityAi
                ? 'bg-[#f7fbfa]'
                : 'bg-black';
        const overlayClass =
            isTransparentVisual || isAiAssistant ? 'bg-transparent' : '';
        const frameClass = isTransparentVisual
            ? 'border-transparent'
            : isAiAssistant
              ? 'border-fuchsia-100/20'
              : isServicePriorityAi
                ? 'border-cyan-200/20'
                : 'border-fuchsia-300/10';
        const visualHeightClass = isAiAssistant
            ? 'h-[16rem] sm:h-[17rem] lg:h-[20rem] xl:h-[21rem]'
            : isUplifta
              ? 'h-[20rem] sm:h-[22rem] lg:h-[26rem] xl:h-[28rem]'
              : isVibyra
                ? 'h-[16rem] sm:h-[17.5rem] lg:h-[21rem] xl:h-[22rem]'
                : isAccountantAi
                  ? 'h-[16rem] sm:h-[17.5rem] lg:h-[21rem] xl:h-[22rem]'
                  : isChatoraAi
                    ? 'h-[14rem] sm:h-[15.5rem] lg:h-[18rem] xl:h-[19rem]'
                    : isServicePriorityAi
                      ? 'h-[14rem] sm:h-[15.5rem] lg:h-[18rem] xl:h-[19rem]'
                      : isEpos
                        ? 'h-[14rem] sm:h-[15rem] lg:h-[17rem] xl:h-[18rem]'
                        : 'h-[12rem] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]';
        const visualOverflowClass =
            isEpos ||
            isAiAssistant ||
            isUplifta ||
            isVibyra ||
            isChatoraAi ||
            isAccountantAi ||
            isServicePriorityAi
                ? 'overflow-visible'
                : 'overflow-hidden';
        const visualMarginClass = isUplifta
            ? 'mt-2 -mb-[3.75rem] sm:-mb-[4.5rem] lg:-mb-[6.25rem] xl:-mb-[7rem]'
            : isVibyra
              ? 'mt-4 -mb-[1.25rem] sm:-mb-[1.75rem] lg:-mb-[2.75rem] xl:-mb-[3.25rem]'
              : isAccountantAi
                ? 'mt-4 mb-0'
                : isServicePriorityAi
                  ? 'mt-5 mb-0'
                  : isChatoraAi
                    ? 'mt-4 -mb-[0.25rem] sm:-mb-[0.5rem] lg:-mb-[0.75rem] xl:-mb-[1rem]'
                    : 'mt-8';
        const visualAlignmentClass = isUplifta
            ? 'items-start justify-end border-transparent'
            : isVibyra || isAccountantAi || isChatoraAi
              ? 'items-center justify-center border-transparent'
              : 'items-center justify-center';
        const glowSizeClass = isUplifta
            ? 'left-1/2 top-[56%] h-[80%] w-[82%] -translate-x-1/2 -translate-y-1/2'
            : isAccountantAi
              ? 'left-1/2 top-[52%] h-[76%] w-[78%] -translate-x-1/2 -translate-y-1/2'
              : isChatoraAi
                ? 'left-1/2 top-[46%] h-[76%] w-[84%] -translate-x-1/2 -translate-y-1/2'
                : isServicePriorityAi
                  ? 'left-1/2 top-[52%] h-[72%] w-[84%] -translate-x-1/2 -translate-y-1/2'
                  : isVibyra
                    ? 'left-1/2 top-[54%] h-[92%] w-[88%] -translate-x-1/2 -translate-y-1/2'
                    : isAiAssistant
                      ? 'left-1/2 top-[55%] h-[74%] w-[76%] -translate-x-1/2 -translate-y-1/2'
                      : 'left-1/2 top-[52%] h-[84%] w-[78%] -translate-x-1/2 -translate-y-1/2';
        const primaryAuraClass = isAiAssistant
            ? 'h-[86%] w-[92%] opacity-[0.28]'
            : 'h-[120%] w-[104%] opacity-[0.84]';
        const secondaryAuraClass = isAiAssistant
            ? 'top-[28%] h-[54%] w-[62%] opacity-[0.16]'
            : 'top-[20%] h-[86%] w-[74%] opacity-[0.38]';
        const reflectionAuraClass = isAiAssistant ? 'opacity-0' : 'opacity-100';

        return (
            <div
                className={`relative isolate flex border ${frameClass} ${wrapperClass} ${visualHeightClass} ${visualOverflowClass} ${visualMarginClass} ${visualAlignmentClass} ${frameHoverClass}`}
            >
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-primary)_0%,var(--project-neon-tertiary)_34%,transparent_74%)] ${primaryAuraClass}`}
                />
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-secondary)_0%,transparent_70%)] ${secondaryAuraClass}`}
                />
                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-[-3%] left-1/2 h-[26%] w-[86%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--project-neon-reflection)_0%,rgba(0,0,0,0.12)_48%,transparent_80%)] ${reflectionAuraClass}`}
                />
                <AmbientSectionGlow
                    className={glowSizeClass}
                    variant={
                        isAiAssistant
                            ? 'assistant'
                            : isAccountantAi
                              ? 'accountant'
                              : isChatoraAi
                                ? 'chatora'
                                : 'default'
                    }
                />
                {isUplifta ? (
                    <UpliftaPhoneStack />
                ) : isVibyra ? (
                    <VibyraDeviceStack />
                ) : (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        decoding="async"
                        loading={
                            isAiAssistant || isServicePriorityAi
                                ? 'eager'
                                : 'lazy'
                        }
                        className={`relative z-10 ${imageSizingClass} ${imageFitClass} ${imagePositionClass} ${imageScaleClass} ${imageHoverClass} ${isAiAssistant ? 'drop-shadow-none' : ''} ${isVibyra ? 'w-[104%] max-w-none sm:w-[110%] lg:w-[116%] xl:w-[120%]' : ''}`}
                    />
                )}
                {isEpos ? (
                    <img
                        src={publicAsset('/Till.webp')}
                        alt="Till system"
                        decoding="async"
                        loading="lazy"
                        className="pointer-events-auto absolute right-0 bottom-0 z-10 w-[68%] translate-x-[12%] translate-y-[14%] cursor-pointer object-contain transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-[8%] hover:translate-y-[8%] hover:scale-[1.08] hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)] sm:w-[64%] sm:translate-x-[14%] sm:translate-y-[16%] sm:hover:translate-x-[10%] sm:hover:translate-y-[10%] lg:w-[60%] lg:translate-x-[18%] lg:translate-y-[18%] lg:hover:translate-x-[14%] lg:hover:translate-y-[12%] xl:w-[56%] xl:translate-x-[20%] xl:translate-y-[20%] xl:hover:translate-x-[16%] xl:hover:translate-y-[14%]"
                    />
                ) : null}
                <div
                    className={`pointer-events-none absolute inset-0 ${overlayClass}`}
                />
            </div>
        );
    }

    return (
        <div className="relative mt-8 h-[12rem] overflow-hidden border border-fuchsia-300/10 bg-black sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]">
            <div className="absolute top-6 left-6 h-14 w-14 rounded-full border border-white/12 bg-white/8 backdrop-blur-sm" />
            <div className="absolute top-8 right-6 h-10 w-24 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute bottom-6 left-6 h-16 w-20 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute right-6 bottom-6 h-px w-32 bg-gradient-to-r from-white/60 to-transparent" />
        </div>
    );
}
