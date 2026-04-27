import { cn } from '@/lib/utils';

import { EXPERIENCE_ITEMS } from '../data/experience-items';
import { ExperienceBeam } from './experience-beam';
import { ExperienceEntry } from './experience-entry';
import { ExperienceHeader } from './experience-header';

export function TimelineBeamOverlay({
    endOffset,
    progress,
    startOffset = 0,
    sticky = true,
}: {
    endOffset?: number;
    progress: number;
    startOffset?: number;
    sticky?: boolean;
}) {
    const clampedStartOffset = Math.max(startOffset, 0);
    const clampedEndOffset =
        typeof endOffset === 'number'
            ? Math.max(endOffset, clampedStartOffset)
            : null;
    const height =
        clampedEndOffset === null
            ? `max(0px, calc(100% - ${clampedStartOffset}px))`
            : `${clampedEndOffset - clampedStartOffset}px`;

    return (
        <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
            <div
                className={sticky ? 'sticky top-0 h-screen' : 'relative h-full'}
            >
                <div
                    className="absolute inset-x-0"
                    style={{
                        height,
                        top: `${clampedStartOffset}px`,
                    }}
                >
                    <ExperienceBeam progress={progress} />
                </div>
            </div>
        </div>
    );
}

export function ExperienceSectionContent({
    beamStartOffset,
    entriesRef,
    showBeam = true,
    progress,
}: {
    beamStartOffset?: number;
    entriesRef?: React.RefObject<HTMLDivElement | null>;
    showBeam?: boolean;
    progress: number;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#000000] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,_rgba(255,214,248,0.09),_transparent_13%),radial-gradient(circle_at_50%_14%,_rgba(236,72,153,0.1),_transparent_22%),radial-gradient(circle_at_50%_47%,_rgba(217,70,239,0.08),_transparent_31%),linear-gradient(180deg,_#030305_0%,_#010103_34%,_#000000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_center,_rgba(255,214,248,0.13),_transparent_66%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(236,72,153,0.065),_transparent_25%),radial-gradient(circle_at_50%_70%,_rgba(217,70,239,0.07),_transparent_29%)] opacity-90" />
            <div className="absolute top-[6%] left-1/2 hidden h-[72%] w-[46rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.045)_0%,_rgba(255,186,239,0.06)_18%,_rgba(236,72,153,0.055)_30%,_rgba(217,70,239,0.035)_46%,_transparent_72%)] blur-3xl lg:block" />
            <div className="absolute top-[8%] left-1/2 hidden h-[70%] w-[66rem] -translate-x-1/2 [animation:timeline-reflection-drift_9s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.14)_0%,_rgba(217,70,239,0.09)_24%,_rgba(88,28,135,0.035)_45%,_transparent_72%)] opacity-80 blur-[112px] lg:block" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.94)_70%,#000_100%)]" />

            <div className="relative mx-auto max-w-[87rem] px-6 pt-24 pb-40 sm:px-10 lg:px-16 lg:pt-[6.35rem] lg:pb-56">
                <ExperienceHeader />

                <div className="relative mt-[4.35rem]">
                    {showBeam ? (
                        <TimelineBeamOverlay
                            progress={progress}
                            startOffset={beamStartOffset}
                            sticky
                        />
                    ) : null}
                    <div ref={entriesRef} className="space-y-8 lg:space-y-12">
                        {EXPERIENCE_ITEMS.map((item) => (
                            <ExperienceEntry key={item.year} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ExperienceSection({
    beamStartOffset,
    className,
    entriesRef,
    progress,
    sectionRef,
}: {
    beamStartOffset?: number;
    className?: string;
    entriesRef: React.RefObject<HTMLDivElement | null>;
    progress: number;
    sectionRef: React.RefObject<HTMLElement | null>;
}) {
    return (
        <section
            ref={sectionRef}
            className={cn(
                'relative min-h-[155vh] overflow-hidden bg-[#000000] text-white lg:min-h-[175vh]',
                className,
            )}
        >
            <ExperienceSectionContent
                beamStartOffset={beamStartOffset}
                entriesRef={entriesRef}
                progress={progress}
            />
        </section>
    );
}
