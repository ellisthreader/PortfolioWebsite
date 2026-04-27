import { MathUtils, type MeshBasicMaterial, type Object3D } from 'three';

import {
    LAPTOP_VIDEO_START_SCROLL_PROGRESS,
    MODEL_FOLLOW_THROUGH_END_PROGRESS,
    MODEL_FOLLOW_THROUGH_START_PROGRESS,
    MODEL_ROTATE_END_PROGRESS,
    MODEL_ZOOM_START_PROGRESS,
} from './layout-constants';
import { updateRigPoses } from './update-rig-poses';
import { updateStageAndLaptop } from './update-stage-and-laptop';
import type { HeadTrackingRig } from './use-head-tracking-scene';

export function updateHeadTrackingScene({
    delta,
    elapsedTime,
    laptopGroup,
    modelRotationGroup,
    laptopVideo,
    laptopVideoStartedRef,
    laptopVideoTexture,
    presentation,
    rawScrollProgress,
    rig,
    screenMaterial,
    stageGroup,
}: {
    delta: number;
    elapsedTime: number;
    laptopGroup: Object3D | null;
    modelRotationGroup?: Object3D | null;
    laptopVideo: HTMLVideoElement | null;
    laptopVideoStartedRef: React.MutableRefObject<boolean>;
    laptopVideoTexture: import('three').Texture | null;
    presentation: 'scroll' | 'portfolioHero';
    rawScrollProgress: number;
    rig: HeadTrackingRig;
    screenMaterial: MeshBasicMaterial | null;
    stageGroup: Object3D | null;
}) {
    if (!stageGroup) return;

    const rotateProgress = MathUtils.smootherstep(
        rawScrollProgress,
        0,
        MODEL_ROTATE_END_PROGRESS,
    );
    const zoomProgress =
        presentation === 'portfolioHero'
            ? MathUtils.smootherstep(
                  rawScrollProgress,
                  MODEL_ZOOM_START_PROGRESS,
                  0.9,
              )
            : 0;
    const laptopInteractionProgress =
        presentation === 'portfolioHero'
            ? zoomProgress
            : MathUtils.smootherstep(
                  rawScrollProgress,
                  MODEL_ROTATE_END_PROGRESS,
                  MODEL_ZOOM_START_PROGRESS + 0.1,
              );
    const armHoldProgress = MathUtils.smootherstep(zoomProgress, 0.08, 0.36);
    const typingArmHoldProgress = Math.max(
        armHoldProgress,
        MathUtils.smootherstep(laptopInteractionProgress, 0.08, 0.36),
    );
    const laptopHoldProgress = MathUtils.smootherstep(
        laptopInteractionProgress,
        0.28,
        0.78,
    );
    const followThroughProgress = MathUtils.smootherstep(
        rawScrollProgress,
        MODEL_FOLLOW_THROUGH_START_PROGRESS,
        MODEL_FOLLOW_THROUGH_END_PROGRESS,
    );

    if (screenMaterial && screenMaterial.map !== laptopVideoTexture) {
        screenMaterial.map = laptopVideoTexture;
        screenMaterial.needsUpdate = true;
    }

    if (
        laptopVideo &&
        (presentation === 'portfolioHero' ||
            rawScrollProgress >= LAPTOP_VIDEO_START_SCROLL_PROGRESS) &&
        !laptopVideoStartedRef.current &&
        !laptopVideo.ended
    ) {
        laptopVideoStartedRef.current = true;
        void laptopVideo.play().catch(() => {});
    }

    updateStageAndLaptop({
        delta,
        followThroughProgress,
        laptopGroup,
        laptopRevealProgress: zoomProgress,
        modelRotationGroup,
        presentation,
        stageTransitionProgress: rotateProgress,
        stageGroup,
    });
    updateRigPoses({
        armHoldProgress: typingArmHoldProgress,
        delta,
        elapsedTime,
        laptopHoldProgress,
        presentation,
        rig,
        zoomProgress,
    });
}
