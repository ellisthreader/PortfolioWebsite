import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CONTACT_EMAIL } from './contact-config';

export function ContactEmailCard() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timer = window.setTimeout(() => setCopied(false), 1800);

        return () => window.clearTimeout(timer);
    }, [copied]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="mx-auto mt-9 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md sm:flex-row sm:items-center sm:gap-2 sm:pl-6">
            <p className="flex-1 truncate text-center text-base font-medium tracking-tight text-white/90 sm:text-left sm:text-lg">
                {CONTACT_EMAIL}
            </p>
            <div className="flex items-center justify-center gap-2">
                <button
                    aria-label="Copy email address"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm font-medium text-white/80 transition hover:border-fuchsia-200/30 hover:bg-white/[0.07] hover:text-white"
                    onClick={handleCopy}
                    type="button"
                >
                    {copied ? (
                        <Check
                            className="h-4 w-4 text-emerald-300"
                            strokeWidth={2.2}
                        />
                    ) : (
                        <Copy className="h-4 w-4" strokeWidth={2} />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
                <a
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 text-sm font-medium text-white transition hover:border-fuchsia-200/50 hover:bg-fuchsia-300/16"
                    href={`mailto:${CONTACT_EMAIL}`}
                >
                    Email me
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </a>
            </div>
        </div>
    );
}
