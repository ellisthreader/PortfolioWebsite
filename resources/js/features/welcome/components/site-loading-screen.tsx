import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const BACKDROP =
    'radial-gradient(circle at 50% 42%, rgba(236, 72, 153, 0.16) 0%, rgba(168, 85, 247, 0.1) 20%, rgba(4, 1, 12, 0) 47%), linear-gradient(180deg, #050109 0%, #04010c 100%)';

type SiteLoadingScreenProps = {
    visible: boolean;
    onExitComplete?: () => void;
};

export function SiteLoadingScreen({
    visible,
    onExitComplete,
}: SiteLoadingScreenProps) {
    const reduceMotion = useReducedMotion();

    return (
        <AnimatePresence onExitComplete={onExitComplete}>
            {visible ? (
                <motion.div
                    aria-live="polite"
                    className="fixed inset-0 z-[140] flex items-center justify-center overflow-hidden bg-[#04010c]"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 1 }}
                    role="status"
                    transition={{
                        duration: reduceMotion ? 0.2 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{ background: BACKDROP }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] max-w-[88vw] -translate-x-1/2 -translate-y-1/2 [animation:loader-glow_3.6s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.2),_transparent_62%)] opacity-60 blur-3xl motion-reduce:[animation:none]"
                    />

                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="relative flex w-full max-w-[21rem] flex-col items-center px-8"
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        transition={{
                            duration: reduceMotion ? 0.2 : 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <p className="text-center text-[0.72rem] font-semibold tracking-[0.5rem] text-fuchsia-200/85 uppercase">
                            Ellis Threader
                        </p>

                        <div className="mt-7 h-[3px] w-full overflow-hidden rounded-full bg-white/8">
                            <span
                                className={
                                    reduceMotion
                                        ? 'block h-full w-1/3 rounded-full bg-gradient-to-r from-fuchsia-500/70 via-fuchsia-300 to-purple-400/80'
                                        : 'block h-full w-2/5 [animation:loader-beam_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-300 to-purple-400/0 shadow-[0_0_18px_rgba(217,70,239,0.6)]'
                                }
                            />
                        </div>

                        <p className="mt-5 text-center text-sm font-medium tracking-wide text-white/45">
                            Loading
                        </p>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
