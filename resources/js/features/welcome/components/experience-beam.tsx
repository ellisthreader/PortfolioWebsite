export function ExperienceBeam({ progress }: { progress: number }) {
    const top = `calc(${progress * 100}%)`;
    const height = `${progress * 100}%`;

    return (
        <div className="relative h-full w-full">
            <div
                className="absolute left-1/2 top-0 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-white via-fuchsia-100 via-18% via-fuchsia-300 via-45% to-pink-500 shadow-[0_0_34px_rgba(255,255,255,0.92),0_0_82px_rgba(217,70,239,1),0_0_190px_rgba(236,72,153,0.85),0_0_300px_rgba(244,114,182,0.34)] [animation:timeline-beam-breathe_4.6s_ease-in-out_infinite]"
                style={{ height }}
            />
            <div
                className="absolute left-1/2 top-0 w-6 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.88)_0%,_rgba(255,255,255,0.36)_16%,_rgba(236,72,153,0.16)_56%,_transparent_100%)] blur-sm opacity-90 mix-blend-screen"
                style={{ height }}
            />
            <div
                className="absolute left-1/2 top-0 w-24 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(236,72,153,0.34)_0%,_rgba(217,70,239,0.18)_42%,_transparent_100%)] blur-xl opacity-90"
                style={{ height }}
            />
            <div
                className="absolute left-1/2 top-0 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,210,245,0.18)_0%,_rgba(236,72,153,0.16)_20%,_rgba(217,70,239,0.08)_42%,_transparent_72%)] blur-[84px] opacity-85"
                style={{ height }}
            />

            <div
                className="absolute left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2"
                style={{ top }}
            >
                <div className="absolute inset-[-4.5rem] rounded-full bg-[radial-gradient(circle,_rgba(255,240,252,0.22)_0%,_rgba(244,114,182,0.18)_28%,_rgba(217,70,239,0.1)_45%,_transparent_76%)] blur-xl opacity-95 mix-blend-screen" />
                <div className="absolute inset-[-8rem] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.28)_0%,_rgba(217,70,239,0.18)_26%,_rgba(88,28,135,0.05)_48%,_transparent_74%)] blur-[90px] opacity-90 [animation:timeline-reflection-drift_7.4s_ease-in-out_infinite]" />
                <div className="absolute inset-[-15rem] rounded-full bg-[radial-gradient(circle,_rgba(255,176,235,0.16)_0%,_rgba(244,114,182,0.12)_22%,_rgba(217,70,239,0.06)_40%,_transparent_72%)] blur-[120px] opacity-90" />
                <div className="absolute inset-0 rounded-full border border-white/90 bg-[radial-gradient(circle_at_35%_32%,_rgba(255,255,255,1)_0%,_rgba(255,245,252,0.96)_18%,_rgba(255,210,242,0.78)_36%,_rgba(251,113,133,0.42)_58%,_rgba(217,70,239,0.24)_76%,_rgba(255,255,255,0.08)_100%)] shadow-[0_0_42px_rgba(255,255,255,1),0_0_120px_rgba(217,70,239,1),0_0_220px_rgba(236,72,153,0.92),0_0_340px_rgba(244,114,182,0.4)] animate-[timeline-star-pulse_2.8s_ease-in-out_infinite]" />
                <div className="absolute inset-[20%] rounded-full bg-white/90 blur-[1.5px] opacity-95" />
                <div className="absolute left-[20%] top-[18%] h-[26%] w-[30%] rounded-full bg-white/95 blur-[2px]" />
                <div className="absolute inset-x-[-1rem] top-1/2 h-12 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,210,242,0.42),_transparent_72%)] blur-xl opacity-80" />
            </div>
        </div>
    );
}
