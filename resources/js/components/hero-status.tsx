import { Deferred, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Availability } from '@/components/availability';
import { cn, timeAgo } from '@/lib/utils';
import type { LatestPush } from '@/types/portfolio';

const londonTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
});

/** Live details beside the name: availability, the time in London, the latest push. */
export function HeroStatus({
    latestPush,
    className,
}: {
    latestPush?: LatestPush | null;
    className?: string;
}) {
    const { location } = usePage().props.site;
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 15_000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <div className={cn('type-meta space-y-1.5', className)}>
            <Availability className="text-ink" />
            <p>
                <time
                    dateTime={now.toISOString()}
                    className="text-ink tabular-nums"
                >
                    {londonTime.format(now)}
                </time>{' '}
                in {location.split(',')[0]}
            </p>
            <Deferred data="latestPush" fallback={null}>
                <LatestPushLine push={latestPush} />
            </Deferred>
        </div>
    );
}

function LatestPushLine({ push }: { push?: LatestPush | null }) {
    if (!push) {
        return null;
    }

    return (
        <p>
            Last pushed to{' '}
            <a
                href={push.url}
                target="_blank"
                rel="noreferrer"
                className="link text-ink"
            >
                {push.repo}
            </a>{' '}
            <time dateTime={push.pushedAt}>{timeAgo(push.pushedAt)}</time>
        </p>
    );
}
