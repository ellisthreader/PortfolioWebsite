import type { ComponentProps, ElementType } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps<T extends ElementType> = {
    as?: T;
} & ComponentProps<T>;

export function Container<T extends ElementType = 'div'>({
    as,
    className,
    ...props
}: ContainerProps<T>) {
    const Component = as ?? 'div';

    return (
        <Component
            className={cn(
                'mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12',
                className,
            )}
            {...props}
        />
    );
}
