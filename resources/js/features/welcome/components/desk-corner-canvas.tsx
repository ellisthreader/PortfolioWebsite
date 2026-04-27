import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
    ACESFilmicToneMapping,
    Box3,
    Bone,
    ClampToEdgeWrapping,
    Color,
    DoubleSide,
    Float32BufferAttribute,
    LinearFilter,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    PointLight,
    Quaternion,
    Shape,
    Sphere,
    SRGBColorSpace,
    Skeleton,
    SkinnedMesh,
    Uint16BufferAttribute,
    Vector3,
    VideoTexture,
    type Material,
    type MeshPhysicalMaterialParameters,
    type PerspectiveCamera,
    type SpotLight,
} from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

import {
    ARM_BONE_NAME_CANDIDATES,
    HEAD_BONE_NAME_CANDIDATES,
    HEAD_OBJECT_NAME_CANDIDATES,
    LEFT_FINGER_TYPE_AXIS,
    LEFT_THUMB_TYPE_AXIS,
    NECK_BONE_NAME_CANDIDATES,
    PORTFOLIO_HERO_HEAD_LAPTOP_POSE,
    PORTFOLIO_HERO_NECK_LAPTOP_POSE,
    RIGHT_FINGER_TYPE_AXIS,
    RIGHT_THUMB_TYPE_AXIS,
    SHOULDER_BONE_NAME_CANDIDATES,
    WRIST_BONE_NAME_CANDIDATES,
    type ArmBoneKey,
    type ShoulderBoneKey,
    type WristBoneKey,
} from './head-tracking-model/bone-config';
import {
    composePoseQuaternion,
    findObjectByCandidates,
} from './head-tracking-model/helpers';

const DESK_MODEL_URL = '/AllIn1.glb';

const DESK_SURFACE_CONFIG = {
    desk_top: {
        clearcoat: 1,
        clearcoatRoughness: 0.025,
        color: '#090a10',
        emissive: '#06030a',
        emissiveIntensity: 0.055,
        envMapIntensity: 3.2,
        metalness: 0.92,
        roughness: 0.055,
        sheen: 0.22,
        sheenColor: '#8c739c',
        specularIntensity: 2.15,
    },
    desk_front_panel: {
        clearcoat: 1,
        clearcoatRoughness: 0.035,
        color: '#070810',
        emissive: '#050207',
        emissiveIntensity: 0.045,
        envMapIntensity: 2.8,
        metalness: 0.86,
        roughness: 0.075,
        sheen: 0.2,
        sheenColor: '#766384',
        specularIntensity: 1.95,
    },
    desk_rear_rail: {
        clearcoat: 1,
        clearcoatRoughness: 0.025,
        color: '#090a12',
        emissive: '#050208',
        emissiveIntensity: 0.05,
        envMapIntensity: 3.35,
        metalness: 0.94,
        roughness: 0.045,
        sheen: 0.22,
        sheenColor: '#8d7aa0',
        specularIntensity: 2.25,
    },
} as const;

const DESK_CORNER_CAMERA_FOV = 18.5;
const DESK_CORNER_CAMERA_LOOK_AT_X_OFFSET = -0.36;
const DESK_CORNER_START_SCREEN_RIGHT_OFFSET = -1.15;
const DESK_CORNER_CAMERA_LOOK_AT_Y_OFFSET = 0.42;
const DESK_CORNER_CAMERA_DIRECTION = new Vector3(0, 0, 0);
const DESK_CORNER_CAMERA_TARGET = new Vector3(0, 0, 0);
const DESK_CORNER_FRAMED_CAMERA_TARGET = new Vector3(0, 0, 0);
const DESK_CORNER_MODEL_BOUNDS = new Box3();
const DESK_CORNER_MODEL_SPHERE = new Sphere();
const LAPTOP_SCREEN_CAMERA_BOUNDS = new Box3();
const LAPTOP_SCREEN_CAMERA_CENTER = new Vector3();
const LAPTOP_SCREEN_CAMERA_DIRECTION = new Vector3();
const LAPTOP_SCREEN_CAMERA_HEAD_POSITION = new Vector3();
const LAPTOP_SCREEN_CAMERA_POSITION = new Vector3();
const LAPTOP_SCREEN_CAMERA_QUATERNION = new Quaternion();
const LAPTOP_SCREEN_CAMERA_RIGHT = new Vector3();
const LAPTOP_SCREEN_CAMERA_SIZE = new Vector3();
const LAPTOP_SCREEN_CAMERA_TARGET = new Vector3();
const LAPTOP_SCREEN_CAMERA_UP = new Vector3();
const LAPTOP_SCREEN_CAMERA_VIEW_POSITION = new Vector3();
const LAPTOP_SCREEN_MODEL_NAME = 'laptop_screen_dark_display';
const LAPTOP_SCREEN_VIDEO_URL = '/VideoLoad.mp4';
const LAPTOP_SCREEN_VIDEO_START_PROGRESS = 0.985;
const LAPTOP_SCREEN_ZOOM_MARGIN = 1.08;
const LAPTOP_SCREEN_ZOOM_DAMPING = 6.4;
const LAPTOP_SCREEN_ZOOM_ORBIT_READY_START = 0.82;
const LAPTOP_SCREEN_ZOOM_ORBIT_READY_END = 0.995;
const LAPTOP_SCREEN_CHARACTER_VIEW_DISTANCE_MULTIPLIER = 1.28;
const LAPTOP_SCREEN_CHARACTER_VIEW_LIFT_MULTIPLIER = 0.08;
const LAPTOP_SCREEN_VIEWPORT_RIGHT_OFFSET_MULTIPLIER = -0.08;
const LAPTOP_SCREEN_HEAD_HIDE_PROGRESS = 0.85;
const DESK_INITIAL_WIDTH_MULTIPLIER = 2.55;
const DESK_SCROLL_WIDTH_MULTIPLIER = 3.55;
const TOP_HERO_STAGE_START_X = 2.2;
const TOP_HERO_STAGE_START_Y = 1.18;
const TOP_HERO_STAGE_Z = 0.72;
const TOP_HERO_STAGE_END_X = 0.95;
const TOP_HERO_STAGE_END_Y = 0.9;
const SUBJECT_VISIBILITY_ROTATION_Y = MathUtils.degToRad(-25);
const FINAL_CAMERA_ORBIT_RADIANS = Math.PI;
const CAMERA_OVERHEAD_LIFT_MULTIPLIER = 0.82;
const CAMERA_ORBIT_DAMPING = 9.2;
const CAMERA_LOOK_DAMPING = 8.6;
const CAMERA_WORLD_UP = new Vector3(0, 1, 0);
const FRONT_LEFT_WRIST_DOWN_NUDGE_WORLD_Y = -0.018;
const FRONT_LEFT_WRIST_NUDGE_WORLD = new Vector3(
    0,
    FRONT_LEFT_WRIST_DOWN_NUDGE_WORLD_Y,
    0,
);
const FRONT_LEFT_WRIST_NUDGE_TARGET = new Vector3();
const FRONT_LEFT_WRIST_NUDGE_TARGET_WORLD = new Vector3();
const TOP_HERO_HAND_BONE_NAME_CANDIDATES = {
    handLeft: ['Hand.L', 'HandL'],
    handRight: ['Hand.R', 'HandR'],
} as const;
const TOP_HERO_HAND_MESH_NAME = 'handStylized';
const TOP_HERO_SKINNED_HAND_MESH_NAME = 'handStylized_runtime_skinned';
const TOP_HERO_SUBJECT_PIVOT_NAME = 'top_hero_subject_visibility_pivot';
const TOP_HERO_SUBJECT_PIVOT_BOUNDS = new Box3();
const TOP_HERO_SUBJECT_PIVOT_CENTER = new Vector3();

const TOP_HERO_HAND_SKIN_BONE_CANDIDATES = {
    left: [
        'Wrist.L',
        'WristL',
        'Hand.L',
        'HandL',
        'Thumb.L',
        'ThumbL',
        'Thumb.L.001',
        'ThumbL001',
        'Index.L',
        'IndexL',
        'Index.L.001',
        'IndexL001',
        'Middle.L',
        'MiddleL',
        'Middle.L.001',
        'MiddleL001',
        'Ring.L',
        'RingL',
        'Ring.L.001',
        'RingL001',
        'Ring.L.002',
        'RingL002',
        'Ring.L.003',
        'RingL003',
    ],
    right: [
        'Wrist.R',
        'WristR',
        'Hand.R',
        'HandR',
        'Thumb.R',
        'ThumbR',
        'Thumb.R.001',
        'ThumbR001',
        'Index.R',
        'IndexR',
        'Index.R.001',
        'IndexR001',
        'Middle.R',
        'MiddleR',
        'Middle.R.001',
        'MiddleR001',
        'Ring.R',
        'RingR',
        'Ring.R.001',
        'RingR001',
        'Ring.R.002',
        'RingR002',
        'Ring.R.003',
        'RingR003',
    ],
} as const;

