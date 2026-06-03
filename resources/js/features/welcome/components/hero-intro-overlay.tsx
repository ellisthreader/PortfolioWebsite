import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
    HeroNav,
    SocialRail,
    STATS,
} from './hero-intro-overlay/hero-intro-support';
import { HeroDeskModel } from './hero-scene/hero-desk-model';

const HERO_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const contentTransition = {
    duration: 0.8,
    ease: HERO_EASE,
};

const staggerTransition = {
    delayChildren: 0.08,
    staggerChildren: 0.11,
};

const heroContentVariants = {
    hidden: {},
    visible: {
        transition: staggerTransition,
    },
};

const heroItemVariants = {
    hidden: { filter: 'blur(0px)', opacity: 1, y: 0 },
    visible: {
        filter: 'blur(0px)',
        opacity: 1,
        transition: { ...contentTransition, duration: 0.38 },
        y: 0,
    },
};

function parseStatValue(value: string) {
    const match = value.match(/^(\d+)(.*)$/);

    return {
        suffix: match?.[2] ?? '',
        target: Number(match?.[1] ?? value),
    };
}

function useCountUp({
    delay,
    isActive,
    reduceMotion,
    target,
}: {
    delay: number;
    isActive: boolean;
    reduceMotion: boolean | null;
    target: number;
}) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (reduceMotion || !isActive) {
            return;
        }

        let animationFrame = 0;
        let timeout = 0;
        const duration = 1180;

        const startCounter = () => {
            const startTime = performance.now();

            const tick = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                setDisplayValue(Math.round(target * easedProgress));

                if (progress < 1) {
                    animationFrame = window.requestAnimationFrame(tick);
                }
            };

            animationFrame = window.requestAnimationFrame(tick);
        };

        timeout = window.setTimeout(startCounter, delay);

        return () => {
            window.clearTimeout(timeout);
            window.cancelAnimationFrame(animationFrame);
        };
    }, [delay, isActive, reduceMotion, target]);

    if (reduceMotion) {
        return target;
    }

    return isActive ? displayValue : 0;
}

function AnimatedStat({
    index,
    introReady,
    label,
    value,
}: {
    index: number;
    introReady: boolean;
    label: string;
    value: string;
}) {
    const reduceMotion = useReducedMotion();
    const { suffix, target } = useMemo(() => parseStatValue(value), [value]);
    const count = useCountUp({
        delay: 360 + index * 150,
        isActive: introReady,
        reduceMotion,
        target,
    });

    return (
        <motion.div
            aria-label={`${value} ${label}`}
            className={`relative isolate overflow-hidden px-2 ${index > 0 ? 'border-l border-white/14' : ''} ${index === 0 ? 'text-left' : index === 2 ? 'text-right' : 'text-center'}`}
            initial={reduceMotion ? false : { opacity: 1, y: 0 }}
            animate={introReady ? { opacity: 1, y: 0 } : undefined}
            transition={{
                delay: reduceMotion ? 0 : 0.16 + index * 0.08,
                duration: 0.55,
                ease: HERO_EASE,
            }}
        >
            <motion.div
                className="relative z-10 text-[clamp(1.7rem,4.3vh,2.2rem)] leading-none font-black text-fuchsia-500 tabular-nums"
                animate={
                    introReady && !reduceMotion
                        ? {
                              textShadow: [
                                  '0 0 8px rgba(217,70,239,0.22)',
                                  '0 0 18px rgba(217,70,239,0.62), 0 0 34px rgba(168,85,247,0.24)',
                                  '0 0 12px rgba(217,70,239,0.34)',
                              ],
                          }
                        : undefined
                }
                transition={{
                    delay: 0.22 + index * 0.14,
                    duration: 0.85,
                    ease: HERO_EASE,
                }}
            >
                <motion.span
                    key={count}
                    className="inline-block min-w-[1.45ch]"
                    initial={
                        reduceMotion
                            ? false
                            : { opacity: 0.7, scale: 0.88, y: 7 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.18,
                        ease: HERO_EASE,
                    }}
                >
                    {count}
                </motion.span>
                <motion.span
                    className="inline-block text-fuchsia-300"
                    animate={
                        introReady && !reduceMotion
                            ? { opacity: [0.72, 1, 0.9], scale: [0.92, 1.1, 1] }
                            : undefined
                    }
                    transition={{
                        delay: 0.45 + index * 0.12,
                        duration: 0.45,
                        ease: HERO_EASE,
                    }}
                >
                    {suffix}
                </motion.span>
            </motion.div>
            <div className="relative z-10 mt-1.5 text-[clamp(0.76rem,1.8vh,0.92rem)] font-semibold text-white/82">
                {label}
            </div>
        </motion.div>
    );
}

function HeroAmbientBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#05020b]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(255,214,248,0.12),transparent_15%),radial-gradient(circle_at_52%_22%,rgba(236,72,153,0.13),transparent_25%),radial-gradient(circle_at_50%_58%,rgba(217,70,239,0.11),transparent_36%),linear-gradient(180deg,#05030a_0%,#020106_38%,#000_100%)]" />
            <div className="absolute top-[4%] left-1/2 h-[78%] w-[min(78rem,88vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.065)_0%,rgba(255,186,239,0.072)_18%,rgba(236,72,153,0.06)_34%,rgba(217,70,239,0.038)_52%,transparent_76%)] opacity-95" />
            <div className="absolute top-[12%] right-[-20%] h-[78vh] w-[82vw] bg-[radial-gradient(ellipse_at_center,rgba(255,214,248,0.13)_0%,rgba(236,72,153,0.12)_18%,rgba(168,85,247,0.08)_38%,transparent_72%)] opacity-90" />
            <div className="absolute top-[20%] left-[-16%] h-[58vh] w-[46vw] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.105)_0%,rgba(217,70,239,0.055)_36%,transparent_72%)] opacity-82" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.36)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0)_64%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[22rem] bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_24%,rgba(0,0,0,0.68)_62%,#000_100%)]" />
        </div>
    );
}

function HeroExperienceTransition() {
    return null;
}

