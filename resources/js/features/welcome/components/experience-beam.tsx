export function ExperienceBeam({ progress }: { progress: number }) {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const top = `${clampedProgress * 100}%`;
    const height = `${clampedProgress * 100}%`;

    return (
        <div className="relative h-full w-full">
            <div
                className="absolute top-0 left-1/2 w-[7px] -translate-x-1/2 [animation:timeline-beam-breathe_4.6s_ease-in-out_infinite] rounded-full bg-gradient-to-b from-white via-fuchsia-50 via-fuchsia-200 via-18% via-45% to-pink-400 shadow-[0_0_34px_rgba(255,255,255,1),0_0_92px_rgba(217,70,239,1),0_0_168px_rgba(236,72,153,0.78),0_0_240px_rgba(244,114,182,0.28)]"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-9 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.52)_16%,_rgba(236,72,153,0.26)_56%,_transparent_100%)] opacity-100 mix-blend-screen blur-sm"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-24 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,_rgba(236,72,153,0.48)_0%,_rgba(217,70,239,0.26)_42%,_transparent_100%)] opacity-92 blur-lg"
                style={{ height }}
            />
            <div
                className="absolute top-0 left-1/2 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,210,245,0.18)_0%,_rgba(236,72,153,0.16)_28%,_rgba(217,70,239,0.07)_52%,_transparent_78%)] opacity-78 blur-2xl"
                style={{ height }}
            />

            <div
                className="absolute left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                style={{ top }}
            >
                <div className="absolute inset-[-3.5rem] rounded-full bg-[radial-gradient(circle,_rgba(255,240,252,0.34)_0%,_rgba(244,114,182,0.25)_30%,_rgba(217,70,239,0.13)_50%,_transparent_78%)] opacity-100 mix-blend-screen blur-lg" />
                <div className="absolute inset-[-6rem] [animation:timeline-reflection-drift_7.4s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.28)_0%,_rgba(217,70,239,0.18)_28%,_rgba(88,28,135,0.055)_52%,_transparent_76%)] opacity-88 blur-[64px]" />
                <div className="absolute inset-0 animate-[timeline-star-pulse_2.8s_ease-in-out_infinite] rounded-full border border-white bg-[radial-gradient(circle_at_35%_32%,_rgba(255,255,255,1)_0%,_rgba(255,245,252,1)_18%,_rgba(255,210,242,0.92)_36%,_rgba(251,113,133,0.56)_58%,_rgba(217,70,239,0.34)_76%,_rgba(255,255,255,0.12)_100%)] shadow-[0_0_46px_rgba(255,255,255,1),0_0_124px_rgba(217,70,239,1),0_0_220px_rgba(236,72,153,0.82),0_0_300px_rgba(244,114,182,0.32)]" />
                <div className="absolute inset-[18%] rounded-full bg-white opacity-100 blur-[1.5px]" />
                <div className="absolute top-[18%] left-[20%] h-[26%] w-[30%] rounded-full bg-white/95 blur-[2px]" />
                <div className="absolute inset-x-[-1.4rem] top-1/2 h-14 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,210,242,0.62),_transparent_72%)] opacity-95 blur-xl" />
            </div>
        </div>
    );
}
