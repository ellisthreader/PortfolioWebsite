import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const relativeTime = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['day', 86_400],
    ['hour', 3_600],
    ['minute', 60],
];

/** "3 hours ago", "yesterday", "just now". */
export function timeAgo(iso: string, now = Date.now()): string {
    const seconds = Math.round((new Date(iso).getTime() - now) / 1000);

    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) {
            return relativeTime.format(Math.round(seconds / size), unit);
        }
    }

    return 'just now';
}

/**
 * Scales every length in a `sizes` attribute, e.g. for a screen that fills
 * 76% of its plate: "(min-width: 1320px) 1224px, 94vw" → "… calc(1224px * 0.76), calc(94vw * 0.76)".
 * Keep in step with App\Support\Portfolio\Seo::scaleSizes().
 */
export function scaleSizes(sizes: string, factor: number): string {
    return sizes
        .split(',')
        .map((part) => {
            const [, query = '', length] =
                part.trim().match(/^(\(.*\)\s+)?(.+)$/) ?? [];

            return `${query}calc(${length} * ${factor})`;
        })
        .join(', ');
}

export function hostname(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url;
    }
}
