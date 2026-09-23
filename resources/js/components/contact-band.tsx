import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { buttonClasses } from '@/components/button';
import { ArrowIcon, CheckIcon, CopyIcon } from '@/components/icons';
import { SocialChannels } from '@/components/social-links';
import { cn } from '@/lib/utils';

/** The closing invitation on the home page: one ask, then every way to reach me. */
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
        <div className="contact-band">
            <div className="relative grid gap-12 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
                <div className="flex flex-col lg:col-span-7">
                    {site.availability.open && (
                        <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-rule-strong bg-canvas/60 py-1.5 pr-3.5 pl-3 text-[0.8125rem] font-[500]">
                            <span className="relative inline-flex size-2">
                                <span className="absolute inset-0 rounded-full bg-accent opacity-40 [animation-duration:2.4s] motion-safe:animate-ping" />
                                <span className="relative size-2 rounded-full bg-accent" />
                            </span>
                            {site.availability.label}
                        </p>
                    )}

                    <h2
                        id="contact-cta"
                        className="type-title mt-8 max-w-[15ch] text-[clamp(2.5rem,5vw,4.25rem)] text-balance"
                    >
                        Have a project or a role{' '}
                        <span className="text-muted">in mind?</span>
                    </h2>
                    <p className="mt-6 max-w-[40ch] text-[1.125rem] leading-relaxed text-muted">
                        Tell me what you’re building. I reply to every message
                        within one working day.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3 lg:mt-auto lg:pt-10">
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

                <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
                    <div className="channels-panel">
                        <p className="type-meta px-3 pt-1 pb-2">Find me on</p>
                        <SocialChannels />
                    </div>
                    <p className="type-meta mt-5 px-1">
                        {site.role} · {site.location}
                    </p>
                </div>
            </div>
        </div>
    );
}
