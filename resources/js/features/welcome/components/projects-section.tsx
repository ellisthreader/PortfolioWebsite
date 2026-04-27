import { motion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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

export function ProjectsSection() {
    const featuredProjects = PROJECT_ITEMS.filter(
        (project) => !project.hideFromHome,
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
            const scrollDistance = Math.max(
                travelDistance * 1.45,
                viewportHeight * 1.2,
            );
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
            const progress = consumedScroll / maxScrollableDistance;

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
            ref={sectionRef}
            className="relative z-20 h-screen bg-black text-white"
            style={
                sceneMetrics.sectionHeight > 0
                    ? { height: `${sceneMetrics.sectionHeight}px` }
                    : undefined
            }
        >
            <div className="sticky top-0 h-screen overflow-hidden pt-0 sm:pt-2 lg:pt-4">
                <div className="absolute inset-0 bg-black" />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-8 bg-black" />
                <div className="relative h-full w-full">
                    <div className="relative z-10 px-6 pb-2 sm:px-10 lg:px-16">
                        <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(250,232,255,0.96)_32%,_rgba(216,180,254,0.86)_70%,_rgba(217,70,239,0.68)_100%)] bg-clip-text text-4xl leading-[1.08] font-semibold tracking-[-0.08em] text-transparent sm:text-5xl lg:text-[4.5rem]">
                            My Projects
                        </h2>
                    </div>

                    <div className="absolute inset-x-0 bottom-0">
                        <div
                            ref={viewportRef}
                            className="relative overflow-hidden"
                        >
                            <motion.div
                                ref={trackRef}
                                className="flex w-max will-change-transform"
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
