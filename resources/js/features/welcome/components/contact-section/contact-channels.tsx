import { Github, Linkedin, Twitter } from 'lucide-react';

// GitHub is live. ⚠️ LinkedIn href is intentionally empty for now; X is a placeholder.
const CHANNELS = [
    {
        href: 'https://github.com/ellisthreader',
        icon: Github,
        label: 'GitHub',
    },
    {
        href: '#',
        icon: Linkedin,
        label: 'LinkedIn',
    },
    {
        href: 'https://x.com',
        icon: Twitter,
        label: 'X',
    },
] as const;

export function ContactChannels() {
    return (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {CHANNELS.map((channel) => (
                <a
                    key={channel.label}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/72 transition hover:border-fuchsia-200/30 hover:bg-white/[0.06] hover:text-white"
                    href={channel.href}
                    rel="noreferrer"
                    target="_blank"
                >
                    <channel.icon
                        className="h-[1.05rem] w-[1.05rem] transition group-hover:scale-110"
                        strokeWidth={1.9}
                    />
                    {channel.label}
                </a>
            ))}
        </div>
    );
}
