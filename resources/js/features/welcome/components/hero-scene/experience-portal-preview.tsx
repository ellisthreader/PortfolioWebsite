import { useEffect, useState, type RefObject } from 'react';
import { MathUtils } from 'three';

import {
    ExperienceSectionContent,
    TimelineBeamOverlay,
} from '../experience-section';

const LAPTOP_PORTAL_START_CENTER_X = 50;
const LAPTOP_PORTAL_START_CENTER_Y = 50;
const LAPTOP_PORTAL_SCREEN_ASPECT_RATIO = 16 / 10;
const LAPTOP_PORTAL_DESKTOP_START_WIDTH_RATIO = 0.68;
const LAPTOP_PORTAL_DESKTOP_START_HEIGHT_RATIO = 0.62;
const LAPTOP_PORTAL_MOBILE_START_WIDTH_RATIO = 0.88;
const LAPTOP_PORTAL_MOBILE_START_HEIGHT_RATIO = 0.42;
const LAPTOP_PORTAL_MOBILE_BREAKPOINT = 768;
const LAPTOP_PORTAL_START_RADIUS = 8;
const LAPTOP_PORTAL_START_ROTATE_X = 0;
const LAPTOP_PORTAL_START_ROTATE_Y = 0;
const MAX_BACKGROUND_BLUR = 22;

type ExperiencePortalPreviewProps = {
    beamStartOffset: number;
    contentRef: RefObject<HTMLDivElement | null>;
    contentScrollOffset: number;
    entriesRef: RefObject<HTMLDivElement | null>;
    heroBeamEndOffset: number;
    heroBeamStartOffset: number;
    portalProgress: number;
    timelineProgress: number;
};

function getViewportSize() {
    if (typeof window === 'undefined') {
        return { height: 0, width: 0 };
    }

    return { height: window.innerHeight, width: window.innerWidth };
}

