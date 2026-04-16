import type { ProjectItem } from '../types';

export function ProjectCard({ project }: { project: ProjectItem }) {
    return (
        <article className="group relative min-h-[30rem] w-[82vw] max-w-[26rem] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:w-[68vw] sm:p-7 lg:w-[31vw] lg:max-w-[32rem] lg:p-8">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 transition-opacity duration-500 group-hover:opacity-30`}
            />
            <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[linear-gradient(180deg,rgba(10,5,16,0.88)_0%,rgba(7,3,13,0.72)_52%,rgba(3,1,6,0.96)_100%)]" />
            <div className="absolute left-8 right-8 top-8 h-40 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_25%_20%,_rgba(255,255,255,0.3),_transparent_26%),linear-gradient(135deg,_rgba(255,255,255,0.14)_0%,_rgba(255,255,255,0.03)_28%,_rgba(255,255,255,0)_52%),radial-gradient(circle_at_78%_28%,_rgba(217,70,239,0.3),_transparent_34%),radial-gradient(circle_at_38%_72%,_rgba(125,211,252,0.24),_transparent_30%),linear-gradient(145deg,_rgba(26,10,36,0.92)_0%,_rgba(14,6,24,0.7)_52%,_rgba(8,2,16,0.95)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_60px_rgba(0,0,0,0.26)]" />
            <div className="absolute left-12 top-12 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-10 right-8 h-32 w-32 rounded-full bg-fuchsia-400/18 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-6">
                        <span className="text-sm font-medium tracking-[0.24em] text-fuchsia-100/78">
                            {project.index}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.3em] text-fuchsia-200/78">
                            {project.category}
                        </span>
                    </div>

                    <div className="mt-56">
                        <h3 className="max-w-xs text-3xl font-semibold tracking-[-0.06em] text-white sm:text-[2.15rem]">
                            {project.title}
                        </h3>
                        <p className="mt-4 max-w-sm text-base leading-7 text-white/62">
                            {project.description}
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                    <div className="h-px w-24 bg-gradient-to-r from-fuchsia-300/85 to-transparent" />
                    <span className="text-xs uppercase tracking-[0.34em] text-white/45">
                        Explore
                    </span>
                </div>
            </div>
        </article>
    );
}