const TOP_HERO_FINGER_CHAINS = [
    {
        key: 'indexLeft',
        distalCandidates: ['Index.L.001', 'IndexL001'],
        phase: 0,
        rootCandidates: ['Index.L', 'IndexL'],
        curl: 0.34,
        secondaryCurl: 0.24,
    },
    {
        key: 'middleLeft',
        distalCandidates: ['Middle.L.001', 'MiddleL001'],
        phase: 1.35,
        rootCandidates: ['Middle.L', 'MiddleL'],
        curl: 0.31,
        secondaryCurl: 0.22,
    },
    {
        key: 'ringLeft',
        distalCandidates: ['Ring.L.001', 'RingL001'],
        phase: 2.5,
        rootCandidates: ['Ring.L', 'RingL'],
        curl: 0.28,
        secondaryCurl: 0.21,
    },
    {
        key: 'pinkyLeft',
        distalCandidates: ['Ring.L.003', 'RingL003'],
        phase: 3.1,
        rootCandidates: ['Ring.L.002', 'RingL002', 'Pinky.L', 'PinkyL'],
        curl: 0.2,
        secondaryCurl: 0.15,
    },
    {
        key: 'thumbLeft',
        distalCandidates: ['Thumb.L.001', 'ThumbL001'],
        phase: 3.75,
        rootCandidates: ['Thumb.L', 'ThumbL'],
        curl: 0.16,
        secondaryCurl: 0.12,
    },
    {
        key: 'indexRight',
        distalCandidates: ['Index.R.001', 'IndexR001'],
        phase: 0.82,
        rootCandidates: ['Index.R', 'IndexR'],
        curl: 0.34,
        secondaryCurl: 0.24,
    },
    {
        key: 'middleRight',
        distalCandidates: ['Middle.R.001', 'MiddleR001'],
        phase: 1.92,
        rootCandidates: ['Middle.R', 'MiddleR'],
        curl: 0.31,
        secondaryCurl: 0.22,
    },
    {
        key: 'ringRight',
        distalCandidates: ['Ring.R.001', 'RingR001'],
        phase: 3.04,
        rootCandidates: ['Ring.R', 'RingR'],
        curl: 0.28,
        secondaryCurl: 0.21,
    },
    {
        key: 'pinkyRight',
        distalCandidates: ['Ring.R.003', 'RingR003'],
        phase: 3.7,
        rootCandidates: ['Ring.R.002', 'RingR002', 'Pinky.R', 'PinkyR'],
        curl: 0.2,
        secondaryCurl: 0.15,
    },
    {
        key: 'thumbRight',
        distalCandidates: ['Thumb.R.001', 'ThumbR001'],
        phase: 4.3,
        rootCandidates: ['Thumb.R', 'ThumbR'],
        curl: 0.16,
        secondaryCurl: 0.12,
    },
] as const;

type FingerChainKey = (typeof TOP_HERO_FINGER_CHAINS)[number]['key'];
type HandBoneKey = keyof typeof TOP_HERO_HAND_BONE_NAME_CANDIDATES;

function getTopHeroFingerTypeAxis(fingerKey: FingerChainKey) {
    if (fingerKey.includes('thumb')) {
        return fingerKey.includes('Right')
            ? RIGHT_THUMB_TYPE_AXIS
            : LEFT_THUMB_TYPE_AXIS;
    }

    return fingerKey.includes('Right')
        ? RIGHT_FINGER_TYPE_AXIS
        : LEFT_FINGER_TYPE_AXIS;
}

type TopHeroRig = {
    armBones: Record<ArmBoneKey, Object3D | null>;
    baseArmQuaternions: Partial<Record<ArmBoneKey, import('three').Quaternion>>;
    baseDistalFingerQuaternions: Partial<
        Record<FingerChainKey, import('three').Quaternion>
    >;
    baseFingerQuaternions: Partial<
        Record<FingerChainKey, import('three').Quaternion>
    >;
    baseHeadQuaternion: import('three').Quaternion | null;
    baseNeckQuaternion: import('three').Quaternion | null;
    baseShoulderQuaternions: Partial<
        Record<ShoulderBoneKey, import('three').Quaternion>
    >;
    baseWristPositions: Partial<Record<WristBoneKey, Vector3>>;
    baseWristQuaternions: Partial<
        Record<WristBoneKey, import('three').Quaternion>
    >;
    baseHandQuaternions: Partial<
        Record<HandBoneKey, import('three').Quaternion>
    >;
    distalFingerBones: Partial<Record<FingerChainKey, Object3D>>;
    fingerBones: Partial<Record<FingerChainKey, Object3D>>;
    handBones: Record<HandBoneKey, Object3D | null>;
    headBone: Object3D | null;
    neckBone: Object3D | null;
    shoulderBones: Record<ShoulderBoneKey, Object3D | null>;
    wristBones: Record<WristBoneKey, Object3D | null>;
};

type DeskPartKey = keyof typeof DESK_SURFACE_CONFIG;

type DeskPartState = {
    mesh: Mesh;
    baseScale: Vector3;
};

function createTopHeroRig(): TopHeroRig {
    return {
        armBones: { armLeft: null, armRight: null },
        baseArmQuaternions: {},
        baseDistalFingerQuaternions: {},
        baseFingerQuaternions: {},
        baseHandQuaternions: {},
        baseHeadQuaternion: null,
        baseNeckQuaternion: null,
        baseShoulderQuaternions: {},
        baseWristPositions: {},
        baseWristQuaternions: {},
        distalFingerBones: {},
        fingerBones: {},
        handBones: { handLeft: null, handRight: null },
        headBone: null,
        neckBone: null,
        shoulderBones: { shoulderLeft: null, shoulderRight: null },
        wristBones: { wristLeft: null, wristRight: null },
    };
}

function applyPose({
    baseQuaternion,
    bone,
    delta,
    pose,
    progress,
}: {
    baseQuaternion: import('three').Quaternion | null | undefined;
    bone: Object3D | null | undefined;
    delta: number;
    pose: readonly [number, number, number];
    progress: number;
}) {
    if (!bone || !baseQuaternion) {
        return;
    }

    bone.quaternion.slerp(
        baseQuaternion
            .clone()
            .slerp(composePoseQuaternion(baseQuaternion, pose), progress),
        1 - Math.exp(-10 * delta),
    );
}

function replacePhysicalMaterial(
    mesh: Mesh,
    config: {
        clearcoat: number;
        clearcoatRoughness: number;
        color: string;
        emissive: string;
        emissiveIntensity: number;
        envMapIntensity: number;
        metalness: number;
        roughness: number;
        sheen: number;
        sheenColor: string;
        specularIntensity: number;
    },
) {
    const sourceMaterial = mesh.material as MeshStandardMaterial | undefined;

    if (!sourceMaterial || Array.isArray(sourceMaterial)) {
        return;
    }

    const nextMaterialConfig: MeshPhysicalMaterialParameters = {
        alphaMap: sourceMaterial.alphaMap ?? undefined,
        alphaTest: sourceMaterial.alphaTest,
        aoMap: sourceMaterial.aoMap ?? undefined,
        clearcoat: config.clearcoat,
        clearcoatNormalMap: sourceMaterial.normalMap ?? undefined,
        clearcoatNormalScale: sourceMaterial.normalScale?.clone() ?? undefined,
        clearcoatRoughness: config.clearcoatRoughness,
        color: new Color(config.color),
        depthWrite: sourceMaterial.depthWrite,
        emissive: new Color(config.emissive),
        emissiveIntensity: config.emissiveIntensity,
        emissiveMap: sourceMaterial.emissiveMap ?? undefined,
        envMapIntensity: config.envMapIntensity,
        map: sourceMaterial.map ?? undefined,
        metalness: config.metalness,
        metalnessMap: sourceMaterial.metalnessMap ?? undefined,
        normalMap: sourceMaterial.normalMap ?? undefined,
        normalScale: sourceMaterial.normalScale?.clone() ?? undefined,
        roughness: config.roughness,
        roughnessMap: sourceMaterial.roughnessMap ?? undefined,
        sheen: config.sheen,
        sheenColor: new Color(config.sheenColor),
        side: sourceMaterial.side,
        specularIntensity: config.specularIntensity,
        transparent: sourceMaterial.transparent,
    };

    (mesh.material as Material).dispose();
    mesh.material = new MeshPhysicalMaterial(nextMaterialConfig);
}

function rotationFlipTargetProgress(rotationProgress: number) {
    return MathUtils.clamp(rotationProgress, 0, 1);
}

function easeRotationFlipProgress(progress: number) {
    return MathUtils.smootherstep(MathUtils.clamp(progress, 0, 1), 0, 1);
}

function createLaptopScreenVideo() {
    const video = document.createElement('video');

    video.src = LAPTOP_SCREEN_VIDEO_URL;
    video.crossOrigin = 'anonymous';
    video.loop = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    const texture = new VideoTexture(video);

    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;

    video.load();

    return { texture, video };
}