export function ExperiencePortalPreview({
    beamStartOffset,
    contentRef,
    contentScrollOffset,
    entriesRef,
    heroBeamEndOffset,
    heroBeamStartOffset,
    portalProgress,
    timelineProgress,
}: ExperiencePortalPreviewProps) {
    const frameProgress = MathUtils.smootherstep(portalProgress, 0, 1);
    const contentProgress = MathUtils.smootherstep(portalProgress, 0.08, 0.96);
    const imageBloomProgress = MathUtils.smootherstep(portalProgress, 0, 0.55);
    const visibleBeamStartOffset = Math.max(
        heroBeamStartOffset - contentScrollOffset,
        0,
    );
    const visibleBeamEndOffset = Math.max(
        heroBeamEndOffset - contentScrollOffset,
        visibleBeamStartOffset,
    );
    const backgroundBlurProgress = MathUtils.smootherstep(
        portalProgress,
        0.02,
        0.82,
    );
    const portalOpacity = MathUtils.smootherstep(portalProgress, 0.01, 0.94);
    const windowGlowProgress = MathUtils.smootherstep(portalProgress, 0.1, 0.7);
    const [viewportSize, setViewportSize] = useState({ height: 0, width: 0 });
    const isMobilePortal =
        viewportSize.width > 0 &&
        viewportSize.width < LAPTOP_PORTAL_MOBILE_BREAKPOINT;
    const startMaxWidth =
        viewportSize.width *
        (isMobilePortal
            ? LAPTOP_PORTAL_MOBILE_START_WIDTH_RATIO
            : LAPTOP_PORTAL_DESKTOP_START_WIDTH_RATIO);
    const startMaxHeight =
        viewportSize.height *
        (isMobilePortal
            ? LAPTOP_PORTAL_MOBILE_START_HEIGHT_RATIO
            : LAPTOP_PORTAL_DESKTOP_START_HEIGHT_RATIO);
    const startFrameWidth = Math.min(
        startMaxWidth,
        startMaxHeight * LAPTOP_PORTAL_SCREEN_ASPECT_RATIO,
    );
    const startFrameHeight =
        startFrameWidth / LAPTOP_PORTAL_SCREEN_ASPECT_RATIO;
    const frameWidth =
        viewportSize.width > 0
            ? `${MathUtils.lerp(startFrameWidth, viewportSize.width, frameProgress)}px`
            : `${MathUtils.lerp(64, 100, frameProgress)}vw`;
    const frameHeight =
        viewportSize.height > 0
            ? `${MathUtils.lerp(startFrameHeight, viewportSize.height, frameProgress)}px`
            : `${MathUtils.lerp(40, 100, frameProgress)}vh`;

    useEffect(() => {
        const updateViewportSize = () => {
            setViewportSize(getViewportSize());
        };

        updateViewportSize();
        window.addEventListener('resize', updateViewportSize);

        return () => {
            window.removeEventListener('resize', updateViewportSize);
        };
    }, []);

    return (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(255,62,181,0.18)_0%,rgba(110,24,116,0.12)_20%,rgba(0,0,0,0)_52%)]"
                style={{
                    opacity: MathUtils.smootherstep(portalProgress, 0.06, 0.72),
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: `blur(${MathUtils.lerp(0, MAX_BACKGROUND_BLUR, backgroundBlurProgress)}px)`,
                    backgroundColor: `rgba(5, 1, 10, ${MathUtils.lerp(0, 0.12, backgroundBlurProgress)})`,
                    maskImage:
                        'radial-gradient(circle at 50% 58%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.34) 54%, transparent 78%)',
                    WebkitBackdropFilter: `blur(${MathUtils.lerp(0, MAX_BACKGROUND_BLUR, backgroundBlurProgress)}px)`,
                    WebkitMaskImage:
                        'radial-gradient(circle at 50% 58%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.34) 54%, transparent 78%)',
                }}
            />
            <div
                className="absolute left-1/2 h-[46vh] w-[52vw] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,_rgba(244,114,182,0.42)_0%,_rgba(236,72,153,0.19)_28%,_rgba(0,0,0,0)_72%)] blur-[92px]"
                style={{
                    opacity: MathUtils.smootherstep(portalProgress, 0.04, 0.54),
                    top: `${MathUtils.lerp(50, 52, frameProgress)}%`,
                    transform: `translateX(-50%) scale(${MathUtils.lerp(0.9, 1.22, frameProgress)})`,
                }}
            />
            <div
                className="absolute overflow-hidden border border-fuchsia-100/25 bg-black shadow-[0_0_70px_rgba(217,70,239,0.28),0_0_150px_rgba(236,72,153,0.14)]"
                style={{
                    borderRadius: `${MathUtils.lerp(LAPTOP_PORTAL_START_RADIUS, 0, frameProgress)}px`,
                    height: frameHeight,
                    left: `${MathUtils.lerp(LAPTOP_PORTAL_START_CENTER_X, 50, frameProgress)}%`,
                    opacity: portalOpacity,
                    top: `${MathUtils.lerp(LAPTOP_PORTAL_START_CENTER_Y, 50, frameProgress)}%`,
                    transform: `translate3d(-50%, -50%, 0) perspective(1800px) rotateX(${MathUtils.lerp(LAPTOP_PORTAL_START_ROTATE_X, 0, frameProgress)}deg) rotateY(${MathUtils.lerp(LAPTOP_PORTAL_START_ROTATE_Y, 0, frameProgress)}deg) scale(${MathUtils.lerp(0.92, 1, frameProgress)})`,
                    transformOrigin: '50% 50%',
                    width: frameWidth,
                    willChange: 'height, opacity, transform, width',
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/Spin.png')",
                        filter: `saturate(${MathUtils.lerp(1.15, 1.45, imageBloomProgress)}) contrast(${MathUtils.lerp(1.02, 1.16, imageBloomProgress)}) brightness(${MathUtils.lerp(0.68, 1.04, imageBloomProgress)})`,
                        opacity: MathUtils.lerp(
                            0.62,
                            0,
                            MathUtils.smootherstep(portalProgress, 0.18, 0.72),
                        ),
                        transform: `scale(${MathUtils.lerp(1.08, 1, imageBloomProgress)})`,
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_50%_52%,rgba(244,114,182,0.18),transparent_38%),linear-gradient(180deg,rgba(5,1,10,0.2)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_82%,rgba(0,0,0,0.3)_100%)]" />
                <div
                    className="absolute inset-0 border border-white/20 shadow-[inset_0_0_38px_rgba(255,255,255,0.08),inset_0_0_120px_rgba(217,70,239,0.12)]"
                    style={{
                        borderRadius: `${MathUtils.lerp(LAPTOP_PORTAL_START_RADIUS, 0, frameProgress)}px`,
                        opacity: MathUtils.lerp(0.95, 0.22, frameProgress),
                    }}
                />
                <div
                    className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,235,252,0.22),rgba(217,70,239,0.08)_38%,transparent_100%)]"
                    style={{ opacity: MathUtils.lerp(1, 0.35, frameProgress) }}
                />
                <div
                    className="absolute inset-[-22%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,235,252,0.2)_0%,rgba(244,114,182,0.18)_18%,rgba(0,0,0,0)_49%)] blur-2xl"
                    style={{
                        opacity: windowGlowProgress,
                        transform: `scale(${MathUtils.lerp(0.72, 1.28, frameProgress)})`,
                    }}
                />
                <div
                    className="absolute inset-[-18%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18)_0%,rgba(244,114,182,0.16)_18%,rgba(0,0,0,0)_48%)] blur-2xl"
                    style={{
                        opacity: MathUtils.smootherstep(
                            portalProgress,
                            0,
                            0.45,
                        ),
                        transform: `scale(${MathUtils.lerp(0.72, 1.28, frameProgress)})`,
                    }}
                />
                <div
                    className="relative h-full overflow-hidden"
                    style={{
                        filter: `blur(${MathUtils.lerp(18, 0, contentProgress)}px)`,
                        opacity: contentProgress,
                        transform: `translateY(${MathUtils.lerp(12, 0, frameProgress)}%) scale(${MathUtils.lerp(1.06, 1, contentProgress)})`,
                        willChange: 'filter, opacity, transform',
                    }}
                >
                    <TimelineBeamOverlay
                        endOffset={visibleBeamEndOffset}
                        progress={timelineProgress}
                        startOffset={visibleBeamStartOffset}
                        sticky={false}
                    />
                    <div
                        ref={contentRef}
                        style={{
                            transform: `translate3d(0, ${-contentScrollOffset}px, 0)`,
                            willChange: 'transform',
                        }}
                    >
                        <ExperienceSectionContent
                            beamStartOffset={beamStartOffset}
                            entriesRef={entriesRef}
                            progress={timelineProgress}
                            showBeam={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
