import { HeroIntroOverlay } from './hero-intro-overlay';

export function HeroScene({ introReady }: { introReady: boolean }) {
    return (
        <section
            id="home"
            className="relative z-10 h-screen w-full overflow-hidden bg-black"
        >
            <HeroIntroOverlay introReady={introReady} />
        </section>
    );
}
