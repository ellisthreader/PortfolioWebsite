import { ArrowRight, Download } from 'lucide-react';
import type { RefObject } from 'react';
import { useEffect } from 'react';
import { MathUtils } from 'three';

import {
    HeroNav,
    SocialRail,
    STATS,
} from './hero-intro-overlay/hero-intro-support';
import { useIntroOpacity } from './hero-intro-overlay/use-intro-opacity';
import {
    DESK_TURN_END_PROGRESS,
    HeroDeskModel,
    LAPTOP_SCREEN_ZOOM_START_PROGRESS,
} from './hero-scene/hero-desk-model';
import { HERO_DESK_FLIP_TRIGGER_PROGRESS } from './hero-scene/rotation-timing';

const ROTATION_COMPLETE_BACKGROUND = '/Spin.png';
const WHAT_I_DO_REVEAL_START = HERO_DESK_FLIP_TRIGGER_PROGRESS;
const WHAT_I_DO_REVEAL_END = LAPTOP_SCREEN_ZOOM_START_PROGRESS;
const WHAT_I_DO_EXIT_END = LAPTOP_SCREEN_ZOOM_START_PROGRESS + 0.045;

function WhatIDoPanel({ revealProgress }: { revealProgress: number }) {
    const panelOpacity = MathUtils.lerp(0, 1, revealProgress);
    const panelTranslateY = MathUtils.lerp(36, 0, revealProgress);
    const panelBlur = MathUtils.lerp(12, 0, revealProgress);
    const titleOpacity = MathUtils.smootherstep(revealProgress, 0.06, 0.54);
    const titleTranslateY = MathUtils.lerp(18, 0, titleOpacity);
    const leftCardProgress = MathUtils.smootherstep(revealProgress, 0.18, 0.72);
    const rightCardProgress = MathUtils.smootherstep(revealProgress, 0.3, 0.84);

    return (
        <div className="pointer-events-none absolute inset-0 z-30">
            <div className="w-full px-6 pt-24 sm:px-8 lg:px-10 lg:pt-20 xl:px-14">
                <div
                    className="flex w-full flex-col"
                    style={{
                        filter: `blur(${panelBlur}px)`,
                        opacity: panelOpacity,
                        transform: `translate3d(0, ${panelTranslateY}px, 0)`,
                    }}
                >
                    <div
                        className="max-w-[30rem]"
                        style={{
                            opacity: titleOpacity,
                            transform: `translate3d(0, ${titleTranslateY}px, 0)`,
                        }}
                    >
                        <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(253,232,255,0.97)_27%,_rgba(240,171,252,0.82)_62%,_rgba(217,70,239,0.72)_100%)] bg-clip-text pr-[0.08em] font-sans text-6xl leading-[0.94] font-semibold tracking-[-0.075em] text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.2)] sm:text-7xl lg:text-[5.65rem]">
                            What I Do
                        </h2>
                        <div className="mt-8 h-px w-44 bg-gradient-to-r from-transparent via-fuchsia-300/58 to-transparent" />
                    </div>

                    <div className="mt-10 grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-4">
                        {[
                            {
                                description:
                                    'I build fast, reliable web products with clean architecture, polished interfaces and the kind of performance that makes the whole experience feel effortless.',
                                progress: leftCardProgress,
                                title: 'Software Engineer',
                            },
                            {
                                description:
                                    'I create AI-powered workflows, assistants and product features that feel practical, human and well integrated instead of bolted on for show.',
                                progress: rightCardProgress,
                                title: 'AI Engineer',
                            },
                        ].map(({ description, progress, title }, index) => {
                            const opacity = MathUtils.lerp(0, 1, progress);
                            const translateX = MathUtils.lerp(
                                index === 0 ? -40 : 40,
                                0,
                                progress,
                            );
                            const translateY = MathUtils.lerp(20, 0, progress);
                            const blur = MathUtils.lerp(8, 0, progress);

                            return (
                                <div
                                    key={title}
                                    className={`${
                                        index === 0
                                            ? 'max-w-[38rem] lg:justify-self-start'
                                            : 'max-w-[34rem] lg:justify-self-end'
                                    } relative w-full rounded-[1.05rem] px-5 py-5`}
                                    style={{
                                        filter: `blur(${blur}px)`,
                                        opacity,
                                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-[1.05rem] border border-fuchsia-300/18" />
                                    <div className="absolute inset-[1px] rounded-[calc(1.05rem-1px)] border border-fuchsia-300/8" />
                                    <div className="flex items-start gap-4">
                                        <div>
                                            <h3 className="text-[1.55rem] leading-tight font-semibold text-white sm:text-[1.8rem]">
                                                {title}
                                            </h3>
                                            <p className="mt-4 text-[1rem] leading-[1.8] font-medium text-white/64 sm:text-[1.05rem]">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroRotationBackground({
    scrollProgress,
}: {
    scrollProgress: number;
}) {
    useEffect(() => {
        const image = new Image();
        image.src = ROTATION_COMPLETE_BACKGROUND;
    }, []);

    const rotationProgress = MathUtils.smootherstep(
        scrollProgress,
        0,
        DESK_TURN_END_PROGRESS,
    );
    const backgroundProgress =
        rotationProgress > HERO_DESK_FLIP_TRIGGER_PROGRESS ? 1 : 0;
    const finalBackgroundOpacity = backgroundProgress;
    const finalBackgroundTranslateX = MathUtils.lerp(
        18,
        0,
        finalBackgroundOpacity,
    );
    const finalBackgroundScale = MathUtils.lerp(
        1.08,
        1,
        finalBackgroundOpacity,
    );
    const initialBackgroundOpacity = MathUtils.lerp(
        0.56,
        0.16,
        finalBackgroundOpacity,
    );

    return (
        <div className="absolute inset-0 bg-[#05010f]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero-neon-background.png')",
                    opacity: initialBackgroundOpacity,
                }}
            />
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${ROTATION_COMPLETE_BACKGROUND}')`,
                    opacity: finalBackgroundOpacity,
                    transform: `translate3d(${finalBackgroundTranslateX}%, 0, 0) scale(${finalBackgroundScale})`,
                    transformOrigin: 'center center',
                    willChange: 'opacity, transform',
                }}
            />
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(217,70,239,0.2),rgba(91,33,182,0.08)_28%,rgba(5,1,15,0)_62%)]"
                style={{ opacity: finalBackgroundOpacity * 0.85 }}
            />
        </div>
    );
}

