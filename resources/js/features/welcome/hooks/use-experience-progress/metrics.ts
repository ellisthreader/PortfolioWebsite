import { MathUtils } from 'three';

import {
    BEAM_SCROLL_EASING,
    EXPERIENCE_EXIT_HOLD_VIEWPORTS,
    HERO_SCROLL_VIEWPORTS,
} from './constants';
import type { ExperienceMetrics, ExperienceRefs } from './types';

export function getEmptyMetrics(viewportHeight: number): ExperienceMetrics {
    return {
        beamProgress: 0,
        beamStartOffset: 0,
        contentScrollOffset: 0,
        heroBeamEndOffset: 0,
        heroBeamStartOffset: 0,
        heroPortalProgress: 0,
        heroSectionHeight:
            viewportHeight + viewportHeight * HERO_SCROLL_VIEWPORTS,
        progress: 0,
    };
}

export function haveMetricsChanged(
    currentMetrics: ExperienceMetrics,
    nextMetrics: ExperienceMetrics,
) {
    return (
        Math.abs(
            currentMetrics.contentScrollOffset -
                nextMetrics.contentScrollOffset,
        ) > 0.5 ||
        Math.abs(currentMetrics.beamStartOffset - nextMetrics.beamStartOffset) >
            0.5 ||
        Math.abs(currentMetrics.beamProgress - nextMetrics.beamProgress) >
            0.001 ||
        Math.abs(
            currentMetrics.heroSectionHeight - nextMetrics.heroSectionHeight,
        ) > 0.5 ||
        Math.abs(
            currentMetrics.heroBeamStartOffset -
                nextMetrics.heroBeamStartOffset,
        ) > 0.5 ||
        Math.abs(
            currentMetrics.heroBeamEndOffset - nextMetrics.heroBeamEndOffset,
        ) > 0.5 ||
        Math.abs(currentMetrics.progress - nextMetrics.progress) > 0.001 ||
        Math.abs(
            currentMetrics.heroPortalProgress - nextMetrics.heroPortalProgress,
        ) > 0.001
    );
}

export function calculateExperienceMetrics(
    refs: ExperienceRefs,
    viewportHeight: number,
) {
    const introDistance = viewportHeight * HERO_SCROLL_VIEWPORTS;

    if (!refs.section || !refs.content || !refs.entries) {
        return {
            heroScrollProgress: 0,
            scrollLockY: introDistance * 0.62,
            metrics: getEmptyMetrics(viewportHeight),
        };
    }

    const heroTop = window.scrollY + refs.section.getBoundingClientRect().top;
    const contentScrollDistance = Math.max(
        refs.content.offsetHeight - viewportHeight,
        0,
    );
    const holdDistance = viewportHeight * EXPERIENCE_EXIT_HOLD_VIEWPORTS;
    const heroSectionScroll = MathUtils.clamp(
        window.scrollY - heroTop,
        0,
        introDistance + contentScrollDistance + holdDistance,
    );
    const contentScrollOffset = Math.min(
        Math.max(heroSectionScroll - introDistance, 0),
        contentScrollDistance,
    );
    const firstEntry = refs.entries.firstElementChild as HTMLElement | null;
    const lastEntry = refs.entries.lastElementChild as HTMLElement | null;
    const beamStartOffset = Math.max(
        firstEntry ? firstEntry.offsetTop + firstEntry.offsetHeight / 2 : 0,
        0,
    );
    const beamEndOffset = Math.max(
        lastEntry ? lastEntry.offsetTop + lastEntry.offsetHeight / 2 : 0,
        beamStartOffset,
    );
    const heroBeamOffset =
        refs.entries.getBoundingClientRect().top -
        refs.content.getBoundingClientRect().top;
    const rawBeamProgress = MathUtils.clamp(
        contentScrollOffset / Math.max(contentScrollDistance, 1),
        0,
        1,
    );

    return {
        heroScrollProgress: MathUtils.clamp(
            heroSectionScroll / introDistance,
            0,
            1,
        ),
        scrollLockY: heroTop + introDistance * 0.62,
        metrics: {
            beamProgress: Math.pow(rawBeamProgress, BEAM_SCROLL_EASING),
            beamStartOffset,
            contentScrollOffset,
            heroBeamEndOffset: Math.max(
                heroBeamOffset + beamEndOffset,
                heroBeamOffset + beamStartOffset,
            ),
            heroBeamStartOffset: Math.max(heroBeamOffset + beamStartOffset, 0),
            heroPortalProgress: MathUtils.smootherstep(
                MathUtils.clamp(heroSectionScroll / introDistance, 0, 1),
                0.62,
                1,
            ),
            heroSectionHeight:
                viewportHeight +
                introDistance +
                contentScrollDistance +
                holdDistance,
            progress: Math.pow(rawBeamProgress, BEAM_SCROLL_EASING),
        },
    };
}
