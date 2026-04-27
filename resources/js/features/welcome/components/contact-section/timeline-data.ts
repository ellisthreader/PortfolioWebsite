import type {
    AvailabilityStatus,
    ExpandedTimelineMonth,
    TimelineDay,
} from './types';

export const AVAILABILITY_BOX_WIDTH_CLASS = 'w-[7rem] shrink-0';
export const AVAILABILITY_BOX_SPACING_CLASS = 'px-3 py-3';
export const AVAILABILITY_GRID_TEMPLATE = 'repeat(7, 7rem)';

const LONDON_TIME_ZONE = 'Europe/London';
const TIMELINE_DAY_COUNT = 12;
const EXPANDED_MONTH_COUNT = 6;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const STATUS_STYLES: Record<
    AvailabilityStatus,
    {
        dot: string;
        label: string;
    }
> = {
    available: {
        dot: 'bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]',
        label: 'Available for work',
    },
    unavailable: {
        dot: 'bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.78)]',
        label: 'Unavailable for work',
    },
    working: {
        dot: 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.78)]',
        label: 'Working with clients',
    },
};

function getLondonToday() {
    const formatter = new Intl.DateTimeFormat('en-CA', {
        day: '2-digit',
        month: '2-digit',
        timeZone: LONDON_TIME_ZONE,
        year: 'numeric',
    });
    const parts = formatter.formatToParts(new Date());
    const year = parts.find((part) => part.type === 'year')?.value ?? '2026';
    const month = parts.find((part) => part.type === 'month')?.value ?? '04';
    const day = parts.find((part) => part.type === 'day')?.value ?? '20';

    return new Date(`${year}-${month}-${day}T00:00:00`);
}

function getTimelineStatus(index: number, date: Date): AvailabilityStatus {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
        return 'unavailable';
    }

    return index <= 2 ? 'working' : 'available';
}

export function buildTimelineDays(): TimelineDay[] {
    const baseDate = getLondonToday();
    const weekdayFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: LONDON_TIME_ZONE,
        weekday: 'short',
    });
    const monthFormatter = new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        timeZone: LONDON_TIME_ZONE,
    });
    const numberFormatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        timeZone: LONDON_TIME_ZONE,
    });

    return Array.from({ length: TIMELINE_DAY_COUNT }, (_, index) => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + index);

        return {
            dayLabel: weekdayFormatter.format(date),
            isoDate: date.toISOString().slice(0, 10),
            monthLabel: monthFormatter.format(date),
            numberLabel: numberFormatter.format(date),
            status: getTimelineStatus(index, date),
        };
    });
}

export function buildExpandedTimelineMonths(): ExpandedTimelineMonth[] {
    const baseDate = getLondonToday();
    const weekdayFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: LONDON_TIME_ZONE,
        weekday: 'short',
    });
    const monthFormatter = new Intl.DateTimeFormat('en-GB', {
        month: 'short',
        timeZone: LONDON_TIME_ZONE,
    });
    const monthLabelFormatter = new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        timeZone: LONDON_TIME_ZONE,
        year: 'numeric',
    });
    const numberFormatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        timeZone: LONDON_TIME_ZONE,
    });

    return Array.from({ length: EXPANDED_MONTH_COUNT }, (_, monthOffset) => {
        const monthDate = new Date(baseDate);
        monthDate.setMonth(baseDate.getMonth() + monthOffset);
        monthDate.setDate(1);

        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const startDay = monthOffset === 0 ? baseDate.getDate() : 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstVisibleDate = new Date(year, month, startDay);

        return {
            days: Array.from(
                { length: daysInMonth - startDay + 1 },
                (_, dayOffset) => {
                    const dayNumber = startDay + dayOffset;
                    const date = new Date(year, month, dayNumber);
                    const timelineIndex = Math.round(
                        (date.getTime() - baseDate.getTime()) / ONE_DAY_MS,
                    );

                    return {
                        dayLabel: weekdayFormatter.format(date),
                        isoDate: date.toISOString().slice(0, 10),
                        monthLabel: monthFormatter.format(date),
                        numberLabel: numberFormatter.format(date),
                        status: getTimelineStatus(timelineIndex, date),
                    };
                },
            ),
            leadingEmptyDays: (firstVisibleDate.getDay() + 6) % 7,
            label: monthLabelFormatter.format(monthDate),
        };
    });
}
