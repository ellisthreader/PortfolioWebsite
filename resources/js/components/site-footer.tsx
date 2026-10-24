import { Link, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { SocialIcons } from '@/components/social-links';

const PAGES = [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export function SiteFooter() {
    const { site } = usePage().props;
    const year = new Date().getFullYear();

    return (
        <footer className="mt-auto border-t border-rule">
            <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-[1.0625rem] font-[620] tracking-[-0.02em] [font-stretch:112%]">
                        {site.name}
                    </p>
                    <p className="type-meta mt-0.5">
                        {site.role}, {site.location}
                    </p>
                </div>

                <nav aria-label="Footer">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
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

                <SocialIcons />
            </Container>

            <Container className="flex flex-wrap items-center justify-between gap-4 pb-10">
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
            </Container>
        </footer>
    );
}
