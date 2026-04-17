import { Head, Link } from '@inertiajs/react';

import { PROJECT_ITEMS } from '@/features/welcome/data/project-items';

export default function Projects() {
    const projects = PROJECT_ITEMS.filter((project) => !project.isCta);

    return (
        <>
            <Head title="Projects" />

            <div className="min-h-screen overflow-hidden bg-black text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(139,92,246,0.18),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(244,114,182,0.14),transparent_20%),radial-gradient(circle_at_50%_84%,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,#05010a_0%,#020104_46%,#000000_100%)]" />

                <main className="relative mx-auto flex w-full max-w-[86rem] flex-col px-6 pb-20 pt-10 sm:px-10 lg:px-16 lg:pb-28 lg:pt-14">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-4xl">
                            <p className="text-sm uppercase tracking-[0.34em] text-fuchsia-100/62">
                                Selected Work
                            </p>
                            <h1 className="mt-5 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,232,255,0.96)_34%,rgba(216,180,254,0.84)_70%,rgba(217,70,239,0.66)_100%)] bg-clip-text text-5xl font-semibold tracking-[-0.08em] text-transparent sm:text-6xl lg:text-[5.25rem]">
                                All My Projects
                            </h1>
                            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
                                A collection of platforms, AI systems, interfaces, and business tools
                                designed to be visually polished, commercially useful, and built around
                                real outcomes.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex w-fit items-center justify-center border border-white/16 bg-white/8 px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-white transition duration-300 hover:bg-white hover:text-[#140a1f]"
                        >
                            Back home
                        </Link>
                    </div>

                    <section className="mt-14 grid gap-6 lg:grid-cols-2">
                        {projects.map((project) => (
                            <article
                                key={project.index}
                                className="group relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(14,8,20,0.94)_0%,rgba(8,4,14,0.94)_100%)] p-6 sm:p-7"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.16] transition-opacity duration-500 group-hover:opacity-[0.26]`}
                                />

                                <div className="relative flex h-full flex-col">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.28em] text-fuchsia-100/70">
                                                {project.index}
                                            </p>
                                            <p className="mt-3 text-xs uppercase tracking-[0.34em] text-white/40">
                                                {project.category}
                                            </p>
                                        </div>
                                    </div>

                                    {project.imageUrl ? (
                                        <div className="relative mt-8 flex h-56 items-center justify-center overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(13,8,20,0.72)_0%,rgba(8,4,14,0.78)_100%)]">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.title}
                                                className={`h-full w-full ${
                                                    project.transparentImage ? 'object-contain p-6' : 'object-cover'
                                                }`}
                                            />
                                        </div>
                                    ) : (
                                        <div className="relative mt-8 h-56 overflow-hidden border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(13,8,20,0.9)_0%,rgba(8,4,14,0.96)_100%)]">
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`}
                                            />
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.28),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_56%)]" />
                                        </div>
                                    )}

                                    <div className="relative mt-8">
                                        <h2 className="max-w-[14ch] text-[2rem] font-semibold tracking-[-0.06em] text-white sm:text-[2.25rem]">
                                            {project.title}
                                        </h2>
                                        <p className="mt-5 text-sm leading-7 text-white/64 sm:text-base">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}
