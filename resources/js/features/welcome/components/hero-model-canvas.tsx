import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { ACESFilmicToneMapping } from 'three';

import type { MutableNumberRef } from '../types';
import { HeadTrackingModel } from './head-tracking-model';
import { HeroCanvasLights } from './hero-model-canvas/hero-canvas-lights';
import {
    HeroCameraRig,
    StaticHeroCameraRig,
} from './hero-model-canvas/hero-camera-rigs';

export function HeroModelCanvas({
    onLaptopVideoEnded,
    presentation = 'scroll',
    scrollProgressRef,
}: {
    onLaptopVideoEnded?: () => void;
    presentation?: 'scroll' | 'portfolioHero';
    scrollProgressRef?: MutableNumberRef;
}) {
    const fallbackScrollProgressRef = useRef(0.34);
    const activeScrollProgressRef =
        scrollProgressRef ?? fallbackScrollProgressRef;

    return (
        <Canvas
            camera={
                presentation === 'portfolioHero'
                    ? { position: [0.92, 1.86, 6.4], fov: 23.2 }
                    : { position: [0.36, 2.74, 4.78], fov: 20.5 }
            }
            dpr={presentation === 'portfolioHero' ? [1, 1.75] : [1, 1.35]}
            gl={{
                alpha: presentation === 'portfolioHero',
                antialias: true,
                powerPreference: 'high-performance',
            }}
            shadows
            onCreated={({ gl }) => {
                gl.toneMapping = ACESFilmicToneMapping;
                gl.toneMappingExposure =
                    presentation === 'portfolioHero' ? 1.18 : 1.06;

                if (presentation === 'portfolioHero') {
                    gl.setClearColor(0x000000, 0);
                }
            }}
            style={{ pointerEvents: 'none' }}
        >
            <HeroCanvasLights presentation={presentation} />
            {presentation === 'scroll' ? (
                <HeroCameraRig scrollProgressRef={activeScrollProgressRef} />
            ) : (
                <StaticHeroCameraRig />
            )}
            <Suspense fallback={null}>
                <HeadTrackingModel
                    onLaptopVideoEnded={onLaptopVideoEnded}
                    presentation={presentation}
                    scrollProgressRef={activeScrollProgressRef}
                />
            </Suspense>
        </Canvas>
    );
}
