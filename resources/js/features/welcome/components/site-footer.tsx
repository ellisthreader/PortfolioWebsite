import { ArrowUp } from 'lucide-react';

import { publicAsset } from '@/lib/preview-assets';

import { Reveal, RevealText } from './scroll-reveal';
import { SectionLightColumn } from './section-light-column';

// GitHub is live. ⚠️ LinkedIn is an empty link for now; X / Instagram are placeholders.
const SOCIAL_LINKS = [
    { href: 'https://github.com/ellisthreader', label: 'GitHub' },
    { href: '#', label: 'LinkedIn' },
    { href: 'https://x.com', label: 'X' },
    { href: 'https://www.instagram.com', label: 'Instagram' },
] as const;

const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
] as const;

function ColumnHeading({ children }: { children: string }) {
    return (
        <p className="text-[0.68rem] font-medium tracking-[0.28em] text-white/38 uppercase">
            {children}
        </p>
    );
}

function ArrowLink({
    external,
    href,
    label,
}: {
    external?: boolean;
    href: string;
    label: string;
}) {
    return (
        <a
            className="group inline-flex items-center justify-between gap-6 text-base text-white/72 transition hover:text-white"
            href={href}
            rel={external ? 'noreferrer' : undefined}
            target={external ? '_blank' : undefined}
        >
            <span>{label}</span>
            <span className="text-white/38 transition group-hover:translate-x-1 group-hover:text-fuchsia-200">
                →
            </span>
        </a>
    );
}

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });

    return (
        <footer className="relative z-10 overflow-hidden bg-black px-6 pt-10 pb-16 text-white sm:px-10 sm:pt-12 sm:pb-20 lg:px-16 lg:pt-14 lg:pb-20">
            <SectionLightColumn
                className="h-[78%] w-[82rem] max-w-[96vw]"
                parallax
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black via-black/95 to-transparent"
            />
            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <RevealText>
                            <p className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(245,232,255,0.92)_44%,_rgba(217,70,239,0.66)_100%)] bg-clip-text text-3xl font-semibold tracking-[0.28em] text-transparent uppercase sm:text-4xl lg:text-[3.4rem]">
                                Ellis Threader
                            </p>
                        </RevealText>
                        <Reveal delay={0.12}>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/52 sm:text-base">
                                Full-stack developer building thoughtful,
                                performant web experiences — based in London,
                                England.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal
                        className="shrink-0 self-start lg:self-auto"
                        delay={0.2}
                    >
                        <a
                            className="inline-flex items-center rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-6 py-3 text-sm font-medium text-white transition hover:border-fuchsia-200/50 hover:bg-fuchsia-300/16"
                            download="Ellis-Threader-Resume.png"
                            href={publicAsset('/AIResume.png')}
                        >
                            Download Resume
                        </a>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    <Reveal className="space-y-5" delay={0}>
                        <ColumnHeading>Contact</ColumnHeading>
                        <a
                            className="inline-block text-white/78 transition hover:text-white"
                            href="mailto:ellis.threader3001@gmail.com"
                        >
                            ellis.threader3001@gmail.com
                        </a>
                        <p className="text-white/52">
                            London, England · UK / GMT
                        </p>
                    </Reveal>

                    <Reveal className="space-y-4" delay={0.1}>
                        <ColumnHeading>Connect</ColumnHeading>
                        <div className="flex flex-col gap-3">
                            {SOCIAL_LINKS.map((link) => (
                                <ArrowLink
                                    key={link.label}
                                    external
                                    href={link.href}
                                    label={link.label}
                                />
                            ))}
                        </div>
                    </Reveal>

                    <Reveal className="space-y-4" delay={0.2}>
                        <ColumnHeading>Navigate</ColumnHeading>
                        <div className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <ArrowLink
                                    key={link.label}
                                    href={link.href}
                                    label={link.label}
                                />
                            ))}
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {currentYear} Ellis Threader. All rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            <span className="hidden text-white/34 sm:inline">
                                Built with React · Laravel · Three.js
                            </span>
                            <button
                                className="group inline-flex items-center gap-2 text-white/60 transition hover:text-fuchsia-200"
                                onClick={scrollToTop}
                                type="button"
                            >
                                Back to top
                                <ArrowUp
                                    className="h-4 w-4 transition group-hover:-translate-y-0.5"
                                    strokeWidth={2}
                                />
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}
