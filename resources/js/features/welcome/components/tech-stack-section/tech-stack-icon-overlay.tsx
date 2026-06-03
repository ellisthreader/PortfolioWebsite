import { TECH_STACK_ITEMS } from '../../data/tech-stack-items';

type TechStackIconOverlayProps = {
    activeLabel: string | null;
    iconElementRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
    onSelectLabel: (label: string | null) => void;
};

export function TechStackIconOverlay({
    activeLabel,
    iconElementRefs,
    onSelectLabel,
}: TechStackIconOverlayProps) {
    return (
        <div className="pointer-events-none absolute inset-0 z-10 select-none">
            {TECH_STACK_ITEMS.map((item, index) => {
                const isActive = activeLabel === item.label;

                return (
                    <div
                        key={item.label}
                        className="absolute top-0 left-0 flex flex-col items-center gap-2 will-change-transform"
                        onClick={(event) => {
                            event.stopPropagation();
                            onSelectLabel(item.label);
                        }}
                        onMouseEnter={() => onSelectLabel(item.label)}
                        onMouseLeave={() => onSelectLabel(null)}
                        ref={(node) => {
                            iconElementRefs.current[index] = node;
                        }}
                        style={{
                            opacity: 0,
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%) scale(0.9)',
                        }}
                    >
                        <div
                            className="relative flex items-center justify-center rounded-full"
                            style={{
                                boxShadow: isActive
                                    ? '0 10px 22px rgba(0, 0, 0, 0.16)'
                                    : '0 8px 14px rgba(0, 0, 0, 0.08)',
                            }}
                        >
                            <div
                                className={`absolute rounded-full transition-all duration-150 ${
                                    isActive
                                        ? 'h-28 w-28 opacity-100'
                                        : 'h-14 w-14 opacity-0'
                                }`}
                                style={{
                                    background: `radial-gradient(circle, ${item.accent}70 0%, ${item.accent}34 36%, ${item.accent}12 58%, transparent 78%)`,
                                    transform: 'translateZ(0)',
                                }}
                            />
                            <div
                                className={`absolute rounded-full transition-all duration-150 ${
                                    isActive
                                        ? 'h-20 w-20 opacity-100'
                                        : 'h-10 w-10 opacity-0'
                                }`}
                                style={{
                                    background: `radial-gradient(circle, rgba(255,255,255,0.16) 0%, ${item.accent}18 46%, transparent 74%)`,
                                    transform: 'translateZ(0)',
                                }}
                            />
                            <img
                                alt=""
                                aria-hidden
                                className={`relative z-10 object-contain transition-[width,height] duration-150 select-none ${
                                    isActive
                                        ? 'h-11 w-11 sm:h-12 sm:w-12'
                                        : 'h-9 w-9 sm:h-10 sm:w-10'
                                }`}
                                decoding="async"
                                draggable={false}
                                loading="lazy"
                                src={item.logo}
                                style={{
                                    filter: 'grayscale(var(--icon-grayscale, 1)) brightness(var(--icon-brightness, 0.42))',
                                }}
                            />
                        </div>

                        {isActive && (
                            <div
                                className="rounded-full border px-3 py-1 text-[0.54rem] font-medium tracking-[0.24em] text-white uppercase shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-md"
                                style={{
                                    background: `linear-gradient(180deg, ${item.accent}30 0%, rgba(15, 23, 42, 0.88) 100%)`,
                                    borderColor: `${item.accent}66`,
                                    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.28), 0 0 30px ${item.accent}44`,
                                }}
                            >
                                {item.label}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
