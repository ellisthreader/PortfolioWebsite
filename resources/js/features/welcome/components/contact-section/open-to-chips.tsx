import { OPEN_TO } from './contact-config';

export function OpenToChips() {
    return (
        <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-[0.62rem] font-medium tracking-[0.32em] text-white/38 uppercase">
                Open to
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {OPEN_TO.map((item) => (
                    <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs font-medium text-white/64"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
