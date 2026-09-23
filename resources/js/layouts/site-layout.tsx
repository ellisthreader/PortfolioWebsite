import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-svh flex-col">
            <a
                href="#main"
                className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-lg bg-ink px-4 py-2.5 text-[0.9375rem] font-[550] text-canvas transition-transform focus-visible:translate-y-0"
            >
                Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}
