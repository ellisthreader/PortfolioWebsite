import { publicAsset } from '@/lib/preview-assets';

type VibyraDeviceStackProps = {
    className?: string;
    variant?: 'archive' | 'home';
};

export function VibyraDeviceStack({
    className = '',
    variant = 'home',
}: VibyraDeviceStackProps) {
    const isArchive = variant === 'archive';
    const phoneClass = isArchive
        ? 'right-[4%] top-[-2%] w-[24%] hover:translate-x-3 hover:-translate-y-2 hover:rotate-[5deg] hover:scale-[1.06]'
        : 'right-[-1%] top-[-4%] w-[26%] sm:right-[-2%] lg:right-[-3%] hover:translate-x-4 hover:-translate-y-3 hover:rotate-[5deg] hover:scale-[1.07]';
    const laptopClass = isArchive
        ? 'w-[74%] -translate-y-[4%] hover:-translate-y-5 hover:scale-[1.04]'
        : 'w-[80%] -translate-y-[6%] sm:w-[84%] lg:w-[88%] hover:-translate-y-7 hover:scale-[1.045]';

    return (
        <div
            className={`pointer-events-auto relative isolate flex h-full w-full items-center justify-center overflow-visible ${className}`}
        >
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[84%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,255,0.36)_0%,rgba(242,58,205,0.2)_42%,rgba(244,114,182,0.11)_60%,transparent_76%)]" />
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[4%] h-[17%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.12)_44%,transparent_76%)]" />

            <img
                src={publicAsset('/VibyraMobileDeviceMarketingScreen.webp')}
                alt="Vibyra mobile screen"
                decoding="async"
                loading="lazy"
                className={`pointer-events-auto absolute z-10 max-w-none rotate-[4deg] cursor-pointer object-contain opacity-95 transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-30 ${phoneClass}`}
            />

            <img
                src={publicAsset('/VibyraLaptopDeviceMarketingScreen.webp')}
                alt="Vibyra desktop screen"
                decoding="async"
                loading="lazy"
                className={`pointer-events-auto relative z-20 max-w-none cursor-pointer object-contain transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-40 ${laptopClass}`}
            />
        </div>
    );
}
