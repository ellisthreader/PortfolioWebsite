import { useEffect, useRef, useState } from 'react';

import {
    LAPTOP_SCROLL_LOCK_PROGRESS,
    SCROLL_KEYS,
} from './use-experience-progress/constants';
import {
    calculateExperienceMetrics,
    getEmptyMetrics,
    haveMetricsChanged,
} from './use-experience-progress/metrics';
import type { ExperienceMetrics } from './use-experience-progress/types';

export function useExperienceProgress({
    laptopVideoEnded,
}: {
    laptopVideoEnded: boolean;
}) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const heroScrollProgressRef = useRef(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const entriesRef = useRef<HTMLDivElement | null>(null);
    const laptopVideoEndedRef = useRef(laptopVideoEnded);
    const scrollLockActiveRef = useRef(false);
    const scrollLockYRef = useRef(0);
    const [heroScrollProgress, setHeroScrollProgress] = useState(0);
    const [metrics, setMetrics] = useState<ExperienceMetrics>(
        getEmptyMetrics(1),
    );

    useEffect(() => {
        laptopVideoEndedRef.current = laptopVideoEnded;

        if (laptopVideoEnded) {
            scrollLockActiveRef.current = false;
        }
    }, [laptopVideoEnded]);

    useEffect(() => {
        let animationFrameId = 0;
        let resizeObserver: ResizeObserver | null = null;
        let isRestoringLockedScroll = false;

        const restoreLockedScroll = () => {
            if (
                !scrollLockActiveRef.current ||
                isRestoringLockedScroll ||
                laptopVideoEndedRef.current
            ) {
                return;
            }

            isRestoringLockedScroll = true;
            window.scrollTo({
                left: window.scrollX,
                top: scrollLockYRef.current,
            });
            isRestoringLockedScroll = false;
        };
        const preventLockedScroll = (event: Event) => {
            if (scrollLockActiveRef.current && !laptopVideoEndedRef.current) {
                event.preventDefault();
                restoreLockedScroll();
            }
        };
        const preventLockedKeyScroll = (event: KeyboardEvent) => {
            if (
                scrollLockActiveRef.current &&
                !laptopVideoEndedRef.current &&
                SCROLL_KEYS.has(event.key)
            ) {
                event.preventDefault();
                restoreLockedScroll();
            }
        };
        const commitMetrics = (nextMetrics: ExperienceMetrics) => {
            setMetrics((currentMetrics) =>
                haveMetricsChanged(currentMetrics, nextMetrics)
                    ? nextMetrics
                    : currentMetrics,
            );
        };
        const commitHeroScrollProgress = (nextHeroScrollProgress: number) => {
            setHeroScrollProgress((currentHeroScrollProgress) =>
                Math.abs(
                    currentHeroScrollProgress - nextHeroScrollProgress,
                ) > 0.001
                    ? nextHeroScrollProgress
                    : currentHeroScrollProgress,
            );
        };
        const updateMetrics = () => {
            animationFrameId = 0;
            const viewportHeight = Math.max(window.innerHeight, 1);
            const {
                heroScrollProgress,
                metrics: nextMetrics,
                scrollLockY,
            } = calculateExperienceMetrics(
                {
                    content: contentRef.current,
                    entries: entriesRef.current,
                    section: sectionRef.current,
                },
                viewportHeight,
            );
            const shouldLockLaptopScroll =
                !laptopVideoEndedRef.current && window.scrollY >= scrollLockY;

            if (shouldLockLaptopScroll) {
                scrollLockActiveRef.current = true;
                scrollLockYRef.current = scrollLockY;

                if (window.scrollY !== scrollLockY) {
                    restoreLockedScroll();
                }
            }

            heroScrollProgressRef.current =
                scrollLockActiveRef.current && !laptopVideoEndedRef.current
                    ? LAPTOP_SCROLL_LOCK_PROGRESS
                    : heroScrollProgress;
            commitHeroScrollProgress(heroScrollProgressRef.current);
            commitMetrics(nextMetrics);
        };
        const scheduleUpdate = () => {
            if (!animationFrameId) {
                animationFrameId = window.requestAnimationFrame(updateMetrics);
            }
        };

        scheduleUpdate();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        window.addEventListener('wheel', preventLockedScroll, {
            passive: false,
        });
        window.addEventListener('touchmove', preventLockedScroll, {
            passive: false,
        });
        window.addEventListener('keydown', preventLockedKeyScroll);

        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(scheduleUpdate);

            if (contentRef.current) resizeObserver.observe(contentRef.current);
            if (entriesRef.current) resizeObserver.observe(entriesRef.current);
        }

        return () => {
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
            resizeObserver?.disconnect();
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            window.removeEventListener('wheel', preventLockedScroll);
            window.removeEventListener('touchmove', preventLockedScroll);
            window.removeEventListener('keydown', preventLockedKeyScroll);
        };
    }, []);

    return {
        beamProgress: metrics.beamProgress,
        beamStartOffset: metrics.beamStartOffset,
        contentRef,
        contentScrollOffset: metrics.contentScrollOffset,
        entriesRef,
        heroBeamEndOffset: metrics.heroBeamEndOffset,
        heroBeamStartOffset: metrics.heroBeamStartOffset,
        heroSectionHeight: metrics.heroSectionHeight,
        heroScrollProgress,
        heroScrollProgressRef,
        heroPortalProgress: metrics.heroPortalProgress,
        progress: metrics.progress,
        sectionRef,
    };
}
