import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 20 20',
    width: 16,
    height: 16,
    'aria-hidden': true,
} as const;

/** Marks links that leave the site. */
export function ExternalIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="M7 5h8v8M15 5 5.5 14.5" />
        </svg>
    );
}

export function CopyIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <rect x="7" y="7" width="9" height="9" rx="1.8" />
            <path d="M13 4.8V4.6A1.6 1.6 0 0 0 11.4 3H4.6A1.6 1.6 0 0 0 3 4.6v6.8A1.6 1.6 0 0 0 4.6 13h.2" />
        </svg>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="m4.5 10.5 3.5 3.5 7.5-8" />
        </svg>
    );
}

export function DownloadIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="M10 3.5v9M6 8.8l4 3.9 4-3.9M4 16.5h12" />
        </svg>
    );
}

export function PaperclipIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="m15.5 9.6-5.7 5.7a3.6 3.6 0 0 1-5.1-5.1l6-6a2.4 2.4 0 0 1 3.4 3.4l-6 6a1.2 1.2 0 0 1-1.7-1.7l5.6-5.6" />
        </svg>
    );
}

export function ArrowIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="M4 10h11.5M11 5.5l4.5 4.5-4.5 4.5" />
        </svg>
    );
}

/* Brand logos keep their own colours; GitHub's mark follows currentColor. */
const logo = {
    width: 18,
    height: 18,
    'aria-hidden': true,
} as const;

export function GitHubLogo(props: IconProps) {
    return (
        <svg {...logo} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
    );
}

export function LinkedInLogo(props: IconProps) {
    return (
        <svg {...logo} viewBox="0 0 24 24" {...props}>
            <rect width="24" height="24" rx="4" fill="#0a66c2" />
            <path
                fill="#fff"
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z"
            />
        </svg>
    );
}

export function GmailLogo(props: IconProps) {
    return (
        <svg {...logo} viewBox="52 42 88 66" {...props}>
            <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
            <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
            <path
                fill="#fbbc04"
                d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"
            />
            <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
            <path
                fill="#c5221f"
                d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"
            />
        </svg>
    );
}

export function ArrowUpRightIcon(props: IconProps) {
    return (
        <svg {...base} {...props}>
            <path d="M6.5 13.5 13.5 6.5M7.5 6.5h6v6" />
        </svg>
    );
}
