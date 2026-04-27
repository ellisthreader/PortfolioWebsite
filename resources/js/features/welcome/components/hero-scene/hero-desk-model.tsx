import { useMemo } from 'react';
import { MathUtils } from 'three';

import { MODEL_ROTATE_END_PROGRESS } from '../head-tracking-model/layout-constants';
import { DeskCornerCanvas } from '../desk-corner-canvas';
import { HERO_DESK_FLIP_TRIGGER_PROGRESS } from './rotation-timing';

export const DESK_TURN_END_PROGRESS = Math.min(0.28, MODEL_ROTATE_END_PROGRESS);
export const LAPTOP_SCREEN_ZOOM_START_PROGRESS = DESK_TURN_END_PROGRESS + 0.04;
export const LAPTOP_SCREEN_ZOOM_END_PROGRESS = 0.58;

export function HeroDeskModel({
    onLaptopCameraZoomSettled,
    onLaptopVideoEnded,
    scrollProgress,
}: {
    onLaptopCameraZoomSettled?: () => void;
    onLaptopVideoEnded?: () => void;
    scrollProgress: number;
}) {
    const transitionProgress = useMemo(
        () => MathUtils.smootherstep(scrollProgress, 0, DESK_TURN_END_PROGRESS),
        [scrollProgress],
    );
    const laptopZoomProgress = useMemo(
        () =>
            MathUtils.smootherstep(
                scrollProgress,
                LAPTOP_SCREEN_ZOOM_START_PROGRESS,
                LAPTOP_SCREEN_ZOOM_END_PROGRESS,
            ),
        [scrollProgress],
    );
    const isFlipped = transitionProgress > HERO_DESK_FLIP_TRIGGER_PROGRESS;
    const flipProgress = isFlipped ? 1 : 0;
    const travelProgress = isFlipped ? 1 : 0;

    return (
        <div
            className="pointer-events-none absolute inset-0 z-20 h-screen w-screen overflow-visible"
            style={{ contain: 'layout paint size' }}
        >
            <div className="h-full w-full [&_canvas]:!h-full [&_canvas]:!w-full">
                <DeskCornerCanvas
                    laptopZoomProgress={laptopZoomProgress}
                    onLaptopCameraZoomSettled={onLaptopCameraZoomSettled}
                    onLaptopVideoEnded={onLaptopVideoEnded}
                    rotationProgress={flipProgress}
                    travelProgress={travelProgress}
                />
            </div>
        </div>
    );
}
