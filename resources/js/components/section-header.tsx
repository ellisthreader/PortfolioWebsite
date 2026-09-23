import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** The rule, title and aside that open every home page section. */
export function SectionHeader({
    id,
    title,
    aside,
    className,
}: {
    id: string;
    title: string;
    aside?: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'grid gap-5 border-t border-ink pt-6 lg:grid-cols-12 lg:items-end',
                className,
            )}
        >
            <h2 id={id} className="type-title lg:col-span-7">
                {title}
            </h2>
            {aside && (
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 lg:col-span-5 lg:justify-end">
                    {aside}
                </div>
            )}
        </div>
    );
}
