import { AnimatePresence, motion } from 'framer-motion';
import type { MutableRefObject } from 'react';

import {
    AVAILABILITY_BOX_SPACING_CLASS,
    AVAILABILITY_BOX_WIDTH_CLASS,
    STATUS_STYLES,
} from './timeline-data';
import type { TimelineDay } from './types';

type AvailabilityTimelineProps = {
    activeDay: TimelineDay | null;
    isDraggingTimeline: boolean;
    isExpanded: boolean;
    onSelectDate: (isoDate: string) => void;
    onToggleExpanded: () => void;
    suppressTimelineClickRef: MutableRefObject<boolean>;
    timelineDays: TimelineDay[];
    timelineViewportRef: MutableRefObject<HTMLDivElement | null>;
    onPointerDown: React.PointerEventHandler<HTMLDivElement>;
};

export function AvailabilityTimeline({
    activeDay,
    isDraggingTimeline,
    isExpanded,
    onPointerDown,
    onSelectDate,
    onToggleExpanded,
    suppressTimelineClickRef,
    timelineDays,
    timelineViewportRef,
}: AvailabilityTimelineProps) {
    return (
        <div className="mx-auto mt-10 max-w-4xl text-left">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.68rem] font-medium tracking-[0.32em] text-white/42 uppercase">
                    My Availability
                </p>
                {activeDay && (
                    <div className="inline-flex items-center gap-3 text-sm text-white/72">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[activeDay.status].dot}`}
                        />
                        <span>{STATUS_STYLES[activeDay.status].label}</span>
                    </div>
                )}
            </div>

            <div
                ref={timelineViewportRef}
                className={`mt-5 max-w-[calc((7rem*7)+(0.75rem*6))] overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                    isDraggingTimeline
                        ? 'cursor-grabbing select-none'
                        : 'cursor-grab'
                }`}
                onPointerDown={onPointerDown}
            >
                <div className="flex w-max gap-3">
                    {timelineDays.map((day) => {
                        const isActive = activeDay?.isoDate === day.isoDate;

                        return (
                            <button
                                key={day.isoDate}
                                className={`group relative ${AVAILABILITY_BOX_WIDTH_CLASS} ${AVAILABILITY_BOX_SPACING_CLASS} text-left transition ${
                                    isActive
                                        ? 'text-white'
                                        : 'text-white/58 hover:text-white/88'
                                }`}
                                onClick={() => {
                                    if (suppressTimelineClickRef.current)
                                        return;
                                    onSelectDate(day.isoDate);
                                }}
                                type="button"
                            >
                                <span
                                    className={`absolute top-3 right-3 h-2.5 w-2.5 rounded-full ${STATUS_STYLES[day.status].dot}`}
                                />
                                <div className="text-sm font-medium">
                                    {day.dayLabel}
                                </div>
                                <p className="mt-3 text-2xl font-semibold">
                                    {day.numberLabel}
                                </p>
                                <p className="mt-1 text-xs tracking-[0.24em] text-white/34 uppercase">
                                    {day.monthLabel}
                                </p>
                            </button>
                        );
                    })}
                    <button
                        className={`group ${AVAILABILITY_BOX_WIDTH_CLASS} ${AVAILABILITY_BOX_SPACING_CLASS} text-left text-white/58 transition hover:text-white/88`}
                        onClick={onToggleExpanded}
                        type="button"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isExpanded ? 'less' : 'more'}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm font-medium"
                                    exit={{ opacity: 0, y: -6 }}
                                    initial={{ opacity: 0, y: 6 }}
                                    transition={{
                                        duration: 0.18,
                                        ease: 'easeOut',
                                    }}
                                >
                                    {isExpanded ? 'Less' : 'More'}
                                </motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={isExpanded ? 'minus' : 'plus'}
                                    animate={{
                                        opacity: 1,
                                        rotate: 0,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    className="text-white/34 transition group-hover:text-white/72"
                                    exit={{
                                        opacity: 0,
                                        rotate: isExpanded ? 60 : -60,
                                        scale: 0.8,
                                        y: -4,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        rotate: isExpanded ? -60 : 60,
                                        scale: 0.8,
                                        y: 4,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {isExpanded ? '−' : '+'}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={isExpanded ? 'collapse' : 'expand'}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 text-2xl font-semibold"
                                exit={{ opacity: 0, y: -8 }}
                                initial={{ opacity: 0, y: 8 }}
                                transition={{
                                    duration: 0.2,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {isExpanded ? 'Collapse' : 'Expand'}
                            </motion.p>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={isExpanded ? 'timeline' : 'months'}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-1 text-xs tracking-[0.24em] text-white/34 uppercase"
                                exit={{ opacity: 0, y: -6 }}
                                initial={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                                {isExpanded ? 'Timeline' : '6 Months'}
                            </motion.p>
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </div>
    );
}
