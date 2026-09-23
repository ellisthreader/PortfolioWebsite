import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

/** The email address as a mailto link, with a copy button that confirms inline. */
export function CopyEmail({
    className,
    size = 'md',
}: {
    className?: string;
    size?: 'md' | 'lg';
}) {
    const { email } = usePage().props.site;
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timer = window.setTimeout(() => setCopied(false), 2200);

        return () => window.clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <div
            className={cn(
                'flex flex-wrap items-center gap-x-4 gap-y-2',
                className,
            )}
        >
            <a
                href={`mailto:${email}`}
                className={cn(
                    'link font-[520] break-all',
                    size === 'lg'
                        ? 'text-[clamp(1.25rem,3.2vw,2rem)] tracking-[-0.02em] [font-stretch:108%]'
                        : 'text-[1.0625rem]',
                )}
            >
                {email}
            </a>
            <button
                type="button"
                onClick={copy}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rule-strong px-3 text-[0.875rem] font-[500] text-muted transition-colors hover:border-ink hover:text-ink"
            >
                {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
    );
}
