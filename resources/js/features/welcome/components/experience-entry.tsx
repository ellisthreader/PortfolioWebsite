import type { ExperienceItem } from '../types';

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
    return (
        <article className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_6rem_minmax(0,1fr)] lg:items-center">
            <div className="px-2 py-2 lg:-ml-28 lg:px-0 lg:pr-10 xl:-ml-36 xl:pr-16">
                <h3 className="text-[2rem] leading-[0.98] font-semibold tracking-[-0.06em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.08)] sm:text-[2.6rem]">
                    {item.title}
                </h3>
                <p className="mt-5 text-base tracking-[0.42em] text-fuchsia-200/72 uppercase sm:text-lg">
                    {item.subtitle}
                </p>
            </div>

            <div className="relative hidden h-full items-center justify-center lg:flex">
                <span className="absolute top-1/2 right-[calc(50%+2rem)] -translate-y-1/2 text-[2.25rem] font-semibold tracking-[0.24em] text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.1)]">
                    {item.year}
                </span>
            </div>

            <div className="px-2 py-2 lg:ml-14 lg:px-0 xl:ml-20">
                <div className="mb-4 flex items-center justify-between lg:hidden">
                    <span className="text-2xl font-semibold tracking-[0.24em] text-white">
                        {item.year}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/45 to-fuchsia-400/0" />
                </div>
                <p className="text-lg leading-[1.9] font-medium text-white/66 lg:w-[calc(100%+9rem)] lg:max-w-none xl:w-[calc(100%+14rem)]">
                    {item.description}
                </p>
            </div>
        </article>
    );
}
