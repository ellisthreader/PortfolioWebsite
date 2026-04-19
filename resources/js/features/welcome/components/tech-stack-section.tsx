import { motion } from 'framer-motion';

import { TECH_STACK_ITEMS } from '../data/tech-stack-items';

export function TechStackSection() {
    return (
        <section className="relative overflow-hidden bg-[#020104] px-6 pb-28 pt-20 text-white sm:px-10 lg:px-16 lg:pb-36 lg:pt-24">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#020104_0%,#090114_18%,#150326_52%,#08010f_100%)]" />
            <div className="absolute left-1/2 top-[23%] h-[20rem] w-[20rem] -translate-x-1/2 overflow-hidden rounded-full border border-fuchsia-200/10 opacity-45 blur-[1px] sm:h-[24rem] sm:w-[24rem] lg:h-[30rem] lg:w-[30rem]">
                <video
                    className="h-full w-full object-cover mix-blend-screen"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src="/Animation.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="absolute left-1/2 top-[23%] h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(2,1,4,0)_0%,rgba(9,1,20,0.12)_34%,rgba(2,1,4,0.64)_74%,rgba(2,1,4,0.88)_100%)] sm:h-[24rem] sm:w-[24rem] lg:h-[30rem] lg:w-[30rem]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(244,114,182,0.16),transparent_18%),radial-gradient(circle_at_18%_40%,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_82%_36%,rgba(125,211,252,0.08),transparent_22%),radial-gradient(circle_at_50%_72%,rgba(217,70,239,0.18),transparent_28%)]" />
            <div className="absolute inset-x-0 top-[16%] h-[44rem] bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.18)_0%,rgba(124,58,237,0.12)_24%,rgba(17,24,39,0)_68%)] blur-[110px]" />
            <div className="absolute left-1/2 top-[22%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-fuchsia-200/12 bg-[radial-gradient(circle_at_center,rgba(250,232,255,0.26)_0%,rgba(244,114,182,0.12)_28%,rgba(168,85,247,0.08)_52%,rgba(2,1,4,0)_74%)] blur-[4px] [animation:tech-core-pulse_8s_ease-in-out_infinite]" />
            <div className="absolute left-1/2 top-[24%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-white/8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(236,72,153,0.08)_34%,rgba(0,0,0,0)_72%)] opacity-90 blur-[2px]" />
            <div className="absolute inset-x-[-8%] top-[28%] h-[24rem] bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.12)_0%,rgba(168,85,247,0.08)_30%,rgba(0,0,0,0)_72%)] blur-[70px]" />
            <div className="absolute inset-x-0 top-[18%] h-[34rem] opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:8rem_8rem] [mask-image:radial-gradient(circle_at_center,black_18%,transparent_78%)] [animation:tech-grid-drift_18s_linear_infinite]" />
            <div className="absolute inset-x-[-6%] top-[30%] h-[16rem] opacity-55 [mask-image:linear-gradient(180deg,transparent_0%,black_12%,black_88%,transparent_100%)]">
                <div className="h-full w-full bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_18px)] [transform:perspective(900px)_rotateX(74deg)] [transform-origin:top_center]" />
            </div>
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1.5px)] [background-size:11rem_11rem] [mask-image:linear-gradient(180deg,transparent_0%,black_20%,black_82%,transparent_100%)] [animation:tech-stars-drift_20s_linear_infinite]" />

            <div className="relative mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.38em] text-fuchsia-100/60">
                        Built With
                    </p>
                    <h2 className="mt-4 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,232,255,0.96)_28%,rgba(232,121,249,0.86)_68%,rgba(217,70,239,0.74)_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.08em] text-transparent sm:text-6xl lg:text-[5.4rem]">
                        Tech Stack
                    </h2>
                </div>

                <div className="relative mt-14 px-1 py-4 sm:px-3 lg:px-4">
                    <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {TECH_STACK_ITEMS.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.45,
                                        delay: index * 0.025,
                                        ease: 'easeOut',
                                    }}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.03,
                                    }}
                                    className="group relative overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] px-3 py-3 backdrop-blur-md"
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_56%)] opacity-70" />
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[inset_0_0_0_1px_rgba(250,232,255,0.28),0_0_24px_rgba(217,70,239,0.22)]" />

                                    <div className="relative flex flex-col items-center gap-2.5 text-center">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-[0.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_100%)] text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.08)]">
                                            <Icon className="h-5 w-5" strokeWidth={1.8} />
                                        </div>
                                        <span className="text-[0.82rem] font-medium tracking-[0.02em] text-white/84">
                                            {item.label}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
