import { MathUtils, type Object3D } from 'three';

import {
    LAPTOP_REST_ROTATION_X,
    LAPTOP_REST_X,
    LAPTOP_REST_Z,
    LAPTOP_SCALE,
    LAPTOP_START_ROTATION_X,
    LAPTOP_START_X,
    LAPTOP_START_Y,
    LAPTOP_START_Z,
    MODEL_CENTER_X,
    MODEL_END_ROTATION_Y,
    MODEL_START_ROTATION_Y,
    MODEL_START_X,
    MODEL_START_Y,
    PORTFOLIO_HERO_LAPTOP_ROTATION_X,
    PORTFOLIO_HERO_LAPTOP_SCALE,
    PORTFOLIO_HERO_LAPTOP_X,
    PORTFOLIO_HERO_LAPTOP_Y,
    PORTFOLIO_HERO_LAPTOP_Z,
    PORTFOLIO_HERO_STAGE_X,
    PORTFOLIO_HERO_STAGE_Y,
    PORTFOLIO_HERO_SUBJECT_ROTATION_Y,
} from './layout-constants';

export function updateStageAndLaptop({
    stageTransitionProgress,
    delta,
    followThroughProgress,
    laptopGroup,
    laptopRevealProgress,
    modelRotationGroup,
    presentation,
    stageGroup,
}: {
    stageTransitionProgress: number;
    delta: number;
    followThroughProgress: number;
    laptopGroup: Object3D | null;
    laptopRevealProgress: number;
    modelRotationGroup?: Object3D | null;
    presentation: 'scroll' | 'portfolioHero';
    stageGroup: Object3D;
}) {
    stageGroup.position.x = MathUtils.damp(
        stageGroup.position.x,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_STAGE_X
            : MathUtils.lerp(
                  MODEL_START_X,
                  MODEL_CENTER_X,
                  stageTransitionProgress,
              ),
        6.8,
        delta,
    );
    stageGroup.position.y = MathUtils.damp(
        stageGroup.position.y,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_STAGE_Y
            : MODEL_START_Y,
        6.8,
        delta,
    );
    const rotationTarget =
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_SUBJECT_ROTATION_Y
            : MathUtils.lerp(
                  MODEL_START_ROTATION_Y,
                  MODEL_END_ROTATION_Y,
                  stageTransitionProgress,
              );
    const rotationGroup = modelRotationGroup ?? stageGroup;

    if (modelRotationGroup) {
        stageGroup.rotation.y = MathUtils.damp(
            stageGroup.rotation.y,
            0,
            6.8,
            delta,
        );
    }

    rotationGroup.rotation.y = MathUtils.damp(
        rotationGroup.rotation.y,
        rotationTarget,
        6.8,
        delta,
    );

    if (!laptopGroup) return;

    laptopGroup.position.x = MathUtils.damp(
        laptopGroup.position.x,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_LAPTOP_X
            : MathUtils.lerp(
                  LAPTOP_START_X,
                  LAPTOP_REST_X,
                  laptopRevealProgress,
              ),
        8.5,
        delta,
    );
    laptopGroup.position.y = MathUtils.damp(
        laptopGroup.position.y,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_LAPTOP_Y
            : MathUtils.lerp(
                  MathUtils.lerp(LAPTOP_START_Y, 2.94, laptopRevealProgress),
                  3.12,
                  followThroughProgress,
              ),
        8.5,
        delta,
    );
    laptopGroup.position.z = MathUtils.damp(
        laptopGroup.position.z,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_LAPTOP_Z
            : MathUtils.lerp(
                  MathUtils.lerp(
                      LAPTOP_START_Z,
                      LAPTOP_REST_Z,
                      laptopRevealProgress,
                  ),
                  1.8,
                  followThroughProgress,
              ),
        8.5,
        delta,
    );
    laptopGroup.rotation.x = MathUtils.damp(
        laptopGroup.rotation.x,
        presentation === 'portfolioHero'
            ? PORTFOLIO_HERO_LAPTOP_ROTATION_X
            : MathUtils.lerp(
                  LAPTOP_START_ROTATION_X,
                  LAPTOP_REST_ROTATION_X,
                  laptopRevealProgress,
              ),
        8.5,
        delta,
    );
    laptopGroup.rotation.y = MathUtils.damp(
        laptopGroup.rotation.y,
        Math.PI,
        8.5,
        delta,
    );
    laptopGroup.rotation.z = MathUtils.damp(
        laptopGroup.rotation.z,
        0,
        8.5,
        delta,
    );
    laptopGroup.scale.setScalar(
        MathUtils.damp(
            laptopGroup.scale.x,
            MathUtils.lerp(
                0.001,
                presentation === 'portfolioHero'
                    ? PORTFOLIO_HERO_LAPTOP_SCALE
                    : LAPTOP_SCALE,
                laptopRevealProgress,
            ),
            8.5,
            delta,
        ),
    );
}
