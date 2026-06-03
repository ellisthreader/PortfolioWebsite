import { motion, useSpring } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { PROJECT_ITEMS } from '../data/project-items';
import { ProjectCard } from './project-card';

type SceneMetrics = {
    sectionHeight: number;
    scrollDistance: number;
    travelDistance: number;
    viewportHeight: number;
};

const INITIAL_SCENE_METRICS: SceneMetrics = {
    sectionHeight: 0,
    scrollDistance: 0,
    travelDistance: 0,
    viewportHeight: 0,
};

// Hold the cards still for this fraction of the pinned scroll at the start and
// the end, so the horizontal scroll eases in/out instead of starting instantly.
const HOLD_START = 0.12;
const HOLD_END = 0.12;
const MOVING_FRACTION = 1 - HOLD_START - HOLD_END;

export function ProjectsSection() {
    const featuredProjects = useMemo(
        () => PROJECT_ITEMS.filter((project) => !project.hideFromHome),
        [],
    );
    const sectionRef = useRef<HTMLElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const translateX = useSpring(0, {
        stiffness: 72,
        damping: 24,
        mass: 0.9,
        restDelta: 0.2,
    });
    const [sceneMetrics, setSceneMetrics] = useState<SceneMetrics>(
        INITIAL_SCENE_METRICS,
    );

    useEffect(() => {
        let animationFrameId = 0;

        const updateSceneMetrics = () => {
            const viewport = viewportRef.current;
            const track = trackRef.current;

            if (!viewport || !track) {
                return;
            }

            const viewportHeight = window.innerHeight;
            const travelDistance = Math.max(
                track.scrollWidth - viewport.offsetWidth,
                0,
            );
            // Scale up so the moving portion still covers the full travel at
            // the original speed — the start/end holds add scroll, not speed.
            const scrollDistance =
                Math.max(travelDistance * 1.45, viewportHeight * 1.2) /
                MOVING_FRACTION;
            const sectionHeight = viewportHeight + scrollDistance;

            setSceneMetrics((current) => {
                if (
                    current.sectionHeight === sectionHeight &&
                    current.scrollDistance === scrollDistance &&
                    current.travelDistance === travelDistance &&
                    current.viewportHeight === viewportHeight
                ) {
                    return current;
                }

                return {
                    sectionHeight,
                    scrollDistance,
                    travelDistance,
                    viewportHeight,
                };
            });
        };

        const scheduleSceneMetricsUpdate = () => {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(updateSceneMetrics);
        };

        scheduleSceneMetricsUpdate();

        const resizeObserver = new ResizeObserver(scheduleSceneMetricsUpdate);

        if (viewportRef.current) {
            resizeObserver.observe(viewportRef.current);
        }

        if (trackRef.current) {
            resizeObserver.observe(trackRef.current);
        }

        window.addEventListener('resize', scheduleSceneMetricsUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener('resize', scheduleSceneMetricsUpdate);
        };
    }, []);

    useEffect(() => {
        let animationFrameId = 0;

        const updateTranslateX = () => {
            const section = sectionRef.current;

            if (!section || sceneMetrics.sectionHeight <= 0) {
                translateX.set(0);

                return;
            }

            const sectionRect = section.getBoundingClientRect();
            const maxScrollableDistance = Math.max(
                sceneMetrics.sectionHeight - window.innerHeight,
                1,
            );
            const consumedScroll = Math.min(
                Math.max(-sectionRect.top, 0),
                maxScrollableDistance,
            );
            const rawProgress = consumedScroll / maxScrollableDistance;
            const progress = Math.min(
                Math.max((rawProgress - HOLD_START) / MOVING_FRACTION, 0),
                1,
            );

            translateX.set(-sceneMetrics.travelDistance * progress);
        };

        const scheduleTranslateUpdate = () => {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(updateTranslateX);
        };

        scheduleTranslateUpdate();
        window.addEventListener('scroll', scheduleTranslateUpdate, {
            passive: true,
        });
        window.addEventListener('resize', scheduleTranslateUpdate);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('scroll', scheduleTranslateUpdate);
            window.removeEventListener('resize', scheduleTranslateUpdate);
        };
    }, [sceneMetrics.sectionHeight, sceneMetrics.travelDistance, translateX]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-20 h-screen bg-black text-white"
            style={
                sceneMetrics.sectionHeight > 0
                    ? { height: `${sceneMetrics.sectionHeight}px` }
                    : undefined
            }
        >
            <div className="sticky top-0 h-screen overflow-hidden pt-6 sm:pt-8 lg:pt-10">
                <div className="absolute inset-0 bg-black" />
                <div className="relative h-full w-full">
                    <div className="relative z-10 flex justify-center px-6 pb-3 text-center sm:px-10 lg:px-16">
                        <div className="relative inline-flex flex-col items-center">
                            <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(253,232,255,0.94)_30%,_rgba(240,171,252,0.7)_66%,_rgba(217,70,239,0.54)_100%)] bg-clip-text px-[0.08em] pt-2 pb-3 font-sans text-6xl leading-[1.02] font-semibold tracking-[-0.075em] text-transparent drop-shadow-[0_0_14px_rgba(236,72,153,0.12)] sm:text-7xl lg:text-[5.65rem]">
                                My Projects
                            </h2>
                            <div className="mt-8 h-px w-44 bg-gradient-to-r from-transparent via-fuchsia-300/34 to-transparent" />
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0">
                        <div
                            ref={viewportRef}
                            className="relative overflow-hidden"
                        >
                            <motion.div
                                ref={trackRef}
                                className="flex w-max transform-gpu will-change-transform"
                                style={{ x: translateX }}
                            >
                                {featuredProjects.map((project) => (
                                    <ProjectCard
                                        key={project.index}
                                        project={project}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