function createSubjectVisibilityPivot(root: Object3D) {
    const existingPivot = root.getObjectByName(TOP_HERO_SUBJECT_PIVOT_NAME);

    if (existingPivot) return existingPivot;

    const laptop = root.getObjectByName('floating_laptop');
    const armature = root.getObjectByName('Armature');

    if (!laptop || !armature) return null;

    root.updateWorldMatrix(true, true);
    TOP_HERO_SUBJECT_PIVOT_BOUNDS.makeEmpty();
    TOP_HERO_SUBJECT_PIVOT_BOUNDS.expandByObject(laptop);
    TOP_HERO_SUBJECT_PIVOT_BOUNDS.expandByObject(armature);
    TOP_HERO_SUBJECT_PIVOT_BOUNDS.getCenter(TOP_HERO_SUBJECT_PIVOT_CENTER);
    root.worldToLocal(TOP_HERO_SUBJECT_PIVOT_CENTER);

    const pivot = new Object3D();

    pivot.name = TOP_HERO_SUBJECT_PIVOT_NAME;
    pivot.position.copy(TOP_HERO_SUBJECT_PIVOT_CENTER);
    root.add(pivot);
    pivot.updateWorldMatrix(true, false);
    pivot.attach(laptop);
    pivot.attach(armature);

    return pivot;
}

function DeskCornerCamera({
    laptopZoomProgress,
    modelRoot,
    onLaptopCameraZoomSettled,
    rotationProgress,
}: {
    laptopZoomProgress: number;
    modelRoot: React.RefObject<Object3D | null>;
    onLaptopCameraZoomSettled?: () => void;
    rotationProgress: number;
}) {
    const { camera, size } = useThree();
    const cameraRef = useRef<PerspectiveCamera | null>(null);
    const headHiddenRef = useRef(false);
    const headOccluderRefs = useRef<Object3D[]>([]);
    const lookTargetRef = useRef(new Vector3());
    const orbitAnchorRef = useRef(new Vector3());
    const orbitOffsetRef = useRef(new Vector3());
    const fitDistanceRef = useRef(0);
    const hasReportedZoomSettledRef = useRef(false);
    const orbitProgressRef = useRef(0);
    const zoomProgressRef = useRef(0);

    useEffect(() => {
        const perspectiveCamera = camera as PerspectiveCamera;
        cameraRef.current = perspectiveCamera;

        perspectiveCamera.fov = DESK_CORNER_CAMERA_FOV;

        if (modelRoot.current) {
            DESK_CORNER_MODEL_BOUNDS.setFromObject(modelRoot.current);
            DESK_CORNER_MODEL_BOUNDS.getBoundingSphere(
                DESK_CORNER_MODEL_SPHERE,
            );

            const sphere = DESK_CORNER_MODEL_SPHERE;
            const fitDistance =
                (sphere.radius /
                    Math.sin((perspectiveCamera.fov * Math.PI) / 360)) *
                0.34;
            fitDistanceRef.current = fitDistance;

            DESK_CORNER_CAMERA_TARGET.copy(sphere.center);
            DESK_CORNER_CAMERA_TARGET.x += DESK_CORNER_CAMERA_LOOK_AT_X_OFFSET;
            DESK_CORNER_CAMERA_TARGET.y +=
                sphere.radius * DESK_CORNER_CAMERA_LOOK_AT_Y_OFFSET;
            orbitAnchorRef.current.copy(DESK_CORNER_CAMERA_TARGET);

            DESK_CORNER_CAMERA_DIRECTION.set(0.34, 1.08, 5.6)
                .sub(new Vector3(0.34, -0.16, 0.34))
                .normalize();
            orbitOffsetRef.current.copy(
                DESK_CORNER_CAMERA_DIRECTION.clone().multiplyScalar(
                    fitDistance,
                ),
            );

            perspectiveCamera.position.copy(
                DESK_CORNER_CAMERA_TARGET.clone().addScaledVector(
                    DESK_CORNER_CAMERA_DIRECTION,
                    fitDistance,
                ),
            );
            lookTargetRef.current.copy(DESK_CORNER_CAMERA_TARGET);
            perspectiveCamera.lookAt(DESK_CORNER_CAMERA_TARGET);
        } else {
            perspectiveCamera.position.set(0.34, 1.08, 5.6);
            lookTargetRef.current.set(0.34, -0.16, 0.34);
            perspectiveCamera.lookAt(0.34, -0.16, 0.34);
        }

        perspectiveCamera.updateProjectionMatrix();

        return () => {
            for (const object of headOccluderRefs.current) {
                object.visible = true;
            }

            headHiddenRef.current = false;
        };
    }, [camera, modelRoot]);

    useFrame((_, delta) => {
        const perspectiveCamera = cameraRef.current;

        if (!perspectiveCamera || fitDistanceRef.current === 0) return;

        const rotationTargetProgress =
            rotationFlipTargetProgress(rotationProgress);

        orbitProgressRef.current = rotationTargetProgress;

        const orbitOffset = orbitOffsetRef.current;
        const orbitAngle =
            FINAL_CAMERA_ORBIT_RADIANS *
            easeRotationFlipProgress(orbitProgressRef.current);
        const startScreenRightOffset =
            DESK_CORNER_START_SCREEN_RIGHT_OFFSET *
            (1 - MathUtils.smootherstep(rotationTargetProgress, 0, 1));
        const framedOrbitAnchor = DESK_CORNER_FRAMED_CAMERA_TARGET.copy(
            orbitAnchorRef.current,
        );

        framedOrbitAnchor.x += startScreenRightOffset;

        const overheadLift =
            Math.sin(orbitAngle) *
            fitDistanceRef.current *
            CAMERA_OVERHEAD_LIFT_MULTIPLIER;
        const orbitTargetPosition = framedOrbitAnchor
            .clone()
            .add(
                DESK_CORNER_CAMERA_DIRECTION.set(
                    orbitOffset.x,
                    orbitOffset.y + overheadLift,
                    orbitOffset.z * Math.cos(orbitAngle),
                ),
            );
        const screen = modelRoot.current?.getObjectByName(
            LAPTOP_SCREEN_MODEL_NAME,
        );
        const head = modelRoot.current
            ? findObjectByCandidates(
                  modelRoot.current,
                  HEAD_BONE_NAME_CANDIDATES,
              )
            : null;
        const zoomTarget =
            MathUtils.smootherstep(laptopZoomProgress, 0, 1) *
            MathUtils.smootherstep(
                orbitProgressRef.current,
                LAPTOP_SCREEN_ZOOM_ORBIT_READY_START,
                LAPTOP_SCREEN_ZOOM_ORBIT_READY_END,
            );
        zoomProgressRef.current = MathUtils.damp(
            zoomProgressRef.current,
            zoomTarget,
            LAPTOP_SCREEN_ZOOM_DAMPING,
            delta,
        );
        const zoomProgress = zoomProgressRef.current;
        const shouldSnapHeroOrbit =
            rotationTargetProgress >= 0.999 &&
            zoomTarget <= 0.001 &&
            zoomProgress <= 0.001;

        if (
            !hasReportedZoomSettledRef.current &&
            zoomProgress > 0.985 &&
            laptopZoomProgress > 0.995
        ) {
            hasReportedZoomSettledRef.current = true;
            onLaptopCameraZoomSettled?.();
        }

        const lookTarget = LAPTOP_SCREEN_CAMERA_TARGET.copy(framedOrbitAnchor);
        const targetPosition =
            LAPTOP_SCREEN_CAMERA_POSITION.copy(orbitTargetPosition);
        const shouldHideHead = zoomProgress > LAPTOP_SCREEN_HEAD_HIDE_PROGRESS;

        if (modelRoot.current && !headOccluderRefs.current.length) {
            headOccluderRefs.current = HEAD_OBJECT_NAME_CANDIDATES.flatMap(
                (name) => {
                    const object = modelRoot.current?.getObjectByName(name);

                    return object ? [object] : [];
                },
            );
        }

        if (
            headOccluderRefs.current.length &&
            headHiddenRef.current !== shouldHideHead
        ) {
            for (const object of headOccluderRefs.current) {
                object.visible = !shouldHideHead;
            }

            headHiddenRef.current = shouldHideHead;
        } else if (!headOccluderRefs.current.length) {
            headHiddenRef.current = false;
        }

        if (screen && zoomProgress > 0.001) {
            screen.updateWorldMatrix(true, false);
            LAPTOP_SCREEN_CAMERA_BOUNDS.setFromObject(screen);
            LAPTOP_SCREEN_CAMERA_BOUNDS.getCenter(LAPTOP_SCREEN_CAMERA_CENTER);
            LAPTOP_SCREEN_CAMERA_BOUNDS.getSize(LAPTOP_SCREEN_CAMERA_SIZE);
            screen.getWorldQuaternion(LAPTOP_SCREEN_CAMERA_QUATERNION);
            LAPTOP_SCREEN_CAMERA_DIRECTION.set(0, 0, -1)
                .applyQuaternion(LAPTOP_SCREEN_CAMERA_QUATERNION)
                .normalize();
            if (head) {
                head.getWorldPosition(LAPTOP_SCREEN_CAMERA_HEAD_POSITION);
                LAPTOP_SCREEN_CAMERA_HEAD_POSITION.sub(
                    LAPTOP_SCREEN_CAMERA_CENTER,
                );

                if (LAPTOP_SCREEN_CAMERA_HEAD_POSITION.lengthSq() > 0.0001) {
                    LAPTOP_SCREEN_CAMERA_DIRECTION.copy(
                        LAPTOP_SCREEN_CAMERA_HEAD_POSITION,
                    ).normalize();
                }
            }
            LAPTOP_SCREEN_CAMERA_UP.set(0, 1, 0)
                .applyQuaternion(LAPTOP_SCREEN_CAMERA_QUATERNION)
                .normalize();

            const verticalFovRadians = MathUtils.degToRad(
                perspectiveCamera.fov,
            );
            const horizontalFovRadians =
                2 *
                Math.atan(
                    Math.tan(verticalFovRadians / 2) *
                        Math.max(size.width / Math.max(size.height, 1), 1),
                );
            const screenFitDistance =
                Math.max(
                    LAPTOP_SCREEN_CAMERA_SIZE.y /
                        (2 * Math.tan(verticalFovRadians / 2)),
                    LAPTOP_SCREEN_CAMERA_SIZE.x /
                        (2 * Math.tan(horizontalFovRadians / 2)),
                ) * LAPTOP_SCREEN_ZOOM_MARGIN;
            const characterViewDistance =
                screenFitDistance *
                LAPTOP_SCREEN_CHARACTER_VIEW_DISTANCE_MULTIPLIER;
            const characterViewLift =
                LAPTOP_SCREEN_CAMERA_SIZE.y *
                LAPTOP_SCREEN_CHARACTER_VIEW_LIFT_MULTIPLIER;
            const characterViewProgress = MathUtils.smootherstep(
                zoomProgress,
                0.08,
                1,
            );
            const finalFrameOffsetProgress = MathUtils.smootherstep(
                zoomProgress,
                0.72,
                1,
            );
            const finalFrameOffset =
                LAPTOP_SCREEN_CAMERA_SIZE.x *
                LAPTOP_SCREEN_VIEWPORT_RIGHT_OFFSET_MULTIPLIER *
                finalFrameOffsetProgress;

            lookTarget.lerp(LAPTOP_SCREEN_CAMERA_CENTER, zoomProgress);
            LAPTOP_SCREEN_CAMERA_RIGHT.crossVectors(
                LAPTOP_SCREEN_CAMERA_UP,
                LAPTOP_SCREEN_CAMERA_DIRECTION,
            ).normalize();
            lookTarget.addScaledVector(
                LAPTOP_SCREEN_CAMERA_RIGHT,
                -finalFrameOffset,
            );
            LAPTOP_SCREEN_CAMERA_VIEW_POSITION.copy(LAPTOP_SCREEN_CAMERA_CENTER)
                .addScaledVector(
                    LAPTOP_SCREEN_CAMERA_DIRECTION,
                    characterViewDistance,
                )
                .addScaledVector(LAPTOP_SCREEN_CAMERA_UP, characterViewLift)
                .addScaledVector(LAPTOP_SCREEN_CAMERA_RIGHT, -finalFrameOffset);
            targetPosition.lerp(
                LAPTOP_SCREEN_CAMERA_VIEW_POSITION,
                characterViewProgress,
            );
            perspectiveCamera.up.lerp(LAPTOP_SCREEN_CAMERA_UP, zoomProgress);
        } else {
            perspectiveCamera.up.lerp(
                CAMERA_WORLD_UP,
                1 - Math.exp(-8 * delta),
            );
        }

        if (shouldSnapHeroOrbit) {
            perspectiveCamera.position.copy(targetPosition);
            lookTargetRef.current.copy(lookTarget);
        } else {
            perspectiveCamera.position.x = MathUtils.damp(
                perspectiveCamera.position.x,
                targetPosition.x,
                MathUtils.lerp(CAMERA_ORBIT_DAMPING, 8.8, zoomProgress),
                delta,
            );
            perspectiveCamera.position.y = MathUtils.damp(
                perspectiveCamera.position.y,
                targetPosition.y,
                MathUtils.lerp(CAMERA_ORBIT_DAMPING, 8.8, zoomProgress),
                delta,
            );
            perspectiveCamera.position.z = MathUtils.damp(
                perspectiveCamera.position.z,
                targetPosition.z,
                MathUtils.lerp(CAMERA_ORBIT_DAMPING, 8.8, zoomProgress),
                delta,
            );
            lookTargetRef.current.x = MathUtils.damp(
                lookTargetRef.current.x,
                lookTarget.x,
                CAMERA_LOOK_DAMPING,
                delta,
            );
            lookTargetRef.current.y = MathUtils.damp(
                lookTargetRef.current.y,
                lookTarget.y,
                CAMERA_LOOK_DAMPING,
                delta,
            );
            lookTargetRef.current.z = MathUtils.damp(
                lookTargetRef.current.z,
                lookTarget.z,
                CAMERA_LOOK_DAMPING,
                delta,
            );
        }
        perspectiveCamera.lookAt(lookTargetRef.current);
        perspectiveCamera.updateProjectionMatrix();
    });

    return null;
}

