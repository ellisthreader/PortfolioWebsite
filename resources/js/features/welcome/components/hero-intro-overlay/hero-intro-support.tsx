import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import type { MouseEvent } from 'react';

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Contact'] as const;
const SOCIAL_LINKS = [
    { href: 'https://github.com/ellisthreader', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://x.com', icon: Twitter, label: 'X' },
    { href: 'https://www.instagram.com', icon: Instagram, label: 'Instagram' },
] as const;

let navScrollFrame = 0;
let navScrollBlurTimeout = 0;

function getNavHref(item: (typeof NAV_ITEMS)[number]) {
    return item === 'Home' ? '#home' : `#${item.toLowerCase()}`;
}

function easeOutQuart(progress: number) {
    return 1 - Math.pow(1 - progress, 4);
}

function scrollToSection(top: number, reduceMotion: boolean) {
    window.cancelAnimationFrame(navScrollFrame);
    window.clearTimeout(navScrollBlurTimeout);

    if (reduceMotion) {
        window.scrollTo({ top });
        return;
    }

    const startY = window.scrollY;
    const distance = top - startY;
    const duration = Math.min(620, Math.max(280, Math.abs(distance) * 0.2));
    const startTime = performance.now();

    document.body.dataset.navScrolling = 'true';

    const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
            navScrollFrame = window.requestAnimationFrame(tick);
            return;
        }

        window.scrollTo(0, top);
        navScrollBlurTimeout = window.setTimeout(() => {
            delete document.body.dataset.navScrolling;
        }, 90);
    };

    navScrollFrame = window.requestAnimationFrame(tick);
}

function handleNavClick(
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof NAV_ITEMS)[number],
) {
    const href = getNavHref(item);
    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
        return;
    }

    event.preventDefault();

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;
    const top =
        item === 'Home'
            ? 0
            : window.scrollY + target.getBoundingClientRect().top;
    const shouldJumpInstantly = item === 'Skills' || item === 'Contact';

    window.history.pushState(null, '', href);
    scrollToSection(top, reduceMotion || shouldJumpInstantly);
}

export const STATS = [
    ['10+', 'Projects'],
    ['2+', 'Years Experience'],
    ['5+', 'Technologies'],
] as const;

export const TECH_BADGES = [
    ['left-[4%] top-[10%] text-[3.45rem] text-cyan-300', 'React', '⚛'],
    [
        'left-[0%] top-[58%] text-[3.2rem] font-black text-yellow-300',
        'JavaScript',
        'JS',
    ],
    ['right-[6%] top-[18%] text-[3rem] text-orange-500', 'Laravel', '⌁'],
    [
        'right-[0%] top-[60%] text-[1.9rem] font-black text-sky-300',
        'CSS',
        'CSS',
    ],
] as const;

export function HeroNav() {
    return (
        <header className="absolute top-0 right-0 left-0 z-40">
            <div className="mx-auto flex h-28 max-w-[1450px] items-center justify-center px-8 sm:px-12 lg:px-20">
                <nav
                    aria-label="Primary"
                    className="hidden items-center gap-10 text-[1.32rem] font-semibold text-white/82 lg:flex"
                >
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item}
                            className={`pointer-events-auto relative transition hover:text-fuchsia-300 ${
                                item === 'Home'
                                    ? 'text-fuchsia-400 after:absolute after:-bottom-3 after:left-0 after:h-px after:w-full after:bg-fuchsia-400'
                                    : ''
                            }`}
                            href={getNavHref(item)}
                            onClick={(event) => handleNavClick(event, item)}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export function SocialRail() {
    return (
        <div className="absolute top-1/2 left-[2.4rem] z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:left-[3.1rem]">
            {SOCIAL_LINKS.map((link) => (
                <a
                    key={link.label}
                    aria-label={link.label}
                    className="group pointer-events-auto relative flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-300/0 text-fuchsia-200/78 transition duration-300 hover:border-fuchsia-200/70 hover:bg-fuchsia-300/12 hover:text-fuchsia-50 hover:shadow-[0_0_22px_rgba(217,70,239,0.46),inset_0_0_14px_rgba(217,70,239,0.14)]"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-[-1.05rem] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.5)_0%,rgba(168,85,247,0.24)_32%,rgba(7,2,18,0)_70%)] opacity-0 blur-xl transition duration-500 group-hover:scale-125 group-hover:opacity-100"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute inset-[-0.2rem] rounded-full bg-[conic-gradient(from_160deg,rgba(236,72,153,0),rgba(236,72,153,0.72),rgba(168,85,247,0.52),rgba(236,72,153,0))] opacity-0 blur-[10px] transition duration-500 group-hover:rotate-45 group-hover:opacity-70"
                    />
                    <link.icon
                        className="relative z-10 h-5 w-5 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                        strokeWidth={2.35}
                    />
                </a>
            ))}
        </div>
    );
}

export function OrbitBadge({
    className,
    label,
    symbol,
}: {
    className: string;
    label: string;
    symbol: string;
}) {
    return (
        <div
            aria-label={label}
            className={`absolute z-20 flex h-[7rem] w-[7rem] items-center justify-center rounded-[1.1rem] border border-white/7 bg-[linear-gradient(145deg,rgba(96,42,132,0.72),rgba(17,8,35,0.95))] shadow-[0_0_38px_rgba(217,70,239,0.24),inset_0_1px_12px_rgba(255,255,255,0.1)] backdrop-blur-md ${className}`}
        >
            <span className="leading-none drop-shadow-[0_0_16px_currentColor]">
                {symbol}
            </span>
        </div>
    );
}
