import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const NAV_ITEMS = ['Home', 'About', 'Projects', 'Skills', 'Contact'] as const;
const SOCIAL_LINKS = [
    { href: 'https://github.com/ellisthreader', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://x.com', icon: Twitter, label: 'X' },
    { href: 'https://www.instagram.com', icon: Instagram, label: 'Instagram' },
] as const;

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
                            className={`relative transition hover:text-fuchsia-300 ${
                                item === 'Home'
                                    ? 'text-fuchsia-400 after:absolute after:-bottom-3 after:left-0 after:h-px after:w-full after:bg-fuchsia-400'
                                    : ''
                            }`}
                            href={
                                item === 'Home'
                                    ? '#home'
                                    : `#${item.toLowerCase()}`
                            }
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
        <div className="absolute right-[2.4rem] bottom-[2.15rem] z-30 hidden items-center gap-5 lg:flex xl:right-[3.1rem] xl:bottom-[2.5rem]">
            {SOCIAL_LINKS.map((link) => (
                <a
                    key={link.label}
                    aria-label={link.label}
                    className="group relative flex h-8 w-8 items-center justify-center text-fuchsia-200/88 transition duration-300 hover:text-black"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-[-1rem] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.32)_0%,rgba(168,85,247,0.16)_28%,rgba(7,2,18,0)_68%)] opacity-0 blur-xl transition duration-300 group-hover:opacity-100"
                    />
                    <span
                        aria-hidden="true"
                        className="absolute inset-[-0.3rem] rounded-full bg-fuchsia-400/0 transition duration-300 group-hover:bg-fuchsia-300/78 group-hover:blur-[18px]"
                    />
                    <link.icon
                        className="relative z-10 h-5 w-5 transition duration-300"
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
