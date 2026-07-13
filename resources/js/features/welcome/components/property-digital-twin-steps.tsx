import { publicAsset } from '@/lib/preview-assets';

type PropertyDigitalTwinStepsProps = {
    className?: string;
    variant?: 'archive' | 'home';
};

const STEPS = [
    {
        image: '/PropertyDigitalTwinApp.webp',
        label: 'Capture',
        alt: 'Estate agent using the guided property capture app',
    },
    {
        image: '/PropertyDigitalTwinAgent.webp',
        label: 'Model',
        alt: 'Estate agent creating a Gaussian-splat property model',
    },
    {
        image: '/PropertyDigitalTwinDesktop.webp',
        label: 'Publish',
        alt: 'Estate agent reviewing the finished 3D tour on a laptop',
    },
] as const;

export function PropertyDigitalTwinSteps({
    className = '',
    variant = 'home',
}: PropertyDigitalTwinStepsProps) {
    const isArchive = variant === 'archive';

    return (
        <div
            className={`relative grid h-full w-full grid-cols-3 items-stretch gap-1.5 overflow-visible sm:gap-2 ${className}`}
        >
            <div className="pointer-events-none absolute inset-x-[4%] top-[8%] bottom-[2%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.2)_0%,rgba(245,158,11,0.08)_46%,transparent_74%)]" />

            {STEPS.map((step, index) => (
                <figure
                    key={step.label}
                    className={`group/step relative min-w-0 overflow-hidden rounded-[0.8rem] bg-stone-950 shadow-[0_14px_32px_rgba(0,0,0,0.34)] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-20 hover:-translate-y-2 hover:scale-[1.045] sm:rounded-[1rem] ${
                        index === 1 ? 'z-10 scale-[1.035]' : 'z-0 scale-[0.97]'
                    } ${isArchive ? 'h-full' : 'h-[94%] self-center'}`}
                >
                    <img
                        src={publicAsset(step.image)}
                        alt={step.alt}
                        decoding="async"
                        loading="eager"
                        className="h-full w-full object-cover transition duration-700 group-hover/step:scale-[1.035]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/88 via-black/35 to-transparent" />
                    <figcaption className="absolute right-2 bottom-2 left-2 flex items-center gap-1.5 text-[0.52rem] font-semibold tracking-[0.15em] text-white uppercase sm:right-3 sm:bottom-3 sm:left-3 sm:text-[0.62rem] lg:text-[0.68rem]">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-300 text-[0.48rem] tracking-normal text-stone-950 sm:h-5 sm:w-5 sm:text-[0.56rem]">
                            {index + 1}
                        </span>
                        <span className="truncate">{step.label}</span>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
}
