import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { buttonClasses } from '@/components/button';
import { ArrowIcon, CheckIcon, CopyIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

/** The closing invitation on the home page: one ask, two ways to answer it. */
export function ContactBand() {
    const { site } = usePage().props;
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
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
        } catch {
            window.location.href = `mailto:${site.email}`;
        }
    };

    return (
        <div className="contact-band grid gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-20">
            <div className="lg:col-span-7">
                {site.availability.open && (
                    <p className="inline-flex items-center gap-2.5 rounded-full border border-rule-strong py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-[500]">
                        <span className="relative inline-flex size-2">
                            <span className="absolute inset-0 rounded-full bg-accent opacity-40 [animation-duration:2.4s] motion-safe:animate-ping" />
                            <span className="relative size-2 rounded-full bg-accent" />
                        </span>
                        {site.availability.label}
                    </p>
                )}

                <h2
                    id="contact-cta"
                    className="type-title mt-7 max-w-[14ch] text-[clamp(2.5rem,5.4vw,4.5rem)]"
                >
                    Have a project or a role in mind?
                </h2>
                <p className="mt-5 max-w-[42ch] text-[1.125rem] leading-relaxed text-muted">
                    Tell me what you’re building. I reply to every message
                    within one working day.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <Link
                    href="/contact"
                    className={cn(buttonClasses(), 'group pr-4')}
                >
                    Send a message
                    <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <button
                    type="button"
                    onClick={copy}
                    className={buttonClasses('secondary')}
                >
                    {copied ? (
                        <CheckIcon className="text-accent" />
                    ) : (
                        <CopyIcon />
                    )}
                    <span aria-live="polite">
                        {copied ? 'Email copied' : 'Copy email'}
                    </span>
                </button>
            </div>
        </div>
    );
}
