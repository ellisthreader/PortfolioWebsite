import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { WelcomePageProvider } from '../context/welcome-page-context';
import { useExperienceProgress } from '../hooks/use-experience-progress';
import type { WelcomePageProps } from '../types';
import { ContactSection } from './contact-section';
import { HeroScene } from './hero-scene';
import { ProjectsSection } from './projects-section';
import { SiteLoadingScreen } from './site-loading-screen';
import { SiteFooter } from './site-footer';
import { TechStackSection } from './tech-stack-section';

const LOADER_SESSION_KEY = 'ellis-threader-loader-seen';

export function WelcomePage({ modelUrl }: WelcomePageProps) {
    const [laptopCameraZoomSettled, setLaptopCameraZoomSettled] =
        useState(false);
    const [laptopVideoEnded, setLaptopVideoEnded] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const laptopSequenceReady = useMemo(
        () => laptopCameraZoomSettled && laptopVideoEnded,
        [laptopCameraZoomSettled, laptopVideoEnded],
    );
    const handleLaptopCameraZoomSettled = useCallback(() => {
        setLaptopCameraZoomSettled(true);
    }, []);
    const handleLaptopVideoEnded = useCallback(() => {
        setLaptopVideoEnded(true);
    }, []);

    useEffect(() => {
        let disposed = false;
        let minimumDelayElapsed = false;
        let pageReady = document.readyState === 'complete';

        const hasSeenLoader =
            window.sessionStorage.getItem(LOADER_SESSION_KEY) === 'true';
        const minimumDelay = hasSeenLoader ? 420 : 1180;

        const hideLoader = () => {
            if (disposed || !minimumDelayElapsed || !pageReady) {
                return;
            }

            window.sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
            setShowLoadingScreen(false);
        };

        const minimumDelayTimer = window.setTimeout(() => {
            minimumDelayElapsed = true;
            hideLoader();
        }, minimumDelay);

        const absoluteFallbackTimer = window.setTimeout(() => {
            if (disposed) {
                return;
            }

            window.sessionStorage.setItem(LOADER_SESSION_KEY, 'true');
            setShowLoadingScreen(false);
        }, 2600);

        const handleWindowLoad = () => {
            pageReady = true;
            hideLoader();
        };

        if (!pageReady) {
            window.addEventListener('load', handleWindowLoad, { once: true });
        } else {
            hideLoader();
        }

        return () => {
            disposed = true;
            window.clearTimeout(minimumDelayTimer);
            window.clearTimeout(absoluteFallbackTimer);
            window.removeEventListener('load', handleWindowLoad);
        };
    }, []);

    const {
        beamProgress,
        beamStartOffset,
        contentRef,
        contentScrollOffset,
        entriesRef,
        heroBeamEndOffset,
        heroBeamStartOffset,
        heroSectionHeight,
        heroPortalProgress,
        heroScrollProgress,
        sectionRef,
    } = useExperienceProgress({ laptopVideoEnded: laptopSequenceReady });

    return (
        <WelcomePageProvider modelUrl={modelUrl}>
            <Head title="Home" />

            <div className="portfolio-flow-root">
                <SiteLoadingScreen visible={showLoadingScreen} />
                <div className="portfolio-flow-background" aria-hidden />
                <HeroScene
                    beamProgress={beamProgress}
                    beamStartOffset={beamStartOffset}
                    contentRef={contentRef}
                    contentScrollOffset={contentScrollOffset}
                    entriesRef={entriesRef}
                    heroBeamEndOffset={heroBeamEndOffset}
                    heroBeamStartOffset={heroBeamStartOffset}
                    heroSectionHeight={heroSectionHeight}
                    onLaptopCameraZoomSettled={handleLaptopCameraZoomSettled}
                    onLaptopVideoEnded={handleLaptopVideoEnded}
                    portalProgress={heroPortalProgress}
                    scrollProgress={heroScrollProgress}
                    sectionRef={sectionRef}
                />
                <ProjectsSection />
                <TechStackSection />
                <ContactSection />
                <SiteFooter />
            </div>
        </WelcomePageProvider>
    );
}
