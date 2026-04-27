import { MathUtils } from 'three';

export const SPHERE_RADIUS = 5.7;
export const SPHERE_SCALE = 1.02;
export const CAMERA_FOV = 38;
export const CAMERA_VERTICAL_FILL = 0.8;
export const CAMERA_HORIZONTAL_FILL = 0.8;
export const SPHERE_FRAMING_RADIUS = SPHERE_RADIUS * 1.2 * SPHERE_SCALE;
export const ICON_SPHERE_RADIUS = SPHERE_RADIUS * 0.995;
export const FRONT_VISIBILITY_START = 0.18;
export const FRONT_VISIBILITY_END = 0.84;
export const DISABLE_RAYCAST = () => null;

export function calculateCameraDistance(aspect: number) {
    const safeAspect = Math.max(aspect, 0.1);
    const verticalFov = MathUtils.degToRad(CAMERA_FOV);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * safeAspect);
    const verticalDistance =
        SPHERE_FRAMING_RADIUS /
        (CAMERA_VERTICAL_FILL * Math.tan(verticalFov / 2));
    const horizontalDistance =
        SPHERE_FRAMING_RADIUS /
        (CAMERA_HORIZONTAL_FILL * Math.tan(horizontalFov / 2));

    return Math.max(verticalDistance, horizontalDistance);
}

export function createSpherePosition(
    index: number,
    total: number,
    radius: number,
) {
    const offset = 2 / total;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const y = index * offset - 1 + offset / 2;
    const radial = Math.sqrt(1 - y * y);
    const phi = index * increment;

    return [
        Math.cos(phi) * radial * radius,
        y * radius,
        Math.sin(phi) * radial * radius,
    ] as const;
}
