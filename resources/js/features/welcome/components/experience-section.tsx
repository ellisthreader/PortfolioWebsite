import { EXPERIENCE_ITEMS } from '../data/experience-items';
import { ExperienceBeam } from './experience-beam';
import { ExperienceEntry } from './experience-entry';
import { ExperienceHeader } from './experience-header';

export function ExperienceSection({
    progress,
    sectionRef,
}: {
    progress: number;
    sectionRef: React.RefObject<HTMLElement | null>;
}) {
    return (
        <section
            ref={sectionRef}
            className="relative min-h-[220vh] overflow-hidden bg-[#020104] text-white"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.08),_transparent_18%),radial-gradient(circle_at_50%_6%,_rgba(236,72,153,0.18),_transparent_28%),radial-gradient(circle_at_80%_22%,_rgba(147,51,234,0.14),_transparent_22%),linear-gradient(180deg,_#07010c_0%,_#030107_38%,_#010103_100%)]" />
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_center,_rgba(255,182,249,0.18),_transparent_68%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(236,72,153,0.1),_transparent_26%),radial-gradient(circle_at_50%_70%,_rgba(217,70,239,0.12),_transparent_30%)] opacity-90" />
            <div className="absolute inset-y-0 left-1/2 hidden w-[44rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_rgba(255,186,239,0.09)_18%,_rgba(236,72,153,0.08)_32%,_rgba(217,70,239,0.04)_48%,_transparent_72%)] blur-3xl lg:block" />
            <div className="absolute inset-y-[8%] left-1/2 hidden w-[62rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.18)_0%,_rgba(217,70,239,0.12)_24%,_rgba(88,28,135,0.05)_45%,_transparent_72%)] blur-[110px] opacity-85 lg:block [animation:timeline-reflection-drift_9s_ease-in-out_infinite]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-36 pt-28 sm:px-10 lg:px-16">
                <ExperienceHeader />

                <div className="relative mt-28">
                    <ExperienceBeam progress={progress} />

                    <div className="space-y-16 lg:space-y-24">
                        {EXPERIENCE_ITEMS.map((item) => (
                            <ExperienceEntry key={item.year} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
