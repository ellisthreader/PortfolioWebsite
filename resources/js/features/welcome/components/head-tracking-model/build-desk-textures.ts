import { NoColorSpace } from 'three';

import { DESK_TEXTURE_SIZE, DETAIL_TEXTURE_SIZE } from './layout-constants';
import { clampByte, createSurfaceTexture } from './texture-utils';

export function buildDeskSurfaceTextures() {
    const desk = createSurfaceTexture(DESK_TEXTURE_SIZE, (context, size) => {
        context.fillStyle = '#060506';
        context.fillRect(0, 0, size, size);

        for (let y = 0; y < size; y += 5) {
            const shade = 16 + Math.floor(Math.random() * 22);

            context.fillStyle = `rgba(${shade}, ${shade}, ${shade + 2}, 0.28)`;
            context.fillRect(0, y, size, 1);
        }

        for (let index = 0; index < 520; index += 1) {
            const alpha = 0.03 + Math.random() * 0.08;
            const shade = 42 + Math.floor(Math.random() * 34);

            context.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
            context.fillRect(
                Math.random() * size,
                Math.random() * size,
                1 + Math.random() * 3,
                1,
            );
        }

        const sheen = context.createLinearGradient(0, 0, size, size);

        sheen.addColorStop(0, 'rgba(255,255,255,0.08)');
        sheen.addColorStop(0.32, 'rgba(255,255,255,0.015)');
        sheen.addColorStop(1, 'rgba(0,0,0,0.16)');
        context.fillStyle = sheen;
        context.fillRect(0, 0, size, size);
    });
    const deskNormal = createSurfaceTexture(
        DESK_TEXTURE_SIZE,
        (context, size) => {
            context.fillStyle = 'rgb(128,128,255)';
            context.fillRect(0, 0, size, size);

            for (let y = 0; y < size; y += 4) {
                const offset = Math.sin(y * 0.06) * 9;
                const stroke = 118 + Math.random() * 18;

                context.fillStyle = `rgb(${stroke},${stroke},255)`;
                context.fillRect(offset, y, size, 1);
            }
        },
        { colorSpace: NoColorSpace },
    );
    const deskRoughness = createSurfaceTexture(
        DESK_TEXTURE_SIZE,
        (context, size) => {
            context.fillStyle = '#4a4a4a';
            context.fillRect(0, 0, size, size);

            for (let index = 0; index < 2200; index += 1) {
                const value = clampByte(92 + Math.random() * 80);

                context.fillStyle = `rgb(${value},${value},${value})`;
                context.fillRect(
                    Math.random() * size,
                    Math.random() * size,
                    1 + Math.random() * 2,
                    1 + Math.random() * 2,
                );
            }
        },
        { colorSpace: NoColorSpace },
    );
    const mouse = createSurfaceTexture(DETAIL_TEXTURE_SIZE, (context, size) => {
        const gradient = context.createRadialGradient(
            size * 0.36,
            size * 0.2,
            size * 0.08,
            size * 0.5,
            size * 0.48,
            size * 0.68,
        );

        gradient.addColorStop(0, '#5c5660');
        gradient.addColorStop(0.45, '#252129');
        gradient.addColorStop(1, '#0c0b0e');
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);

        for (let index = 0; index < 260; index += 1) {
            context.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
            context.fillRect(Math.random() * size, Math.random() * size, 1, 1);
        }
    });
    const mouseRoughness = createSurfaceTexture(
        DETAIL_TEXTURE_SIZE,
        (context, size) => {
            const gradient = context.createLinearGradient(0, 0, size, size);

            gradient.addColorStop(0, '#565656');
            gradient.addColorStop(0.55, '#2c2c2c');
            gradient.addColorStop(1, '#7a7a7a');
            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);

            for (let index = 0; index < 640; index += 1) {
                const shade = clampByte(70 + Math.random() * 120);

                context.fillStyle = `rgba(${shade},${shade},${shade},0.2)`;
                context.fillRect(
                    Math.random() * size,
                    Math.random() * size,
                    1,
                    1,
                );
            }
        },
        { colorSpace: NoColorSpace },
    );
    const pot = createSurfaceTexture(DETAIL_TEXTURE_SIZE, (context, size) => {
        const gradient = context.createLinearGradient(0, 0, size, size);

        gradient.addColorStop(0, '#1b151b');
        gradient.addColorStop(0.5, '#080709');
        gradient.addColorStop(1, '#3a2d3b');
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);

        for (let y = 0; y < size; y += 11) {
            context.fillStyle = 'rgba(255,255,255,0.045)';
            context.fillRect(0, y, size, 1);
        }
    });

    desk?.repeat.set(2.8, 1.45);
    deskNormal?.repeat.set(2.8, 1.45);
    deskRoughness?.repeat.set(2.8, 1.45);
    mouse?.repeat.set(1.5, 1.8);
    mouseRoughness?.repeat.set(1.5, 1.8);

    return { desk, deskNormal, deskRoughness, mouse, mouseRoughness, pot };
}
