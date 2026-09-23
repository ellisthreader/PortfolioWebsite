import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type KineticNameProps = {
    id: string;
    name: string;
    className?: string;
};

/** How far the pointer's influence reaches, as a fraction of the font size. */
const LENS_RADIUS = 0.95;
const REST_WEIGHT = 640;
const LENS_WEIGHT = 300;

/**
 * The name, set letter by letter. On load each letter sweeps from narrow and
 * light to wide and heavy along Mona Sans's width and weight axes. Afterwards,
 * on devices with a fine pointer, letters near the cursor thin out and lift,
 * like a lens passing over the type. Lighter glyphs are narrower, so the line
 * never outgrows its measure.
 */
export function KineticName({ id, name, className }: KineticNameProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    // With reduced motion there is no entrance, so the name starts settled.
    const [settled, setSettled] = useState(
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    // Each line with the running index of its first letter, for the stagger.
    const lines = name.split(' ').map((text, line, all) => ({
        text,
        start: all.slice(0, line).join('').length,
    }));

    useEffect(() => {
        const heading = ref.current;
        const canHover = window.matchMedia(
            '(hover: hover) and (pointer: fine)',
        ).matches;
        const reduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (!settled || !heading || !canHover || reduced) {
            return;
        }

        const chars = Array.from(
            heading.querySelectorAll<HTMLElement>('[data-char]'),
        );
        let frame = 0;
        let pointer: { x: number; y: number } | null = null;

        const render = () => {
            frame = 0;
            const fontSize = parseFloat(getComputedStyle(heading).fontSize);
            const radius = fontSize * LENS_RADIUS;

            // Read every position first, then write, so layout runs once.
            const centres = chars.map((char) => {
                const rect = char.getBoundingClientRect();

                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                };
            });

            chars.forEach((char, i) => {
                let strength = 0;

                if (pointer) {
                    const dx = pointer.x - centres[i].x;
                    const dy = (pointer.y - centres[i].y) * 1.6;
                    const t = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
                    strength = t * t * (3 - 2 * t);
                }

                char.style.fontWeight = String(
                    Math.round(
                        REST_WEIGHT - (REST_WEIGHT - LENS_WEIGHT) * strength,
                    ),
                );
                char.style.top = `${(-0.035 * strength).toFixed(4)}em`;
            });
        };

        const schedule = () => {
            if (!frame) {
                frame = window.requestAnimationFrame(render);
            }
        };

        const onMove = (event: PointerEvent) => {
            const box = heading.getBoundingClientRect();
            const margin = parseFloat(getComputedStyle(heading).fontSize) * 0.6;
            const inside =
                event.clientX > box.left - margin &&
                event.clientX < box.right + margin &&
                event.clientY > box.top - margin &&
                event.clientY < box.bottom + margin;

            pointer = inside ? { x: event.clientX, y: event.clientY } : null;
            schedule();
        };

        const onLeave = () => {
            pointer = null;
            schedule();
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);

        return () => {
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener(
                'pointerleave',
                onLeave,
            );
            window.cancelAnimationFrame(frame);
            chars.forEach((char) => {
                char.style.fontWeight = '';
                char.style.top = '';
            });
        };
    }, [settled]);

    const total = name.replace(/\s/g, '').length;

    return (
        <h1
            id={id}
            ref={ref}
            className={cn('kinetic', settled && 'is-settled', className)}
            onAnimationEnd={(event) => {
                const target = event.target as HTMLElement;

                if (Number(target.dataset.char) === total - 1) {
                    setSettled(true);
                }
            }}
        >
            <span className="sr-only">{name}</span>
            {lines.map((line) => (
                <span key={line.text} className="kinetic-line" aria-hidden>
                    {[...line.text].map((char, offset) => {
                        const i = line.start + offset;

                        return (
                            <span
                                key={i}
                                data-char={i}
                                className="kinetic-char"
                                style={{ '--i': i } as CSSProperties}
                            >
                                {char}
                            </span>
                        );
                    })}
                </span>
            ))}
        </h1>
    );
}
