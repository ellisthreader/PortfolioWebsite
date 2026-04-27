import { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    Quaternion,
    type Object3D,
} from 'three';

import {
    ARM_BONE_NAME_CANDIDATES,
    FINGER_TYPING_POSE,
    HEAD_BONE_NAME_CANDIDATES,
    HEAD_OBJECT_NAME_CANDIDATES,
    NECK_BONE_NAME_CANDIDATES,
    SHOULDER_BONE_NAME_CANDIDATES,
    WRIST_BONE_NAME_CANDIDATES,
    type ArmBoneKey,
    type FingerBoneKey,
    type ShoulderBoneKey,
    type WristBoneKey,
} from './bone-config';
import { findObjectByCandidates } from './helpers';

export type HeadTrackingRig = {
    armBoneRefs: React.MutableRefObject<Record<ArmBoneKey, Object3D | null>>;
    baseArmQuaternionRef: React.MutableRefObject<
        Partial<Record<ArmBoneKey, Quaternion>>
    >;
    baseFingerQuaternionRef: React.MutableRefObject<
        Partial<Record<FingerBoneKey, Quaternion>>
    >;
    baseFingerTipQuaternionRef: React.MutableRefObject<
        Partial<Record<FingerBoneKey, Quaternion>>
    >;
    baseHeadBoneQuaternionRef: React.MutableRefObject<Quaternion | null>;
    baseNeckQuaternionRef: React.MutableRefObject<Quaternion | null>;
    baseShoulderQuaternionRef: React.MutableRefObject<
        Partial<Record<ShoulderBoneKey, Quaternion>>
    >;
    baseWristQuaternionRef: React.MutableRefObject<
        Partial<Record<WristBoneKey, Quaternion>>
    >;
    fingerBoneRefs: React.MutableRefObject<
        Partial<Record<FingerBoneKey, Object3D>>
    >;
    fingerTipBoneRefs: React.MutableRefObject<
        Partial<Record<FingerBoneKey, Object3D>>
    >;
    headBoneRef: React.MutableRefObject<Object3D | null>;
    headObjectRefs: React.MutableRefObject<Object3D[]>;
    neckBoneRef: React.MutableRefObject<Object3D | null>;
    shoulderBoneRefs: React.MutableRefObject<
        Record<ShoulderBoneKey, Object3D | null>
    >;
    wristBoneRefs: React.MutableRefObject<
        Record<WristBoneKey, Object3D | null>
    >;
};

export function useHeadTrackingScene({
    modelUrl,
    laptopVideo,
    onLaptopVideoEnded,
}: {
    laptopVideo: HTMLVideoElement | null;
    modelUrl: string;
    onLaptopVideoEnded?: () => void;
}) {
    const { scene: sourceScene } = useGLTF(modelUrl);
    const scene = useMemo(() => clone(sourceScene) as Object3D, [sourceScene]);
    const laptopScreenMesh = useMemo(() => {
        const object = scene.getObjectByName('laptop_screen_dark_display');

        return object instanceof Mesh ? object : null;
    }, [scene]);
    const screenMaterial = useMemo(() => {
        if (!laptopScreenMesh) {
            return null;
        }

        const material = new MeshBasicMaterial({
            color: '#ffffff',
            side: DoubleSide,
            toneMapped: false,
        });

        laptopScreenMesh.material = material;

        return material;
    }, [laptopScreenMesh]);
    const rig: HeadTrackingRig = {
        armBoneRefs: useRef({ armLeft: null, armRight: null }),
        baseArmQuaternionRef: useRef({}),
        baseFingerQuaternionRef: useRef({}),
        baseFingerTipQuaternionRef: useRef({}),
        baseHeadBoneQuaternionRef: useRef(null),
        baseNeckQuaternionRef: useRef(null),
        baseShoulderQuaternionRef: useRef({}),
        baseWristQuaternionRef: useRef({}),
        fingerBoneRefs: useRef({}),
        fingerTipBoneRefs: useRef({}),
        headBoneRef: useRef(null),
        headObjectRefs: useRef([]),
        neckBoneRef: useRef(null),
        shoulderBoneRefs: useRef({ shoulderLeft: null, shoulderRight: null }),
        wristBoneRefs: useRef({ wristLeft: null, wristRight: null }),
    };

    useEffect(() => {
        useGLTF.preload(modelUrl);
    }, [modelUrl]);

    useEffect(() => {
        for (const [boneKey, candidates] of Object.entries(
            SHOULDER_BONE_NAME_CANDIDATES,
        ) as Array<[ShoulderBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(scene, candidates);

            rig.shoulderBoneRefs.current[boneKey] = bone;

            if (bone) {
                rig.baseShoulderQuaternionRef.current[boneKey] =
                    bone.quaternion.clone();
            }
        }

        for (const [boneKey, candidates] of Object.entries(
            ARM_BONE_NAME_CANDIDATES,
        ) as Array<[ArmBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(scene, candidates);

            rig.armBoneRefs.current[boneKey] = bone;

            if (bone) {
                rig.baseArmQuaternionRef.current[boneKey] =
                    bone.quaternion.clone();
            }
        }

        for (const [boneKey, candidates] of Object.entries(
            WRIST_BONE_NAME_CANDIDATES,
        ) as Array<[WristBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(scene, candidates);

            rig.wristBoneRefs.current[boneKey] = bone;

            if (bone) {
                rig.baseWristQuaternionRef.current[boneKey] =
                    bone.quaternion.clone();
            }
        }

        for (const { key, candidates, tipCandidates } of FINGER_TYPING_POSE) {
            const bone = findObjectByCandidates(scene, candidates);
            const tipBone = findObjectByCandidates(scene, tipCandidates);

            if (bone) {
                rig.fingerBoneRefs.current[key] = bone;
                rig.baseFingerQuaternionRef.current[key] =
                    bone.quaternion.clone();
            }

            if (tipBone) {
                rig.fingerTipBoneRefs.current[key] = tipBone;
                rig.baseFingerTipQuaternionRef.current[key] =
                    tipBone.quaternion.clone();
            }
        }

        rig.neckBoneRef.current = findObjectByCandidates(
            scene,
            NECK_BONE_NAME_CANDIDATES,
        );
        rig.headBoneRef.current = findObjectByCandidates(
            scene,
            HEAD_BONE_NAME_CANDIDATES,
        );

        if (rig.neckBoneRef.current) {
            rig.baseNeckQuaternionRef.current =
                rig.neckBoneRef.current.quaternion.clone();
        }

        if (rig.headBoneRef.current) {
            rig.baseHeadBoneQuaternionRef.current =
                rig.headBoneRef.current.quaternion.clone();
        }

        rig.headObjectRefs.current = HEAD_OBJECT_NAME_CANDIDATES.flatMap(
            (name) => {
                const object = scene.getObjectByName(name);

                return object ? [object] : [];
            },
        );
    }, [scene]);

    useEffect(() => {
        scene.traverse((object) => {
            object.castShadow = true;
            object.receiveShadow = true;
            object.frustumCulled = false;
        });
    }, [scene]);

    useEffect(() => {
        return () => {
            screenMaterial?.dispose();
        };
    }, [screenMaterial]);

    useEffect(() => {
        if (!laptopVideo) return;

        const handleLaptopVideoEnded = () => {
            onLaptopVideoEnded?.();
        };

        laptopVideo.addEventListener('ended', handleLaptopVideoEnded);

        return () => {
            laptopVideo.removeEventListener('ended', handleLaptopVideoEnded);
        };
    }, [laptopVideo, onLaptopVideoEnded]);

    return { rig, scene, screenMaterial };
}
