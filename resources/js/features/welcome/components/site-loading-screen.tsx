import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function SiteLoadingScreen({ visible }: { visible: boolean }) {
    const reduceMotion = useReducedMotion();
    const ambientTransition = {
        duration: 6.8,
        ease: [0.37, 0, 0.22, 1] as const,
        repeat: Infinity,
        repeatType: 'mirror' as const,
    };
    const pulseTransition = {
        duration: 2.8,
        ease: [0.37, 0, 0.22, 1] as const,
        repeat: Infinity,
        repeatType: 'mirror' as const,
    };
    const beamTransition = {
        duration: reduceMotion ? 1.25 : 2.15,
        ease: [0.37, 0, 0.22, 1] as const,
        repeat: Infinity,
    };

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    aria-live="polite"
                    className="fixed inset-0 z-[140] overflow-hidden bg-[#04010c]"
                    exit={{
                        opacity: 0,
                        filter: reduceMotion ? 'blur(0px)' : 'blur(10px)',
                        transition: {
                            duration: reduceMotion ? 0.2 : 0.65,
                            ease: [0.37, 0, 0.22, 1],
                        },
                    }}
                    initial={{ opacity: 1, filter: 'blur(0px)' }}
                    role="status"
                >
                    <motion.div
                        animate={
                            reduceMotion
                                ? undefined
                                : {
                                      opacity: 0.98,
                                      scale: 1.035,
                                      y: '-1.2%',
                                  }
                        }
                        className="absolute inset-0"
                        style={{
                            background: `
                                radial-gradient(circle at 50% 44%, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.14) 17%, rgba(4, 1, 12, 0) 43%),
                                radial-gradient(circle at 50% 16%, rgba(13, 4, 26, 0.98) 0%, rgba(6, 2, 15, 0.76) 38%, rgba(4, 1, 12, 0) 72%),
                                linear-gradient(180deg, rgba(0, 0, 0, 0.96) 0%, rgba(4, 1, 12, 0.96) 58%, rgba(4, 1, 12, 1) 100%)
                            `,
                        }}
                        transition={ambientTransition}
                    />

                    <motion.div
                        animate={
                            reduceMotion
                                ? undefined
                                : {
                                      opacity: 0.9,
                                      scale: 1.06,
                                  }
                        }
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),rgba(255,255,255,0)_56%)]"
                        transition={ambientTransition}
                    />
                    <motion.div
                        animate={
                            reduceMotion
                                ? undefined
                                : {
                                      opacity: [0.08, 0.18, 0.08],
                                  }
                        }
                        className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(244,114,182,0.08),transparent)]"
                        transition={{
                            duration: 3.6,
                            ease: [0.37, 0, 0.22, 1],
                            repeat: Infinity,
                        }}
                    />

                    <div className="relative flex min-h-screen items-center justify-center px-8">
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="flex w-full max-w-[24rem] flex-col items-center"
                            initial={{ opacity: 0, y: 14 }}
                            transition={{
                                duration: reduceMotion ? 0.18 : 0.72,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? { opacity: 0.9 }
                                        : {
                                              opacity: [0.6, 1, 0.6],
                                              scaleX: [0.88, 1.04, 0.88],
                                          }
                                }
                                className="mb-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent"
                                transition={pulseTransition}
                            />

                            <motion.div
                                animate={
                                    reduceMotion
                                        ? { opacity: 1 }
                                        : {
                                              opacity: [0.68, 1, 0.72],
                                              y: [-1, 0, -1],
                                          }
                                }
                                className="text-center text-[0.76rem] font-semibold tracking-[0.48rem] text-fuchsia-300/84 uppercase"
                                transition={{
                                    duration: 3.2,
                                    ease: [0.37, 0, 0.22, 1],
                                    repeat: Infinity,
                                }}
                            >
                                Ellis Threader
                            </motion.div>

                            <motion.div
                                animate={
                                    reduceMotion
                                        ? { opacity: 1 }
                                        : { opacity: [0.88, 1, 0.9] }
                                }
                                className="mt-5 flex items-center gap-2.5"
                                transition={pulseTransition}
                            >
                                {[0, 1, 2].map((index) => (
                                    <motion.span
                                        key={index}
                                        animate={
                                            reduceMotion
                                                ? { opacity: 0.7 }
                                                : {
                                                      opacity: [0.18, 1, 0.18],
                                                      scale: [0.82, 1.18, 0.82],
                                                      y: [0, -1.5, 0],
                                                  }
                                        }
                                        className="block h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_14px_rgba(217,70,239,0.65)]"
                                        transition={{
                                            duration: 1.6,
                                            ease: [0.37, 0, 0.22, 1],
                                            repeat: Infinity,
                                            delay: index * 0.16,
                                        }}
                                    />
                                ))}
                            </motion.div>

                            <div className="relative mt-8 h-[0.34rem] w-full overflow-hidden rounded-full bg-white/7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                                <motion.span
                                    animate={
                                        reduceMotion
                                            ? { opacity: 0.22 }
                                            : { opacity: [0.1, 0.22, 0.1] }
                                    }
                                    className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]"
                                    transition={pulseTransition}
                                />
                                <motion.span
                                    animate={
                                        reduceMotion
                                            ? { x: '140%' }
                                            : {
                                                  x: ['-34%', '136%'],
                                                  opacity: [0.82, 1, 0.82],
                                              }
                                    }
                                    className="absolute top-0 left-0 h-full w-[42%] rounded-full bg-gradient-to-r from-fuchsia-500/70 via-fuchsia-300 to-purple-400/80 shadow-[0_0_24px_rgba(217,70,239,0.72)]"
                                    transition={beamTransition}
                                />
                            </div>

                            <motion.p
                                animate={
                                    reduceMotion
                                        ? { opacity: 0.72 }
                                        : {
                                              opacity: [0.4, 0.76, 0.42],
                                              y: [0, -1, 0],
                                          }
                                }
                                className="mt-6 text-center text-[0.95rem] font-medium text-white/60"
                                transition={{
                                    duration: 2.6,
                                    ease: [0.37, 0, 0.22, 1],
                                    repeat: Infinity,
                                }}
                            >
                                Loading
                            </motion.p>
                        </motion.div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
