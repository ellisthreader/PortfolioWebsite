import { useEffect, useRef, useState } from 'react';
import type { Object3D } from 'three';

import { Reveal, RevealText } from './scroll-reveal';
import { SectionLightColumn } from './section-light-column';
import { TechStackIconOverlay } from './tech-stack-section/tech-stack-icon-overlay';
import { TechStackSphere } from './tech-stack-section/tech-stack-sphere';

const TECH_STACK_CANVAS_ROOT_MARGIN = '640px 0px';

export function TechStackSection() {
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const [isSphereMounted, setIsSphereMounted] = useState(
        () =>
            typeof window === 'undefined' ||
            !('IntersectionObserver' in window),
    );
    const iconAnchorRefs = useRef<Array<Object3D | null>>([]);
    const iconElementRefs = useRef<Array<HTMLDivElement | null>>([]);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSphereMounted(entry.isIntersecting);

                if (!entry.isIntersecting) {
                    setActiveLabel(null);
                }
            },
            { rootMargin: TECH_STACK_CANVAS_ROOT_MARGIN },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            id="skills"
            className="relative z-10 overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
            onPointerLeave={() => setActiveLabel(null)}
            ref={sectionRef}
        >
            <SectionLightColumn intensity={1} parallax />
            <div className="relative z-10 mx-auto max-w-[72rem]">
                <div className="flex justify-center text-center">
                    <RevealText className="relative inline-flex flex-col items-center">
                        <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(253,232,255,0.97)_28%,_rgba(240,171,252,0.82)_64%,_rgba(217,70,239,0.72)_100%)] bg-clip-text pr-[0.08em] font-sans text-6xl font-semibold tracking-[-0.075em] text-transparent drop-shadow-[0_0_18px_rgba(236,72,153,0.18)] sm:text-7xl lg:text-[5.6rem]">
                            My Tech Stack
                        </h2>
                        <div className="mt-5 h-px w-44 bg-gradient-to-r from-transparent via-fuchsia-300/65 to-transparent" />
                    </RevealText>
                </div>

                <Reveal
                    className="relative mx-auto mt-12 h-[34rem] max-w-[72rem] overflow-hidden select-none [-webkit-touch-callout:none] sm:h-[40rem] lg:h-[46rem]"
                    delay={0.15}
                >
                    {isSphereMounted ? (
                        <>
                            <TechStackIconOverlay
                                activeLabel={activeLabel}
                                iconElementRefs={iconElementRefs}
                                onSelectLabel={setActiveLabel}
                            />
                            <TechStackSphere
                                activeLabel={activeLabel}
                                iconAnchorRefs={iconAnchorRefs}
                                iconElementRefs={iconElementRefs}
                            />
                        </>
                    ) : null}
                </Reveal>
            </div>
        </section>
    );
}
