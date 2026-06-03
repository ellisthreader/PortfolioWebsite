export type AvailabilityStatus = 'available' | 'working' | 'unavailable';

// ⚠️ This address is published publicly (and gets scraped). Swap if needed.
export const CONTACT_EMAIL = 'ellis.threader3001@gmail.com';

// Single honest status — flip this when it changes. No synthetic calendar data.
export const AVAILABILITY: {
    label: string;
    note: string;
    status: AvailabilityStatus;
} = {
    label: 'Available for new projects',
    note: 'Booking summer 2026 · Replies within 24h · UK / GMT',
    status: 'available',
};

export const AVAILABILITY_DOT: Record<AvailabilityStatus, string> = {
    available: 'bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]',
    unavailable: 'bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.78)]',
    working: 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.78)]',
};

export const OPEN_TO = ['Freelance', 'Full-time', 'Collaboration'] as const;