function LaptopFaceGlow({ rotationProgress }: { rotationProgress: number }) {
    const faceReflectionPointLightRef = useRef<PointLight | null>(null);
    const faceReflectionSpotLightRef = useRef<SpotLight | null>(null);
    const fillPointLightRef = useRef<PointLight | null>(null);
    const fillSpotLightRef = useRef<SpotLight | null>(null);
    const nextFaceReflectionChangeAtRef = useRef(0);
    const nextChangeAtRef = useRef(0);
    const faceReflectionIntensityRef = useRef(0.35);
    const spotLightRef = useRef<SpotLight | null>(null);
    const spotTargetRef = useRef<Object3D | null>(null);
    const targetIntensityRef = useRef(4.8);

    useEffect(() => {
        if (!spotTargetRef.current) {
            return;
        }

        if (spotLightRef.current) {
            spotLightRef.current.target = spotTargetRef.current;
        }

        if (fillSpotLightRef.current) {
            fillSpotLightRef.current.target = spotTargetRef.current;
        }

        if (faceReflectionSpotLightRef.current) {
            faceReflectionSpotLightRef.current.target = spotTargetRef.current;
        }

        spotTargetRef.current.updateMatrixWorld();
    }, []);

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime;
        const rotationVisibility = MathUtils.lerp(
            0.58,
            1,
            MathUtils.smootherstep(rotationProgress, 0.08, 1),
        );

        if (elapsedTime >= nextChangeAtRef.current) {
            const seedA = Math.sin(elapsedTime * 17.137 + 0.73) * 43758.5453;
            const seedB = Math.sin(elapsedTime * 23.911 + 2.17) * 24631.731;
            const randA = seedA - Math.floor(seedA);
            const randB = seedB - Math.floor(seedB);

            targetIntensityRef.current = 4.5 + randA * 0.9 + randB * 0.55;
            nextChangeAtRef.current =
                elapsedTime + 0.08 + randA * 0.22 + randB * 0.12;
        }

        if (elapsedTime >= nextFaceReflectionChangeAtRef.current) {
            const seedA = Math.sin(elapsedTime * 41.37 + 4.12) * 91827.137;
            const seedB = Math.sin(elapsedTime * 73.91 + 0.82) * 37192.44;
            const seedC = Math.sin(elapsedTime * 19.83 + 7.4) * 12971.61;
            const randA = seedA - Math.floor(seedA);
            const randB = seedB - Math.floor(seedB);
            const randC = seedC - Math.floor(seedC);
            const isLit = randA > 0.36;
            const flashBoost = randB > 0.82 ? 1.35 : 0;

            faceReflectionIntensityRef.current = isLit
                ? 2.2 + randC * 1.35 + flashBoost
                : 0.08 + randC * 0.22;
            nextFaceReflectionChangeAtRef.current =
                elapsedTime + 0.035 + randA * 0.12 + randB * 0.08;
        }

        const screenPulse =
            Math.sin(elapsedTime * 2.15) * 0.34 +
            Math.sin(elapsedTime * 6.7 + 1.8) * 0.18 +
            Math.sin(elapsedTime * 16.4 + 0.5) * 0.08;
        const targetIntensity =
            (targetIntensityRef.current + screenPulse) * rotationVisibility;
        const faceReflectionTarget =
            faceReflectionIntensityRef.current *
            rotationVisibility *
            MathUtils.lerp(
                0.66,
                1,
                Math.max(0, Math.sin(elapsedTime * 3.6 + 0.45)),
            );
        const easing = Math.min(1, delta * 18);
        const faceReflectionEasing = Math.min(1, delta * 32);

        if (spotLightRef.current) {
            spotLightRef.current.intensity +=
                (targetIntensity - spotLightRef.current.intensity) * easing;
        }

        if (faceReflectionSpotLightRef.current) {
            faceReflectionSpotLightRef.current.intensity +=
                (faceReflectionTarget -
                    faceReflectionSpotLightRef.current.intensity) *
                faceReflectionEasing;
        }

        if (faceReflectionPointLightRef.current) {
            faceReflectionPointLightRef.current.intensity +=
                (faceReflectionTarget * 0.32 -
                    faceReflectionPointLightRef.current.intensity) *
                faceReflectionEasing;
        }

        if (fillSpotLightRef.current) {
            fillSpotLightRef.current.intensity +=
                (targetIntensity * 0.34 - fillSpotLightRef.current.intensity) *
                easing;
        }

        if (fillPointLightRef.current) {
            fillPointLightRef.current.intensity +=
                (targetIntensity * 0.18 - fillPointLightRef.current.intensity) *
                easing;
        }
    });

    return (
        <group scale={1.74}>
            <object3D ref={spotTargetRef} position={[0.05, 1.12, -0.92]} />
            <spotLight
                ref={faceReflectionSpotLightRef}
                angle={0.24}
                color="#ffffff"
                decay={1.45}
                distance={1.85}
                intensity={0}
                penumbra={0.82}
                position={[0.02, 0.42, 0.42]}
            />
            <pointLight
                ref={faceReflectionPointLightRef}
                color="#ffffff"
                decay={2.2}
                distance={0.95}
                intensity={0}
                position={[0.03, 0.72, -0.44]}
            />
            <spotLight
                ref={spotLightRef}
                angle={0.38}
                color="#f9fbff"
                decay={1.65}
                distance={2.4}
                intensity={4.8}
                penumbra={0.93}
                position={[0.02, 0.46, 0.55]}
            />
            <spotLight
                ref={fillSpotLightRef}
                angle={0.72}
                color="#f3f8ff"
                decay={1.8}
                distance={2.8}
                intensity={1.7}
                penumbra={0.96}
                position={[0, 0.37, 0.62]}
            />
            <pointLight
                ref={fillPointLightRef}
                color="#ffffff"
                decay={2}
                distance={1.45}
                intensity={0.85}
                position={[0, 0.38, 0.5]}
            />
        </group>
    );
}

