export const ARM_BONE_NAME_CANDIDATES = {
    armLeft: ['ArmL', 'Arm.L'],
    armRight: ['ArmR', 'Arm.R'],
} as const;

export const SHOULDER_BONE_NAME_CANDIDATES = {
    shoulderLeft: ['ShoulderL', 'Shoulder.L'],
    shoulderRight: ['ShoulderR', 'Shoulder.R'],
} as const;

export const WRIST_BONE_NAME_CANDIDATES = {
    wristLeft: ['WristL', 'Wrist.L'],
    wristRight: ['WristR', 'Wrist.R'],
} as const;

export const NECK_BONE_NAME_CANDIDATES = ['Neck'] as const;
export const HEAD_BONE_NAME_CANDIDATES = ['Head'] as const;

export const HEAD_OBJECT_NAME_CANDIDATES = [
    'Cube001',
    'Retopo_head',
    'mesh001',
    'mesh001_1',
    'Sphere',
    'Sphere001',
    'Sphere001_1',
    'Sphere001_2',
] as const;

export const SHOULDER_LAPTOP_POSE = {
    shoulderLeft: [0.22, 0.13, -0.2],
    shoulderRight: [0.22, -0.13, 0.2],
} as const;

export const PORTFOLIO_HERO_SHOULDER_LAPTOP_POSE = {
    shoulderLeft: [0.26, 0.13, -0.2],
    shoulderRight: [0.26, -0.13, 0.2],
} as const;

export const ARM_LAPTOP_POSE = {
    armLeft: [1, 0.12, 0.22],
    armRight: [1, -0.1, -0.22],
} as const;

export const PORTFOLIO_HERO_ARM_LAPTOP_POSE = {
    armLeft: [1.08, 0.1, 0.16],
    armRight: [1.08, -0.1, -0.16],
} as const;

export const WRIST_LAPTOP_POSE = {
    wristLeft: [-0.84, 0.03, -0.08],
    wristRight: [-0.84, -0.03, 0.14],
} as const;

export const PORTFOLIO_HERO_WRIST_LAPTOP_POSE = {
    wristLeft: [-0.94, 0.02, -0.04],
    wristRight: [-0.94, -0.02, 0.08],
} as const;

export const PORTFOLIO_HERO_NECK_LAPTOP_POSE = [0.18, 0.03, 0] as const;
export const PORTFOLIO_HERO_HEAD_LAPTOP_POSE = [0.36, 0.02, 0] as const;

export const LEFT_FINGER_TYPE_AXIS = [-0.35, 0, -0.77] as const;
export const RIGHT_FINGER_TYPE_AXIS = [-0.38, 0, 0.58] as const;
export const LEFT_THUMB_TYPE_AXIS = [0, 0, -1] as const;
export const RIGHT_THUMB_TYPE_AXIS = [0, 0, 1] as const;

export const FINGER_TYPING_POSE = [
    {
        key: 'indexLeft',
        candidates: ['IndexL', 'Index.L'],
        tipCandidates: ['IndexL001', 'Index.L.001'],
        phase: 0,
        curl: 0.46,
    },
    {
        key: 'middleLeft',
        candidates: ['MiddleL', 'Middle.L'],
        tipCandidates: ['MiddleL001', 'Middle.L.001'],
        phase: 1.45,
        curl: 0.42,
    },
    {
        key: 'ringLeft',
        candidates: ['RingL', 'Ring.L'],
        tipCandidates: ['RingL001', 'Ring.L.001'],
        phase: 2.7,
        curl: 0.38,
    },
    {
        key: 'pinkyLeft',
        candidates: ['RingL002', 'PinkyL', 'Pinky.L'],
        tipCandidates: ['RingL003', 'PinkyL001', 'Pinky.L.001'],
        phase: 3.25,
        curl: 0.32,
    },
    {
        key: 'thumbLeft',
        candidates: ['ThumbL', 'Thumb.L'],
        tipCandidates: ['ThumbL001', 'Thumb.L.001'],
        phase: 3.9,
        curl: 0.26,
    },
    {
        key: 'indexRight',
        candidates: ['IndexR', 'Index.R'],
        tipCandidates: ['IndexR001', 'Index.R.001'],
        phase: 0.82,
        curl: 0.46,
    },
    {
        key: 'middleRight',
        candidates: ['MiddleR', 'Middle.R'],
        tipCandidates: ['MiddleR001', 'Middle.R.001'],
        phase: 2.08,
        curl: 0.42,
    },
    {
        key: 'ringRight',
        candidates: ['RingR', 'Ring.R'],
        tipCandidates: ['RingR001', 'Ring.R.001'],
        phase: 3.3,
        curl: 0.38,
    },
    {
        key: 'pinkyRight',
        candidates: ['RingR002', 'PinkyR', 'Pinky.R'],
        tipCandidates: ['RingR003', 'PinkyR001', 'Pinky.R.001'],
        phase: 3.82,
        curl: 0.32,
    },
    {
        key: 'thumbRight',
        candidates: ['ThumbR', 'Thumb.R'],
        tipCandidates: ['ThumbR001', 'Thumb.R.001'],
        phase: 4.45,
        curl: 0.26,
    },
] as const;

export type ArmBoneKey = keyof typeof ARM_BONE_NAME_CANDIDATES;
export type ShoulderBoneKey = keyof typeof SHOULDER_BONE_NAME_CANDIDATES;
export type WristBoneKey = keyof typeof WRIST_BONE_NAME_CANDIDATES;
export type FingerBoneKey = (typeof FINGER_TYPING_POSE)[number]['key'];
