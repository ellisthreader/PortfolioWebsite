import { cn } from '@/lib/utils';

// Pure radial-gradient glow — no `blur()` filters (a gradient that fades to
// transparent is already a soft glow). These render once per project card
// inside a scrolling track, so the old blur layers were ~30 GPU render
// surfaces and the main projects lag. Stops fade well inside the box so the
// glow stays contained behind the image and never spills above the frame.
export function AmbientSectionGlow({
    className,
    variant = 'default',
}: {
    className?: string;
    variant?: 'default' | 'assistant' | 'property' | 'relay';
}) {
    if (variant === 'assistant') {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute rounded-full',
                    className,
                )}
            >
                <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.2)_0%,_rgba(168,85,247,0.16)_34%,_rgba(217,70,239,0.08)_56%,_transparent_74%)] opacity-80" />
                <div className="absolute inset-x-[18%] top-[20%] bottom-[12%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_rgba(125,211,252,0.1)_30%,_transparent_70%)] opacity-70" />
            </div>
        );
    }

    if (variant === 'property') {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute rounded-full',
                    className,
                )}
            >
                <div className="absolute inset-[-4%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.34)_0%,_rgba(245,158,11,0.22)_34%,_rgba(120,53,15,0.11)_56%,_transparent_76%)] opacity-100" />
                <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.18)_0%,_rgba(253,230,138,0.16)_28%,_rgba(180,83,9,0.09)_54%,_transparent_72%)] opacity-95" />
                <div className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle,_rgba(252,211,77,0.23)_0%,_rgba(217,119,6,0.12)_44%,_transparent_70%)] opacity-85" />
            </div>
        );
    }

    if (variant === 'relay') {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute rounded-full',
                    className,
                )}
            >
                <div className="absolute inset-[-3%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.34)_0%,_rgba(59,130,246,0.22)_34%,_rgba(15,118,110,0.1)_58%,_transparent_76%)] opacity-100" />
                <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.18)_0%,_rgba(125,211,252,0.16)_28%,_rgba(20,184,166,0.09)_54%,_transparent_72%)] opacity-95" />
                <div className="absolute inset-x-[16%] top-[6%] bottom-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.21)_0%,_rgba(13,148,136,0.12)_48%,_transparent_72%)] opacity-90" />
            </div>
        );
    }

    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute rounded-full',
                className,
            )}
        >
            <div className="absolute inset-[0%] rounded-full bg-[radial-gradient(circle,_rgba(255,235,250,0.32)_0%,_rgba(244,114,182,0.22)_30%,_rgba(217,70,239,0.12)_50%,_transparent_70%)] opacity-100" />
            <div className="absolute inset-[-7%] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.26)_0%,_rgba(217,70,239,0.15)_32%,_rgba(88,28,135,0.06)_54%,_transparent_72%)] opacity-95" />
        </div>
    );
}
