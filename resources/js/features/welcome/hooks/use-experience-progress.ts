import { MathUtils } from 'three';
import { useEffect, useRef, useState } from 'react';

export function useExperienceProgress() {
    const heroScrollProgressRef = useRef(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const targetProgressRef = useRef(0);
    const smoothProgressRef = useRef(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrameId = 0;
        let previousFrameTime = performance.now();

        const updateScrollTargets = () => {
            const viewportHeight = Math.max(window.innerHeight, 1);
            const section = sectionRef.current;

            heroScrollProgressRef.current = MathUtils.clamp(
                window.scrollY / viewportHeight,
                0,
                1,
            );

            if (!section) {
                targetProgressRef.current = 0;
                return;
            }

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollableDistance = Math.max(
                sectionHeight - viewportHeight,
                viewportHeight,
            );

            targetProgressRef.current = MathUtils.clamp(
                (window.scrollY - sectionTop) / scrollableDistance,
                0,
                1,
            );
        };

        const animateProgress = (now: number) => {
            const delta = Math.min((now - previousFrameTime) / 1000, 0.1);
            previousFrameTime = now;

            smoothProgressRef.current = MathUtils.damp(
                smoothProgressRef.current,
                targetProgressRef.current,
                9,
                delta,
            );

            setProgress((current) => {
                const next = smoothProgressRef.current;

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

    return { heroScrollProgressRef, progress, sectionRef };
}
