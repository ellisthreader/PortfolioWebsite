import { NoColorSpace } from 'three';

import { LEAF_PLACEMENTS, LEAF_TEXTURE_SIZE } from './layout-constants';
import { clampByte, createSurfaceTexture } from './texture-utils';

export function buildPlantSurfaceTextures() {
    const leaf = createSurfaceTexture(LEAF_TEXTURE_SIZE, (context, size) => {
        const gradient = context.createLinearGradient(
            size * 0.5,
            0,
            size * 0.5,
            size,
        );

        gradient.addColorStop(0, '#7ed59a');
        gradient.addColorStop(0.38, '#3ea869');
        gradient.addColorStop(1, '#1b6038');
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);

        context.strokeStyle = 'rgba(229,255,239,0.38)';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(size * 0.5, size * 0.08);
        context.lineTo(size * 0.5, size * 0.92);
        context.stroke();

        context.lineWidth = 2.5;
        for (let index = 0; index < 7; index += 1) {
            const y = size * (0.18 + index * 0.1);
            const sweep = size * (0.12 + (index % 3) * 0.03);

            context.beginPath();
            context.moveTo(size * 0.5, y);
            context.quadraticCurveTo(
                size * 0.5 + sweep,
                y - 12,
                size * 0.78,
                y - 20,
            );
            context.stroke();

            context.beginPath();
            context.moveTo(size * 0.5, y + 4);
            context.quadraticCurveTo(
                size * 0.5 - sweep,
                y - 8,
                size * 0.22,
                y - 12,
            );
            context.stroke();
        }
    });
    const leafAlpha = createSurfaceTexture(
        LEAF_TEXTURE_SIZE,
        (context, size) => {
            context.fillStyle = '#000000';
            context.fillRect(0, 0, size, size);
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.moveTo(size * 0.5, size * 0.04);
            context.bezierCurveTo(
                size * 0.84,
                size * 0.18,
                size * 0.92,
                size * 0.72,
                size * 0.5,
                size * 0.96,
            );
            context.bezierCurveTo(
                size * 0.08,
                size * 0.72,
                size * 0.16,
                size * 0.18,
                size * 0.5,
                size * 0.04,
            );
            context.fill();
        },
        { colorSpace: NoColorSpace },
    );
    const leafNormal = createSurfaceTexture(
        LEAF_TEXTURE_SIZE,
        (context, size) => {
            const imageData = context.createImageData(size, size);
            const data = imageData.data;

            for (let y = 0; y < size; y += 1) {
                for (let x = 0; x < size; x += 1) {
                    const nx = x / size - 0.5;
                    const ny = y / size - 0.5;
                    const ridge = Math.exp(-(nx * nx) / 0.005);
                    const curve = Math.cos(ny * Math.PI) * 0.18;
                    const pixelIndex = (y * size + x) * 4;

                    data[pixelIndex] = clampByte((0.5 + nx * 0.34) * 255);
                    data[pixelIndex + 1] = clampByte(
                        (0.5 + curve + ridge * 0.12) * 255,
                    );
                    data[pixelIndex + 2] = 255;
                    data[pixelIndex + 3] = 255;
                }
            }

            context.putImageData(imageData, 0, 0);
        },
        { colorSpace: NoColorSpace },
    );

    return { leaf, leafAlpha, leafNormal, leafPlacements: LEAF_PLACEMENTS };
}
