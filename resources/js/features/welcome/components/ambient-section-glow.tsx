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
    variant?: 'default' | 'accountant' | 'chatora';
}) {
    if (variant === 'accountant') {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute rounded-full',
                    className,
                )}
            >
                <div className="absolute inset-[-4%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.38)_0%,_rgba(217,70,239,0.26)_34%,_rgba(244,114,182,0.13)_56%,_transparent_76%)] opacity-100" />
                <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_rgba(232,121,249,0.18)_28%,_rgba(124,58,237,0.1)_54%,_transparent_72%)] opacity-95" />
                <div className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle,_rgba(232,121,249,0.26)_0%,_rgba(244,114,182,0.13)_44%,_transparent_70%)] opacity-85" />
            </div>
        );
    }

    if (variant === 'chatora') {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pointer-events-none absolute rounded-full',
                    className,
                )}
            >
                <div className="absolute inset-[-3%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.4)_0%,_rgba(217,70,239,0.24)_34%,_rgba(76,29,149,0.12)_58%,_transparent_76%)] opacity-100" />
                <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.22)_0%,_rgba(192,132,252,0.19)_28%,_rgba(217,70,239,0.1)_54%,_transparent_72%)] opacity-95" />
                <div className="absolute inset-x-[16%] top-[6%] bottom-[18%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.24)_0%,_rgba(124,58,237,0.13)_48%,_transparent_72%)] opacity-90" />
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