export function HeroIntroOverlay({
    onLaptopCameraZoomSettled,
    onLaptopVideoEnded,
    sectionRef,
    scrollProgress,
}: {
    onLaptopCameraZoomSettled?: () => void;
    onLaptopVideoEnded?: () => void;
    sectionRef: RefObject<HTMLElement | null>;
    scrollProgress: number;
}) {
    const introOpacity = useIntroOpacity(sectionRef);
    const introExitProgress = MathUtils.smootherstep(
        scrollProgress,
        0,
        WHAT_I_DO_REVEAL_START,
    );
    const introContentOpacity = introOpacity * (1 - introExitProgress);
    const deskOverlapBlurOpacity = Math.min(0.42, introOpacity * 0.52);
    const whatIDoRevealAmount = MathUtils.smootherstep(
        scrollProgress,
        WHAT_I_DO_REVEAL_START,
        WHAT_I_DO_REVEAL_END,
    );
    const whatIDoExitProgress = MathUtils.smootherstep(
        scrollProgress,
        LAPTOP_SCREEN_ZOOM_START_PROGRESS,
        WHAT_I_DO_EXIT_END,
    );
    const whatIDoRevealProgress =
        whatIDoRevealAmount * (1 - whatIDoExitProgress);

    return (
        <div className="pointer-events-none absolute inset-0 z-30 min-h-screen overflow-hidden text-white">
            <HeroRotationBackground scrollProgress={scrollProgress} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,5,0.992)_0%,rgba(2,1,8,0.972)_30%,rgba(6,2,14,0.82)_56%,rgba(8,2,18,0.58)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.56)_16%,rgba(0,0,0,0.2)_38%,rgba(0,0,0,0.04)_62%,rgba(0,0,0,0)_78%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_24%,rgba(0,0,0,0)_54%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_64%,rgba(236,72,153,0.08)_0%,rgba(91,18,160,0.035)_24%,rgba(5,1,15,0)_56%)]" />
            <HeroDeskModel
                onLaptopCameraZoomSettled={onLaptopCameraZoomSettled}
                onLaptopVideoEnded={onLaptopVideoEnded}
                scrollProgress={scrollProgress}
            />
            <HeroNav />
            <SocialRail />

            <div
                className="mx-auto grid min-h-screen max-w-[1450px] grid-cols-1 items-center px-8 pt-28 pb-10 sm:px-12 lg:grid-cols-[43%_57%] lg:px-20 lg:pt-16"
                style={{ opacity: introContentOpacity }}
            >
                <div className="relative z-30 max-w-[43rem] pt-20 lg:pt-24">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[1.5rem] left-[-6.5rem] hidden h-[14rem] w-[35rem] rounded-[2.4rem] lg:block"
                        style={{
                            backdropFilter: 'blur(11px)',
                            background:
                                'radial-gradient(ellipse at 28% 68%, rgba(10, 3, 18, 0.2) 0%, rgba(10, 3, 18, 0.12) 34%, rgba(10, 3, 18, 0.04) 56%, rgba(10, 3, 18, 0) 82%)',
                            maskImage:
                                'radial-gradient(ellipse at 28% 68%, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.22) 56%, transparent 82%)',
                            opacity:
                                deskOverlapBlurOpacity *
                                (1 - introExitProgress),
                            WebkitBackdropFilter: 'blur(11px)',
                            WebkitMaskImage:
                                'radial-gradient(ellipse at 28% 68%, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.22) 56%, transparent 82%)',
                        }}
                    />
                    <div className="mb-7 inline-flex h-[3.25rem] items-center gap-3 rounded-[1.35rem] border border-fuchsia-500/90 bg-[#120622]/72 px-7 text-[1.1rem] font-bold text-white shadow-[0_0_30px_rgba(217,70,239,0.24)] backdrop-blur-sm">
                        <span aria-hidden="true">👋</span>
                        <span>Hello, I&apos;m</span>
                    </div>
                    <h1 className="pr-[0.06em] text-[clamp(5rem,8vw,8.6rem)] leading-[0.88] font-black tracking-normal">
                        <span className="block text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.15)]">
                            Ellis
                        </span>
                        <span className="inline-block bg-gradient-to-b from-fuchsia-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(217,70,239,0.42)]">
                            Threader
                        </span>
                    </h1>
                    <p className="mt-7 text-[1.35rem] font-black tracking-[0.48rem] text-fuchsia-500 uppercase">
                        Full Stack Developer
                    </p>
                    <p className="mt-5 max-w-[37rem] text-[1.35rem] leading-[1.52] font-medium text-white/73">
                        I build modern, responsive and high-performance web
                        applications with clean code and great UX.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-7">
                        <a
                            className="group pointer-events-auto flex h-[4.35rem] min-w-[15.5rem] items-center justify-between rounded-[1.4rem] border border-fuchsia-300/70 bg-[linear-gradient(90deg,rgba(176,35,173,0.42),rgba(244,80,181,0.92))] px-9 text-[1.18rem] font-black text-white shadow-[0_0_26px_rgba(236,72,153,0.62),inset_0_0_16px_rgba(255,255,255,0.08)]"
                            href="#projects"
                        >
                            <span>View My Work</span>
                            <span className="ml-5 flex h-11 w-11 items-center justify-center rounded-full bg-fuchsia-300/60">
                                <ArrowRight className="h-6 w-6" />
                            </span>
                        </a>
                        <a
                            className="pointer-events-auto flex h-[4.35rem] min-w-[14.4rem] items-center justify-center gap-8 rounded-[1.4rem] border border-fuchsia-700/90 bg-[#080413]/62 px-8 text-[1.12rem] font-black text-white"
                            href="/AIResume.png"
                        >
                            <span>Download CV</span>
                            <Download className="h-5 w-5" strokeWidth={2.6} />
                        </a>
                    </div>
                    <div className="mt-6 grid max-w-[36rem] grid-cols-3 rounded-[0.8rem] border border-fuchsia-600/45 bg-[#0b0615]/70 px-9 py-6 shadow-[0_0_34px_rgba(126,34,206,0.16)] backdrop-blur-sm">
                        {STATS.map(([value, label], index) => (
                            <div
                                key={label}
                                className={`${index > 0 ? 'border-l border-white/14' : ''} ${index === 0 ? 'text-left' : index === 2 ? 'text-right' : 'text-center'}`}
                            >
                                <div className="text-[2.45rem] leading-none font-black text-fuchsia-500">
                                    {value}
                                </div>
                                <div className="mt-2 text-[0.98rem] font-semibold text-white/82">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <WhatIDoPanel revealProgress={whatIDoRevealProgress} />
        </div>
    );
}
