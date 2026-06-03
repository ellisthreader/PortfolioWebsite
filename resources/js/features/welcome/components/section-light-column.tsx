import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

// Shared "light column" so every section is lit the same way: a tall central
// vertical ellipse glow (+ a slow drifting one) — the same treatment the About
// section uses. Percentage-based height spans each section consistently, so the
// lighting reads as one continuous source instead of random per-section blobs.
const DEFAULT_GEOMETRY =
    'top-1/2 left-1/2 h-[92%] w-[46rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2';

export function SectionLightColumn({
    className,
    intensity = 0.9,
    parallax = false,
}: {
    className?: string;
    intensity?: number;
    parallax?: boolean;
}) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        offset: ['start end', 'end start'],
        target: ref,
    });
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        parallax && !reduce ? [90, -90] : [0, 0],
    );

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute',
                DEFAULT_GEOMETRY,
                className,
            )}
            style={{ opacity: intensity }}
        >
            <motion.div className="absolute inset-0" style={{ y }}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_rgba(255,186,239,0.068)_20%,_rgba(236,72,153,0.056)_36%,_rgba(217,70,239,0.032)_54%,_transparent_76%)]" />
                <div className="absolute inset-[4%] [animation:timeline-reflection-drift_9s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.13)_0%,_rgba(217,70,239,0.082)_28%,_rgba(88,28,135,0.032)_48%,_transparent_76%)] opacity-80 motion-reduce:[animation:none]" />
            </motion.div>
        </div>
    );
}
