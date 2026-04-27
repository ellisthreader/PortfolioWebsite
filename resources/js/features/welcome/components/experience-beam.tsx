export function ExperienceBeam({ progress }: { progress: number }) {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const top = `${clampedProgress * 100}%`;
    const height = `${clampedProgress * 100}%`;

    return (
        <div className="relative h-full w-full">
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(255,214,248,0.18)_12%,rgba(217,70,239,0.16)_48%,transparent_100%)] opacity-60" />
            <div
                className="absolute top-0 left-1/2 w-[7px] -translate-x-1/2 [animation:timeline-beam-breathe_4.6s_ease-in-out_infinite] rounded-full bg-gradient-to-b from-white via-fuchsia-100 via-fuchsia-300 via-18% via-45% to-pink-500 shadow-[0_0_34px_rgba(255,255,255,0.96),0_0_86px_rgba(217,70,239,1),0_0_190px_rgba(236,72,153,0.86),0_0_320px_rgba(244,114,182,0.36)]"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-7 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.38)_16%,_rgba(236,72,153,0.18)_56%,_transparent_100%)] opacity-90 mix-blend-screen blur-sm"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-28 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(236,72,153,0.36)_0%,_rgba(217,70,239,0.2)_42%,_transparent_100%)] opacity-90 blur-xl"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,210,245,0.2)_0%,_rgba(236,72,153,0.17)_20%,_rgba(217,70,239,0.09)_42%,_transparent_72%)] opacity-85 blur-[86px]"
                style={{ height }}
            />

            <div
                className="absolute left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                style={{ top }}
            >
                <div className="absolute inset-[-5rem] rounded-full bg-[radial-gradient(circle,_rgba(255,240,252,0.24)_0%,_rgba(244,114,182,0.2)_28%,_rgba(217,70,239,0.11)_45%,_transparent_76%)] opacity-95 mix-blend-screen blur-xl" />
                <div className="absolute inset-[-8.75rem] [animation:timeline-reflection-drift_7.4s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.3)_0%,_rgba(217,70,239,0.2)_26%,_rgba(88,28,135,0.06)_48%,_transparent_74%)] opacity-90 blur-[92px]" />
                <div className="absolute inset-[-15.5rem] rounded-full bg-[radial-gradient(circle,_rgba(255,176,235,0.17)_0%,_rgba(244,114,182,0.13)_22%,_rgba(217,70,239,0.07)_40%,_transparent_72%)] opacity-90 blur-[124px]" />
                <div className="absolute inset-0 animate-[timeline-star-pulse_2.8s_ease-in-out_infinite] rounded-full border border-white/90 bg-[radial-gradient(circle_at_35%_32%,_rgba(255,255,255,1)_0%,_rgba(255,245,252,0.96)_18%,_rgba(255,210,242,0.78)_36%,_rgba(251,113,133,0.42)_58%,_rgba(217,70,239,0.24)_76%,_rgba(255,255,255,0.08)_100%)] shadow-[0_0_42px_rgba(255,255,255,1),0_0_120px_rgba(217,70,239,1),0_0_220px_rgba(236,72,153,0.92),0_0_340px_rgba(244,114,182,0.4)]" />
                <div className="absolute inset-[20%] rounded-full bg-white/90 opacity-95 blur-[1.5px]" />
                <div className="absolute top-[18%] left-[20%] h-[26%] w-[30%] rounded-full bg-white/95 blur-[2px]" />
                <div className="absolute inset-x-[-1rem] top-1/2 h-12 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,210,242,0.42),_transparent_72%)] opacity-80 blur-xl" />
            </div>
        </div>
    );
}
