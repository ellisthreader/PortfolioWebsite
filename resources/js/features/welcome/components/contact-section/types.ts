export type AvailabilityStatus = 'available' | 'working' | 'unavailable';

export type TimelineDay = {
    dayLabel: string;
    isoDate: string;
    monthLabel: string;
    numberLabel: string;
    status: AvailabilityStatus;
};

export type ExpandedTimelineMonth = {
    days: TimelineDay[];
    leadingEmptyDays: number;
    label: string;
};
