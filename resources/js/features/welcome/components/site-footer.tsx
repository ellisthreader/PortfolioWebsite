import { AmbientSectionGlow } from './ambient-section-glow';

const SOCIAL_LINKS = [
    {
        href: 'https://github.com/ellisthreader',
        label: 'GitHub',
    },
    {
        href: 'https://www.linkedin.com',
        label: 'LinkedIn',
    },
    {
        href: 'https://x.com',
        label: 'X',
    },
    {
        href: 'https://www.instagram.com',
        label: 'Instagram',
    },
] as const;

export function SiteFooter() {
    return (
        <footer className="relative z-10 overflow-hidden bg-black px-6 pt-18 pb-16 text-white sm:px-10 sm:pt-20 sm:pb-20 lg:px-16 lg:pt-24 lg:pb-24">
            <AmbientSectionGlow className="top-[13rem] left-1/2 h-[18rem] w-[58rem] -translate-x-1/2 opacity-70" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black via-black/95 to-transparent"
            />
            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(245,232,255,0.92)_44%,_rgba(217,70,239,0.66)_100%)] bg-clip-text text-3xl font-semibold tracking-[0.28em] text-transparent uppercase sm:text-4xl lg:text-[3.4rem]">
                        Ellis Threader
                    </p>
                </div>

                <div className="mt-14 grid gap-14 text-sm text-white/68 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr]">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[0.68rem] font-medium tracking-[0.28em] text-white/38 uppercase">
                                    Email
                                </p>
                                <a
                                    className="mt-2 inline-block text-white/78 transition hover:text-white"
                                    href="mailto:ellis.threader3001@gmail.com"
                                >
                                    ellis.threader3001@gmail.com
                                </a>
                            </div>

                            <div>
                                <p className="text-[0.68rem] font-medium tracking-[0.28em] text-white/38 uppercase">
                                    Location
                                </p>
                                <p className="mt-2 text-white/78">
                                    London, England
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 self-start">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={`${link.label}-text`}
                                    className="group inline-flex items-center justify-between gap-6 text-base text-white/78 transition hover:text-white"
                                    href={link.href}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <span>{link.label}</span>
                                    <span className="text-white/42 transition group-hover:translate-x-1 group-hover:text-fuchsia-200">
                                        →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:text-right">
                        <p className="text-[0.68rem] font-medium tracking-[0.28em] text-white/38 uppercase">
                            Developed By
                        </p>
                        <p className="mt-2 text-white/78">Ellis Threader</p>

                        <div className="mt-5">
                            <a
                                className="inline-flex items-center rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-fuchsia-200/50 hover:bg-fuchsia-300/16"
                                download="Ellis-Threader-Resume.png"
                                href="/AIResume.png"
                            >
                                Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
