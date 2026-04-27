import { useEffect, useState, type RefObject } from 'react';

const INTRO_FADE_DISTANCE_VIEWPORT_MULTIPLIER = 0.24;

export function useIntroOpacity(sectionRef: RefObject<HTMLElement | null>) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            const section = sectionRef.current;
            const viewportHeight = window.innerHeight || 1;
            const fadeDistance =
                viewportHeight * INTRO_FADE_DISTANCE_VIEWPORT_MULTIPLIER;
            const consumed = section
                ? Math.min(
                      Math.max(-section.getBoundingClientRect().top, 0),
                      fadeDistance,
                  )
                : 0;
            const progress = consumed / Math.max(fadeDistance, 1);

            setOpacity(
                Math.max(
                    0,
                    Math.min(1, 1 - progress * progress * (3 - 2 * progress)),
                ),
            );
        };

        const schedule = () => {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(update);
        };

        schedule();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [sectionRef]);

    return opacity;
}
