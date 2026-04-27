import { Link } from '@inertiajs/react';

import type { ProjectItem } from '../types';
import { AmbientSectionGlow } from './ambient-section-glow';
import { UpliftaPhoneStack } from './uplifta-phone-stack';

export function ProjectCard({ project }: { project: ProjectItem }) {
    const isVisualTop = Number.parseInt(project.index, 10) % 2 === 0;

    if (project.isCta) {
        return (
            <article className="group relative h-[32rem] w-[78vw] shrink-0 overflow-hidden border border-fuchsia-300/10 bg-black p-6 shadow-[0_22px_70px_rgba(0,0,0,0.48)] sm:h-[36rem] sm:w-[52vw] sm:p-7 lg:h-[42rem] lg:w-[33.3333vw] lg:p-8 xl:h-[45rem]">
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
        <article className="group relative h-[32rem] w-[78vw] shrink-0 overflow-hidden border border-fuchsia-300/10 bg-black p-6 shadow-[0_22px_70px_rgba(0,0,0,0.48)] sm:h-[36rem] sm:w-[52vw] sm:p-7 lg:h-[42rem] lg:w-[33.3333vw] lg:p-8 xl:h-[45rem]">
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
}

function ProjectVisual({ project }: { project: ProjectItem }) {
    if (project.imageUrl) {
        const isTransparentVisual = project.transparentImage;
        const isAiAssistant = project.index === '03';
        const movesFrameOnHover = project.index === '01';
        const imagePositionClass = 'object-center';
        const imageFitClass =
            isTransparentVisual || isAiAssistant
                ? 'object-contain'
                : 'object-cover';
        const imageScaleClass = movesFrameOnHover
            ? ''
            : project.index === '05'
              ? 'scale-[1.16] hover:scale-[1.23]'
              : 'hover:scale-[1.075]';
        const imageHoverClass = movesFrameOnHover
            ? ''
            : 'pointer-events-auto cursor-pointer transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-4 hover:rotate-[1.5deg] hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)]';
        const frameHoverClass = movesFrameOnHover
            ? 'cursor-pointer transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-4 hover:rotate-[1.5deg] hover:scale-[1.075] hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)]'
            : '';
        const imageSizingClass =
            project.index === '04'
                ? 'h-full w-full max-h-full max-w-full'
                : isAiAssistant
                  ? 'h-full w-full max-h-full max-w-full'
                  : project.index === '06'
                    ? 'h-full w-full max-h-full max-w-full'
                    : 'h-full w-full';
        const wrapperClass =
            isTransparentVisual || isAiAssistant
                ? 'bg-transparent'
                : 'bg-black';
        const overlayClass =
            isTransparentVisual || isAiAssistant ? 'bg-transparent' : '';
        const frameClass =
            isTransparentVisual || isAiAssistant
                ? 'border-transparent'
                : 'border-fuchsia-300/10';
        const showTillOverlay = project.index === '02';
        const showUpliftaPair = project.index === '04';
        const showChessAi = project.index === '06';
        const visualHeightClass = isAiAssistant
            ? 'h-[16rem] sm:h-[17rem] lg:h-[20rem] xl:h-[21rem]'
            : showUpliftaPair
              ? 'h-[20rem] sm:h-[22rem] lg:h-[26rem] xl:h-[28rem]'
              : showChessAi
                ? 'h-[13rem] sm:h-[14.5rem] lg:h-[17rem] xl:h-[18rem]'
                : showTillOverlay
                  ? 'h-[14rem] sm:h-[15rem] lg:h-[17rem] xl:h-[18rem]'
                  : 'h-[12rem] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]';
        const visualOverflowClass =
            showTillOverlay || isAiAssistant || showUpliftaPair || showChessAi
                ? 'overflow-visible'
                : 'overflow-hidden';
        const visualMarginClass = showUpliftaPair
            ? 'mt-2 -mb-[3.75rem] sm:-mb-[4.5rem] lg:-mb-[6.25rem] xl:-mb-[7rem]'
            : showChessAi
              ? 'mt-6 -mb-[0.75rem] sm:-mb-[1rem] lg:-mb-[1.5rem] xl:-mb-[2rem]'
              : 'mt-8';
        const visualAlignmentClass = showUpliftaPair
            ? 'items-start justify-end border-transparent'
            : showChessAi
              ? 'items-center justify-center border-transparent'
              : 'items-center justify-center';
        const glowSizeClass = showUpliftaPair
            ? 'left-1/2 top-[56%] h-[80%] w-[82%] -translate-x-1/2 -translate-y-1/2'
            : showChessAi
              ? 'left-1/2 top-[54%] h-[92%] w-[84%] -translate-x-1/2 -translate-y-1/2'
              : isAiAssistant
                ? 'left-1/2 top-[54%] h-[88%] w-[80%] -translate-x-1/2 -translate-y-1/2'
                : 'left-1/2 top-[52%] h-[84%] w-[78%] -translate-x-1/2 -translate-y-1/2';

        return (
            <div
                className={`relative flex border ${frameClass} ${wrapperClass} ${visualHeightClass} ${visualOverflowClass} ${visualMarginClass} ${visualAlignmentClass} ${frameHoverClass}`}
            >
                <AmbientSectionGlow className={glowSizeClass} />
                {showUpliftaPair ? (
                    <UpliftaPhoneStack />
                ) : (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`${imageSizingClass} ${imageFitClass} ${imagePositionClass} ${imageScaleClass} ${imageHoverClass} ${isAiAssistant ? 'drop-shadow-none' : ''} ${showChessAi ? 'w-[96%] max-w-none sm:w-[102%] lg:w-[108%] xl:w-[112%]' : ''}`}
                    />
                )}
                {showTillOverlay ? (
                    <img
                        src="/Till.png"
                        alt="Till system"
                        className="pointer-events-auto absolute right-0 bottom-0 z-10 w-[68%] translate-x-[12%] translate-y-[14%] cursor-pointer object-contain transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:translate-x-[8%] hover:translate-y-[8%] hover:scale-[1.08] hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)] sm:w-[64%] sm:translate-x-[14%] sm:translate-y-[16%] sm:hover:translate-x-[10%] sm:hover:translate-y-[10%] lg:w-[60%] lg:translate-x-[18%] lg:translate-y-[18%] lg:hover:translate-x-[14%] lg:hover:translate-y-[12%] xl:w-[56%] xl:translate-x-[20%] xl:translate-y-[20%] xl:hover:translate-x-[16%] xl:hover:translate-y-[14%]"
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
