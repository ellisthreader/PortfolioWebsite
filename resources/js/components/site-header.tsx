import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';

const NAV = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
    const { url, props } = usePage();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200',
                scrolled
                    ? 'border-rule bg-[color-mix(in_oklab,var(--canvas)_86%,transparent)] backdrop-blur-md backdrop-saturate-150'
                    : 'border-transparent',
            )}
        >
            <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
                <Link
                    href="/"
                    className="text-[1.0625rem] font-[620] tracking-[-0.02em] [font-stretch:112%]"
                >
                    {props.site.name}
                </Link>

                <nav aria-label="Main">
                    <ul className="flex items-center gap-1 sm:gap-2">
                        {NAV.map((item) => {
                            const active = url.startsWith(item.href);

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={cn(
                                            'relative inline-flex h-10 items-center rounded-lg px-2.5 text-[0.96875rem] font-[500] transition-colors duration-150 sm:px-3',
                                            active
                                                ? 'text-ink'
                                                : 'text-muted hover:text-ink',
                                        )}
                                    >
                                        {item.label}
                                        {active && (
                                            <span
                                                aria-hidden
                                                className="absolute inset-x-2.5 bottom-1.5 h-px bg-accent sm:inset-x-3"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
