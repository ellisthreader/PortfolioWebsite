import type { ExperienceItem } from '../types';

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
    return (
        <article
            className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:items-center"
        >
            <div className="px-2 py-2 lg:-ml-24 lg:px-0 lg:pr-10 xl:-ml-32 xl:pr-16">
                <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-white sm:text-[2.6rem]">
                    {item.title}
                </h3>
                <p className="mt-2 text-base uppercase tracking-[0.28em] text-fuchsia-200/72 sm:text-lg">
                    {item.subtitle}
                </p>
            </div>

            <div className="relative hidden h-full items-center justify-center lg:flex">
                <span className="absolute right-[calc(50%+2rem)] top-1/2 -translate-y-1/2 text-4xl font-semibold tracking-[0.2em] text-white">
                    {item.year}
                </span>
            </div>

            <div className="px-2 py-2 lg:ml-12 lg:px-0 xl:ml-16">
                <div className="mb-4 flex items-center justify-between lg:hidden">
                    <span className="text-2xl font-semibold tracking-[0.24em] text-white">
                        {item.year}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/45 to-fuchsia-400/0" />
                </div>
                <p className="text-lg leading-8 text-white/70 lg:max-w-none lg:w-[calc(100%+9rem)] xl:w-[calc(100%+14rem)]">
                    {item.description}
                </p>
            </div>
        </article>
    );
}