type HandSkinInfluence = {
    bone: Bone;
    index: number;
    isHandAnchor: boolean;
    position: Vector3;
};

function findUniqueBonesByCandidates(
    root: Object3D,
    candidates: readonly string[],
) {
    const bones: Bone[] = [];

    for (const candidate of candidates) {
        const object = root.getObjectByName(candidate);

        if (object instanceof Bone && !bones.includes(object)) {
            bones.push(object);
        }
    }

    return bones;
}

function createHandSkinInfluences({
    bones,
    parent,
}: {
    bones: Bone[];
    parent: Object3D;
}) {
    return bones.map((bone, index) => {
        const position = new Vector3();

        bone.getWorldPosition(position);
        parent.worldToLocal(position);

        return {
            bone,
            index,
            isHandAnchor:
                bone.name.toLowerCase().includes('hand') ||
                bone.name.toLowerCase().includes('wrist'),
            position,
        };
    });
}

function chooseHandInfluences({
    influences,
    vertex,
}: {
    influences: HandSkinInfluence[];
    vertex: Vector3;
}) {
    const scoredInfluences = influences
        .map((influence) => ({
            influence,
            distanceSq: Math.max(
                0.00012,
                influence.position.distanceToSquared(vertex),
            ),
        }))
        .sort((first, second) => first.distanceSq - second.distanceSq);
    const nearestHandAnchor = scoredInfluences.find(
        ({ influence }) => influence.isHandAnchor,
    );
    const nearestFinger = scoredInfluences.find(
        ({ influence }) => !influence.isHandAnchor,
    );

    if (
        nearestHandAnchor &&
        (!nearestFinger ||
            nearestHandAnchor.distanceSq < nearestFinger.distanceSq * 1.25)
    ) {
        return scoredInfluences
            .filter(
                ({ influence }) =>
                    influence.isHandAnchor ||
                    influence.position.distanceToSquared(vertex) <
                        nearestHandAnchor.distanceSq * 1.2,
            )
            .slice(0, 4);
    }

    return scoredInfluences.slice(0, 4);
}

function skinHandMeshToFingerBones(root: Object3D) {
    const sourceMesh = root.getObjectByName(TOP_HERO_HAND_MESH_NAME);

    if (
        !(sourceMesh instanceof Mesh) ||
        sourceMesh instanceof SkinnedMesh ||
        !sourceMesh.parent ||
        sourceMesh.parent.getObjectByName(TOP_HERO_SKINNED_HAND_MESH_NAME)
    ) {
        return;
    }

    const parent = sourceMesh.parent;
    const leftBones = findUniqueBonesByCandidates(
        root,
        TOP_HERO_HAND_SKIN_BONE_CANDIDATES.left,
    );
    const rightBones = findUniqueBonesByCandidates(
        root,
        TOP_HERO_HAND_SKIN_BONE_CANDIDATES.right,
    );
    const bones = [...leftBones, ...rightBones];

    if (!leftBones.length || !rightBones.length || bones.length > 65535) {
        return;
    }

    parent.updateWorldMatrix(true, true);
    sourceMesh.updateMatrix();
    const leftInfluences = createHandSkinInfluences({
        bones,
        parent,
    }).filter(({ bone }) => leftBones.includes(bone));
    const rightInfluences = createHandSkinInfluences({
        bones,
        parent,
    }).filter(({ bone }) => rightBones.includes(bone));
    const geometry = sourceMesh.geometry.clone();
    const positionAttribute = geometry.getAttribute('position');
    const skinIndices = new Uint16Array(positionAttribute.count * 4);
    const skinWeights = new Float32Array(positionAttribute.count * 4);
    const vertex = new Vector3();
    const parentSpaceVertex = new Vector3();

    for (let index = 0; index < positionAttribute.count; index += 1) {
        vertex.fromBufferAttribute(positionAttribute, index);
        parentSpaceVertex.copy(vertex).applyMatrix4(sourceMesh.matrix);

        const influences =
            parentSpaceVertex.x >= 0 ? leftInfluences : rightInfluences;
        const closestInfluences = chooseHandInfluences({
            influences,
            vertex: parentSpaceVertex,
        });
        const rawWeights = closestInfluences.map(
            ({ distanceSq }) => 1 / distanceSq,
        );
        const weightTotal =
            rawWeights.reduce((total, weight) => total + weight, 0) || 1;

        for (let slot = 0; slot < 4; slot += 1) {
            const closest = closestInfluences[slot];
            const attributeIndex = index * 4 + slot;

            skinIndices[attributeIndex] = closest?.influence.index ?? 0;
            skinWeights[attributeIndex] = closest
                ? rawWeights[slot] / weightTotal
                : 0;
        }
    }

    geometry.setAttribute(
        'skinIndex',
        new Uint16BufferAttribute(skinIndices, 4),
    );
    geometry.setAttribute(
        'skinWeight',
        new Float32BufferAttribute(skinWeights, 4),
    );

    const skinnedHandMesh = new SkinnedMesh(geometry, sourceMesh.material);

    skinnedHandMesh.name = TOP_HERO_SKINNED_HAND_MESH_NAME;
    skinnedHandMesh.castShadow = sourceMesh.castShadow;
    skinnedHandMesh.receiveShadow = sourceMesh.receiveShadow;
    skinnedHandMesh.frustumCulled = false;
    skinnedHandMesh.position.copy(sourceMesh.position);
    skinnedHandMesh.quaternion.copy(sourceMesh.quaternion);
    skinnedHandMesh.scale.copy(sourceMesh.scale);
    parent.add(skinnedHandMesh);
    skinnedHandMesh.updateWorldMatrix(true, false);
    skinnedHandMesh.bind(new Skeleton(bones));
    sourceMesh.visible = false;
}

