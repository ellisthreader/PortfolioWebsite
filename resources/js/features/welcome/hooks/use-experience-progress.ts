import { MathUtils } from 'three';
import { useEffect, useRef, useState } from 'react';

export function useExperienceProgress() {
    const heroScrollProgressRef = useRef(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const entriesRef = useRef<HTMLDivElement | null>(null);
    const targetProgressRef = useRef(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrameId = 0;

        const updateScrollTargets = () => {
            const viewportHeight = Math.max(window.innerHeight, 1);
            const section = sectionRef.current;
            const entries = entriesRef.current;

            heroScrollProgressRef.current = MathUtils.clamp(
                window.scrollY / viewportHeight,
                0,
                1,
            );

            if (!section || !entries) {
                targetProgressRef.current = 0;
                return;
            }

            const entriesTop = window.scrollY + entries.getBoundingClientRect().top;
            const entriesHeight = entries.offsetHeight;
            const startScroll = entriesTop - viewportHeight * 0.72;
            const endScroll = entriesTop + entriesHeight - viewportHeight * 0.38;
            const progressDistance = Math.max(endScroll - startScroll, viewportHeight);

            targetProgressRef.current = MathUtils.clamp(
                (window.scrollY - startScroll) / progressDistance,
                0,
                1,
            );
        };

        const animateProgress = () => {
            setProgress((current) => {
                const next = targetProgressRef.current;

                return Math.abs(current - next) > 0.0005 ? next : current;
            });

            animationFrameId = window.requestAnimationFrame(animateProgress);
        };

        updateScrollTargets();
        animationFrameId = window.requestAnimationFrame(animateProgress);
        window.addEventListener('scroll', updateScrollTargets, { passive: true });
        window.addEventListener('resize', updateScrollTargets);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('scroll', updateScrollTargets);
            window.removeEventListener('resize', updateScrollTargets);
        };
    }, []);

    return { entriesRef, heroScrollProgressRef, progress, sectionRef };
}
