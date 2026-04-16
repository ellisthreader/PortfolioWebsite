import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { PROJECT_ITEMS } from '../data/project-items';
import { ProjectCard } from './project-card';

export function ProjectsSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });
    const translateX = useTransform(scrollYProgress, [0, 1], ['0%', '-69%']);

    return (
        <section
            ref={sectionRef}
            className="relative h-[420vh] overflow-hidden bg-[#030106] text-white"
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,_rgba(139,92,246,0.18),_transparent_26%),radial-gradient(circle_at_82%_18%,_rgba(244,114,182,0.16),_transparent_24%),radial-gradient(circle_at_50%_78%,_rgba(217,70,239,0.18),_transparent_34%),linear-gradient(180deg,_#05010a_0%,_#020104_100%)]" />
                <div className="absolute inset-y-0 left-[8%] w-64 bg-[radial-gradient(circle_at_center,_rgba(217,70,239,0.2),_transparent_68%)] blur-[120px]" />
                <div className="absolute inset-y-0 right-[10%] w-72 bg-[radial-gradient(circle_at_center,_rgba(125,211,252,0.12),_transparent_70%)] blur-[140px]" />

                <div className="relative flex h-full flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.4em] text-fuchsia-200/70">
                                <span className="h-px w-12 bg-gradient-to-r from-transparent via-fuchsia-300/70 to-fuchsia-400/45" />
                                My Projects
                            </span>
                            <h2 className="mt-6 max-w-4xl bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(250,232,255,0.96)_32%,_rgba(216,180,254,0.86)_70%,_rgba(217,70,239,0.68)_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.08em] text-transparent sm:text-6xl lg:text-[5.8rem]">
                                Scroll through a crafted strip of immersive project worlds.
                            </h2>
                            <p className="mt-6 max-w-xl text-base leading-7 text-white/58 sm:text-lg">
                                Ten visually rich concepts move across the page as you scroll,
                                revealing one atmosphere after another with a cinematic rhythm.
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-14 overflow-hidden">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#030106] via-[#030106]/78 to-transparent sm:w-32 lg:w-52" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#030106] via-[#030106]/78 to-transparent sm:w-32 lg:w-52" />

                        <motion.div
                            className="flex gap-6 will-change-transform sm:gap-8 lg:gap-10"
                            style={{ x: translateX }}
                        >
                            {PROJECT_ITEMS.map((project) => (
                                <ProjectCard key={project.index} project={project} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
