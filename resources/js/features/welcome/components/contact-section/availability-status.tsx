import { AVAILABILITY, AVAILABILITY_DOT } from './contact-config';

export function AvailabilityStatus() {
    return (
        <div className="mt-9 flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-white/82">
                <span className="relative flex h-2.5 w-2.5">
                    <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${AVAILABILITY_DOT[AVAILABILITY.status]}`}
                    />
                    <span
                        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${AVAILABILITY_DOT[AVAILABILITY.status]}`}
                    />
                </span>
                {AVAILABILITY.label}
            </span>
            <p className="text-xs tracking-[0.12em] text-white/42">
                {AVAILABILITY.note}
            </p>
        </div>
    );
}
