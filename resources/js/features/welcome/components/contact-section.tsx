import { useMemo, useState } from 'react';

import { AmbientSectionGlow } from './ambient-section-glow';
import { AvailabilityTimeline } from './contact-section/availability-timeline';
import { ExpandedAvailability } from './contact-section/expanded-availability';
import {
    buildExpandedTimelineMonths,
    buildTimelineDays,
} from './contact-section/timeline-data';
import { useTimelineDrag } from './contact-section/use-timeline-drag';

export function ContactSection() {
    const timelineDays = useMemo(() => buildTimelineDays(), []);
    const expandedTimelineMonths = useMemo(
        () => buildExpandedTimelineMonths(),
        [],
    );
    const [selectedDate, setSelectedDate] = useState(
        timelineDays[0]?.isoDate ?? '',
    );
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedExpandedMonth, setSelectedExpandedMonth] = useState(
        expandedTimelineMonths[0]?.label ?? '',
    );
    const {
        handleTimelinePointerDown,
        isDraggingTimeline,
        suppressTimelineClickRef,
        timelineViewportRef,
    } = useTimelineDrag();
    const activeDay =
        timelineDays.find((day) => day.isoDate === selectedDate) ??
        timelineDays[0];
    const activeExpandedMonth =
        expandedTimelineMonths.find(
            (month) => month.label === selectedExpandedMonth,
        ) ??
        expandedTimelineMonths[0] ??
        null;

    return (
        <section className="relative z-10 overflow-hidden bg-black px-6 pt-10 pb-28 text-white sm:px-10 lg:px-16 lg:pb-32">
            <AmbientSectionGlow className="top-[14rem] left-1/2 h-[20rem] w-[56rem] -translate-x-1/2 opacity-90" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-black/95 to-black"
            />
            <div className="relative z-10 mx-auto max-w-5xl px-2 text-center sm:px-0">
                <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(250,232,255,0.96)_34%,_rgba(216,180,254,0.84)_72%,_rgba(217,70,239,0.68)_100%)] bg-clip-text px-2 pb-2 text-4xl leading-[0.98] font-semibold tracking-[-0.08em] text-transparent sm:text-5xl lg:text-[4.4rem]">
                    <span className="block">Let&apos;s Build</span>
                    <span className="mt-1 block sm:mt-2">
                        Something Thoughtful
                    </span>
                </h2>
                <AvailabilityTimeline
                    activeDay={activeDay}
                    isDraggingTimeline={isDraggingTimeline}
                    isExpanded={isExpanded}
                    onPointerDown={handleTimelinePointerDown}
                    onSelectDate={setSelectedDate}
                    onToggleExpanded={() =>
                        setIsExpanded((current) => !current)
                    }
                    suppressTimelineClickRef={suppressTimelineClickRef}
                    timelineDays={timelineDays}
                    timelineViewportRef={timelineViewportRef}
                />
                <ExpandedAvailability
                    activeExpandedMonth={activeExpandedMonth}
                    expandedTimelineMonths={expandedTimelineMonths}
                    isExpanded={isExpanded}
                    onSelectMonth={setSelectedExpandedMonth}
                />

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        className="inline-flex min-w-[13rem] items-center justify-center rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-8 py-4 text-sm font-medium text-white transition hover:border-fuchsia-200/50 hover:bg-fuchsia-300/16"
                        href="/contact"
                    >
                        Contact Me
                    </a>
                    <a
                        className="inline-flex min-w-[13rem] items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-8 py-4 text-sm font-medium text-white transition hover:border-fuchsia-200/30 hover:bg-white/[0.07]"
                        href="https://github.com/ellisthreader"
                        rel="noreferrer"
                        target="_blank"
                    >
                        View GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
