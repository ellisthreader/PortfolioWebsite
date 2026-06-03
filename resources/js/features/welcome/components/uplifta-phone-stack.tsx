import { publicAsset } from '@/lib/preview-assets';

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
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.4)_0%,rgba(244,114,182,0.22)_38%,rgba(168,85,247,0.11)_60%,transparent_76%)]" />
            <div className="pointer-events-none absolute inset-x-[20%] bottom-[8%] h-[17%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.12)_42%,transparent_74%)]" />

            <img
                src={publicAsset('/Uplifta3.webp')}
                alt="Uplifta app left screen"
                decoding="async"
                loading="lazy"
                className={`pointer-events-auto absolute z-10 max-w-none -rotate-[13deg] cursor-pointer object-contain opacity-90 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${leftImageClass}`}
            />

            <img
                src={publicAsset('/Uplifta2.webp')}
                alt="Uplifta app right screen"
                decoding="async"
                loading="lazy"
                className={`pointer-events-auto absolute z-10 max-w-none rotate-[13deg] cursor-pointer object-contain opacity-90 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${rightImageClass}`}
            />

            <img
                src={publicAsset('/Uplifta.webp')}
                alt="Uplifta app main screen"
                decoding="async"
                loading="lazy"
                className={`pointer-events-auto relative z-20 max-h-[94%] max-w-none cursor-pointer object-contain transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-40 ${mainImageClass}`}
            />
        </div>
    );
}
