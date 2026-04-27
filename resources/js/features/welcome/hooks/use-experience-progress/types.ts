export type ExperienceMetrics = {
    beamProgress: number;
    beamStartOffset: number;
    contentScrollOffset: number;
    heroBeamEndOffset: number;
    heroBeamStartOffset: number;
    heroPortalProgress: number;
    heroSectionHeight: number;
    progress: number;
};

export type ExperienceRefs = {
    content: HTMLDivElement | null;
    entries: HTMLDivElement | null;
    section: HTMLElement | null;
};
