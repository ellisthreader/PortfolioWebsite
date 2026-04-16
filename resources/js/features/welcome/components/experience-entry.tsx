import type { ExperienceItem } from '../types';

export function ExperienceEntry({ item }: { item: ExperienceItem }) {
    return (
        <article
            className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:items-center"
        >
            <div className="px-2 py-5 lg:-ml-20 lg:px-0 lg:pr-12 xl:-ml-28 xl:pr-20">
                <h3 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                    {item.title}
                </h3>
                <p className="mt-3 text-lg uppercase tracking-[0.32em] text-fuchsia-200/72 sm:text-xl">
                    {item.subtitle}
                </p>
            </div>

            <div className="relative hidden h-full items-center justify-center lg:flex">
                <span className="absolute right-[calc(50%+2rem)] top-1/2 -translate-y-1/2 text-4xl font-semibold tracking-[0.2em] text-fuchsia-100/95">
                    {item.year}
                </span>
            </div>

            <div className="px-2 py-5 lg:ml-12 lg:px-0 xl:ml-20">
                <div className="mb-4 flex items-center justify-between lg:hidden">
                    <span className="text-2xl font-semibold tracking-[0.24em] text-fuchsia-100/92">
                        {item.year}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400/45 to-fuchsia-400/0" />
                </div>
                <p className="text-lg leading-8 text-white/70">{item.description}</p>
            </div>
        </article>
    );
}