function RealisticPlantPot() {
    const leafShape = useMemo(() => {
        const shape = new Shape();

        shape.moveTo(0, 0);
        shape.bezierCurveTo(-0.17, 0.18, -0.16, 0.5, 0, 0.82);
        shape.bezierCurveTo(0.16, 0.5, 0.17, 0.18, 0, 0);

        return shape;
    }, []);
    const leaves = [
        {
            color: '#a61f87',
            position: [0.01, 0.48, -0.015],
            rotation: [-0.74, 0.18, -0.04],
            scale: [0.72, 0.7, 1],
        },
        {
            color: '#7f176f',
            position: [-0.075, 0.42, 0.005],
            rotation: [-0.96, -0.44, 0.58],
            scale: [0.56, 0.58, 1],
        },
        {
            color: '#c92a9e',
            position: [0.075, 0.44, 0.012],
            rotation: [-0.92, 0.52, -0.62],
            scale: [0.6, 0.62, 1],
        },
        {
            color: '#64135f',
            position: [-0.135, 0.36, 0.018],
            rotation: [-1.18, -0.76, 0.98],
            scale: [0.5, 0.5, 1],
        },
        {
            color: '#9b1b82',
            position: [0.135, 0.37, 0.018],
            rotation: [-1.16, 0.76, -0.98],
            scale: [0.52, 0.52, 1],
        },
        {
            color: '#d230a6',
            position: [0.045, 0.55, -0.005],
            rotation: [-0.5, 0.64, -0.34],
            scale: [0.56, 0.74, 1],
        },
        {
            color: '#541052',
            position: [-0.035, 0.54, -0.005],
            rotation: [-0.52, -0.58, 0.32],
            scale: [0.52, 0.68, 1],
        },
    ] as const;
    const stems = [
        {
            length: 0.27,
            position: [-0.038, 0.319, -0.006],
            radius: [0.009, 0.014],
            rotation: [0.18, -0.24, -0.34],
        },
        {
            length: 0.31,
            position: [-0.012, 0.319, 0.006],
            radius: [0.008, 0.013],
            rotation: [0.12, -0.08, -0.13],
        },
        {
            length: 0.34,
            position: [0.014, 0.319, 0.004],
            radius: [0.008, 0.013],
            rotation: [0.1, 0.12, 0.16],
        },
        {
            length: 0.28,
            position: [0.04, 0.319, -0.006],
            radius: [0.008, 0.012],
            rotation: [0.2, 0.26, 0.34],
        },
    ] as const;

    return (
        <group position={[0.76, 0.028, 0.28]} rotation={[0, -0.2, 0]}>
            <mesh castShadow receiveShadow position={[0, 0.145, 0]}>
                <cylinderGeometry args={[0.15, 0.125, 0.255, 96]} />
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.018}
                    color={new Color('#020205')}
                    emissive={new Color('#09010c')}
                    emissiveIntensity={0.1}
                    metalness={0.22}
                    roughness={0.045}
                    sheen={0.22}
                    sheenColor={new Color('#d482ff')}
                    specularIntensity={2.45}
                />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.168, 0.152, 0.052, 96]} />
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.014}
                    color={new Color('#030306')}
                    emissive={new Color('#0d0110')}
                    emissiveIntensity={0.12}
                    metalness={0.24}
                    roughness={0.035}
                    sheen={0.28}
                    sheenColor={new Color('#ff8cff')}
                    specularIntensity={2.7}
                />
            </mesh>
            <mesh receiveShadow position={[0, 0.307, 0]}>
                <cylinderGeometry args={[0.128, 0.136, 0.018, 72]} />
                <meshPhysicalMaterial
                    clearcoat={0.35}
                    clearcoatRoughness={0.3}
                    color={new Color('#10080d')}
                    emissive={new Color('#17060d')}
                    emissiveIntensity={0.16}
                    metalness={0.02}
                    roughness={0.78}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                position={[0, 0.321, 0]}
                scale={[1, 0.22, 0.74]}
            >
                <sphereGeometry args={[0.068, 32, 16]} />
                <meshPhysicalMaterial
                    clearcoat={0.42}
                    clearcoatRoughness={0.2}
                    color={new Color('#130515')}
                    emissive={new Color('#260826')}
                    emissiveIntensity={0.18}
                    metalness={0.03}
                    roughness={0.42}
                />
            </mesh>
            {stems.map(({ length, position, radius, rotation }, index) => (
                <group
                    key={`${position[0]}-${position[2]}`}
                    position={position}
                    rotation={rotation}
                >
                    <mesh castShadow position={[0, length / 2, 0]}>
                        <cylinderGeometry
                            args={[radius[0], radius[1], length, 18]}
                        />
                        <meshPhysicalMaterial
                            clearcoat={0.38}
                            clearcoatRoughness={0.16}
                            color={
                                new Color(
                                    index % 2 === 0 ? '#18071a' : '#120514',
                                )
                            }
                            emissive={new Color('#2a0828')}
                            emissiveIntensity={0.18}
                            metalness={0.04}
                            roughness={0.36}
                        />
                    </mesh>
                </group>
            ))}
            {leaves.map(({ color, position, rotation, scale }, index) => (
                <mesh
                    key={`${color}-${index}`}
                    castShadow
                    position={position}
                    receiveShadow
                    rotation={rotation}
                    scale={scale}
                >
                    <shapeGeometry args={[leafShape, 28]} />
                    <meshPhysicalMaterial
                        clearcoat={1}
                        clearcoatRoughness={0.06}
                        color={new Color(color)}
                        emissive={
                            new Color(index % 2 === 0 ? '#4e0a44' : '#280522')
                        }
                        emissiveIntensity={0.22}
                        metalness={0.03}
                        roughness={0.2}
                        sheen={0.82}
                        sheenColor={new Color('#ff79dc')}
                        side={DoubleSide}
                        specularIntensity={2.1}
                    />
                </mesh>
            ))}
        </group>
    );
}

function GlossyBlackMug() {
    return (
        <group position={[-0.98, 0.03, 0.33]} rotation={[0, 0.16, 0]}>
            <mesh castShadow receiveShadow position={[0, 0.145, 0]}>
                <cylinderGeometry args={[0.105, 0.095, 0.24, 72]} />
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.012}
                    color={new Color('#020205')}
                    emissive={new Color('#08010b')}
                    emissiveIntensity={0.08}
                    metalness={0.28}
                    roughness={0.035}
                    sheen={0.18}
                    sheenColor={new Color('#d77cff')}
                    specularIntensity={2.65}
                />
            </mesh>
            <mesh position={[0, 0.272, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.096, 0.009, 16, 72]} />
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.01}
                    color={new Color('#030306')}
                    emissive={new Color('#0a010d')}
                    emissiveIntensity={0.08}
                    metalness={0.28}
                    roughness={0.03}
                    specularIntensity={2.75}
                />
            </mesh>
            <mesh position={[0, 0.275, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.08, 72]} />
                <meshPhysicalMaterial
                    clearcoat={0.38}
                    clearcoatRoughness={0.2}
                    color={new Color('#080609')}
                    emissive={new Color('#12060d')}
                    emissiveIntensity={0.08}
                    metalness={0.02}
                    roughness={0.7}
                />
            </mesh>
            <mesh
                castShadow
                position={[0.105, 0.15, 0]}
                rotation={[0, 0, 0]}
                scale={[0.72, 1.02, 0.34]}
            >
                <torusGeometry args={[0.082, 0.012, 18, 64]} />
                <meshPhysicalMaterial
                    clearcoat={1}
                    clearcoatRoughness={0.012}
                    color={new Color('#020205')}
                    emissive={new Color('#08010b')}
                    emissiveIntensity={0.08}
                    metalness={0.28}
                    roughness={0.035}
                    specularIntensity={2.65}
                />
            </mesh>
        </group>
    );
}

function DeskAccentProps() {
    return (
        <group scale={1.74}>
            <group position={[1.58, 0.08, 0.16]} rotation={[0, -0.18, -0.025]}>
                {[
                    {
                        color: '#350c40',
                        emissive: '#5b1070',
                        position: [0, 0.0375, 0],
                        scale: [0.48, 0.075, 0.31],
                    },
                    {
                        color: '#f2e8f6',
                        emissive: '#2f1638',
                        position: [0.014, 0.1025, 0.018],
                        scale: [0.46, 0.055, 0.3],
                    },
                    {
                        color: '#461057',
                        emissive: '#8a1bb1',
                        position: [0.032, 0.166, 0.034],
                        scale: [0.44, 0.072, 0.285],
                    },
                    {
                        color: '#17111d',
                        emissive: '#461056',
                        position: [0.052, 0.228, 0.052],
                        scale: [0.4, 0.052, 0.27],
                    },
                ].map(({ color, emissive, position, scale }, index) => (
                    <mesh
                        key={color}
                        castShadow
                        position={position as [number, number, number]}
                        receiveShadow
                        scale={scale as [number, number, number]}
                    >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshPhysicalMaterial
                            clearcoat={1}
                            clearcoatRoughness={index === 1 ? 0.18 : 0.055}
                            color={new Color(color)}
                            emissive={new Color(emissive)}
                            emissiveIntensity={index === 1 ? 0.045 : 0.2}
                            metalness={index === 1 ? 0.02 : 0.24}
                            roughness={index === 1 ? 0.38 : 0.18}
                            sheen={0.35}
                            sheenColor={new Color('#f0a6ff')}
                            specularIntensity={index === 1 ? 0.7 : 1.65}
                        />
                    </mesh>
                ))}
                <mesh
                    castShadow
                    position={[0.04, 0.26, 0.052]}
                    rotation={[0.01, 0.02, 0.035]}
                    scale={[0.36, 0.012, 0.244]}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                        clearcoat={0.85}
                        clearcoatRoughness={0.1}
                        color={new Color('#f7eefa')}
                        emissive={new Color('#4d1b5f')}
                        emissiveIntensity={0.055}
                        metalness={0.02}
                        roughness={0.32}
                    />
                </mesh>
            </group>
            <RealisticPlantPot />
            <GlossyBlackMug />
        </group>
    );
}

