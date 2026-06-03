import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { WelcomePageProvider } from '../context/welcome-page-context';
import type { WelcomePageProps } from '../types';
import { ContactSection } from './contact-section';
import { ExperienceScrollSection } from './experience-section';
import { HeroScene } from './hero-scene';
import { ProjectsSection } from './projects-section';
import { SiteFooter } from './site-footer';
import { SiteLoadingScreen } from './site-loading-screen';
import { TechStackSection } from './tech-stack-section';

const LOADER_SESSION_KEY = 'ellis-threader-loader-seen';

export function WelcomePage({ modelUrl }: WelcomePageProps) {
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [lockLoadingScroll, setLockLoadingScroll] = useState(true);

    useEffect(() => {
        if (!lockLoadingScroll) {
            return;
        }

        const scrollY = window.scrollY;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;
        const previousBodyPosition = document.body.style.position;
        const previousBodyTop = document.body.style.top;
        const previousBodyWidth = document.body.style.width;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollY + 'px';
        document.body.style.width = '100%';

        return () => {
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.position = previousBodyPosition;
            document.body.style.top = previousBodyTop;
            document.body.style.width = previousBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [lockLoadingScroll]);

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

    return (
        <WelcomePageProvider modelUrl={modelUrl}>
            <Head title="Home" />

            <div className="portfolio-flow-root">
                <SiteLoadingScreen
                    visible={showLoadingScreen}
                    onExitComplete={() => setLockLoadingScroll(false)}
                />
                <div className="portfolio-flow-background" aria-hidden />
                <HeroScene introReady={!showLoadingScreen} />
                <ExperienceScrollSection />
                <ProjectsSection />
                <TechStackSection />
                <ContactSection />
                <SiteFooter />
            </div>
        </WelcomePageProvider>
    );
}
