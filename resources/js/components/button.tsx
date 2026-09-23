import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary';

const variants: Record<Variant, string> = {
    primary:
        'bg-ink text-canvas hover:bg-[color-mix(in_oklab,var(--ink)_86%,var(--canvas))]',
    secondary:
        'border border-rule-strong text-ink hover:border-ink hover:bg-paper',
};

export function buttonClasses(
    variant: Variant = 'primary',
    className?: string,
) {
    return cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.96875rem] font-[550] whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        className,
    );
}

export function ButtonLink({
    variant = 'primary',
    className,
    ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
    return <Link className={buttonClasses(variant, className)} {...props} />;
}

export function Button({
    variant = 'primary',
    className,
    ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
    return <button className={buttonClasses(variant, className)} {...props} />;
}