function DeskCornerModel({
    laptopZoomProgress,
    onLaptopCameraZoomSettled,
    onLaptopVideoEnded,
    rotationProgress,
    travelProgress,
}: {
    laptopZoomProgress: number;
    onLaptopCameraZoomSettled?: () => void;
    onLaptopVideoEnded?: () => void;
    rotationProgress: number;
    travelProgress: number;
}) {
    const { scene: sourceScene } = useGLTF(DESK_MODEL_URL);
    const deskScene = useMemo(
        () => clone(sourceScene) as Object3D,
        [sourceScene],
    );
    const stageGroupRef = useRef<Object3D | null>(null);
    const subjectPivotRef = useRef<Object3D | null>(null);
    const baseSubjectPivotQuaternionRef = useRef<Quaternion | null>(null);
    const laptopVideoRef = useRef<HTMLVideoElement | null>(null);
    const laptopVideoStartedRef = useRef(false);
    const rotationFlipProgressRef = useRef(0);
    const modelRootRef = useRef<Object3D | null>(null);
    const screenVideoMaterialRef = useRef<MeshBasicMaterial | null>(null);
    const screenVideoTextureRef = useRef<VideoTexture | null>(null);
    const deskPartStatesRef = useRef<
        Partial<Record<DeskPartKey, DeskPartState>>
    >({});
    const rigRef = useRef<TopHeroRig>(createTopHeroRig());

    useEffect(() => {
        const screen = deskScene.getObjectByName(LAPTOP_SCREEN_MODEL_NAME);

        if (!(screen instanceof Mesh)) return;

        const { texture, video } = createLaptopScreenVideo();
        const material = new MeshBasicMaterial({
            map: texture,
            side: DoubleSide,
            toneMapped: false,
        });
        const handleVideoEnded = () => {
            onLaptopVideoEnded?.();
        };

        video.addEventListener('ended', handleVideoEnded);
        screen.material = material;
        laptopVideoRef.current = video;
        screenVideoMaterialRef.current = material;
        screenVideoTextureRef.current = texture;

        return () => {
            video.pause();
            video.removeEventListener('ended', handleVideoEnded);
            material.dispose();
            texture.dispose();
            laptopVideoRef.current = null;
            laptopVideoStartedRef.current = false;
            screenVideoMaterialRef.current = null;
            screenVideoTextureRef.current = null;
        };
    }, [deskScene, onLaptopVideoEnded]);

    useEffect(() => {
        const nextDeskPartStates: Partial<Record<DeskPartKey, DeskPartState>> =
            {};

        for (const [meshName, surfaceConfig] of Object.entries(
            DESK_SURFACE_CONFIG,
        ) as Array<[DeskPartKey, (typeof DESK_SURFACE_CONFIG)[DeskPartKey]]>) {
            const deskMesh = deskScene.getObjectByName(meshName);

            if (!(deskMesh instanceof Mesh)) {
                continue;
            }

            replacePhysicalMaterial(deskMesh, surfaceConfig);
            nextDeskPartStates[meshName] = {
                baseScale: deskMesh.scale.clone(),
                mesh: deskMesh,
            };
        }

        const glbPlant = deskScene.getObjectByName('plant_on_desk');

        glbPlant?.parent?.remove(glbPlant);

        const subjectPivot = createSubjectVisibilityPivot(deskScene);

        subjectPivotRef.current = subjectPivot;
        baseSubjectPivotQuaternionRef.current =
            subjectPivot?.quaternion.clone() ?? null;

        deskScene.traverse((object: Object3D) => {
            if (object instanceof Mesh) {
                object.geometry.computeVertexNormals();

                const material = object.material;

                if (!Array.isArray(material)) {
                    material.flatShading = false;
                    material.needsUpdate = true;
                }
            }

            object.castShadow = true;
            object.receiveShadow = true;
            object.frustumCulled = false;
        });

        const rig = rigRef.current;

        rig.neckBone = findObjectByCandidates(
            deskScene,
            NECK_BONE_NAME_CANDIDATES,
        );
        rig.headBone = findObjectByCandidates(
            deskScene,
            HEAD_BONE_NAME_CANDIDATES,
        );

        if (rig.neckBone) {
            rig.baseNeckQuaternion = rig.neckBone.quaternion.clone();
        }

        if (rig.headBone) {
            rig.baseHeadQuaternion = rig.headBone.quaternion.clone();
        }

        for (const [boneKey, candidates] of Object.entries(
            SHOULDER_BONE_NAME_CANDIDATES,
        ) as Array<[ShoulderBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(deskScene, candidates);

            rig.shoulderBones[boneKey] = bone;

            if (bone) {
                rig.baseShoulderQuaternions[boneKey] = bone.quaternion.clone();
            }
        }

        for (const [boneKey, candidates] of Object.entries(
            ARM_BONE_NAME_CANDIDATES,
        ) as Array<[ArmBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(deskScene, candidates);

            rig.armBones[boneKey] = bone;

            if (bone) {
                rig.baseArmQuaternions[boneKey] = bone.quaternion.clone();
            }
        }

        for (const [boneKey, candidates] of Object.entries(
            WRIST_BONE_NAME_CANDIDATES,
        ) as Array<[WristBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(deskScene, candidates);

            rig.wristBones[boneKey] = bone;

            if (bone) {
                rig.baseWristQuaternions[boneKey] = bone.quaternion.clone();
                rig.baseWristPositions[boneKey] = bone.position.clone();
            }
        }

        for (const [boneKey, candidates] of Object.entries(
            TOP_HERO_HAND_BONE_NAME_CANDIDATES,
        ) as Array<[HandBoneKey, readonly string[]]>) {
            const bone = findObjectByCandidates(deskScene, candidates);

            rig.handBones[boneKey] = bone;

            if (bone) {
                rig.baseHandQuaternions[boneKey] = bone.quaternion.clone();
            }
        }

        for (const fingerChain of TOP_HERO_FINGER_CHAINS) {
            const rootBone = findObjectByCandidates(
                deskScene,
                fingerChain.rootCandidates,
            );
            const distalBone = findObjectByCandidates(
                deskScene,
                fingerChain.distalCandidates,
            );

            if (rootBone) {
                rig.fingerBones[fingerChain.key] = rootBone;
                rig.baseFingerQuaternions[fingerChain.key] =
                    rootBone.quaternion.clone();
            }

            if (distalBone) {
                rig.distalFingerBones[fingerChain.key] = distalBone;
                rig.baseDistalFingerQuaternions[fingerChain.key] =
                    distalBone.quaternion.clone();
            }
        }

        skinHandMeshToFingerBones(deskScene);
        deskPartStatesRef.current = nextDeskPartStates;
    }, [deskScene]);

    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime;
        const rig = rigRef.current;
        const rotationTargetProgress =
            rotationFlipTargetProgress(rotationProgress);
        const sceneTravelProgress = MathUtils.smootherstep(
            MathUtils.clamp(travelProgress, 0, 1),
            0,
            1,
        );
        const shouldSnapHeroPlacement =
            rotationTargetProgress >= 0.999 && sceneTravelProgress >= 0.999;

        rotationFlipProgressRef.current = rotationTargetProgress;

        const rotationFlipProgress = easeRotationFlipProgress(
            rotationFlipProgressRef.current,
        );

        if (
            rotationFlipProgress >= LAPTOP_SCREEN_VIDEO_START_PROGRESS &&
            laptopVideoRef.current &&
            !laptopVideoStartedRef.current &&
            !laptopVideoRef.current.ended
        ) {
            laptopVideoStartedRef.current = true;
            laptopVideoRef.current.currentTime = 0;
            void laptopVideoRef.current.play().catch(() => {
                laptopVideoStartedRef.current = false;
            });
        }

        if (stageGroupRef.current) {
            const targetStageX = MathUtils.lerp(
                TOP_HERO_STAGE_START_X,
                TOP_HERO_STAGE_END_X,
                sceneTravelProgress,
            );
            const targetStageY = MathUtils.lerp(
                TOP_HERO_STAGE_START_Y,
                TOP_HERO_STAGE_END_Y,
                sceneTravelProgress,
            );

            if (shouldSnapHeroPlacement) {
                stageGroupRef.current.position.set(
                    targetStageX,
                    targetStageY,
                    TOP_HERO_STAGE_Z,
                );
                stageGroupRef.current.rotation.y = 0;
            } else {
                stageGroupRef.current.position.x = MathUtils.damp(
                    stageGroupRef.current.position.x,
                    targetStageX,
                    7.2,
                    delta,
                );
                stageGroupRef.current.position.y = MathUtils.damp(
                    stageGroupRef.current.position.y,
                    targetStageY,
                    7.2,
                    delta,
                );
                stageGroupRef.current.rotation.y = MathUtils.damp(
                    stageGroupRef.current.rotation.y,
                    0,
                    7.2,
                    delta,
                );
            }
        }

        if (subjectPivotRef.current && baseSubjectPivotQuaternionRef.current) {
            const targetSubjectPivotQuaternion = composePoseQuaternion(
                baseSubjectPivotQuaternionRef.current,
                [0, SUBJECT_VISIBILITY_ROTATION_Y * rotationFlipProgress, 0],
            );

            if (shouldSnapHeroPlacement) {
                subjectPivotRef.current.quaternion.copy(
                    targetSubjectPivotQuaternion,
                );
            } else {
                subjectPivotRef.current.quaternion.slerp(
                    targetSubjectPivotQuaternion,
                    1 - Math.exp(-10 * delta),
                );
            }
        }

        for (const deskPartState of Object.values(deskPartStatesRef.current)) {
            if (!deskPartState) continue;

            const targetDeskScaleX =
                deskPartState.baseScale.x *
                MathUtils.lerp(
                    DESK_INITIAL_WIDTH_MULTIPLIER,
                    DESK_SCROLL_WIDTH_MULTIPLIER,
                    sceneTravelProgress,
                );

            deskPartState.mesh.scale.x = shouldSnapHeroPlacement
                ? targetDeskScaleX
                : MathUtils.damp(
                      deskPartState.mesh.scale.x,
                      targetDeskScaleX,
                      6.6,
                      delta,
                  );
        }

        (['shoulderLeft', 'shoulderRight'] as ShoulderBoneKey[]).forEach(
            (boneKey) => {
                rig.shoulderBones[boneKey]?.quaternion.slerp(
                    rig.baseShoulderQuaternions[boneKey] ??
                        rig.shoulderBones[boneKey]!.quaternion,
                    1 - Math.exp(-18 * delta),
                );
            },
        );

        (['armLeft', 'armRight'] as ArmBoneKey[]).forEach((boneKey) => {
            rig.armBones[boneKey]?.quaternion.slerp(
                rig.baseArmQuaternions[boneKey] ??
                    rig.armBones[boneKey]!.quaternion,
                1 - Math.exp(-18 * delta),
            );
        });

        (['wristLeft', 'wristRight'] as WristBoneKey[]).forEach((boneKey) => {
            const wristBone = rig.wristBones[boneKey];
            const baseWristQuaternion = rig.baseWristQuaternions[boneKey];
            const baseWristPosition = rig.baseWristPositions[boneKey];
            const ease = 1 - Math.exp(-18 * delta);

            if (!wristBone) return;

            wristBone.quaternion.slerp(
                baseWristQuaternion ?? wristBone.quaternion,
                ease,
            );

            if (!baseWristPosition) return;

            if (boneKey !== 'wristRight' || !wristBone.parent) {
                wristBone.position.lerp(baseWristPosition, ease);
                return;
            }

            wristBone.parent.updateWorldMatrix(true, false);
            FRONT_LEFT_WRIST_NUDGE_TARGET_WORLD.copy(baseWristPosition)
                .applyMatrix4(wristBone.parent.matrixWorld)
                .add(FRONT_LEFT_WRIST_NUDGE_WORLD);
            FRONT_LEFT_WRIST_NUDGE_TARGET.copy(
                FRONT_LEFT_WRIST_NUDGE_TARGET_WORLD,
            );
            wristBone.parent.worldToLocal(FRONT_LEFT_WRIST_NUDGE_TARGET);
            wristBone.position.lerp(FRONT_LEFT_WRIST_NUDGE_TARGET, ease);
        });

        (['handLeft', 'handRight'] as HandBoneKey[]).forEach((boneKey) => {
            rig.handBones[boneKey]?.quaternion.slerp(
                rig.baseHandQuaternions[boneKey] ??
                    rig.handBones[boneKey]!.quaternion,
                1 - Math.exp(-18 * delta),
            );
        });

        if (rig.neckBone && rig.baseNeckQuaternion) {
            rig.neckBone.quaternion.slerp(
                composePoseQuaternion(rig.baseNeckQuaternion, [
                    PORTFOLIO_HERO_NECK_LAPTOP_POSE[0] +
                        Math.sin(elapsedTime * 1.45) * 0.02,
                    PORTFOLIO_HERO_NECK_LAPTOP_POSE[1] +
                        Math.sin(elapsedTime * 0.9) * 0.012,
                    PORTFOLIO_HERO_NECK_LAPTOP_POSE[2],
                ]),
                1 - Math.exp(-7 * delta),
            );
        }

        if (rig.headBone && rig.baseHeadQuaternion) {
            rig.headBone.quaternion.slerp(
                composePoseQuaternion(rig.baseHeadQuaternion, [
                    PORTFOLIO_HERO_HEAD_LAPTOP_POSE[0] +
                        Math.sin(elapsedTime * 1.7 + 0.5) * 0.026,
                    PORTFOLIO_HERO_HEAD_LAPTOP_POSE[1] +
                        Math.sin(elapsedTime * 1.1) * 0.018,
                    Math.sin(elapsedTime * 0.8) * 0.012,
                ]),
                1 - Math.exp(-7 * delta),
            );
        }

        for (const fingerChain of TOP_HERO_FINGER_CHAINS) {
            const rootBone = rig.fingerBones[fingerChain.key];
            const distalBone = rig.distalFingerBones[fingerChain.key];
            const baseRootQuaternion =
                rig.baseFingerQuaternions[fingerChain.key];
            const baseDistalQuaternion =
                rig.baseDistalFingerQuaternions[fingerChain.key];

            const isThumb = fingerChain.key.includes('thumb');
            const handAccent = fingerChain.key.includes('Left')
                ? Math.max(0, Math.sin(elapsedTime * 4.8 + 0.25))
                : Math.max(0, Math.sin(elapsedTime * 5.2 + 1.1));
            const tap =
                Math.max(0, Math.sin(elapsedTime * 11.8 + fingerChain.phase)) **
                1.2;
            const secondaryTap =
                Math.max(
                    0,
                    Math.sin(elapsedTime * 13.6 + fingerChain.phase + 0.18),
                ) ** 1.15;
            const rootTap = Math.min(1, tap * 0.84 + handAccent * 0.46);
            const distalTap = Math.min(
                1,
                secondaryTap * 0.9 + tap * 0.24 + handAccent * 0.3,
            );
            const typeAxis = getTopHeroFingerTypeAxis(fingerChain.key);
            const distalCurlMultiplier = isThumb ? 1.2 : 1.22;

            if (rootBone && baseRootQuaternion) {
                rootBone.quaternion.slerp(
                    composePoseQuaternion(baseRootQuaternion, [
                        typeAxis[0] * fingerChain.curl * rootTap,
                        typeAxis[1] * fingerChain.curl * rootTap,
                        typeAxis[2] * fingerChain.curl * rootTap,
                    ]),
                    1 - Math.exp(-24 * delta),
                );
            }

            if (distalBone && baseDistalQuaternion) {
                distalBone.quaternion.slerp(
                    composePoseQuaternion(baseDistalQuaternion, [
                        typeAxis[0] *
                            fingerChain.secondaryCurl *
                            distalTap *
                            distalCurlMultiplier,
                        typeAxis[1] *
                            fingerChain.secondaryCurl *
                            distalTap *
                            distalCurlMultiplier,
                        typeAxis[2] *
                            fingerChain.secondaryCurl *
                            distalTap *
                            distalCurlMultiplier,
                    ]),
                    1 - Math.exp(-28 * delta),
                );
            }
        }
    });

    return (
        <>
            <DeskCornerCamera
                laptopZoomProgress={laptopZoomProgress}
                modelRoot={modelRootRef}
                onLaptopCameraZoomSettled={onLaptopCameraZoomSettled}
                rotationProgress={rotationProgress}
            />
            <group
                ref={stageGroupRef}
                position={[
                    TOP_HERO_STAGE_START_X,
                    TOP_HERO_STAGE_START_Y,
                    TOP_HERO_STAGE_Z,
                ]}
            >
                <primitive ref={modelRootRef} object={deskScene} scale={1.74} />
                <DeskAccentProps />
                <LaptopFaceGlow rotationProgress={rotationProgress} />
            </group>
        </>
    );
}

useGLTF.preload(DESK_MODEL_URL);

export function DeskCornerCanvas({
    laptopZoomProgress = 0,
    onLaptopCameraZoomSettled,
    onLaptopVideoEnded,
    rotationProgress = 0,
    travelProgress = 0,
}: {
    laptopZoomProgress?: number;
    onLaptopCameraZoomSettled?: () => void;
    onLaptopVideoEnded?: () => void;
    rotationProgress?: number;
    travelProgress?: number;
}) {
    return (
        <Canvas
            camera={{
                position: [0.34, 1.08, 5.6],
                fov: DESK_CORNER_CAMERA_FOV,
            }}
            dpr={[1.25, 2]}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            }}
            onCreated={({ gl }) => {
                gl.toneMapping = ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.16;
                gl.setClearColor(0x000000, 0);
            }}
            shadows
            style={{
                display: 'block',
                height: '100%',
                pointerEvents: 'none',
                width: '100%',
            }}
        >
            <ambientLight color="#2b082d" intensity={0.56} />
            <hemisphereLight
                color="#ffb0ef"
                groundColor="#16071d"
                intensity={1.05}
            />
            <directionalLight
                castShadow
                color="#ffe0c2"
                intensity={2.7}
                position={[2.8, 4.8, 3.8]}
                shadow-bias={-0.00008}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                shadow-normalBias={0.02}
            />
            <directionalLight
                color="#a73dff"
                intensity={1.9}
                position={[-4.6, 2.4, 3.2]}
            />
            <pointLight
                color="#f335d5"
                distance={8.5}
                intensity={3.9}
                position={[1.8, 0.8, 3.2]}
            />
            <pointLight
                color="#ffc7f3"
                distance={8}
                intensity={2.6}
                position={[0.4, 3.2, 3]}
            />
            <spotLight
                angle={0.7}
                color="#ff4fd8"
                distance={10}
                intensity={26}
                penumbra={0.95}
                position={[-4.2, 3.6, 2.4]}
                target-position={[-0.6, 1.2, 0.9]}
            />
            <spotLight
                angle={0.6}
                color="#7a2dff"
                distance={9}
                intensity={22}
                penumbra={0.9}
                position={[3.8, 2.8, 2.2]}
                target-position={[-0.8, 1.5, 0.8]}
            />
            <pointLight
                color="#7b2fff"
                distance={9}
                intensity={2.9}
                position={[-2.8, 2.2, 1.6]}
            />
            <pointLight
                color="#ff5bcf"
                distance={9}
                intensity={2.4}
                position={[-1.2, 4, 1.8]}
            />
            <pointLight
                color="#2a061f"
                distance={8}
                intensity={1.2}
                position={[2.6, -1.2, 1.2]}
            />
            <pointLight
                color="#140414"
                distance={10}
                intensity={0.85}
                position={[-3.8, -0.8, 2.4]}
            />
            <pointLight
                color="#ff77e7"
                distance={8}
                intensity={1.5}
                position={[-0.8, 1.8, 4.8]}
            />
            <DeskCornerModel
                laptopZoomProgress={laptopZoomProgress}
                onLaptopCameraZoomSettled={onLaptopCameraZoomSettled}
                onLaptopVideoEnded={onLaptopVideoEnded}
                rotationProgress={rotationProgress}
                travelProgress={travelProgress}
            />
        </Canvas>
    );
}
