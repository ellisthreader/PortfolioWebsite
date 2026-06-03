import { AvailabilityStatus } from './contact-section/availability-status';
import { ContactChannels } from './contact-section/contact-channels';
import { ContactEmailCard } from './contact-section/contact-email-card';
import { OpenToChips } from './contact-section/open-to-chips';
import { Reveal, RevealText } from './scroll-reveal';
import { SectionLightColumn } from './section-light-column';

export function ContactSection() {
    return (
        <section
            id="contact"
            className="relative z-10 overflow-hidden bg-black px-6 pt-10 pb-12 text-white sm:px-10 sm:pb-14 lg:px-16 lg:pb-16"
        >
            <SectionLightColumn parallax />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-black/95 to-black"
            />
            <div className="relative z-10 mx-auto max-w-3xl px-2 text-center sm:px-0">
                <RevealText>
                    <h2 className="bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(250,232,255,0.96)_34%,_rgba(216,180,254,0.84)_72%,_rgba(217,70,239,0.68)_100%)] bg-clip-text px-2 pb-2 text-4xl leading-[0.98] font-semibold tracking-[-0.08em] text-transparent sm:text-5xl lg:text-[4.4rem]">
                        <span className="block">Let&apos;s Build</span>
                        <span className="mt-1 block sm:mt-2">
                            Something Thoughtful
                        </span>
                    </h2>
                </RevealText>

                <Reveal delay={0.1}>
                    <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/56 sm:text-base">
                        Have a product, idea, or problem worth solving? Drop me
                        a line — I read every message.
                    </p>
                </Reveal>

                <Reveal delay={0.18}>
                    <AvailabilityStatus />
                </Reveal>
                <Reveal delay={0.26}>
                    <ContactEmailCard />
                </Reveal>
                <Reveal delay={0.34}>
                    <ContactChannels />
                </Reveal>
                <Reveal delay={0.42}>
                    <OpenToChips />
                </Reveal>

                <Reveal delay={0.5}>
                    <p className="mt-10 text-xs text-white/40">
                        Prefer a form?{' '}
                        <a
                            className="font-medium text-white/70 underline-offset-4 transition hover:text-fuchsia-200 hover:underline"
                            href="/contact"
                        >
                            Use the contact page
                        </a>
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
