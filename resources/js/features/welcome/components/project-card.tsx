import type { ProjectItem } from '../types';

export function ProjectCard({ project }: { project: ProjectItem }) {
    const isVisualTop = Number.parseInt(project.index, 10) % 2 === 0;

    return (
        <article
            className="group relative h-[32rem] w-[78vw] shrink-0 overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(14,8,20,0.96)_0%,rgba(8,4,14,0.94)_100%)] p-6 sm:h-[36rem] sm:w-[52vw] sm:p-7 lg:h-[42rem] lg:w-[33.3333vw] lg:p-8 xl:h-[45rem]"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.18] transition-opacity duration-500 group-hover:opacity-[0.28]`}
            />

            <div className="relative flex h-full flex-col">
                {isVisualTop ? <ProjectVisual project={project} /> : null}

                <div className={`flex flex-1 flex-col ${isVisualTop ? 'pt-8' : ''}`}>
                    <span className="text-sm font-medium tracking-[0.24em] text-fuchsia-100/78">
                        {project.index}
                    </span>

                    <div className="mt-6 flex-1">
                        <h3 className="max-w-[12ch] text-[1.75rem] font-semibold tracking-[-0.06em] text-white sm:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem]">
                            {project.title}
                        </h3>
                        <p className="mt-4 max-w-[24rem] text-sm leading-7 text-white/62 sm:text-base lg:text-[1.02rem]">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <div className="h-px w-24 bg-gradient-to-r from-fuchsia-300/90 via-fuchsia-200/55 to-transparent lg:w-32" />
                        <span className="text-xs uppercase tracking-[0.34em] text-white/45">
                            Explore
                        </span>
                    </div>
                </div>

                {!isVisualTop ? <ProjectVisual project={project} /> : null}
            </div>
        </article>
    );
}

function ProjectVisual({ project }: { project: ProjectItem }) {
    if (project.imageUrl) {
        const imagePositionClass =
            project.index === '02' ? 'object-[center_18%]' : 'object-center';

        return (
            <div className="relative mt-8 h-[12rem] overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(13,8,20,0.9)_0%,rgba(8,4,14,0.96)_100%)] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`h-full w-full object-cover ${imagePositionClass}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,4,12,0.12)_0%,rgba(7,4,12,0)_26%,rgba(7,4,12,0.18)_100%)]" />
            </div>
        );
    }

    return (
        <div className="relative mt-8 h-[12rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_40%),linear-gradient(180deg,rgba(13,8,20,0.9)_0%,rgba(8,4,14,0.96)_100%)] sm:h-[13rem] lg:h-[15rem] xl:h-[16rem]">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.24]`}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.28),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_28%,rgba(255,255,255,0)_56%)]" />
            <div className="absolute left-6 top-6 h-14 w-14 rounded-full border border-white/12 bg-white/8 backdrop-blur-sm" />
            <div className="absolute right-6 top-8 h-10 w-24 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute bottom-6 left-6 h-16 w-20 border border-white/12 bg-white/6 backdrop-blur-sm" />
            <div className="absolute bottom-6 right-6 h-px w-32 bg-gradient-to-r from-white/60 to-transparent" />
        </div>
    );
}
