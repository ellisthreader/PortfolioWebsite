import type { RefObject } from 'react';

import { HeroIntroOverlay } from './hero-intro-overlay';
import { ExperiencePortalPreview } from './hero-scene/experience-portal-preview';

export function HeroScene({
    beamProgress,
    beamStartOffset,
    contentRef,
    contentScrollOffset,
    entriesRef,
    heroBeamEndOffset,
    heroBeamStartOffset,
    heroSectionHeight,
    onLaptopCameraZoomSettled,
    onLaptopVideoEnded,
    portalProgress,
    sectionRef,
    scrollProgress,
}: {
    beamProgress: number;
    beamStartOffset: number;
    contentRef: RefObject<HTMLDivElement | null>;
    contentScrollOffset: number;
    entriesRef: RefObject<HTMLDivElement | null>;
    heroBeamEndOffset: number;
    heroBeamStartOffset: number;
    heroSectionHeight: number;
    onLaptopCameraZoomSettled?: () => void;
    onLaptopVideoEnded?: () => void;
    portalProgress: number;
    sectionRef: RefObject<HTMLElement | null>;
    scrollProgress: number;
}) {
    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative z-10 w-full overflow-x-clip bg-black"
            style={{
                height:
                    heroSectionHeight > 0 ? `${heroSectionHeight}px` : '620vh',
            }}
        >
            <div
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{ touchAction: 'none' }}
            >
                <HeroIntroOverlay
                    onLaptopCameraZoomSettled={onLaptopCameraZoomSettled}
                    onLaptopVideoEnded={onLaptopVideoEnded}
                    scrollProgress={scrollProgress}
                    sectionRef={sectionRef}
                />
                <ExperiencePortalPreview
                    beamStartOffset={beamStartOffset}
                    contentRef={contentRef}
                    contentScrollOffset={contentScrollOffset}
                    entriesRef={entriesRef}
                    heroBeamEndOffset={heroBeamEndOffset}
                    heroBeamStartOffset={heroBeamStartOffset}
                    portalProgress={portalProgress}
                    timelineProgress={beamProgress}
                />
            </div>
        </section>
    );
}
