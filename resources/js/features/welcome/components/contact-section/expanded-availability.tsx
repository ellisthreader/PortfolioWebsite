import { AnimatePresence, motion } from 'framer-motion';

import {
    AVAILABILITY_BOX_SPACING_CLASS,
    AVAILABILITY_BOX_WIDTH_CLASS,
    AVAILABILITY_GRID_TEMPLATE,
    STATUS_STYLES,
} from './timeline-data';
import type { ExpandedTimelineMonth } from './types';

type ExpandedAvailabilityProps = {
    activeExpandedMonth: ExpandedTimelineMonth | null;
    expandedTimelineMonths: ExpandedTimelineMonth[];
    isExpanded: boolean;
    onSelectMonth: (label: string) => void;
};

export function ExpandedAvailability({
    activeExpandedMonth,
    expandedTimelineMonths,
    isExpanded,
    onSelectMonth,
}: ExpandedAvailabilityProps) {
    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    animate={{ opacity: 1, scaleY: 1, y: 0 }}
                    className="relative mx-auto mt-4 max-w-5xl text-left lg:-left-16"
                    exit={{ opacity: 0, scaleY: 0.92, y: -18 }}
                    initial={{ opacity: 0, scaleY: 0.94, y: 24 }}
                    style={{ originY: 0, willChange: 'transform, opacity' }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-0"
                        initial={{ opacity: 0, y: 10 }}
                        transition={{
                            delay: 0.08,
                            duration: 0.28,
                            ease: 'easeOut',
                        }}
                    >
                        <div className="grid gap-3 lg:grid-cols-[7rem_auto]">
                            <div className="space-y-2">
                                {expandedTimelineMonths.map((month) => {
                                    const isActive =
                                        month.label ===
                                        activeExpandedMonth?.label;

                                    return (
                                        <button
                                            key={month.label}
                                            className={`flex ${AVAILABILITY_BOX_WIDTH_CLASS} items-center rounded-[1.1rem] px-2.5 py-2.5 text-left transition ${
                                                isActive
                                                    ? 'bg-fuchsia-300/[0.09] text-white'
                                                    : 'bg-white/[0.02] text-white/62 hover:bg-white/[0.05] hover:text-white/88'
                                            }`}
                                            onClick={() =>
                                                onSelectMonth(month.label)
                                            }
                                            type="button"
                                        >
                                            <span className="text-sm font-medium">
                                                {month.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeExpandedMonth && (
                                    <motion.div
                                        key={activeExpandedMonth.label}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        className="pt-1"
                                        exit={{ opacity: 0, x: -14, y: 8 }}
                                        initial={{ opacity: 0, x: 18, y: 8 }}
                                        transition={{
                                            duration: 0.26,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                            <div
                                                className="grid w-max gap-x-3 gap-y-3"
                                                style={{
                                                    gridTemplateColumns:
                                                        AVAILABILITY_GRID_TEMPLATE,
                                                }}
                                            >
                                                {Array.from({
                                                    length: activeExpandedMonth.leadingEmptyDays,
                                                }).map((_, index) => (
                                                    <div
                                                        key={`empty-${activeExpandedMonth.label}-${index}`}
                                                        className={
                                                            AVAILABILITY_BOX_WIDTH_CLASS
                                                        }
                                                    />
                                                ))}
                                                {activeExpandedMonth.days.map(
                                                    (day) => (
                                                        <div
                                                            key={day.isoDate}
                                                            className={`relative ${AVAILABILITY_BOX_WIDTH_CLASS} ${AVAILABILITY_BOX_SPACING_CLASS} text-left text-white/72`}
                                                        >
                                                            <span
                                                                className={`absolute top-3 right-3 h-2.5 w-2.5 rounded-full ${STATUS_STYLES[day.status].dot}`}
                                                            />
                                                            <div className="text-sm font-medium">
                                                                {day.dayLabel}
                                                            </div>
                                                            <p className="mt-3 text-2xl font-semibold text-white">
                                                                {
                                                                    day.numberLabel
                                                                }
                                                            </p>
                                                            <p className="mt-1 text-xs tracking-[0.24em] text-white/34 uppercase">
                                                                {day.monthLabel}
                                                            </p>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
