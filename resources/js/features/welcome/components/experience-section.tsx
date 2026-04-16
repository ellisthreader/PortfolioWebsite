import { EXPERIENCE_ITEMS } from '../data/experience-items';
import { ExperienceBeam } from './experience-beam';
import { ExperienceEntry } from './experience-entry';
import { ExperienceHeader } from './experience-header';

export function ExperienceSection({
    entriesRef,
    progress,
    sectionRef,
}: {
    entriesRef: React.RefObject<HTMLDivElement | null>;
    progress: number;
    sectionRef: React.RefObject<HTMLElement | null>;
}) {
    return (
        <section
            ref={sectionRef}
            className="relative min-h-[300vh] overflow-hidden bg-[#000000] text-white lg:min-h-[340vh]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.04),_transparent_16%),radial-gradient(circle_at_50%_6%,_rgba(236,72,153,0.1),_transparent_22%),radial-gradient(circle_at_80%_22%,_rgba(147,51,234,0.08),_transparent_18%),linear-gradient(180deg,_#030305_0%,_#010103_34%,_#000000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_center,_rgba(255,182,249,0.1),_transparent_68%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(236,72,153,0.05),_transparent_24%),radial-gradient(circle_at_50%_70%,_rgba(217,70,239,0.06),_transparent_28%)] opacity-80" />
            <div className="absolute inset-y-0 left-1/2 hidden w-[44rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_rgba(255,186,239,0.05)_18%,_rgba(236,72,153,0.05)_30%,_rgba(217,70,239,0.03)_46%,_transparent_72%)] blur-3xl lg:block" />
            <div className="absolute inset-y-[8%] left-1/2 hidden w-[62rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.12)_0%,_rgba(217,70,239,0.08)_24%,_rgba(88,28,135,0.03)_45%,_transparent_72%)] blur-[110px] opacity-75 lg:block [animation:timeline-reflection-drift_9s_ease-in-out_infinite]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20">
                <ExperienceHeader />

                <div className="relative mt-28">
                    <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
                        <div className="sticky top-0 h-screen">
                            <ExperienceBeam progress={progress} />
                        </div>
                    </div>

                    <div ref={entriesRef} className="space-y-6 lg:space-y-8">
                        {EXPERIENCE_ITEMS.map((item) => (
                            <ExperienceEntry key={item.year} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
