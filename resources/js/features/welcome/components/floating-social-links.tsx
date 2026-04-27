import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const SOCIAL_LINKS = [
    {
        accent: 'group-hover:border-fuchsia-200/80 group-hover:bg-[linear-gradient(135deg,rgba(255,170,214,0.98)_0%,rgba(244,114,182,0.95)_32%,rgba(217,70,239,0.96)_68%,rgba(168,85,247,0.98)_100%)] group-hover:text-black group-hover:shadow-[0_0_26px_rgba(244,114,182,0.5),0_0_54px_rgba(217,70,239,0.46),0_0_96px_rgba(217,70,239,0.32)]',
        href: 'https://github.com/ellisthreader',
        icon: Github,
        label: 'GitHub',
    },
    {
        accent: 'group-hover:border-fuchsia-200/80 group-hover:bg-[linear-gradient(135deg,rgba(255,170,214,0.98)_0%,rgba(244,114,182,0.95)_32%,rgba(217,70,239,0.96)_68%,rgba(168,85,247,0.98)_100%)] group-hover:text-black group-hover:shadow-[0_0_26px_rgba(244,114,182,0.5),0_0_54px_rgba(217,70,239,0.46),0_0_96px_rgba(217,70,239,0.32)]',
        href: 'https://www.linkedin.com',
        icon: Linkedin,
        label: 'LinkedIn',
    },
    {
        accent: 'group-hover:border-fuchsia-200/80 group-hover:bg-[linear-gradient(135deg,rgba(255,170,214,0.98)_0%,rgba(244,114,182,0.95)_32%,rgba(217,70,239,0.96)_68%,rgba(168,85,247,0.98)_100%)] group-hover:text-black group-hover:shadow-[0_0_26px_rgba(244,114,182,0.5),0_0_54px_rgba(217,70,239,0.46),0_0_96px_rgba(217,70,239,0.32)]',
        href: 'https://x.com',
        icon: Twitter,
        label: 'X',
    },
    {
        accent: 'group-hover:border-fuchsia-200/80 group-hover:bg-[linear-gradient(135deg,rgba(255,170,214,0.98)_0%,rgba(244,114,182,0.95)_32%,rgba(217,70,239,0.96)_68%,rgba(168,85,247,0.98)_100%)] group-hover:text-black group-hover:shadow-[0_0_26px_rgba(244,114,182,0.5),0_0_54px_rgba(217,70,239,0.46),0_0_96px_rgba(217,70,239,0.32)]',
        href: 'https://www.instagram.com',
        icon: Instagram,
        label: 'Instagram',
    },
] as const;

export function FloatingSocialLinks() {
    return (
        <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-3 sm:bottom-8 sm:left-6 lg:bottom-10 lg:left-8">
            {SOCIAL_LINKS.map((link) => (
                <a
                    key={link.label}
                    aria-label={link.label}
                    className={`group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white backdrop-blur-md transition duration-300 ease-out ${link.accent}`}
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                >
                    <link.icon
                        className="h-[1.05rem] w-[1.05rem] transition duration-300 group-hover:scale-110 group-hover:text-black group-hover:drop-shadow-none"
                        strokeWidth={1.9}
                    />
                </a>
            ))}
        </div>
    );
}
