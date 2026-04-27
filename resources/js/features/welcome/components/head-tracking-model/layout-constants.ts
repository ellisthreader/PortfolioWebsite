export const MODEL_START_X = 1.48;
export const MODEL_CENTER_X = 0;
export const MODEL_START_Y = -2.38;
export const MODEL_START_Z = -0.06;
export const SUBJECT_MODEL_ROTATION_Y = (-25 * Math.PI) / 180;
export const MODEL_START_ROTATION_Y = SUBJECT_MODEL_ROTATION_Y;
export const MODEL_END_ROTATION_Y = MODEL_START_ROTATION_Y + Math.PI;
export const MODEL_START_SCALE = 0.9;
export const SCROLL_ALL_IN_ONE_POSITION = [-0.105, 2.532, 0.881] as const;

export const LAPTOP_SCALE = 1.26;
export const LAPTOP_REST_X = -0.04;
export const LAPTOP_REST_Z = 1.74;
export const LAPTOP_START_X = 0.1;
export const LAPTOP_START_Y = 2.48;
export const LAPTOP_START_Z = 1.46;
export const LAPTOP_START_ROTATION_X = -0.42;
export const LAPTOP_REST_ROTATION_X = -0.28;

export const PORTFOLIO_HERO_STAGE_X = 1.86;
export const PORTFOLIO_HERO_STAGE_Y = -2.68;
export const PORTFOLIO_HERO_STAGE_Z = -0.04;
export const PORTFOLIO_HERO_STAGE_SCALE = 1.18;
export const PORTFOLIO_HERO_MODEL_URL = '/AllIn1.glb';
export const PORTFOLIO_HERO_SUBJECT_ROTATION_Y = SUBJECT_MODEL_ROTATION_Y;
export const PORTFOLIO_HERO_LAPTOP_X = 1.08;
export const PORTFOLIO_HERO_LAPTOP_Y = 1.56;
export const PORTFOLIO_HERO_LAPTOP_Z = 1.92;
export const PORTFOLIO_HERO_LAPTOP_ROTATION_X = -0.24;
export const PORTFOLIO_HERO_LAPTOP_SCALE = 0.92;

export const PORTFOLIO_HERO_DESK_MODEL_URL = '/Desk.glb';
export const PORTFOLIO_HERO_DESK_POSITION = [0.75, 0.95, 2.05] as const;
export const PORTFOLIO_HERO_DESK_SCALE = 0.55;
export const PORTFOLIO_HERO_DESKTOP_SET_POSITION = [-1.2, -0.8, 0] as const;

export const MODEL_ROTATE_END_PROGRESS = 0.58;
export const MODEL_ZOOM_START_PROGRESS = 0.62;
export const MODEL_FOLLOW_THROUGH_START_PROGRESS = 1;
export const MODEL_FOLLOW_THROUGH_END_PROGRESS = 1.42;
export const LAPTOP_VIDEO_START_SCROLL_PROGRESS = MODEL_ZOOM_START_PROGRESS;
export const ARM_LIFT_START_PROGRESS = 0.5;
export const ARM_LIFT_END_PROGRESS = 0.73;
export const FINGER_TYPE_START_PROGRESS = 0.62;
export const FINGER_TYPE_END_PROGRESS = 0.88;

export const DESK_TEXTURE_SIZE = 384;
export const DETAIL_TEXTURE_SIZE = 192;
export const LEAF_TEXTURE_SIZE = 192;

export const LAPTOP_SCREEN_WIDTH = 0.8;
export const LAPTOP_SCREEN_HEIGHT = 0.51;
export const LAPTOP_SCREEN_ASPECT = LAPTOP_SCREEN_WIDTH / LAPTOP_SCREEN_HEIGHT;

export const LEAF_PLACEMENTS = [
    [-0.3, 0.42, 0.04, 0.92, -0.4, -0.14, 0.46, 0.94],
    [-0.13, 0.58, -0.02, 0.46, -0.16, 0.2, 0.44, 1.08],
    [0.04, 0.69, 0.03, -0.06, 0.04, -0.1, 0.42, 1.22],
    [0.22, 0.56, -0.01, -0.52, 0.22, 0.24, 0.46, 1.06],
    [0.36, 0.38, 0.04, -0.88, 0.34, -0.18, 0.4, 0.88],
    [-0.37, 0.24, -0.04, 1.08, -0.28, 0.28, 0.38, 0.82],
    [0.15, 0.28, 0.05, -1.02, 0.18, -0.34, 0.36, 0.8],
] as const;

export const KEY_ROWS: readonly (readonly number[])[] = [
    [0.035, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.035],
    [
        0.044, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052,
        0.044,
    ],
    [0.062, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.054, 0.062],
    [0.078, 0.056, 0.056, 0.056, 0.056, 0.056, 0.056, 0.056, 0.078],
    [0.084, 0.056, 0.056, 0.32, 0.056, 0.056, 0.084],
] as const;
