import { useEffect, useRef, useState } from 'react';

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
    beamEndOffset,
    beamStartOffset,
    entriesRef,
    showBeam = true,
    progress,
}: {
    beamEndOffset?: number;
    beamStartOffset?: number;
    entriesRef?: React.RefObject<HTMLDivElement | null>;
    showBeam?: boolean;
    progress: number;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[42vw] bg-[radial-gradient(ellipse_at_left,rgba(236,72,153,0.115)_0%,rgba(217,70,239,0.062)_34%,rgba(88,28,135,0.024)_54%,transparent_76%)] opacity-75" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[42vw] bg-[radial-gradient(ellipse_at_right,rgba(255,186,239,0.082)_0%,rgba(236,72,153,0.062)_32%,rgba(88,28,135,0.026)_56%,transparent_78%)] opacity-70" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.94)_70%,#000_100%)]" />

            <div className="relative z-10 mx-auto max-w-[87rem] px-6 pt-24 pb-24 sm:px-10 lg:px-16 lg:pt-[6.35rem] lg:pb-32">
                <ExperienceHeader />

                <div className="relative mt-[4.35rem]">
                    {showBeam ? (
                        <TimelineBeamOverlay
                            endOffset={beamEndOffset}
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

const EXPERIENCE_TIMELINE_ACTIVE_VIEWPORT_RATIO = 0.52;

function clampProgress(progress: number) {
    return Math.min(Math.max(progress, 0), 1);
}

function getEntryCenterOffset(entry: Element | null) {
    if (!(entry instanceof HTMLElement)) {
        return 0;
    }

    return entry.offsetTop + entry.offsetHeight / 2;
}

function getEntryViewportCenter(entry: Element | null) {
    if (!(entry instanceof HTMLElement)) {
        return 0;
    }

    const rect = entry.getBoundingClientRect();

    return rect.top + rect.height / 2;
}

export function ExperienceScrollSection({ className }: { className?: string }) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const entriesRef = useRef<HTMLDivElement | null>(null);
    const [timeline, setTimeline] = useState({
        beamEndOffset: 0,
        beamStartOffset: 0,
        progress: 0,
    });

    useEffect(() => {
        let animationFrameId = 0;
        let resizeObserver: ResizeObserver | null = null;
        let intersectionObserver: IntersectionObserver | null = null;
        let isTimelineActive = true;

        const commitTimeline = (nextTimeline: typeof timeline) => {
            setTimeline((currentTimeline) =>
                Math.abs(currentTimeline.progress - nextTimeline.progress) >
                    0.001 ||
                Math.abs(
                    currentTimeline.beamStartOffset -
                        nextTimeline.beamStartOffset,
                ) > 0.5 ||
                Math.abs(
                    currentTimeline.beamEndOffset - nextTimeline.beamEndOffset,
                ) > 0.5
                    ? nextTimeline
                    : currentTimeline,
            );
        };

        const updateTimeline = () => {
            animationFrameId = 0;

            const entries = entriesRef.current;
            const firstEntry = entries?.firstElementChild ?? null;
            const lastEntry = entries?.lastElementChild ?? null;
            const firstCenter = getEntryViewportCenter(firstEntry);
            const lastCenter = getEntryViewportCenter(lastEntry);
            const activeViewportY =
                window.innerHeight * EXPERIENCE_TIMELINE_ACTIVE_VIEWPORT_RATIO;
            const progress = clampProgress(
                (activeViewportY - firstCenter) /
                    Math.max(lastCenter - firstCenter, 1),
            );

            commitTimeline({
                beamEndOffset: Math.max(
                    getEntryCenterOffset(lastEntry),
                    getEntryCenterOffset(firstEntry),
                ),
                beamStartOffset: getEntryCenterOffset(firstEntry),
                progress,
            });
        };

        const scheduleTimelineUpdate = () => {
            if (!isTimelineActive) {
                return;
            }

            if (!animationFrameId) {
                animationFrameId = window.requestAnimationFrame(updateTimeline);
            }
        };

        scheduleTimelineUpdate();

        if (typeof IntersectionObserver !== 'undefined' && sectionRef.current) {
            intersectionObserver = new IntersectionObserver(
                ([entry]) => {
                    isTimelineActive = entry.isIntersecting;

                    if (isTimelineActive) {
                        scheduleTimelineUpdate();
                    }
                },
                { rootMargin: '320px 0px' },
            );
            intersectionObserver.observe(sectionRef.current);
        }

        window.addEventListener('scroll', scheduleTimelineUpdate, {
            passive: true,
        });
        window.addEventListener('resize', scheduleTimelineUpdate);

        if (typeof ResizeObserver !== 'undefined' && entriesRef.current) {
            resizeObserver = new ResizeObserver(scheduleTimelineUpdate);
            resizeObserver.observe(entriesRef.current);
        }

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }

            resizeObserver?.disconnect();
            intersectionObserver?.disconnect();
            window.removeEventListener('scroll', scheduleTimelineUpdate);
            window.removeEventListener('resize', scheduleTimelineUpdate);
        };
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className={cn('relative z-10 -mt-px bg-black pt-px', className)}
        >
            <ExperienceSectionContent
                beamEndOffset={timeline.beamEndOffset}
                beamStartOffset={timeline.beamStartOffset}
                entriesRef={entriesRef}
                progress={timeline.progress}
            />
        </section>
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
                'relative min-h-[155vh] overflow-hidden bg-black text-white lg:min-h-[175vh]',
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