export function HeroIntroOverlay({ introReady }: { introReady: boolean }) {
    const reduceMotion = useReducedMotion();

    return (
        <div className="pointer-events-none absolute inset-0 z-30 min-h-screen overflow-hidden text-white">
            <HeroAmbientBackground />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,0,5,0.972)_0%,rgba(2,1,8,0.9)_30%,rgba(6,2,14,0.66)_56%,rgba(8,2,18,0.3)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_16%,rgba(0,0,0,0.15)_38%,rgba(0,0,0,0.03)_62%,rgba(0,0,0,0)_78%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.34)_24%,rgba(0,0,0,0)_54%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_64%,rgba(236,72,153,0.08)_0%,rgba(91,18,160,0.035)_24%,rgba(5,1,15,0)_56%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[18rem] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_44%,#000_100%)]" />
            <HeroDeskModel />
            <HeroExperienceTransition />
            <HeroNav />
            <SocialRail />

            <div className="mx-auto grid min-h-screen max-w-[1450px] grid-cols-1 items-center px-6 pt-24 pb-6 sm:px-10 lg:grid-cols-[43%_57%] lg:px-16 lg:pt-20 lg:pb-8 xl:px-20">
                <motion.div
                    className="relative z-30 max-w-[43rem] pt-8 sm:pt-10 lg:pt-4"
                    variants={heroContentVariants}
                    initial={reduceMotion ? false : 'hidden'}
                    animate={reduceMotion || introReady ? 'visible' : undefined}
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[1.5rem] left-[-6.5rem] hidden h-[14rem] w-[35rem] rounded-[2.4rem] lg:block"
                        style={{
                            backdropFilter: 'blur(11px)',
                            background:
                                'radial-gradient(ellipse at 28% 68%, rgba(10, 3, 18, 0.2) 0%, rgba(10, 3, 18, 0.12) 34%, rgba(10, 3, 18, 0.04) 56%, rgba(10, 3, 18, 0) 82%)',
                            maskImage:
                                'radial-gradient(ellipse at 28% 68%, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.22) 56%, transparent 82%)',
                            opacity: 0.42,
                            WebkitBackdropFilter: 'blur(11px)',
                            WebkitMaskImage:
                                'radial-gradient(ellipse at 28% 68%, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 34%, rgba(0,0,0,0.22) 56%, transparent 82%)',
                        }}
                    />
                    <motion.div
                        className="mb-[clamp(1rem,2.8vh,1.75rem)] inline-flex items-center gap-3 text-[clamp(0.98rem,2vh,1.12rem)] font-bold text-white/90 drop-shadow-[0_0_18px_rgba(217,70,239,0.34)]"
                        variants={heroItemVariants}
                    >
                        <motion.span
                            aria-hidden="true"
                            animate={
                                reduceMotion
                                    ? undefined
                                    : {
                                          rotate: [0, 18, -10, 16, -6, 0],
                                      }
                            }
                            className="inline-block text-[1.45em] leading-none"
                            style={{ transformOrigin: '70% 70%' }}
                            transition={
                                reduceMotion
                                    ? undefined
                                    : {
                                          delay: 0.6,
                                          duration: 1.45,
                                          ease: 'easeInOut',
                                          repeat: Infinity,
                                          repeatDelay: 1.65,
                                      }
                            }
                        >
                            👋
                        </motion.span>
                        <span>Hello, I&apos;m</span>
                    </motion.div>
                    <motion.h1
                        className="pr-[0.06em] text-[clamp(3.65rem,7.4vw,7.35rem)] leading-[0.88] font-black tracking-normal"
                        variants={heroItemVariants}
                    >
                        <motion.span
                            className="block text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.15)]"
                            initial={reduceMotion ? false : { x: -16 }}
                            animate={
                                reduceMotion || introReady
                                    ? { x: 0 }
                                    : undefined
                            }
                            transition={{
                                delay: 0.14,
                                duration: 0.85,
                                ease: HERO_EASE,
                            }}
                        >
                            Ellis
                        </motion.span>
                        <motion.span
                            className="inline-block bg-gradient-to-b from-fuchsia-400 via-fuchsia-500 to-purple-700 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(217,70,239,0.42)]"
                            initial={reduceMotion ? false : { x: 18 }}
                            animate={
                                reduceMotion || introReady
                                    ? { x: 0 }
                                    : undefined
                            }
                            transition={{
                                delay: 0.2,
                                duration: 0.9,
                                ease: HERO_EASE,
                            }}
                        >
                            Threader
                        </motion.span>
                    </motion.h1>
                    <motion.div
                        aria-hidden="true"
                        className="mt-[clamp(0.85rem,2.4vh,1.45rem)] h-px w-[min(19rem,72vw)] origin-left bg-gradient-to-r from-fuchsia-300/0 via-fuchsia-300/80 to-fuchsia-300/0"
                        initial={
                            reduceMotion ? false : { opacity: 0, scaleX: 0 }
                        }
                        animate={
                            reduceMotion || introReady
                                ? { opacity: 1, scaleX: 1 }
                                : undefined
                        }
                        transition={{
                            delay: 0.42,
                            duration: 0.85,
                            ease: HERO_EASE,
                        }}
                    />
                    <motion.p
                        className="mt-[clamp(0.9rem,2.6vh,1.6rem)] text-[clamp(0.92rem,2.2vh,1.25rem)] font-black tracking-[0.34rem] text-fuchsia-500 uppercase"
                        variants={heroItemVariants}
                    >
                        Full Stack Developer
                    </motion.p>
                    <motion.p
                        className="mt-[clamp(0.75rem,2vh,1.2rem)] max-w-[37rem] text-[clamp(1rem,2.25vh,1.22rem)] leading-[1.42] font-medium text-white/73"
                        variants={heroItemVariants}
                    >
                        I build modern, responsive and high-performance web
                        applications with clean code and great UX.
                    </motion.p>
                    <motion.div
                        className="mt-[clamp(1.1rem,3vh,1.85rem)] flex flex-wrap gap-4 sm:gap-5"
                        variants={heroItemVariants}
                    >
                        <motion.a
                            className="group pointer-events-auto flex h-[clamp(3.45rem,7vh,4.05rem)] min-w-[13.25rem] items-center justify-between rounded-[1.15rem] border border-fuchsia-300/70 bg-[linear-gradient(90deg,rgba(176,35,173,0.42),rgba(244,80,181,0.92))] px-6 text-[clamp(0.98rem,2.1vh,1.12rem)] font-black text-white shadow-[0_0_26px_rgba(236,72,153,0.62),inset_0_0_16px_rgba(255,255,255,0.08)] sm:min-w-[14.25rem] sm:px-7"
                            href="#projects"
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : { scale: 1.025, y: -2 }
                            }
                            whileTap={
                                reduceMotion ? undefined : { scale: 0.98 }
                            }
                        >
                            <span>View My Work</span>
                            <span className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-300/60 transition-transform duration-300 group-hover:translate-x-1 sm:h-10 sm:w-10">
                                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                        </motion.a>
                        <motion.a
                            className="pointer-events-auto flex h-[clamp(3.45rem,7vh,4.05rem)] min-w-[12.5rem] items-center justify-center gap-5 rounded-[1.15rem] border border-fuchsia-700/90 bg-[#080413]/62 px-6 text-[clamp(0.96rem,2vh,1.08rem)] font-black text-white sm:min-w-[13.25rem] sm:px-7"
                            href="/AIResume.png"
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : {
                                          borderColor: 'rgba(240,171,252,0.72)',
                                          scale: 1.018,
                                          y: -2,
                                      }
                            }
                            whileTap={
                                reduceMotion ? undefined : { scale: 0.98 }
                            }
                        >
                            <span>Download CV</span>
                            <Download className="h-5 w-5" strokeWidth={2.6} />
                        </motion.a>
                    </motion.div>
                    <motion.div
                        className="mt-[clamp(1rem,2.6vh,1.45rem)] grid max-w-[34.5rem] grid-cols-3 rounded-[0.8rem] border border-fuchsia-600/45 bg-[#0b0615]/70 px-5 py-[clamp(0.95rem,2.5vh,1.35rem)] shadow-[0_0_34px_rgba(126,34,206,0.16)] backdrop-blur-sm sm:px-7"
                        variants={heroItemVariants}
                    >
                        {STATS.map(([value, label], index) => (
                            <AnimatedStat
                                key={label}
                                index={index}
                                introReady={introReady}
                                label={label}
                                value={value}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
