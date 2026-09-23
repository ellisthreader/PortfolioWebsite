import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import {
    ArrowUpRightIcon,
    GitHubLogo,
    GmailLogo,
    LinkedInLogo,
} from '@/components/icons';
import { cn } from '@/lib/utils';

type Social = {
    href: string;
    label: string;
    handle: string;
    logo: ReactNode;
};

/** Gmail, LinkedIn and GitHub, from config/portfolio.php. Missing links are hidden. */
export function useSocials(): Social[] {
    const { site } = usePage().props;

    return [
        {
            href: `mailto:${site.email}`,
            label: 'Gmail',
            handle: site.email,
            logo: <GmailLogo />,
        },
        site.links.linkedin && {
            href: site.links.linkedin,
            label: 'LinkedIn',
            handle: site.name,
            logo: <LinkedInLogo />,
        },
        site.links.github && {
            href: site.links.github,
            label: 'GitHub',
            handle: `@${site.links.github.split('/').filter(Boolean).pop()}`,
            logo: <GitHubLogo />,
        },
    ].filter(Boolean) as Social[];
}

const external = (href: string) =>
    href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {};

/** Small round logo buttons: quiet in greyscale, full colour on hover. */
export function SocialIcons({ className }: { className?: string }) {
    const socials = useSocials();

    return (
        <ul className={cn('flex items-center gap-2', className)}>
            {socials.map((item) => (
                <li key={item.label}>
                    <a
                        href={item.href}
                        aria-label={item.label}
                        title={`${item.label}: ${item.handle}`}
                        {...external(item.href)}
                        className="social-icon inline-flex size-11 items-center justify-center rounded-full border border-rule-strong text-ink transition-[border-color,background-color,transform] duration-200 hover:-translate-y-px hover:border-ink hover:bg-paper"
                    >
                        {item.logo}
                    </a>
                </li>
            ))}
        </ul>
    );
}

/** Each channel as a row with its logo on a white tile, like an app icon. */
export function SocialChannels({
    className,
    exclude = [],
}: {
    className?: string;
    /** Labels to leave out, e.g. ['Gmail'] where the email is shown already. */
    exclude?: string[];
}) {
    const socials = useSocials().filter(
        (item) => !exclude.includes(item.label),
    );

    return (
        <ul className={cn('channels', className)}>
            {socials.map((item) => (
                <li key={item.label}>
                    <a
                        href={item.href}
                        {...external(item.href)}
                        className="group flex items-center gap-4 rounded-[14px] p-3 transition-colors duration-200 hover:bg-[color-mix(in_oklab,var(--ink)_5%,transparent)] sm:gap-5"
                    >
                        <span className="logo-tile">{item.logo}</span>
                        <span className="min-w-0 flex-1">
                            <span className="block font-[580] tracking-[-0.01em]">
                                {item.label}
                            </span>
                            <span className="type-meta block truncate">
                                {item.handle}
                            </span>
                        </span>
                        <span
                            aria-hidden
                            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-[transform,color,background-color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-canvas"
                        >
                            <ArrowUpRightIcon width={15} height={15} />
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
