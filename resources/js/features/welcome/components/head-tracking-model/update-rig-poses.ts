import { MathUtils } from 'three';

import {
    ARM_LAPTOP_POSE,
    FINGER_TYPING_POSE,
    LEFT_FINGER_TYPE_AXIS,
    LEFT_THUMB_TYPE_AXIS,
    PORTFOLIO_HERO_ARM_LAPTOP_POSE,
    PORTFOLIO_HERO_HEAD_LAPTOP_POSE,
    PORTFOLIO_HERO_NECK_LAPTOP_POSE,
    PORTFOLIO_HERO_SHOULDER_LAPTOP_POSE,
    PORTFOLIO_HERO_WRIST_LAPTOP_POSE,
    RIGHT_FINGER_TYPE_AXIS,
    RIGHT_THUMB_TYPE_AXIS,
    SHOULDER_LAPTOP_POSE,
    WRIST_LAPTOP_POSE,
    type ArmBoneKey,
    type ShoulderBoneKey,
    type WristBoneKey,
} from './bone-config';
import { composePoseQuaternion } from './helpers';
import type { HeadTrackingRig } from './use-head-tracking-scene';

function applyPose({
    baseQuaternion,
    bone,
    delta,
    pose,
    progress,
}: {
    baseQuaternion: import('three').Quaternion | null | undefined;
    bone: import('three').Object3D | null | undefined;
    delta: number;
    pose: readonly [number, number, number];
    progress: number;
}) {
    if (!bone || !baseQuaternion) return;

    bone.quaternion.slerp(
        baseQuaternion
            .clone()
            .slerp(composePoseQuaternion(baseQuaternion, pose), progress),
        1 - Math.exp(-8 * delta),
    );
}

export function updateRigPoses({
    armHoldProgress,
    delta,
    elapsedTime,
    laptopHoldProgress,
    presentation,
    rig,
    zoomProgress,
}: {
    armHoldProgress: number;
    delta: number;
    elapsedTime: number;
    laptopHoldProgress: number;
    presentation: 'scroll' | 'portfolioHero';
    rig: HeadTrackingRig;
    zoomProgress: number;
}) {
    for (const object of rig.headObjectRefs.current) {
        object.visible = !(presentation === 'scroll' && zoomProgress > 0.42);
    }

    (['shoulderLeft', 'shoulderRight'] as ShoulderBoneKey[]).forEach(
        (boneKey) =>
            applyPose({
                baseQuaternion: rig.baseShoulderQuaternionRef.current[boneKey],
                bone: rig.shoulderBoneRefs.current[boneKey],
                delta,
                pose:
                    presentation === 'portfolioHero'
                        ? PORTFOLIO_HERO_SHOULDER_LAPTOP_POSE[boneKey]
                        : SHOULDER_LAPTOP_POSE[boneKey],
                progress: armHoldProgress,
            }),
    );
    (['armLeft', 'armRight'] as ArmBoneKey[]).forEach((boneKey) =>
        applyPose({
            baseQuaternion: rig.baseArmQuaternionRef.current[boneKey],
            bone: rig.armBoneRefs.current[boneKey],
            delta,
            pose:
                presentation === 'portfolioHero'
                    ? PORTFOLIO_HERO_ARM_LAPTOP_POSE[boneKey]
                    : ARM_LAPTOP_POSE[boneKey],
            progress: armHoldProgress,
        }),
    );
    (['wristLeft', 'wristRight'] as WristBoneKey[]).forEach((boneKey) =>
        applyPose({
            baseQuaternion: rig.baseWristQuaternionRef.current[boneKey],
            bone: rig.wristBoneRefs.current[boneKey],
            delta,
            pose:
                presentation === 'portfolioHero'
                    ? PORTFOLIO_HERO_WRIST_LAPTOP_POSE[boneKey]
                    : WRIST_LAPTOP_POSE[boneKey],
            progress: armHoldProgress,
        }),
    );

    if (rig.neckBoneRef.current && rig.baseNeckQuaternionRef.current) {
        rig.neckBoneRef.current.quaternion.slerp(
            presentation === 'portfolioHero'
                ? composePoseQuaternion(
                      rig.baseNeckQuaternionRef.current,
                      PORTFOLIO_HERO_NECK_LAPTOP_POSE,
                  )
                : rig.baseNeckQuaternionRef.current,
            1 - Math.exp(-6 * delta),
        );
    }

    if (rig.headBoneRef.current && rig.baseHeadBoneQuaternionRef.current) {
        rig.headBoneRef.current.quaternion.slerp(
            presentation === 'portfolioHero'
                ? composePoseQuaternion(
                      rig.baseHeadBoneQuaternionRef.current,
                      PORTFOLIO_HERO_HEAD_LAPTOP_POSE,
                  )
                : rig.baseHeadBoneQuaternionRef.current,
            1 - Math.exp(-6 * delta),
        );
    }

    for (const { key, curl, phase } of FINGER_TYPING_POSE) {
        const bone = rig.fingerBoneRefs.current[key];
        const baseQuaternion = rig.baseFingerQuaternionRef.current[key];
        const tipBone = rig.fingerTipBoneRefs.current[key];
        const tipBaseQuaternion = rig.baseFingerTipQuaternionRef.current[key];

        if (!bone || !baseQuaternion) continue;

        const tap =
            Math.pow(Math.max(0, Math.sin(elapsedTime * 10.5 + phase)), 2.6) *
            laptopHoldProgress;
        const rebound =
            Math.sin(elapsedTime * 10.5 + phase + Math.PI * 0.45) *
            0.06 *
            laptopHoldProgress;
        const fingerCurl = curl * tap - rebound;
        const typeAxis = key.includes('thumb')
            ? key.includes('Right')
                ? RIGHT_THUMB_TYPE_AXIS
                : LEFT_THUMB_TYPE_AXIS
            : key.includes('Right')
              ? RIGHT_FINGER_TYPE_AXIS
              : LEFT_FINGER_TYPE_AXIS;

        bone.quaternion.slerp(
            composePoseQuaternion(baseQuaternion, [
                fingerCurl * typeAxis[0],
                fingerCurl * typeAxis[1],
                fingerCurl * typeAxis[2],
            ]),
            1 - Math.exp(-14 * delta),
        );

        if (tipBone && tipBaseQuaternion) {
            tipBone.quaternion.slerp(
                composePoseQuaternion(tipBaseQuaternion, [
                    fingerCurl * 1.35 * typeAxis[0],
                    fingerCurl * 1.35 * typeAxis[1],
                    fingerCurl * 1.35 * typeAxis[2],
                ]),
                1 - Math.exp(-18 * delta),
            );
        }
    }
}
