import { Link, usePage } from '@inertiajs/react';
import { Availability } from '@/components/availability';
import { Container } from '@/components/container';
import { SocialIcons } from '@/components/social-links';

const PAGES = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export function SiteFooter() {
    const { site } = usePage().props;
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-rule">
            <Container className="grid gap-10 py-12 sm:py-14 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-6">
                    <p className="text-[1.0625rem] font-[620] tracking-[-0.02em] [font-stretch:112%]">
                        {site.name}
                    </p>
                    <p className="type-meta mt-1">
                        {site.role}, {site.location}
                    </p>
                    <Availability className="mt-5 text-[0.9375rem]" />
                </div>

                <nav aria-label="Footer" className="md:col-span-3">
                    <h2 className="type-meta">Pages</h2>
                    <ul className="mt-3 space-y-2 text-[0.9375rem]">
                        {PAGES.map((page) => (
                            <li key={page.href}>
                                <Link
                                    href={page.href}
                                    className="text-muted transition-colors hover:text-ink"
                                >
                                    {page.label}
                                </Link>
                            </li>
                        ))}
                        {site.cv && (
                            <li>
                                <a
                                    href={site.cv}
                                    className="text-muted transition-colors hover:text-ink"
                                >
                                    CV (PDF)
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="md:col-span-3">
                    <h2 className="type-meta">Elsewhere</h2>
                    <SocialIcons className="mt-3" />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 md:col-span-12">
                    <p className="type-meta">
                        © {year} {site.name}
                    </p>
                    <a
                        href="#top"
                        onClick={(event) => {
                            event.preventDefault();
                            window.scrollTo({
                                top: 0,
                                behavior: window.matchMedia(
                                    '(prefers-reduced-motion: reduce)',
                                ).matches
                                    ? 'auto'
                                    : 'smooth',
                            });
                        }}
                        className="type-meta transition-colors hover:text-ink"
                    >
                        Back to top ↑
                    </a>
                </div>
            </Container>
        </footer>
    );
}
