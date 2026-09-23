import { usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export function Availability({ className }: { className?: string }) {
    const { availability } = usePage().props.site;

    if (!availability.open) {
        return null;
    }

    return (
        <p className={cn('flex items-baseline gap-2.5', className)}>
            <span className="relative top-[-0.1em] inline-flex size-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-accent opacity-35 [animation-duration:2.4s] motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-accent" />
            </span>
            <span>{availability.label}</span>
        </p>
    );
}
