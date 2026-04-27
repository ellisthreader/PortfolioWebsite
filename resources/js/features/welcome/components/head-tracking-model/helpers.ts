import { Euler, Quaternion, type Object3D } from 'three';

export function findObjectByCandidates(
    scene: Object3D,
    candidates: readonly string[],
) {
    for (const candidate of candidates) {
        const object = scene.getObjectByName(candidate);

        if (object) return object;
    }

    return null;
}

export function composePoseQuaternion(
    baseQuaternion: Quaternion,
    [x, y, z]: readonly [number, number, number],
) {
    return baseQuaternion
        .clone()
        .multiply(new Quaternion().setFromEuler(new Euler(x, y, z, 'XYZ')));
}

export function keyXOffset(
    widths: readonly number[],
    keyIndex: number,
    gap: number,
) {
    const rowWidth =
        widths.reduce((total, width) => total + width, 0) +
        gap * (widths.length - 1);
    const beforeKeyWidth =
        widths
            .slice(0, keyIndex)
            .reduce((total, width) => total + width + gap, 0) +
        widths[keyIndex] / 2;

    return beforeKeyWidth - rowWidth / 2;
}
