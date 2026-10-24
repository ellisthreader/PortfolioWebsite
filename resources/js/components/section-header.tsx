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
                'flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-ink pt-5',
                className,
            )}
        >
            <h2 id={id} className="type-heading">
                {title}
            </h2>
            {aside}
        </div>
    );
}
