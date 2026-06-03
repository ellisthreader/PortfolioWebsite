import { useEffect, useRef, useState } from 'react';

import { DeskCornerCanvas } from '../desk-corner-canvas';

const STATIC_HERO_LAPTOP_ZOOM_PROGRESS = 0;
const STATIC_HERO_MODEL_ROTATION_PROGRESS = 1;
const STATIC_HERO_MODEL_TRAVEL_PROGRESS = 1;
const HERO_DESK_CANVAS_LEFT = '-25vw';
const HERO_DESK_CANVAS_WIDTH = '150vw';
const HERO_DESK_INFO_BLUR_MASK =
    'radial-gradient(ellipse at 18% 58%, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.38) 54%, transparent 78%)';
const HERO_DESK_MODEL_OFFSET_X = '25vw';
const HERO_DESK_MODEL_OFFSET_Y = '13vh';
const HERO_CANVAS_ROOT_MARGIN = '360px 0px';

export function HeroDeskModel() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isCanvasMounted, setIsCanvasMounted] = useState(true);

    useEffect(() => {
        const container = containerRef.current;

        if (!container || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsCanvasMounted(entry.isIntersecting);
            },
            { rootMargin: HERO_CANVAS_ROOT_MARGIN },
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            className="pointer-events-none absolute top-0 bottom-0 z-20 h-screen overflow-visible"
            ref={containerRef}
            style={{
                contain: 'layout paint size',
                left: HERO_DESK_CANVAS_LEFT,
                transform: `translate3d(${HERO_DESK_MODEL_OFFSET_X}, ${HERO_DESK_MODEL_OFFSET_Y}, 0)`,
                width: HERO_DESK_CANVAS_WIDTH,
            }}
        >
            <div className="h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full">
                {isCanvasMounted ? (
                    <DeskCornerCanvas
                        laptopZoomProgress={STATIC_HERO_LAPTOP_ZOOM_PROGRESS}
                        rotationProgress={STATIC_HERO_MODEL_ROTATION_PROGRESS}
                        travelProgress={STATIC_HERO_MODEL_TRAVEL_PROGRESS}
                    />
                ) : null}
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[8vh] left-0 h-[84vh] w-[min(62rem,68vw)]"
                style={{
                    backdropFilter: 'blur(14px) saturate(0.86)',
                    background:
                        'linear-gradient(90deg, rgba(1,0,5,0.16) 0%, rgba(12,4,21,0.1) 42%, rgba(12,4,21,0) 100%)',
                    maskImage: HERO_DESK_INFO_BLUR_MASK,
                    WebkitBackdropFilter: 'blur(14px) saturate(0.86)',
                    WebkitMaskImage: HERO_DESK_INFO_BLUR_MASK,
                }}
            />
        </div>
    );
}
