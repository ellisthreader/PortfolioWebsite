import { cn } from '@/lib/utils';

export function AmbientSectionGlow({ className }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute rounded-full',
                className,
            )}
        >
            <div className="absolute inset-[-4%] rounded-full bg-[radial-gradient(circle,_rgba(255,240,252,0.22)_0%,_rgba(244,114,182,0.18)_26%,_rgba(217,70,239,0.1)_46%,_transparent_74%)] opacity-95 blur-2xl" />
            <div className="absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.28)_0%,_rgba(217,70,239,0.18)_24%,_rgba(88,28,135,0.06)_48%,_transparent_76%)] opacity-85 blur-[72px]" />
            <div className="absolute inset-[-26%] rounded-full bg-[radial-gradient(circle,_rgba(255,176,235,0.14)_0%,_rgba(244,114,182,0.1)_22%,_rgba(217,70,239,0.06)_42%,_transparent_72%)] opacity-75 blur-[108px]" />
        </div>
    );
}
