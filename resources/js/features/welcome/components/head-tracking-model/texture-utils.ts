import {
    CanvasTexture,
    LinearFilter,
    RepeatWrapping,
    type Texture,
} from 'three';

export function clampByte(value: number) {
    return Math.max(0, Math.min(255, Math.round(value)));
}

export function createSurfaceTexture(
    size: number,
    paint: (context: CanvasRenderingContext2D, size: number) => void,
    {
        colorSpace,
    }: {
        colorSpace?: Texture['colorSpace'];
    } = {},
) {
    if (typeof document === 'undefined') {
        return null;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        return null;
    }

    canvas.width = size;
    canvas.height = size;
    paint(context, size);

    const texture = new CanvasTexture(canvas);

    if (colorSpace) texture.colorSpace = colorSpace;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;

    return texture;
}
