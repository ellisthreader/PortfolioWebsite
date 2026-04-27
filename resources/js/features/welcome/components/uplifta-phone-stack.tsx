type UpliftaPhoneStackProps = {
    className?: string;
    variant?: 'archive' | 'home';
};

export function UpliftaPhoneStack({
    className = '',
    variant = 'home',
}: UpliftaPhoneStackProps) {
    const isArchive = variant === 'archive';
    const leftImageClass = isArchive
        ? 'top-[18%] left-[12%] w-[31%] sm:left-[13%] sm:w-[30%] hover:-translate-x-5 hover:-translate-y-2 hover:-rotate-[19deg] hover:scale-[1.08]'
        : 'top-[20%] left-[8%] w-[32%] sm:left-[9%] lg:left-[8%] xl:left-[9%] hover:-translate-x-8 hover:-translate-y-4 hover:-rotate-[20deg] hover:scale-[1.1]';
    const rightImageClass = isArchive
        ? 'top-[18%] right-[12%] w-[31%] sm:right-[13%] sm:w-[30%] hover:translate-x-5 hover:-translate-y-2 hover:rotate-[19deg] hover:scale-[1.08]'
        : 'top-[20%] right-[8%] w-[32%] sm:right-[9%] lg:right-[8%] xl:right-[9%] hover:translate-x-8 hover:-translate-y-4 hover:rotate-[20deg] hover:scale-[1.1]';
    const mainImageClass = isArchive
        ? 'w-[41%] sm:w-[40%] hover:-translate-y-5 hover:scale-[1.07]'
        : 'w-[42%] sm:w-[41%] lg:w-[42%] xl:w-[40%] hover:-translate-y-7 hover:scale-[1.075]';

    return (
        <div
            className={`pointer-events-auto relative isolate flex h-full w-full items-center justify-center overflow-visible ${className}`}
        >
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[68%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.34)_0%,rgba(244,114,182,0.18)_38%,rgba(168,85,247,0.08)_56%,transparent_72%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-[22%] bottom-[10%] h-[15%] rounded-full bg-black/50 blur-2xl" />

            <img
                src="/Uplifta3.png"
                alt="Uplifta app left screen"
                className={`pointer-events-auto absolute z-10 max-w-none -rotate-[13deg] cursor-pointer object-contain opacity-90 drop-shadow-[0_24px_36px_rgba(0,0,0,0.52)] transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)] ${leftImageClass}`}
            />

            <img
                src="/Uplifta2.png"
                alt="Uplifta app right screen"
                className={`pointer-events-auto absolute z-10 max-w-none rotate-[13deg] cursor-pointer object-contain opacity-90 drop-shadow-[0_24px_36px_rgba(0,0,0,0.52)] transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:drop-shadow-[0_34px_52px_rgba(0,0,0,0.62)] ${rightImageClass}`}
            />

            <img
                src="/Uplifta.png"
                alt="Uplifta app main screen"
                className={`pointer-events-auto relative z-20 max-h-[94%] max-w-none cursor-pointer object-contain drop-shadow-[0_32px_54px_rgba(0,0,0,0.58)] transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:z-40 hover:drop-shadow-[0_44px_70px_rgba(0,0,0,0.68)] ${mainImageClass}`}
            />

            <div className="pointer-events-none absolute inset-x-[28%] top-[10%] z-30 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />
        </div>
    );
}
