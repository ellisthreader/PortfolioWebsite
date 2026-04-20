import { Head } from '@inertiajs/react';

import type { WelcomePageProps } from '../types';
import { WelcomePageProvider } from '../context/welcome-page-context';
import { useExperienceProgress } from '../hooks/use-experience-progress';
import { ExperienceSection } from './experience-section';
import { HeroScene } from './hero-scene';
import { ProjectsSection } from './projects-section';
import { TechStackSection } from './tech-stack-section';

export function WelcomePage({ modelUrl }: WelcomePageProps) {
    const { entriesRef, heroScrollProgressRef, progress, sectionRef } =
        useExperienceProgress();

    return (
        <WelcomePageProvider modelUrl={modelUrl}>
            <Head title="Home" />

            <div className="relative overflow-x-clip bg-black">
                <HeroScene scrollProgressRef={heroScrollProgressRef} />
                <ExperienceSection
                    entriesRef={entriesRef}
                    progress={progress}
                    sectionRef={sectionRef}
                />
                <ProjectsSection />
                <TechStackSection />
            </div>
        </WelcomePageProvider>
    );
}
