import { Link } from '@inertiajs/react';

import type { ProjectItem } from '../types';

export function ProjectCard({ project }: { project: ProjectItem }) {
    const isVisualTop = Number.parseInt(project.index, 10) % 2 === 0;

    if (project.isCta) {
        return (
            <article className="group relative h-[32rem] w-[78vw] shrink-0 overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(14,8,20,0.96)_0%,rgba(8,4,14,0.94)_100%)] p-6 sm:h-[36rem] sm:w-[52vw] sm:p-7 lg:h-[42rem] lg:w-[33.3333vw] lg:p-8 xl:h-[45rem]">
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.22] transition-opacity duration-500 group-hover:opacity-[0.34]`}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_82%_80%,rgba(255,255,255,0.08),transparent_32%)]" />

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
                            className="inline-flex items-center justify-center border border-white/18 bg-white/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-white hover:text-[#140a1f]"
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
            className="group relative h-[32rem] w-[78vw] shrink-0 overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(14,8,20,0.96)_0%,rgba(8,4,14,0.94)_100%)] p-6 sm:h-[36rem] sm:w-[52vw] sm:p-7 lg:h-[42rem] lg:w-[33.3333vw] lg:p-8 xl:h-[45rem]"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.18] transition-opacity duration-500 group-hover:opacity-[0.28]`}
            />

            <div className="relative flex h-full flex-col">
                {isVisualTop ? <ProjectVisual project={project} /> : null}

                <div className={`flex flex-1 flex-col ${isVisualTop ? 'pt-8' : ''}`}>
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
                        <span className="text-xs uppercase tracking-[0.34em] text-white/45">
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
        const imagePositionClass = 'object-center';
        const imageFitClass =
            isTransparentVisual || isAiAssistant ? 'object-contain' : 'object-cover';
        const imageScaleClass = project.index === '05' ? 'scale-[1.16]' : '';
        const imageSizingClass =
            project.index === '04'
                ? 'h-full w-full max-h-full max-w-full'
                : isAiAssistant
                  ? 'h-full w-full max-h-full max-w-full'
                : project.index === '06'
                  ? 'h-full w-full max-h-full max-w-full'
                : 'h-full w-full';
        const wrapperClass = isTransparentVisual || isAiAssistant
            ? 'bg-transparent'
            : 'bg-[linear-gradient(180deg,rgba(13,8,20,0.9)_0%,rgba(8,4,14,0.96)_100%)]';
        const overlayClass = isTransparentVisual || isAiAssistant
            ? 'bg-transparent'
            : 'bg-[linear-gradient(180deg,rgba(7,4,12,0.12)_0%,rgba(7,4,12,0)_26%,rgba(7,4,12,0.18)_100%)]';
        const frameClass =
            isTransparentVisual || isAiAssistant ? 'border-transparent' : 'border-white/10';
        const showTillOverlay = project.index === '02';
        const showUpliftaPair = project.index === '04';
        const showChessAi = project.index === '06';
        const visualHeightClass = isAiAssistant
            ? 'h-[16rem] sm:h-[17rem] lg:h-[20rem] xl:h-[21rem]'
            : showUpliftaPair
            ? 'h-[20rem] sm:h-[22rem] lg:h-[26rem] xl:h-[28rem]'
            : showChessAi
            ? 'h-[16rem] sm:h-[18rem] lg:h-[21rem] xl:h-[23rem]'
            : showTillOverlay
            ? 'h-[14rem] sm:h-[15rem] lg:h-[17rem] xl:h-[18rem]'
            : 'h-[12rem] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]';
        const visualOverflowClass =
            showTillOverlay || isAiAssistant || showUpliftaPair || showChessAi
                ? 'overflow-visible'
                : 'overflow-hidden';
        const visualMarginClass = showUpliftaPair
            ? 'mt-2 -mb-[5.75rem] sm:-mb-[6.75rem] lg:-mb-[8.75rem] xl:-mb-[9.75rem]'
            : showChessAi
            ? 'mt-7 -mb-[1.5rem] sm:-mb-[2.25rem] lg:-mb-[3.5rem] xl:-mb-[4rem]'
            : 'mt-8';
        const visualAlignmentClass = showUpliftaPair
            ? 'items-start justify-end border-transparent'
            : showChessAi
            ? 'items-center justify-center border-transparent'
            : 'items-center justify-center';

        return (
            <div
                className={`relative flex border ${frameClass} ${wrapperClass} ${visualHeightClass} ${visualOverflowClass} ${visualMarginClass} ${visualAlignmentClass}`}
            >
                {showUpliftaPair ? (
                    <div className="pointer-events-none absolute inset-0">
                        <img
                            src="/Uplifta2.png"
                            alt="Uplifta app preview"
                            className="absolute left-[16%] top-[-3%] h-auto w-[39%] max-w-none object-contain object-center drop-shadow-[0_24px_42px_rgba(0,0,0,0.42)] sm:left-[15%] sm:top-[-4%] lg:left-[14%] lg:top-[-5%] xl:left-[13%]"
                        />
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="absolute right-[11%] top-[-3%] h-auto w-[35%] max-w-none object-contain object-center drop-shadow-[0_24px_42px_rgba(0,0,0,0.42)] sm:right-[10%] sm:top-[-4%] lg:right-[9%] lg:top-[-5%] xl:right-[8%]"
                        />
                    </div>
                ) : (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`${imageSizingClass} ${imageFitClass} ${imagePositionClass} ${imageScaleClass} ${isAiAssistant ? 'drop-shadow-none' : ''} ${showChessAi ? 'w-[112%] max-w-none sm:w-[118%] lg:w-[124%] xl:w-[128%]' : ''}`}
                    />
                )}
                {showTillOverlay ? (
                    <img
                        src="/Till.png"
                        alt="Till system"
                        className="pointer-events-none absolute bottom-0 right-0 z-10 w-[68%] translate-x-[12%] translate-y-[14%] object-contain sm:w-[64%] sm:translate-x-[14%] sm:translate-y-[16%] lg:w-[60%] lg:translate-x-[18%] lg:translate-y-[18%] xl:w-[56%] xl:translate-x-[20%] xl:translate-y-[20%]"
                    />
                ) : null}
                <div className={`absolute inset-0 ${overlayClass}`} />
            </div>
        );
    }

    return (
        <div className="relative mt-8 h-[12rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(13,8,20,0.9)_0%,rgba(8,4,14,0.96)_100%)] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.28),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_56%)]" />
            <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-white/12 bg-white/8 backdrop-blur-sm" />
            <div className="absolute right-6 top-8 h-10 w-24 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute bottom-6 left-6 h-16 w-20 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute bottom-6 right-6 h-px w-32 bg-gradient-to-r from-white/60 to-transparent" />
        </div>
    );
}
