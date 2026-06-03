import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const VIEWPORT = { margin: '-12% 0px -12% 0px', once: true };
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

// Fade + rise — for content blocks and staggered groups.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            transition={{ delay, duration: 0.6, ease: EASE }}
            viewport={VIEWPORT}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        >
            {children}
        </motion.div>
    );
}

// Fade + rise + un-blur — the signature heading reveal.
export function RevealText({ children, className, delay = 0 }: RevealProps) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={
                reduce ? false : { filter: 'blur(14px)', opacity: 0, y: 30 }
            }
            transition={{ delay, duration: 0.8, ease: EASE }}
            viewport={VIEWPORT}
            whileInView={
                reduce ? undefined : { filter: 'blur(0px)', opacity: 1, y: 0 }
            }
        >
            {children}
        </motion.div>
    );
}
